export function getEnvironmentName():
  | 'development'
  | 'stage'
  | 'demo'
  | 'production' {
  if (
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  )
    return 'development'

  if (
    window.location.hostname.includes('staging--') ||
    window.location.hostname.includes('-staging.com') ||
    window.location.hostname.includes('netlify.com') ||
    window.location.hostname.includes('netlify.app') ||
    window.location.hostname.includes('-stage.pattern.com')
  ) {
    return 'stage'
  }

  if (window.location.hostname.includes('demo')) {
    return 'demo'
  }

  return 'production'
}

export function getApiUrlPrefix(backendToOverride = 'server'): string {
  const localOverride = localStorage.getItem(
    `localBackendOverride:${backendToOverride}`
  )
  if (localOverride) return localOverride

  switch (getEnvironmentName()) {
    case 'development':
    case 'stage':
      return `/staging-${backendToOverride}`
    case 'demo':
      return `/demo-${backendToOverride}`

    default:
      return `/${backendToOverride}`
  }
}
