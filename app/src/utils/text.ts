/**
 * Generates the correct form of a word based on an amount.
 * If no plural is given, an `s` is appended to the singular version.
 * @param word the word in singular form
 * @param number the number of items
 * @param plural the plural form of the word
 */
export const pluralise = (word: string, number: number, plural?: string) => {
  if (number === 1) return word;
  else {
    if (plural) return plural;
    return word + "s";
  }
};

/**
 * Returns the word with the first letter capitalised.
 * @param word the word to capitalise.
 */
export const capitalise = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};
