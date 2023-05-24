import iconsList from './iconsList';
export type IconStringList = keyof typeof iconsList;
export type IconProps = {
    /** Name of the Icon from the IconStringList */
    icon: IconStringList;
    /** Optional class */
    customClass?: string;
    /** Optional size of the Icon - default is 20px */
    size?: string | {
        height: string;
        width: string;
    };
};
declare const Icon: ({ icon, customClass, size, }: IconProps) => JSX.Element;
export default Icon;
