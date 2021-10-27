import apiService from "../api.service";
import JwtService from "../jwt.service";
import router from "../../../router/index"
// import store from "../store"

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

// const auth = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })
//
// export default auth

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
};

// actions
const actions = {
  [LOGIN](context, credentials) {
    return new Promise(resolve => {
      apiService.post("/api/auth/login", credentials)
        .then( async data => {
          state.user = data.data
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(response => {
          console.log("response")
          console.log(response)
          context.commit(SET_ERROR, response.data);
        });
    });
  },
  [VERIFY_AUTH](context, to) {
    if (JwtService.getToken()) {
      apiService.setHeader();
      console.log("123")
      /*apiService.post("auth/verify")
        .then(({ data }) => {
          data.data.user.token = data.data.token;
          context.commit(SET_AUTH, data.data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data.errors);
        });*/
    } else {
      context.commit(PURGE_AUTH);
    }
  },
}

const mutations = {
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    //state.user = user.user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
    apiService.setHeader();
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
  [SET_ERROR](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
};
