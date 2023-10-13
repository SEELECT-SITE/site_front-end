export default function isEventOverlap(eventA: any, eventB: any) {
  const startA = new Date(eventA.startTime);
  const endA = new Date(eventA.endTime);
  const startB = new Date(eventB.startTime);
  const endB = new Date(eventB.endTime);

  return startA < endB && endA > startB;
}
