export default Select
declare function Select({
  name,
  optionKeyName,
  options,
  labelText,
  rightLabel,
  customClass,
  isError,
  searchBar,
  optGroup,
  optGroupSections,
  optGroupingKey,
  position,
  clickText,
  onClick,
  defaultText,
  verticalDisplay,
  offset,
  disabled,
  selectedItem,
  secondaryValue,
  viewItem,
  secondaryValuePosition,
  onChange,
  stateName,
  ignoredValues,
  noOptionsText,
  selectAllItem,
  selectAllPrefix,
  selectAllSuffix,
  onBlurCallout,
  required,
  stationary,
  loading,
  dropdownClassName,
  onSearchChange,
  header,
  secondaryHeader,
  highlightMatchText,
  fieldToMatch,
  isOpen,
  mobilePopover,
  mobileMenuHeaders,
  onOpenChange,
  clickTextCustomClass,
  animationType,
  autoFocus,
  noSplitValueDivider,
  keyValue,
  viewItemText,
  popoverCustomStyles,
  labelTooltip,
}: {
  name: any
  optionKeyName: any
  options: any
  labelText: any
  rightLabel: any
  customClass: any
  isError: any
  searchBar: any
  optGroup: any
  optGroupSections: any
  optGroupingKey: any
  position: any
  clickText: any
  onClick: any
  defaultText: any
  verticalDisplay: any
  offset: any
  disabled: any
  selectedItem: any
  secondaryValue: any
  viewItem: any
  secondaryValuePosition: any
  onChange: any
  stateName: any
  ignoredValues: any
  noOptionsText: any
  selectAllItem: any
  selectAllPrefix: any
  selectAllSuffix: any
  onBlurCallout: any
  required: any
  stationary: any
  loading: any
  dropdownClassName?: string | undefined
  onSearchChange: any
  header?: string | undefined
  secondaryHeader?: string | undefined
  highlightMatchText?: string | undefined
  fieldToMatch: any
  isOpen: any
  mobilePopover?: boolean | undefined
  mobileMenuHeaders: any
  onOpenChange: any
  clickTextCustomClass: any
  animationType: any
  autoFocus: any
  noSplitValueDivider: any
  keyValue?: string | undefined
  viewItemText?: string | undefined
  popoverCustomStyles?: {} | undefined
  labelTooltip: any
}): JSX.Element
declare namespace Select {
  namespace propTypes {
    const name: PropTypes.Validator<string>
    const optionKeyName: PropTypes.Validator<string>
    const options: PropTypes.Validator<any[]>
    const labelText: PropTypes.Requireable<string>
    const customClass: PropTypes.Requireable<string>
    const isError: PropTypes.Requireable<boolean>
    const searchBar: PropTypes.Requireable<boolean>
    const position: PropTypes.Requireable<string>
    const clickText: PropTypes.Requireable<any>
    const defaultText: PropTypes.Requireable<any>
    const verticalDisplay: PropTypes.Requireable<string>
    const offset: PropTypes.Requireable<number>
    const disabled: PropTypes.Requireable<boolean>
    const selectedItem: PropTypes.Requireable<
      NonNullable<string | number | boolean | object | null | undefined>
    >
    const secondaryValue: PropTypes.Requireable<any>
    const secondaryValuePosition: PropTypes.Requireable<string>
    const onChange: PropTypes.Validator<(...args: any[]) => any>
    const onClick: PropTypes.Requireable<(...args: any[]) => any>
    const onSearchChange: PropTypes.Requireable<(...args: any[]) => any>
    const stateName: PropTypes.Requireable<string>
    const ignoredValues: PropTypes.Requireable<any>
    const noOptionsText: PropTypes.Requireable<string>
    const selectAllItem: PropTypes.Requireable<any>
    const selectAllPrefix: PropTypes.Requireable<string>
    const selectAllSuffix: PropTypes.Requireable<string>
    const onBlurCallout: PropTypes.Requireable<(...args: any[]) => any>
    const required: PropTypes.Requireable<boolean>
    const stationary: PropTypes.Requireable<boolean>
    const loading: PropTypes.Requireable<boolean>
    const optGroup: PropTypes.Requireable<boolean>
    const optGroupSections: PropTypes.Requireable<any[]>
    const optGroupingKey: PropTypes.Requireable<string>
    const viewItem: PropTypes.Requireable<(...args: any[]) => any>
    const header: PropTypes.Requireable<string>
    const secondaryHeader: PropTypes.Requireable<string>
    const highlightMatchText: PropTypes.Requireable<string>
    const fieldToMatch: PropTypes.Requireable<string>
    const isOpen: PropTypes.Requireable<boolean>
    const onOpenChange: PropTypes.Requireable<(...args: any[]) => any>
    const clickTextCustomClass: PropTypes.Requireable<string>
    const animationType: PropTypes.Requireable<string>
    const autoFocus: PropTypes.Requireable<boolean>
    const noSplitValueDivider: PropTypes.Requireable<boolean>
    const mobilePopover: PropTypes.Requireable<boolean>
    const mobileMenuHeaders: PropTypes.Requireable<(...args: any[]) => any>
    const labelTooltip: PropTypes.Requireable<(...args: any[]) => any>
    const rightLabel: PropTypes.Requireable<PropTypes.ReactNodeLike>
  }
}
import PropTypes from 'prop-types'
