import { Address } from './address';
import { IEmployee } from './employee';

export interface IWarehouse {
  id: number;
  name: string;
  address: Address;
  capacity: number;
  employees: IEmployee[];
}
