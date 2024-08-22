import getCRC16_false from "./getCRC16_false";

export default function generatePix(
  codePix: string,
  name: string,
  city: string,
  value: string,
  identificador: string,
): string {
  /* https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf */

  const pixPayload = `00020126${22 + codePix.length}0014BR.GOV.BCB.PIX01${
    codePix.length <= 9 ? "0" + codePix.length : codePix.length
  }${codePix}52040000530398654${
    value.length <= 9 ? "0" + value.length : value.length
  }${value}5802BR59${
    name.length <= 9 ? "0" + name.length : name.length
  }${name}60${city.length <= 9 ? "0" + city.length : city.length}${city}62${
    ("0500" + identificador).length
  }05${
    identificador.length <= 9
      ? "0" + identificador.length
      : identificador.length
  }${identificador}6304`;

  return pixPayload + getCRC16_false(pixPayload, 0, pixPayload.length);
}
