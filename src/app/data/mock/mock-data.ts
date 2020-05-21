import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

export const CARTS: Cart[] = [
  {
    id: 1,
    tagAddress: '08:00:2b:01:02:03',
    lastUpdate: '2020-04-13 14:20:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 1,
    discrepancy: false,
  },
  {
    id: 2,
    tagAddress: '30:65:ec:6f:c4:58',
    lastUpdate: '2020-04-13 14:25:23',
    nearExpDateWarnCount: 1,
    expWarnCount: 1,
    discrepancy: false,
  },
  {
    id: 3,
    tagAddress: 'bc:eb:53:35:80:ca',
    lastUpdate: '2020-04-13 14:22:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 2,
    discrepancy: true,
  },
  {
    id: 4,
    tagAddress: '5f:f8:ff:7c:0c:86',
    lastUpdate: '2020-04-13 14:23:23',
    nearExpDateWarnCount: 3,
    expWarnCount: 0,
    discrepancy: false,
  },
  {
    id: 5,
    tagAddress: '08:00:2b:01:02:03',
    lastUpdate: '2020-04-13 14:20:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 1,
    discrepancy: false,
  },
  {
    id: 6,
    tagAddress: '30:65:ec:6f:c4:58',
    lastUpdate: '2020-04-13 14:25:23',
    nearExpDateWarnCount: 1,
    expWarnCount: 1,
    discrepancy: false,
  },
  {
    id: 7,
    tagAddress: 'bc:eb:53:35:80:ca',
    lastUpdate: '2020-04-13 14:22:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 0,
    discrepancy: true,
  },
  {
    id: 8,
    tagAddress: '5f:f8:ff:7c:0c:86',
    lastUpdate: '2020-04-13 14:23:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 0,
    discrepancy: false,
  },
  {
    id: 9,
    tagAddress: '08:00:2b:01:02:03',
    lastUpdate: '2020-04-13 14:20:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 1,
    discrepancy: false,
  },
  {
    id: 10,
    tagAddress: '30:65:ec:6f:c4:58',
    lastUpdate: '2020-04-13 14:25:23',
    nearExpDateWarnCount: 1,
    expWarnCount: 1,
    discrepancy: false,
  },
  {
    id: 11,
    tagAddress: 'bc:eb:53:35:80:ca',
    lastUpdate: '2020-04-13 14:22:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 0,
    discrepancy: true,
  },
  {
    id: 12,
    tagAddress: '5f:f8:ff:7c:0c:86',
    lastUpdate: '2020-04-13 14:23:23',
    nearExpDateWarnCount: 0,
    expWarnCount: 0,
    discrepancy: false,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    lotId: 'tLtlxqAG0aik6',
    productName: 'M945873A002',
    virtualSiteName: 'InvControl',
    expDate: '4/9/20 0:00',
    quantity: 22,
    discrepancy: false,
    cartId: 1,
  },
  {
    id: 2,
    lotId: 'h935zDVik1oHs',
    productName: 'M948144A001',
    virtualSiteName: 'InvControl',
    expDate: '4/3/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 2,
  },
  {
    id: 3,
    lotId: '77yTkjUrlxxUH',
    productName: 'M948144A001',
    virtualSiteName: 'InvControl',
    expDate: '5/1/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 2,
  },
  {
    id: 4,
    lotId: 'dWGFZeLkUGVlt',
    productName: 'M935930A001',
    virtualSiteName: 'InvControl',
    expDate: '5/24/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 2,
  },
  {
    id: 10,
    lotId: '2EDzAXBznuE9K',
    productName: 'M935930A001',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 2,
  },
  {
    id: 11,
    lotId: '6VEkkd7DbTctI',
    productName: '168171003',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 2,
  },
  {
    id: 12,
    lotId: 'tbe18GMhqxARS',
    productName: '168171003',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 2,
  },
  {
    id: 5,
    lotId: '2EDzAXBznuE9K',
    productName: 'M935930A001',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 3,
  },
  {
    id: 6,
    lotId: '6VEkkd7DbTctI',
    productName: '168171003',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 3,
  },
  {
    id: 7,
    lotId: 'tbe18GMhqxARS',
    productName: '168171003',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 1,
    discrepancy: false,
    cartId: 3,
  },
  {
    id: 8,
    lotId: '8BPMDqush4T9b',
    productName: 'MA11764A003',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 3,
    discrepancy: false,
    cartId: 4,
  },
  {
    id: 9,
    lotId: 'SGsHDkmUUD14j',
    productName: 'MA11764A005',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 2,
    discrepancy: false,
    cartId: 4,
  },
  {
    id: 13,
    lotId: '8BPMDqush4T9b',
    productName: 'MA11764A003',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 3,
    discrepancy: false,
    cartId: 4,
  },
  {
    id: 14,
    lotId: 'SGsHDkmUUD14j',
    productName: 'MA11764A005',
    virtualSiteName: 'InvControl',
    expDate: '12/6/20 0:00',
    quantity: 2,
    discrepancy: false,
    cartId: 4,
  },
];
