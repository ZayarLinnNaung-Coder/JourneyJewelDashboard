export interface roleProps {
  data: Datum[];
  message: string;
  timestamp: Date;
}

export interface Datum {
  id: string;
  name: string;
  description: string;
  imageUrl: null;
  totalMembers: number;
}

export interface getRoleByID {
  data: Data;
  message: string;
  timestamp: Date;
}

export interface Data {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  permission: Permission;
  admins: Admin[];
}

export interface Admin {
  adminId: string;
  username: null;
  email: string;
}

export interface Permission {
  menuPermissions: MenuPermission[];
  createdDate: Date;
  createdBy: string;
  updatedDate: Date;
  updatedBy: string;
  accountId: null;
}

export interface MenuPermission {
  menuId: string;
  permissionTypes: string[];
}
