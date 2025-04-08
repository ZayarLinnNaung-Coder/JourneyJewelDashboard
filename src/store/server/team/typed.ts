export interface teamProps {
  content: teamContent[];

  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface teamContent {
  id: string;
  username: string;
  email: string;
  roleName: string;
  lastDispatchTime: string;
}

export interface addTeamProps {
  roleId: string;
  email: string;
}

export interface getPayload {
  page?: number;
  size?: number;
  roleId?: string;
  query?: string;
}

export interface getByTeamsProps {
  id: string;
  username: string;
  email: string;
  lastDispatchTime: Date;
  accountStatus: string;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  imageUrl: null;
  permission: Permission;
  deleted: boolean;
  createdDate: Date;
  createdBy: null;
  updatedDate: Date;
  updatedBy: null;
  accountId: null;
}

export interface Permission {
  menuPermissions: MenuPermission[];
  createdDate: null;
  createdBy: null;
  updatedDate: Date;
  updatedBy: null;
  accountId: null;
}

export interface MenuPermission {
  menuId: string;
  permissionTypes: string[];
}
