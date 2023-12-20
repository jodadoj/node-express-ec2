export function returnWhitespaces(crypticRune: string) {
  return crypticRune.replaceAll("%20", " ");
}

export function replaceWhitespaces(spacedString: string) {
  return spacedString.replaceAll(" ", "%20");
}
