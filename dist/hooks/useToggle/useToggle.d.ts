/**
 * Check if a toggle exists and is enabled (within the distribution/environment set by `ToggleProvider`)
 *
 * @param toggleKeyToCheck The key of the toggle to check
 * @returns true if the given `toggleKeyToCheck` exists and is enabled for that distribution/environment
 */
export declare const useToggle: (toggleKeyToCheck: string) => boolean;
