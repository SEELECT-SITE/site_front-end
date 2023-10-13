import getCRC16_false from "./getCRC16_false";

export default function generatePix(
  codePix: string,
  name: string,
  city: string,
  value: string,
  id: string
): string {
  const pixPayload = `00020126${22 + codePix.length}0014br.gov.bcb.pix01${
    codePix.length <= 9 ? "0" + codePix.length : codePix.length
  }${codePix}52040000530398654${
    value.length <= 9 ? "0" + value.length : value.length
  }${value}5802BR59${
    name.length <= 9 ? "0" + name.length : name.length
  }${name}60${
    city.length <= 9 ? "0" + city.length : city.length
  }${city}62110507userID${id}62070503***6304`;

  return pixPayload + getCRC16_false(pixPayload, 0, pixPayload.length);
}
