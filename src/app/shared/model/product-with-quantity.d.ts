import { IProduct } from './product';

export interface IProductWithQuantity {
  item: IProduct;
  quantity: number;
}
