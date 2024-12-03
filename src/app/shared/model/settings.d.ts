import {IAddress} from "./address";

export interface ISettings {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  company: {
    id: number;
    name: string;
    headquarter_address: IAddress;
  };
}
