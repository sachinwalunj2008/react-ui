import { useState } from 'react'

export function useTableCheckboxes<DataGeneric>(data?: DataGeneric[]): {
  checkAll: boolean
  setCheckAll: (checkAll: boolean) => void
  selectedBoxes: DataGeneric[]
  setSelectedBoxes: React.Dispatch<React.SetStateAction<DataGeneric[]>>
  unselectedBoxes: DataGeneric[]
  setUnselectedBoxes: React.Dispatch<React.SetStateAction<DataGeneric[]>>
} {
  const [checkAll, setCheckAll] = useState(false),
    [selectedBoxes, setSelectedBoxes] = useState<DataGeneric[]>([]),
    [unselectedBoxes, setUnselectedBoxes] = useState<DataGeneric[]>(data || [])
  return {
    checkAll,
    setCheckAll,
    selectedBoxes,
    setSelectedBoxes,
    unselectedBoxes,
    setUnselectedBoxes,
  }
}
