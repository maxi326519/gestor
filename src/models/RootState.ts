import { FiltrosKardex, ReporteKardex, initFiltrosKardex } from "./kardex";

export interface RootState {
  loading: boolean;
  user: any;
  invoices: Array<any>;
  clients: Array<any>;
  products: Array<any>;
  stores: [];
  movements: [];
  kardex: {
    filters: FiltrosKardex,
    data: ReporteKardex[]
  }
}

export const initRootState: RootState = {
  loading: false,
  user: {
    userDB: {
      EMP_PERFIL: {},
    },
  },
  invoices: [],
  clients: [],
  products: [],
  stores: [],
  movements: [],
  kardex: {
    filters: initFiltrosKardex,
    data: []
  }
};
