/**
 * capitalize first letter of a string
 * @param str input string
 * @returns capitalized string
 */
export default function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
