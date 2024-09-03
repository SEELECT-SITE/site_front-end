export default async function copyClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}
