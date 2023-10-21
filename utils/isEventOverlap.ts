import momento from "./formatDate";

export default function isEventOverlap(
  novoEvento: any[],
  eventos: any[]
): boolean {
  if (!eventos || !novoEvento) {
    return false;
  }
  for (const horarioNovoEvento of novoEvento) {
    for (const evento of eventos) {
      var [eventoInicio, eventoFim] = evento;
      var [horarioInicio, horarioFim] = horarioNovoEvento;
      eventoInicio = momento(eventoInicio);
      eventoFim = momento(eventoFim);
      horarioInicio = momento(horarioInicio);
      horarioFim = momento(horarioFim);

      if (eventoFim.isSame(horarioFim) && eventoInicio.isSame(horarioInicio)) {
        return true;
      }
      if (
        horarioInicio.isBefore(eventoInicio) &&
        horarioFim.isSame(eventoFim)
      ) {
        return true;
      }

      eventoInicio.add("1", "minute");
      horarioInicio.add("1", "minute");

      if (
        (horarioInicio.isAfter(eventoInicio) &&
          horarioInicio.isBefore(eventoFim)) ||
        (horarioFim.isAfter(eventoInicio) && horarioFim.isBefore(eventoFim))
      ) {
        return true; // O novo evento está entre os horários de um evento existente
      }
    }
  }

  return false; // O novo evento não está entre os horários de nenhum evento existente
}
