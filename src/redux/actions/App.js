export const setLogin = (isLoggedIn) => {
  return {
    type: "SET_LOGIN",
    payload: isLoggedIn,
  };
};

export const toggleProfile = (profile) => {
  return {
    type: "TOGGLE_PROFILE",
    payload: profile,
  };
};

export const toggleAvatar = (avatar) => {
  return {
    type: "TOGGLE_AVATAR",
    payload: avatar,
  };
};

export const setCurrencies = (currencies) => {
  return {
    type: "CURRENCIES",
    payload: {
      [currencies.chanId]: {
        ...currencies,
      },
    },
  };
};

export const updateCurrencies = (currencies) => {
  return {
    type: "UPDATE_CURRENCIES",
    payload: currencies,
  };
};
