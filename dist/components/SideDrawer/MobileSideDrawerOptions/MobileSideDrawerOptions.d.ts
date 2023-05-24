import { IconStringList } from '../../Icons/Icon';
type CommonOption = {
    /** We require a label to be a part of the Option object so we can display the label. */
    label: string;
    /** We need a link to be a part of the Option object if the rows navigate pages. */
    link?: string;
    /** Used if the option needs an `Icon`. */
    icon?: {
        name: IconStringList;
        width?: string;
        height?: string;
    };
};
type BaseOption<Option extends CommonOption> = CommonOption & {
    /** The subtabs associated with a specific tab. */
    subrows?: Option[];
};
type MobileSideDrawerOptionsProps<Option extends BaseOption<Option>> = {
    /** An array of Option objects. This is a generic and can be anything. The only thing we require for sure is a `label`. */
    options: Option[];
    /** Callout function that passes back the Option object. */
    callout: (option: Option) => void;
    /** The option that is currently selected. This will be matched up with the `label` from the Option object. */
    activeRow: Option['label'];
    /** This is needed if we have sub rows that navigate pages. It will help us to determine the active sub row. */
    currentPage?: string;
};
declare const MobileSideDrawerOptions: <Option extends BaseOption<Option>>({ options, callout, activeRow, currentPage, }: MobileSideDrawerOptionsProps<Option>) => JSX.Element;
export default MobileSideDrawerOptions;
