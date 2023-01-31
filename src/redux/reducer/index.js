import {
  SIGN_IN,
  LOG_IN,
  LOG_OUT,
  LOADING,
  POST_CLIENT,
  POST_PRODUCT,
  POST_INVOICE,
  GET_CLIENTS,
  GET_PRODUCTS,
} from "../actions";

const initialState = {
  user: {},
  clients: [],
  products: [],
  invoices: [],
  loading: false
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      };

    case LOG_IN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload
      };
    
    case LOG_OUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: {}
      };
    
    case LOADING:
      return{
        ...state,
        loading: !state.leading
      };

    case POST_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };

    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case POST_INVOICE:
      return {
        ...state,
        products: [...state.invoices, action.payload]
      }

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
};