export default function reducer(
  state = {
    isLoggedIn: false,
    toggleProfile: false,
    toggleAvatar: false,
    currencies: [],
  },
  { type, payload }
) {
  switch (type) {
    case "SET_LOGIN":
      return {
        ...state,
        isLoggedIn: payload,
      };
    case "TOGGLE_PROFILE":
      return {
        ...state,
        toggleProfile: payload,
      };
    case "TOGGLE_AVATAR":
      return {
        ...state,
        toggleAvatar: payload,
      };
    case "CURRENCIES":
      return {
        ...state,
        currencies: {
          ...state.currencies,
          ...payload,
        },
      };
    case "UPDATE_CURRENCIES":
      return {
        ...state,
        currencies: {
          ...state.currencies,
          [payload[0]]: {
            ...state.currencies[payload[0]],
            ...payload[1],
          },
        },
      };
    default:
      return state;
  }
}
