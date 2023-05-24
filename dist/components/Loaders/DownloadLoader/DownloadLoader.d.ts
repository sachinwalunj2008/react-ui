import { IconStringList } from '../../../module';
type DownloadLoaderProps = {
    /** Optionally change the icon */
    customIcon?: IconStringList;
    /** Optional className */
    customClass?: string;
};
declare const DownloadLoader: ({ customIcon, customClass, }: DownloadLoaderProps) => JSX.Element;
export default DownloadLoader;
