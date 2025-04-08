export interface MenuProps {
  data: Datum[];
  message: string;
  timestamp: Date;
}

export interface Datum {
  id: string;
  name: string;
  url: string;
  icon: null | string;
  children: Datum[];
  parentMenuId: null | string;
  createdDate: Date;
  createdBy: null;
  updatedDate: Date;
  updatedBy: null;
  accountId: null;
}
