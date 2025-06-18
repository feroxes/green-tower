import { MetaType } from './types';

export type CustomerDto = {
  id: string;
  name: string;
  contactName?: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
};

export type CustomerListDto = { itemList: CustomerDto[]; meta: MetaType };
