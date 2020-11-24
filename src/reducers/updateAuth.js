const initialAuth = {
  user: null,
  login: "",
  password: "",
  auth_error: null,
  valid_errors: {},
  show: false,
};

const updateAuth = (state, action) => {
  if (typeof state === "undefined") {
    return initialAuth;
  }

  const { auth } = state;

  switch (action.type) {
    case "SHOW_AUTH": {
      return {
        ...auth,
        show: true,
      };
    }

    case "CHANGE_LOGIN_INPUT": {
      return {
        ...auth,
        login: action.payload.login,
      };
    }

    case "CHANGE_PASS_INPUT": {
      return {
        ...auth,
        password: action.payload.password,
      };
    }

    case "AUTH_FAIL": {
      return {
        ...auth,
        auth_error: action.payload.error,
      };
    }

    case "AUTH_SUCCESS": {
      return {
        ...auth,
        auth_error: null,
        user: action.payload.user,
        show: false,
      };
    }

    case "LOGOUT": {
      return initialAuth;
    }

    default:
      return auth;
  }
};

export default updateAuth;
