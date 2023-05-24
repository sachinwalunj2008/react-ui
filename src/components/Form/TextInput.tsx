import React, {
  useState,
  useEffect,
  useRef,
  ForwardedRef,
  CSSProperties,
} from 'react'
import {
  Icon,
  ConditionalWrapper,
  notEmpty,
  Tooltip,
  Button,
} from '../../module'
import { hasValue } from '../../module'
import FormLabel from '../FormLabel/FormLabel'
import styles from './_text-input.module.scss'

const ARROW_KEY_VALUES = ['arrowup', 'arrowdown']

let inputTimeout: number
type CalloutType = (stateName: StateNameType, value: string | number) => void
type StateNameType = string | number | undefined
type TooltipProps = React.ComponentProps<typeof Tooltip>
type TextInputBase = {
  /** The value to display in the input */
  value: string | number
  /** Optional callback when focus on input is lost */
  onBlurCallout?: (
    stateName: StateNameType,
    value: React.SyntheticEvent<HTMLTextAreaElement> | string
  ) => void
  /** Optional number prop used to delay the execution used in a setTimeout's second param as milliseconds */
  debounce?: number
  /** Name of the state for the input */
  stateName?: string | number
  /** Optional callback function to specify when user releases a key on the keyboard */
  keyUp?: (stateName: StateNameType, value: unknown) => void
  /** Optional label above the input */
  labelText?: React.ReactNode
  /** Optional label to the top right of the input */
  rightLabel?: React.ReactNode
  /** Optional placeholder to display inside input */
  placeholder?: string
  /** Optional identifier for the input */
  id?: string
  /** Optional className for the input */
  classType?: string
  /** This gives the input the required attribute and will also display a red asterisk next to the label */
  required?: boolean
  /** Optional boolean to display the "Clear" text in the input */
  clear?: boolean
  /** Optional callback when the Clear button is clicked */
  clearCallout?: () => void
  /** Optional boolean to inidicate if the input should be initialized to the focused state */
  autoFocus?: boolean
  /** Optional show the browser's autocomplete popover */
  autoComplete?: 'on' | 'off'
  /** Optional label that appears inside the input and aligned to the right */
  endText?: string
  /** Boolean to know if an error has occured */
  hasError?: boolean
  /** Optional boolean to specify that an input field is read-only */
  readOnly?: boolean
  /** Optional boolean used to display full width of the input */
  fullWidth?: boolean
  /** Optional boolean to specify the maximum number of characters allowed in the input */
  maxLength?: number
  /** Optional function to specify when the input receives focus */
  setIsOnFocus?: (isOnFocus: boolean) => void
  /** Optional boolean to not allow the input to remain an empty field */
  noEmpty?: boolean
  /** The right aligned label in the input e.g. '%', 'in', 'lbs' etc */
  inputLabel?: string
  /** Optional class to add to the parent div of the input */
  containerClassName?: string
  /** Optional prop used to display a tooltip for the label  */
  labelTooltip?: Omit<TooltipProps, 'children'>
  /** Optional prop used to display an error message below the input  */
  errorText?: string
}

type TextInputNotNumber = TextInputBase & {
  /** Optional prop to indicate the type of the input */
  type?: 'email' | 'password' | 'tel' | 'text' | 'textarea'
  min?: never
  max?: never
  step?: never
  onlyWholeNumbers?: never
  onlyPositiveNumbers?: never
  noScrollForNumbers?: never
  noArrowKeyNumberChange?: never
  maxDecimalPlaces?: never
  numberFormat?: never
}

type TextInputNumber = TextInputBase & {
  /** Required prop to indicate the input is of type `number` */
  type: 'number'
  /** Optional boolean to specify the minimum value for the input */
  min?: number
  /** Optional boolean to specify the maximum value for the input */
  max?: number
  /** Optional value to specify the interval between legal numbers in the input */
  step?: number
  /** Optional prop used to round a number to the nearest integer */
  onlyWholeNumbers?: boolean
  /** Optional prop used to only accept positive numbers as a value */
  onlyPositiveNumbers?: boolean
  /** Disable incrementing / decrementing number value with scroll wheel */
  noScrollForNumbers?: boolean
  /** Disable incrementing / decrementing number value with keyboard arrows (default: false) */
  noArrowKeyNumberChange?: boolean
  /** Used if we want to restrict a certain number of decimal places. */
  maxDecimalPlaces?: number
  /** Optional prop used to display currency or percentage input */
  numberFormat?: {
    /** To indicate the type of numberFormat */
    type: 'currency' | 'percentage'
    /** Currency symbol to display in a gray background (e.g: $) */
    currencySymbol?: string
  }
}

type TextInputTypes = TextInputNotNumber | TextInputNumber

// if disabled===true, then callout is optional
// if disabled===false or undefined, then callout is required
type DisabledOrNot =
  | { disabled: true; callout?: CalloutType }
  | { disabled?: false; callout: CalloutType }

export type TextInputProps = TextInputTypes & DisabledOrNot

const TextInput = React.forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  TextInputProps
>(
  (
    {
      value,
      type,
      onBlurCallout,
      debounce,
      callout,
      stateName,
      keyUp,
      labelText,
      rightLabel,
      placeholder,
      id,
      classType,
      required,
      clear,
      clearCallout,
      min,
      max,
      step,
      disabled,
      autoFocus,
      inputLabel,
      autoComplete,
      onlyWholeNumbers,
      onlyPositiveNumbers,
      endText,
      readOnly = false,
      fullWidth = false,
      noEmpty = false,
      maxLength,
      setIsOnFocus,
      hasError = false,
      containerClassName = '',
      maxDecimalPlaces,
      labelTooltip,
      noScrollForNumbers,
      noArrowKeyNumberChange,
      numberFormat,
      errorText,
    },
    ref
  ) => {
    const [customClass, setCustomClass] = useState(''),
      classes = [customClass, classType].filter(Boolean).join(' ')
    const [inputValue, setInputValue] = useState(value ? value : '')

    const [inputType, setInputType] = useState(type),
      inputLabelRef = useRef<HTMLSpanElement>(null)

    const onBlur = (
      value: React.SyntheticEvent<HTMLTextAreaElement> | string
    ): void => {
      setCustomClass(hasError ? 'error' : notEmpty(inputValue) ? 'blur' : '')
      if (onBlurCallout) {
        onBlurCallout(stateName ?? '', value)
      }
      if (setIsOnFocus) {
        setIsOnFocus(false)
      }
    }

    const checkDebounce = (value: string | number) => {
      clearTimeout(inputTimeout)
      if (debounce) {
        inputTimeout = window.setTimeout(() => {
          callout?.(stateName, value)
        }, debounce)
      } else {
        callout?.(stateName, value)
      }
    }

    const setValue = (value: string): void => {
      let val: string | number = value
      if (inputType === 'number') {
        val = onlyWholeNumbers
          ? val
            ? Math.round(val as unknown as number)
            : ''
          : val
        val = onlyPositiveNumbers && (val as unknown as number) < 0 ? 0 : val
        if (
          hasValue(min) &&
          (val as unknown as number) < (min as number) &&
          value !== ''
        )
          val = min as number
        if (
          hasValue(max) &&
          (val as unknown as number) > (max as number) &&
          value !== ''
        )
          val = max as number

        if (value === '' && noEmpty) {
          val = min ?? 0
        }
        if (maxDecimalPlaces) {
          const arr = value.split('.')
          if (arr.length > 1 && arr[1].length > maxDecimalPlaces) return
        }
      }
      setInputValue(val)
      checkDebounce(val)
    }

    const clearValue = () => {
      setInputValue('')
      if (clearCallout) {
        clearCallout()
      }
    }

    const onFocus = () => {
      setCustomClass('focus')
      if (setIsOnFocus) {
        setIsOnFocus(true)
      }
    }

    const togglePassword = () => {
      setInputType(inputType === 'password' ? 'text' : 'password')
    }

    const handleKeyUp = (event: React.KeyboardEvent) => {
      switch (event.keyCode) {
        case 13:
          keyUp && keyUp(stateName, inputValue)
          break
        case 27:
          if (inputValue && (inputValue as string).length > 0) {
            clearValue()
          } else if (!inputValue || (inputValue as string).length === 0) {
            const target = event.target as
              | HTMLInputElement
              | HTMLTextAreaElement
            target.blur()
          }
          break
        default:
          break
      }
    }

    useEffect(() => {
      setInputType(type)
    }, [type])

    useEffect(() => {
      setInputValue(value)
    }, [value])

    const inputRefOffsetWidth = inputLabelRef?.current?.offsetWidth
    const inlineStyles = {
      '--input-label-width': (inputRefOffsetWidth ?? 0) + 12 + 'px',
    } as CSSProperties

    return (
      <div
        className={`text-input ${
          fullWidth ? ' full-width' : ''
        } ${containerClassName}`}
      >
        {labelText && (
          <div className={labelTooltip && `${styles.labelText}`}>
            <FormLabel
              label={labelText}
              rightLabel={rightLabel}
              tooltip={labelTooltip}
              required={required}
              active={classes.includes('focus')}
              error={hasError}
              id={id}
            />
          </div>
        )}

        {type === 'textarea' ? (
          <textarea
            id={id}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            value={inputValue}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            required={required}
            className={classes}
            onKeyUp={(e) => handleKeyUp(e)}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            autoFocus={autoFocus}
            readOnly={readOnly}
            maxLength={maxLength}
          />
        ) : (
          <>
            <div
              className={`input-container ${
                inputLabel &&
                inputLabelRef?.current &&
                numberFormat?.type !== 'percentage'
                  ? 'has-label'
                  : ''
              }${fullWidth ? ' full-width' : ''} ${
                numberFormat?.type === 'currency' ? 'flex' : ''
              }`}
              style={inlineStyles}
            >
              {numberFormat?.type === 'currency' && (
                <span
                  className={`input-prefix ${
                    customClass === 'error' || classType === 'error'
                      ? 'prefix-error'
                      : customClass === 'focus'
                      ? 'prefix-active'
                      : ''
                  }`}
                >
                  {numberFormat?.currencySymbol}
                </span>
              )}

              {type === 'password' && inputValue !== '' && (
                <Button as='unstyled' onClick={togglePassword}>
                  <Icon
                    icon={
                      inputType === 'password' ? 'eyeglassesNo' : 'eyeglasses'
                    }
                    size='20px'
                    customClass={styles.iconStyle}
                  />
                </Button>
              )}
              <ConditionalWrapper
                condition={Boolean(endText)}
                wrapper={(children) => (
                  <div className={styles.conditionalWrapperFlex}>
                    {children}
                  </div>
                )}
              >
                <>
                  <input
                    id={id}
                    ref={ref as ForwardedRef<HTMLInputElement>}
                    type={inputType ? inputType : 'text'}
                    value={inputValue}
                    onBlur={(e) => onBlur(e.target.value)}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    required={required}
                    className={`${classes}${endText ? ' end-input' : ''} ${
                      numberFormat?.type === 'currency' ? 'currency-input' : ''
                    }`}
                    onKeyUp={(e) => handleKeyUp(e)}
                    onChange={(e) => setValue(e.target.value)}
                    min={min}
                    max={max}
                    onWheel={(e) =>
                      noScrollForNumbers && e.currentTarget.blur()
                    }
                    maxLength={maxLength}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete || 'on'}
                    readOnly={readOnly}
                    step={step}
                    onKeyDown={(e) => {
                      if (
                        noArrowKeyNumberChange &&
                        inputType === 'number' &&
                        ARROW_KEY_VALUES.includes(e.key.toLowerCase())
                      ) {
                        e.preventDefault()
                      }
                    }}
                  />
                  {endText && (
                    <input
                      type='text'
                      className={`end-text ${classes}`}
                      value={endText}
                      disabled
                    />
                  )}
                  {inputLabel && (
                    <span
                      className={`${
                        numberFormat?.type === 'percentage'
                          ? 'input-suffix'
                          : 'input-label'
                      } ${
                        customClass === 'error'
                          ? 'prefix-error'
                          : customClass === 'focus'
                          ? 'prefix-active'
                          : ''
                      }`}
                      ref={inputLabelRef}
                    >
                      {inputLabel}
                    </span>
                  )}
                  {clear && !disabled && (
                    <span
                      className={`${
                        styles.clearInputValue
                      } animated clear-button gray ${
                        inputValue ? 'fadeIn visible' : ''
                      }`}
                      onClick={clearValue}
                    >
                      Clear
                    </span>
                  )}
                </>
              </ConditionalWrapper>
            </div>
          </>
        )}
        {(customClass === 'error' || classType === 'error') && errorText && (
          <div className={styles.errorTextStyle}>{errorText}</div>
        )}
      </div>
    )
  }
)

export default TextInput
