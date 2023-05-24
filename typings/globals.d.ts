declare module '*.module.scss'
declare module 'react-sticky-table'

interface Window {
  frontendLocalStoragePrefix: string
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}
