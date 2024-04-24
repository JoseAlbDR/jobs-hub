export const getBackgroundColor = (theme:string|undefined) => {
    if (theme === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      return theme === 'light' ? 'light' : 'dark';
    }
  };