
export function configEnv(variable_name: string): string {
  const val = process.env[variable_name];
  if (val === undefined) {
    throw new Error("Missing expected environment variable: " + variable_name);
  }
  return val;
}
