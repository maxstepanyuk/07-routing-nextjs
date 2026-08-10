export function formatDate(date: Date): string {
  const minutes = date.getMinutes();
  const minutesFormat = minutes < 10 ? "0" + minutes : minutes;

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${minutesFormat}`;
}
