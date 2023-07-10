import { FiltrosKardex, ReporteKardex, initFiltrosKardex } from "./kardex";
import {
  FiltrosMovimientos,
  MovCabecera,
  initFiltrosMovimientos,
} from "./movements";

export interface RootState {
  loading: boolean;
  user: any;
  invoices: Array<any>;
  clients: Array<any>;
  products: Array<any>;
  stores: [];
  movements: {
    filter: FiltrosMovimientos;
    data: MovCabecera[];
  };
  kardex: {
    filters: FiltrosKardex;
    data: ReporteKardex[];
  };
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
  movements: {
    filter: initFiltrosMovimientos,
    data: [],
  },
  kardex: {
    filters: initFiltrosKardex,
    data: [],
  },
};
