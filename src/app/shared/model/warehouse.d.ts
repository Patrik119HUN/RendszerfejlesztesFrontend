import { IAddress } from './address';
import { IEmployee } from './employee';
import { IProductWithQuantity } from "./product-with-quantity";

export interface IWarehouse {
  id: number;
  name: string;
  address: IAddress;
  capacity: number;
  items: IProductWithQuantity[];
  employees: IEmployee[];
}
