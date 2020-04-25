export function isNearExpiration(date: string, daysToExpire: number): boolean {
  const daysInTime = 24 * 3600 * 1000 * daysToExpire;
  const dateInTime = new Date(date).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = dateInTime - currentDate;

  return timeDifference <= daysInTime && timeDifference > 0;
}

export function isExpired(date: string): boolean {
  const expirationDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  return expirationDate < currentDate;
}
