import momento from "./formatDate";

export default function isselectEventverlap(
  newEvent: any[],
  selectEvents: any[]
): boolean {
  if (!selectEvents || !newEvent) {
    return false;
  }
  for (const timeGapNewEvent of newEvent) {
    var [beginHourNewEvent, finishHourNewEvent] = timeGapNewEvent;
    for (const selectEvent of selectEvents) {
      var [beginHourSelectEvent, finishHourSelectEvent] = selectEvent;
      //Transforma as datas em objetos do tipo Moment
      beginHourSelectEvent = momento(beginHourSelectEvent);
      finishHourSelectEvent = momento(finishHourSelectEvent);
      beginHourNewEvent = momento(beginHourNewEvent);
      finishHourNewEvent = momento(finishHourNewEvent);

      //Verifica se o novo evento começa ou termina no mesmo horário de um evento existente
      if (finishHourSelectEvent.isSame(finishHourNewEvent)) return true;
      if (beginHourSelectEvent.isSame(beginHourNewEvent)) return true;

      //Verifica se o novo evento começa antes e termina ao mesmo tempo que um evento existente
      if (
        beginHourNewEvent.isBefore(beginHourSelectEvent) &&
        finishHourNewEvent.isSame(finishHourSelectEvent)
      ) {
        return true;
      }
      //Adiciona 1 minuto ao horário de início do novo evento para verificar se ele termina no mesmo horário de um evento existente
      beginHourSelectEvent.add("1", "minute");
      beginHourNewEvent.add("1", "minute");

      if (
        beginHourNewEvent.isAfter(beginHourSelectEvent) &&
        beginHourNewEvent.isBefore(finishHourSelectEvent)
      ) {
        return true; // O novo selectEvent está entre os horários de um selectEvent existente
      }
      if (
        finishHourNewEvent.isAfter(beginHourSelectEvent) &&
        finishHourNewEvent.isBefore(finishHourSelectEvent)
      ) {
        return true;
      }
    }
  }

  return false; // O novo selectEvent não está entre os horários de nenhum selectEvent existente
}
