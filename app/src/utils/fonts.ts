export const TITLE_FONT = "Bangers";
export const BODY_FONT = "Open Sans";

/**
 * Generate a font family CSS property with fallbacks.
 * The primary font will be the name of the font passed.
 */
export const generateFonts = (name: string) =>
  [name, '"Helvetica Neue"', "Arial", "sans-serif"].join(",");
