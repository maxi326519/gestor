import {
  SIGN_IN,
  LOG_IN,
  LOG_OUT,
  CONFIRM_REGISTER,
  PERSISTENCE,
  OPEN_LOADING,
  CLOSE_LOADING,
  UPLOAD_LOGO,
  UPLOAD_FILE,
  POST_CLIENT,
  POST_PRODUCT,
  POST_INVOICE,
  GET_USER_DATA,
  GET_CLIENTS,
  GET_PRODUCTS,
  GET_INVOICES,
  UPDATE_PROFILE,
  UPDATE_CLIENT,
  UPDATE_PRODUCT,
  UPDATE_INVOICE,
  UPDATE_EMAIL,
  DELETE_CLIENT,
  DELETE_PRODUCT,
} from "../actions";

const initialState = {
  user: {
    userDB: {
      EMP_PERFIL: {},
    },
  },
  clients: [],
  products: [],
  invoices: [],
  loading: false,
  alert: {
    text: null,
    isAcceptFunction: null,
  },
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
      };

    case LOG_IN:
      return {
        ...state,
        user: action.payload,
      };

    case PERSISTENCE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case LOG_OUT:
      return initialState;

    case CONFIRM_REGISTER:
      return {
        ...state,
        user: {
          ...state.user,
          userDB: { ...state.user.userDB, ...action.payload },
        },
      };

    case OPEN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case CLOSE_LOADING:
      return {
        ...state,
        loading: false,
      };

    case UPLOAD_LOGO:
      return {
        ...state,
        user: {
          ...state.user,
          userDB: {
            ...state.user.userDB,
            EMP_LOGO: action.payload,
          },
        },
      };

    case UPLOAD_FILE:
      return {
        ...state,
        user: {
          ...state.user,
          userDB: {
            ...state.user.userDB,
            EMP_LOGO: action.payload,
          },
        },
      };

    case UPDATE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          EMP_EMAIL: action.payload,
        },
      };

    case POST_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };

    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          userDB: { ...state.user.userDB, ...action.payload },
        },
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case POST_INVOICE:
      return {
        ...state,
        user: {
          ...state.user,
          userDB: {
            ...state.user.userDB,
            EMP_NUMERO: state.user.userDB.EMP_NUMERO + 1,
            EMP_SECUENCIAL: state.user.userDB.EMP_SECUENCIAL + 1,
          },
        },
        invoices: [...state.invoices, action.payload],
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          userDB: { ...state.user.userDB, ...action.payload },
        },
      };

    case UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map((c) =>
          c.CLI_CODIGO === action.payload.CLI_CODIGO ? action.payload : c
        ),
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) =>
          p.ITE_CODIGO === action.payload.ITE_CODIGO ? action.payload : p
        ),
      };

    case UPDATE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map((i) =>
          i.VEN_CODIGO === action.payload.VEN_CODIGO ? action.payload : i
        ),
      };

    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((c) => c.CLI_CODIGO !== action.payload),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.ITE_CODIGO !== action.payload),
      };

    default:
      return state;
  }
};
