import { IProduct } from './product';

export interface IProductWithQuantity {
  id: number;
  item: IProduct;
  quantity: number;
}
