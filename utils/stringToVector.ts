export default function stringToVector(stringDoBackend: string) {
  // Verifique se a string está no formato esperado
  if (stringDoBackend.startsWith("[") && stringDoBackend.endsWith("]")) {
    const trimmedString = stringDoBackend.slice(1, -1).trim();
    const substrings = trimmedString.split(", ");
    const vetor = substrings.map((item) => item.replace(/'/g, ""));

    return vetor;
  } else {
    return ["error"];
  }
}
