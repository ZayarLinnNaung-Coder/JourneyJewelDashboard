export interface LoginProp {
  username: string;
  password: string;
}

export interface LoginDataProp {
  data: {
    id: string;
    username: string;
    email: string;
    lastDispatchTime: string;
    accountStatus: string;
    role: {
      id: string;
      name: string;
      description: string;
      imageUrl: string | null;
      permission: {
        menuPermissions: {
          menuId: string;
          permissionTypes: string[];
        }[];

        createdDate: string;
        createdBy: string;
        updatedDate: string;
        updatedBy: string;
        accountId: string;
      };
      deleted: false;
      createdDate: string;
      createdBy: string;
      updatedDate: string;
      updatedBy: string;
      accountId: string;
    };
    token: string;
  };
  message: string;
  timestamp: string;
  errorCode: string;
  errorMessage: string;
}

export interface ActiveUser {
  mail: string;
  username: string;
  password: string;
}
