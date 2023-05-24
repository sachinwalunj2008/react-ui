import { IconStringList } from '../../module';
type PopoverHeaderBase = {
    /** Determines the color of the background and icon. */
    styleType?: 'lighter-gray' | 'green' | 'red' | 'blue';
    /** Optional function to call when using the close button. */
    closeCallout?: () => void;
    /** Optional icon to include at the left of the header. */
    icon?: IconStringList;
    /** Optionally remove the border radius at the top. Should be used for instances like `SideDrawer` */
    noBorderRadius?: boolean;
};
type PopoverHeaderWithText = PopoverHeaderBase & {
    /** Text for the header. This is required if a `logoUrl` is not present. */
    headerText: string;
    logoUrl?: never;
};
type PopoverHeaderWithLogo = PopoverHeaderBase & {
    headerText?: never;
    /** Logo for the header. This is required if a `headerText` is not present. */
    logoUrl: string;
};
type PopoverHeaderProps = PopoverHeaderWithText | PopoverHeaderWithLogo;
declare const PopoverHeader: ({ headerText, icon, styleType, closeCallout, noBorderRadius, logoUrl, }: PopoverHeaderProps) => JSX.Element;
export default PopoverHeader;
