export function reducer(state: any, action: any): any
export function inputHandler(
  dispatcher: any,
  name: any,
  value: any,
  localStorageName: any,
  type?: string
): void
export function percentageString(
  percent: any,
  decimalScale: any,
  csvString: any
): string
export function currencyFormat(value: any, toFixed: any): string
export function currencyString(value: any): string
export function aggregateDatapoints(data: any, propName: any): any
export function replaceSymbol(
  text: any,
  joinOption: any,
  splitSymbol: any,
  keepCasing: any
): any
export function createPageName(page: any): any
export function propertyToSort(
  property: any,
  bool: any
): (a: any, b: any) => 1 | 0 | -1 | undefined
export function sortFilter(array: any, prop: any, bool: any): any
export function gridPropertyToSort(
  property: any,
  bool: any
): (a: any, b: any) => 1 | 0 | -1 | undefined
export function gridSortFilter(array: any, prop: any, bool: any): any
export function sortNestedObj(arr: any, prop: any, bool: any): any
export function getActiveTab(tabsArr: any, path: any): number
export function errorCheck(errorCode: any, callback: any, value?: string): void
export function formValidation(formObj: any, exclude: any): boolean
export function stopEvents(evt: any): void
export const dateFormatString: 'MMM DD, YYYY @ hh:mm A'
export function formatDimensions(
  length: any,
  width: any,
  height: any,
  dimension: any
): string
export function formatWeight(weight: any, dimension: any): string
export function reduceAndOrAverage(
  arr: any,
  prop: any,
  totalToDivideBy: any,
  extras: any
): string
export function chunk(array: any, size: any): any[][]
