import { useContext } from 'react'
import { ToggleProviderContext } from '../../components/ToggleProvider/ToggleProvider'

/**
 * Check if a toggle exists and is enabled (within the distribution/environment set by `ToggleProvider`)
 *
 * @param toggleKeyToCheck The key of the toggle to check
 * @returns true if the given `toggleKeyToCheck` exists and is enabled for that distribution/environment
 */
export const useToggle = (toggleKeyToCheck: string): boolean => {
  const { toggles } = useContext(ToggleProviderContext)

  const storageSetting = localStorage.getItem(toggleKeyToCheck)

  return !toggles || !Array.isArray(toggles)
    ? false
    : toggles.some((toggle) => {
        if (toggle.key === toggleKeyToCheck) {
          return storageSetting ? storageSetting === 'true' : toggle.enabled
        }
        return false
      })
}
