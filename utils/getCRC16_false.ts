export default function getCRC16_false(
  data: string,
  offset: number,
  length: number
): string {
  if (
    data == null ||
    offset < 0 ||
    offset > data.length - 1 ||
    offset + length > data.length
  ) {
    return "0";
  }

  let crc = 0xffff;
  for (let i = 0; i < length; ++i) {
    crc ^= data.charCodeAt(offset + i) << 8;
    for (let j = 0; j < 8; ++j) {
      crc = (crc & 0x8000) > 0 ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  var aux = crc & 0xffff;
  var aux_2 = (aux & 0xffff).toString(16).toUpperCase();
  var correct_vector = [];
  for (var i = 0; i < 4; i++) {
    if (aux_2[i]) {
      correct_vector.push(`${aux_2[i]}`);
    } else {
      correct_vector.push("0");
    }
  }
  return correct_vector.join("");
}
