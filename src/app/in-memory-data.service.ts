import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

// Models
import { Cart } from './models/Cart';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const carts = [
      {
        id: 1,
        tagAddress: '08:00:2b:01:02:03',
        lastUpdate: '2020-04-13 14:20:23',
        nearExpDateWarnCount: 2,
        expWarnCount: 3,
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
        nearExpDateWarnCount: 0,
        expWarnCount: 0,
        discrepancy: false,
      },
    ];
    const products = [
      {
        id: 1,
        lotId: 'tLtlxqAG0aik6',
        productName: 'M945873A002',
        virtualSiteName: 'InvControl',
        expDate: '11/9/20 0:00',
        quantity: 22,
        discrepancy: false,
        cartId: 1,
      },
      {
        id: 2,
        lotId: 'h935zDVik1oHs',
        productName: 'M948144A001',
        virtualSiteName: 'InvControl',
        expDate: '12/3/20 0:00',
        quantity: 1,
        discrepancy: false,
        cartId: 2,
      },
      {
        id: 3,
        lotId: '77yTkjUrlxxUH',
        productName: 'M948144A001',
        virtualSiteName: 'InvControl',
        expDate: '12/6/20 0:00',
        quantity: 1,
        discrepancy: false,
        cartId: 2,
      },
    ];

    return { carts, products };
  }

  genId<T extends Cart | Product>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 11;
  }
}
