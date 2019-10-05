/**
 * Converts string into snake-case.
 *
 * @see https://regex101.com/r/QeSm2I/1
 */
export const snakeCase = (str: string) => {
  return str
    .replace(/(?:([a-z])([A-Z]))|(?:((?!^)[A-Z])([a-z]))/g, '$1_$3$2$4')
    .toLowerCase();
};

/**
 * Converts string into camelCase.
 *
 * @see http://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
 */
export const camelCase = (
  str: string,
  firstCapital: boolean = false,
): string => {
  return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2, offset) => {
    if (firstCapital === true && offset === 0) {
      return p1;
    }
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
};
