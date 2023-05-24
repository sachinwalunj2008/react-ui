export type BulkActionsDispayContentProps = {
    children: (params: {
        closeMenu: () => void;
    }) => void;
};
declare const CustomDisplayContent: ({ children, }: BulkActionsDispayContentProps) => JSX.Element;
export default CustomDisplayContent;
