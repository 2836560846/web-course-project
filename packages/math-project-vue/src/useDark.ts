export function useDark() {
  function enableDarkMode() {
    document.documentElement.classList.toggle('dark', true)
    localStorage.setItem('color-scheme', 'dark')
  }

  function disableDarkMode() {
    document.documentElement.classList.toggle('dark', false)
    localStorage.setItem('color-scheme', 'light')
  }

  function applySavedTheme() {
    const saved = localStorage.getItem('color-scheme')
    if (saved === 'dark') enableDarkMode()
    else if (saved === 'light') disableDarkMode()
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      prefersDark ? enableDarkMode() : disableDarkMode()
    }
  }

  return { enableDarkMode, disableDarkMode, applySavedTheme }
}