/** Returns the value of the environment variable with the given key
 * or else throws an error.
 *
 * @param variable_name the name of environment variable to find
 * @returns the value of the environment variable (or throws error)
 */
export function configEnv(variable_name: string): string {
  const val = process.env[variable_name];
  if (val === undefined) {
    throw new Error("Missing expected environment variable: " + variable_name);
  }
  return val;
}
