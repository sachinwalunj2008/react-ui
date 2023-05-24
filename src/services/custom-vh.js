function getOrientation() {
  return window.innerHeight / window.innerWidth > 1 ? 'portrait' : 'landscape'
}
let currentOrientation

function setCustomVh() {
  const fullVh = window.innerHeight
  document.documentElement.style.setProperty(
    '--vh',
    `${(fullVh * 0.01).toFixed(2)}px`
  )
  // since 100vh is a very common use case, predefine this so people using 100vh don't have to do:
  // calc(var(--vh) * 100);
  // and instead do:
  // var(--vh100);
  document.documentElement.style.setProperty(
    '--100vh',
    `${fullVh.toFixed(2)}px`
  )

  currentOrientation = getOrientation()
}
// set the initial value
setCustomVh()

// watch for orientation changes (vertical to horizontal) only - not for size changes since that causes jank as mobile browsers scroll
let debounceId
function debouncedResize() {
  if (currentOrientation === getOrientation()) {
    return
  }
  if (debounceId) {
    clearTimeout(debounceId)
  }
  debounceId = setTimeout(setCustomVh, 100)
}

window.addEventListener('resize', debouncedResize)
