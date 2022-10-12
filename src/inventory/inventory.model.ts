export interface inventory {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  status: inventoryStatus
}

export enum inventoryStatus {
  ONSALE = 'ONSALE',
  NONSALE = 'NONSALE'
}