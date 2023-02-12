import {
  SIGN_IN,
  LOG_IN,
  SIGN_OUT,
  CONFIRM_REGISTER,
  PERSISTENCE,
  GET_USER_DATA,
  UPDATE_PROFILE,
  OPEN_LOADING,
  CLOSE_LOADING,
  ALERT,
  CLEAR_ALERT,
  POST_CLIENT,
  POST_PRODUCT,
  POST_INVOICE,
  GET_CLIENTS,
  GET_PRODUCTS,
  GET_INVOICES,
  UPDATE_CLIENT,
  UPDATE_PRODUCT,
  DELETE_CLIENT,
  DELETE_PRODUCT,
  DELETE_INVOICE,
} from "../actions";

const initialState = {
  user: {
    userDB: {
      EMP_PERFIL: {}
    }
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
        user: { ...state.user, ...action.payload},
      };

    case SIGN_OUT:
      return {
        ...state,
        user: {},
      };

    case CONFIRM_REGISTER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    case GET_USER_DATA:
      return {
        ...state,
        user: { ...state.user, userDB: action.payload },
      };

    case  UPDATE_PROFILE:
      return {
        ...state,
        user: { ...state.user, userDB: action.payload },
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

    case ALERT:
      return {
        ...state,
        alert: action.payload,
      };

    case CLEAR_ALERT:
      return {
        ...state,
        alert: {
          text: null,
          isAcceptFunction: null,
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
        invoices: [...state.invoices, action.payload],
      };

    case UPDATE_CLIENT:
      return {
        ...state,
        clients: state.clients.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((c) =>
          c.code === action.payload.code ? action.payload : c
        ),
      };

    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter((c) => c.id !== action.payload),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.code !== action.payload),
      };

    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter((i) => i.id !== action.payload),
      };

    default:
      return state;
  }
};
