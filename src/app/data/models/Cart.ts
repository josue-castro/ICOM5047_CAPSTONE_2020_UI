export class CartInfo {
  id: number;
  nearExpDateWarnCount: number;
  expWarnCount: number;
  discrepancy: boolean;
}

export class Cart {
  cartId: number;
  cartName: string;
  tagAddress: string;
  lastUpdated: string;
  siteName: string;
  discrepancyExists: boolean;
  nearExpirationDateWarningCount: number;
  expiredWarningCount: number;
}
