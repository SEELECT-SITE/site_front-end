import { EventProps } from "@/pages/api/auth/nextauth";
import momento from "@/utils/formatDate";
import isEventOverlap from "@/utils/isEventOverlap";

const workshopLimit = process.env.NEXT_PUBLIC_WORKSHOP_LIMIT;
export default function isEventDisable(
  event: EventProps, // O evento atual que está sendo verificado
  eventDates: any, // Datas associadas ao evento
  selectEvents: any, // Eventos já selecionados pelo usuário
  eventsTimePicked: any, // Horários dos eventos que já foram selecionados
  kit: any, // Informações do kit, incluindo limites de workshops e palestras
  numberOfSelectedSpeeches: number, // Número de palestras selecionadas
  numberOfSelectWorkshops: number // Número de workshops/minicursos selecionados
) {
  //Esta condição foi comentada. Ela verificaria se a data atual (momento) é posterior
  //à primeira data do evento, desabilitando o evento se ele já começou.
  if (!momento().isAfter(eventDates[0][0])) {
    return true;
  }

  // Verifica se o evento já está na lista de eventos selecionados
  if (selectEvents.includes(event.id)) return false;

  // Verifica se o evento se sobrepõe com algum dos eventos já selecionados no horário
  if (isEventOverlap(eventDates, eventsTimePicked)) return true;

  // Verifica se o título do evento contém "$patrocinador", o que significa que é um evento patrocinado
  if (event.title.split("$")[1] == "patrocinador") return false;
  // Nesse caso, o evento patrocinado não é desabilitado

  // Verifica se o número de workshops ou minicursos selecionados já atingiu o limite permitido pelo kit
  // Se o limite foi atingido e o evento atual é um workshop ou minicurso, ele será desabilitado
  const workshopLimit_ = parseInt(workshopLimit ?? "3");
  if (
    numberOfSelectWorkshops >= workshopLimit_ &&
    ["workshop", "minicurso"].includes(event.category)
  ) {
    return true;
  }

  // Condição comentada que verificaria se o kit permite selecionar todas as palestras (kit.all_speeches),
  // e se o número de palestras selecionadas já atingiu o limite de 1. Se sim, o evento seria desabilitado.
  //if (/* !kit.all_speeches && */ numberOfSelectedSpeeches >= 1) return true;

  // Se nenhuma das condições anteriores for satisfeita, o evento permanece habilitado (retorna false)
  return false;
}
