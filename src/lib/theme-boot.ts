// Server-safe theme constants (no React imports): the root layout uses these.

export const THEME_KEY = "computability-mocks:theme";

/**
 * Runs in <head> before the page paints, so a saved theme never flashes.
 * Keep in sync with applyTheme in ./theme.ts.
 */
export const THEME_BOOT_SCRIPT = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="sepia"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
