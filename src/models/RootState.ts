export interface RootState {
  loading: boolean;
  user: any;
  invoices: Array<any>;
  clients: Array<any>;
  products: Array<any>;
  stores: [],
  reports: [],
}

export const initRootState: RootState = {
  user: {
    userDB: {
      EMP_PERFIL: {},
    },
  },
  invoices: [],
  clients: [],
  products: [],
  stores: [],
  reports: [],
  loading: false,
};
