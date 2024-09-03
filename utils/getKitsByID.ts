export default function getKitById(id: number): string {
  switch (id) {
    case 1:
      return "Kit Gratuito";
    case 2:
      return "Kit Básico";
    case 3:
      return "Kit Médio";
    default:
      return "Kit Premium";
  }
}
