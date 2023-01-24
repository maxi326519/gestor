import {
  ADD_USER,
  ADD_USER_ERROR,
  ADD_PRODUCT,
  GET_USER,
  GET_USER_ERROR,
  GET_PRODUCT,
} from "../actions";

const initialState = {
  users: {
    data: [
      {
        name: "Maximiliano Miguel Garcia",
        userName: "maxi.326",
        email: "maxi.326519@gmail.com",
        adress: "Martin Miguens 7651",
        phone: "1139062471",
      },
      {
        name: "Maximiliano Miguel Garcia",
        userName: "maxi.326",
        email: "maxi.326519@gmail.com",
        adress: "Martin Miguens 7651",
        phone: "1139062471",
      },
    ],
    error: {},
  },
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // Agregar cada caso
    case ADD_USER:
      return {
        ...state,
        users: {
          data: [...state.users.data, ...action.payload],
          error: {},
        },
      };

    default:
      return state;
  }
};
