import { IProductWithQuantity } from './product-with-quantity';
import { IWarehouse } from './warehouse';

export interface IInventory {
  id: number;
  items: IProductWithQuantity[];
  warehouse: IWarehouse;
}
