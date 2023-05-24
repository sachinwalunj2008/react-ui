/// <reference types="react" />
export declare function useTableCheckboxes<DataGeneric>(data?: DataGeneric[]): {
    checkAll: boolean;
    setCheckAll: (checkAll: boolean) => void;
    selectedBoxes: DataGeneric[];
    setSelectedBoxes: React.Dispatch<React.SetStateAction<DataGeneric[]>>;
    unselectedBoxes: DataGeneric[];
    setUnselectedBoxes: React.Dispatch<React.SetStateAction<DataGeneric[]>>;
};
