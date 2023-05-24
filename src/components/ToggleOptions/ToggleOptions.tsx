import React from 'react'
import { hasValue } from '../../module'
import FormLabel from '../FormLabel/FormLabel'
import { TooltipProps } from '../Tooltip/Tooltip'
import styles from './_toggle-options.module.scss'

export default function ToggleOptions<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>,
  StateGeneric
>({
  options,
  state,
  callout,
  stateName,
  customClass,
  valuesAreBooleans,
  disabled,
}: StateAndStateNameProps<OptionGeneric, StateGeneric>): JSX.Element

export default function ToggleOptions<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>,
  StateGeneric
>({
  options,
  selected,
  callout,
  customClass,
  valuesAreBooleans,
  disabled,
}: SelectedProps<OptionGeneric, StateGeneric>): JSX.Element

export default function ToggleOptions<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>,
  StateGeneric
>({
  options,
  selected,
  state,
  callout,
  stateName,
  customClass,
  valuesAreBooleans = false,
  disabled = false,
  required,
  labelText,
  rightLabel,
  labelTooltip,
  noBorder,
}: ToggleProps<OptionGeneric, StateGeneric>): JSX.Element {
  const inlineStyles = {
    '--options-length': options.length,
  } as React.CSSProperties
  return (
    <div>
      {labelText && (
        <FormLabel
          label={labelText}
          tooltip={labelTooltip}
          required={required}
          rightLabel={rightLabel}
        />
      )}
      <div
        data-id='toggle-container'
        className={`${styles.container} ${customClass || ''} ${
          disabled ? 'disabled' : ''
        } ${noBorder ? styles.noBorder : ''}`}
        style={inlineStyles}
      >
        {options.map((e, i) => {
          return (
            <div
              data-id='toggle-button'
              key={e.text ?? e.id ?? i}
              className={`${styles.button} ${
                valuesAreBooleans
                  ? e.value === selected
                    ? styles.active
                    : ''
                  : e.value ===
                    (selected ||
                      (state as Record<string | number, unknown>)?.[
                        stateName ?? ''
                      ])
                  ? styles.active
                  : ''
              }`}
              onClick={() => {
                if (hasValue(selected)) {
                  const actualCallout = callout as SelectedPropsCallout<
                    OptionGeneric['value']
                  >
                  actualCallout(e.value)
                } else {
                  const actualCallout = callout as StateAndStateNameCallout<
                    OptionGeneric['value']
                  >
                  actualCallout(stateName ?? '', e.value)
                }
              }}
              data-text={e.text}
            >
              <span className={styles.toggleOption}>{e.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// pass in an array of options to select that will be mapped out and styled for you - then pass in what value is currently selected in state or pass in a state object w/ fieldName and the component will show that option as selected - state needs to be managed outside of this component and in the file you are consuming it in.
interface RequiredOptionKeys<ValueTypeGeneric> {
  id?: number
  text?: string
  value: ValueTypeGeneric
}

type Selected = string | number | boolean

type ToggleBaseProps<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>
> = {
  options: OptionGeneric[]
  customClass?: string
  valuesAreBooleans?: boolean
  disabled?: boolean
  labelText?: string
  rightLabel?: React.ReactNode
  labelTooltip?: Omit<TooltipProps, 'children'>
  required?: boolean
  noBorder?: boolean
}

type StateAndStateNameCallout<Param2Generic> = (
  param1: string,
  param2: Param2Generic
) => void

// if you use state, then it and stateName are both required.
type StateAndStateNameProps<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>,
  StateGeneric
> = ToggleBaseProps<OptionGeneric> & {
  state: StateGeneric
  stateName: string
  selected?: Selected
  callout: StateAndStateNameCallout<OptionGeneric['value']>
}

type SelectedPropsCallout<Param1Generic> = (param1: Param1Generic) => void
// if you use selected, then it's required... unless there isn't anything selected yet. Then it's optional
type SelectedProps<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>,
  StateGeneric
> = ToggleBaseProps<OptionGeneric> & {
  state?: StateGeneric
  stateName?: string
  selected?: Selected
  callout: SelectedPropsCallout<OptionGeneric['value']>
}

type ToggleProps<
  OptionGeneric extends RequiredOptionKeys<OptionGeneric['value']>,
  StateGeneric
> =
  | SelectedProps<OptionGeneric, StateGeneric>
  | StateAndStateNameProps<OptionGeneric, StateGeneric>

// here's an example of passed in options
// [
//   { id: 0, text: 'SNOWBOARDING', value: 'SNOWBOARDING' },
//   { id: 1, text: 'SKIING', value: 'SKIING' },
// ]

// selected value could be - 'SNOWBOARDING'
// or if state obj and stateName i.e. key value pair - {preferred_method: 'SNOWBOARDING'} and would // statifsy component
