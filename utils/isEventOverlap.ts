export default function isEventOverlap(
  novoEvento: any[],
  eventos: any[]
): boolean {
  for (const horarioNovoEvento of novoEvento) {
    for (const evento of eventos) {
      const [eventoInicio, eventoFim] = evento;
      const [horarioInicio, horarioFim] = horarioNovoEvento;

      if (
        (horarioInicio >= eventoInicio && horarioInicio <= eventoFim) ||
        (horarioFim >= eventoInicio && horarioFim <= eventoFim) ||
        (horarioFim <= eventoFim && horarioInicio >= eventoInicio) ||
        (horarioFim >= eventoFim && horarioInicio <= eventoInicio)
      ) {
        return true; // O novo evento está entre os horários de um evento existente
      }
    }
  }

  return false; // O novo evento não está entre os horários de nenhum evento existente
}
