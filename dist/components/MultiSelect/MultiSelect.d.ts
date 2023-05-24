export default MultiSelect;
/**
 * @deprecated This component does not support the most recent requirements and designs. It should not be used. Use MultipleSelection.
 **/
declare function MultiSelect({ clickText, checkedItems, callout, options, wrapperCustomClass, dropdownClassName, showCheckAllBox, allCallout, label, optionKeyName, dropdownLabel, disabledItems, popoverPosition, optGroup, optGroupSections, selectType, searchBar, searchBarPlaceholder, checkAllCustomClass, secondaryValue, noOptionsMessage, noResultsMessage, disabledCheckAll, }: {
    clickText: any;
    checkedItems: any;
    callout: any;
    options: any;
    wrapperCustomClass?: string | undefined;
    dropdownClassName?: string | undefined;
    showCheckAllBox?: boolean | undefined;
    allCallout: any;
    label: any;
    optionKeyName: any;
    dropdownLabel?: null | undefined;
    disabledItems: any;
    popoverPosition?: string | undefined;
    optGroup: any;
    optGroupSections: any;
    selectType: any;
    searchBar: any;
    searchBarPlaceholder?: string | undefined;
    checkAllCustomClass?: string | undefined;
    secondaryValue?: string | undefined;
    noOptionsMessage?: string | undefined;
    noResultsMessage?: string | undefined;
    disabledCheckAll: any;
}): JSX.Element;
declare namespace MultiSelect {
    namespace propTypes {
        const allCallout: PropTypes.Requireable<(...args: any[]) => any>;
        const checkAllCustomClass: PropTypes.Requireable<string>;
        const checkedItems: PropTypes.Requireable<any[]>;
        const callout: PropTypes.Requireable<(...args: any[]) => any>;
        const clickText: PropTypes.Requireable<any>;
        const disabledCheckAll: PropTypes.Requireable<boolean>;
        const disabledItems: PropTypes.Requireable<any[]>;
        const dropdownClassName: PropTypes.Requireable<string>;
        const dropdownLabel: PropTypes.Requireable<any>;
        const label: PropTypes.Requireable<boolean>;
        const optGroup: PropTypes.Requireable<boolean>;
        const optGroupSections: PropTypes.Requireable<any>;
        const optionKeyName: PropTypes.Requireable<string>;
        const options: PropTypes.Requireable<any[]>;
        const popoverPosition: PropTypes.Requireable<string>;
        const searchBar: PropTypes.Requireable<boolean>;
        const selectType: PropTypes.Requireable<string>;
        const showCheckAllBox: PropTypes.Requireable<boolean>;
        const wrapperCustomClass: PropTypes.Requireable<string>;
    }
}
import PropTypes from "prop-types";
