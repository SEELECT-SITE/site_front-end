import getCRC16IBM47 from "./getCRC16IBM47";

export default function generatePix(
  pixCode: string,
  name: string,
  city: string,
  value: string,
  identificador: string
): string {
  // Define constants for limits and formatting
  const nameLimit = 25;

  // Format name by limiting its length and removing special characters
  const nameFormatted = name
    .substring(0, nameLimit)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Helper function to format lengths with leading zeros
  const formatLength = (input: string): string =>
    input.length <= 9 ? "0" + input.length : String(input.length);

  // Helper function to format data blocks
  const formatDataBlock = (id: string, content: string): string =>
    `${id}${formatLength(content)}${content}`;

  // Construct the PIX payload using helper functions
  const pixPayload = [
    "000201",
    `26${22 + pixCode.length}`, // BR.GOV.BCB.PIX segment
    formatDataBlock("00", "BR.GOV.BCB.PIX"),
    formatDataBlock("01", pixCode.toUpperCase()),
    "52040000", // Merchant category code (default to 0000)
    "5303986", // Currency (986 for BRL)
    formatDataBlock("54", value),
    "5802BR", // Country code
    formatDataBlock("59", nameFormatted),
    formatDataBlock("60", city),
    formatDataBlock("62", `05${formatLength(identificador)}${identificador}`),
    "6304", // CRC16 placeholder
  ].join("");

  // Append CRC16 checksum to the payload
  return pixPayload + getCRC16IBM47(pixPayload, 0, pixPayload.length);
}
