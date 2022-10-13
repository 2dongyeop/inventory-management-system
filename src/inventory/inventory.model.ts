export interface Inventory {
  id: string;
  name: string;
  price: string;
  description?: string;
  manufacturer?: string;
  status: InventoryStatus;
  price_fluctuation?: string;
}

export enum InventoryStatus {
  ONSALE = 'ONSALE',
  NONSALE = 'NONSALE'
}