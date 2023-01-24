import { ADD_CLIENT, ADD_PRODUCT, GET_CLIENTS, GET_PRODUCTS } from "../actions";

const initialState = {
  clients: {
    data: [],
    error: {},
  },
  products: {
    data: [],
    error: {},
  },
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // Agregar cada caso
    case ADD_CLIENT:
      return {
        ...state,
        clients: {
          data: [...state.clients.data, action.payload],
          error: {},
        },
      };

    case GET_CLIENTS:
      return {
        ...state,
        clients: {
          data: [
            ...state.clients.data,
            ...action.payload.map((u) => {
              return {
                name: u.doc.data.value.mapValue.fields.name.stringValue,
                email: u.doc.data.value.mapValue.fields.email.stringValue,
                address: u.doc.data.value.mapValue.fields.address.stringValue,
                phone: u.doc.data.value.mapValue.fields.phone.stringValue,
              };
            }),
          ],
          error: {},
        },
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: {
          data: [...state.products.data, action.payload],
          error: {},
        },
      };

    case GET_PRODUCTS:
      return {
        ...state,
        products: {
          data: [
            ...state.products.data,
            ...action.payload.map((u) => {
              return {
                bars: u.doc.data.value.mapValue.fields.bars.stringValue,
                code: u.doc.data.value.mapValue.fields.code.stringValue,
                state: u.doc.data.value.mapValue.fields.state.stringValue,
                ice: u.doc.data.value.mapValue.fields.ice.stringValue,
                taxes: u.doc.data.value.mapValue.fields.taxes.stringValue,
                pvp: u.doc.data.value.mapValue.fields.pvp.stringValue,
                type: u.doc.data.value.mapValue.fields.type.stringValue,
                locCode: u.doc.data.value.mapValue.fields.locCode.stringValue,
                amount: u.doc.data.value.mapValue.fields.amount.stringValue,
                description:
                  u.doc.data.value.mapValue.fields.description.stringValue,
              };
            }),
          ],
          error: {},
        },
      };
    default:
      return state;
  }
};
