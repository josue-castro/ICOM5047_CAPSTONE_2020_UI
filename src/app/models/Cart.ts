export interface CartInfo {
  id: number;
  nearExpDateWarnCount: number;
  expWarnCount: number;
  discrepancy: boolean;
}

export interface Cart {
  id: number;
  tagAddress: string;
  lastUpdate: string;
  nearExpDateWarnCount: number;
  expWarnCount: number;
  discrepancy: boolean;
}
