export default function removeElem(v: any[], matchId: string | number) {
  const array = v.filter((elem) => (elem !== matchId ? elem : null));
  return array;
}
