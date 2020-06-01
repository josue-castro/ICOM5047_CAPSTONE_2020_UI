/**
 * Giving a date, verify if product will expire within the days specified.
 * @param date Product expiration date
 * @param daysToExpire days to expiration interval
 */
export function isNearExpiration(date: string, daysToExpire: number): boolean {
  if (!date) return false;
  const daysInTime = 24 * 3600 * 1000 * daysToExpire;
  const dateInTime = new Date(date).getTime();
  const currentDate = new Date().getTime();
  const timeDifference = dateInTime - currentDate;

  return timeDifference <= daysInTime && timeDifference > 0;
}

/**
 * Givin a date, verify if product has expire
 * @param date Product expiration date
 */
export function isExpired(date: string): boolean {
  if (!date) return false;
  const expirationDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  return expirationDate < currentDate;
}
