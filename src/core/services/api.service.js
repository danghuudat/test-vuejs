import Vue from 'vue';
import axios from 'axios';
import VueAxios from "vue-axios";
//import JwtService from "@/core/services/jwt.service";
import { ENV } from "@/core/config/env";

/**
 * Service to call HTTP request via Axios
 */
class ApiService {
  $baseURL = null
  $http = null

  init = (options) => {
    console.log(this)
    console.log(typeof this)
    options = options || {}
    const baseURL = options.url ? options.url : ENV.API_URL
    Vue.use(VueAxios, axios)
    /*
    if (ENV.API_MODE === 'json') {
      Vue.axios.defaults.baseURL = window.location.origin;
    } else {
      Vue.axios.defaults.baseURL = baseURL;
    }
    */
    //Vue.axios.defaults.baseURL = baseURL;
    this.$baseURL = baseURL

    this.$http = Vue.axios
    this.$http.defaults.baseURL = baseURL
  };

  /**
   * Set the default HTTP request headers
   */
  /*setHeader = () => {
    this.$http.defaults.headers.common[
      "Authorization"
      ] = `Bearer ${JwtService.getToken()}`;
    this.$http.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  };*/

  query = (resource, params) => {
    const options = this._getOptions()
    return this.$http.get(resource, params, options).catch(error => {
      // console.log(error);
      throw new Error(`[KT] ApiService ${error}`)
    });
  };

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get = (resource, slug="", payload = {}) => {
    const url = this._getUri(resource, slug)
    const options = this._getOptions(payload)
    return this.$http.get(`${url}`, options).catch(error => {
      console.log(error)
      throw new Error(`[KT] ApiService ${error}`)
    });
  };

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post = (resource, params, payload) => {
    const options = this._getOptions(payload)
    return this.$http.post(`${resource}`, params, options)
  };

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update = (resource, slug, params, payload) => {
    const options = this._getOptions(payload)
    return this.$http.put(`${resource}/${slug}`, params, options);
  };

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put = (resource, params, payload) => {
    const options = this._getOptions(payload)
    return this.$http.put(`${resource}`, params, options)
  };

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete = (resource, payload) => {
    const options = this._getOptions(payload);
    return this.$http.delete(resource, options).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`)
    });
  };
  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  _getUri = (resource, slug= '') => {
    let uri = (slug != '' && slug != undefined )? `${resource}/${slug}` : resource
    if (ENV.API_MODE === 'json') {
      uri = '/json/' + `${uri}` + '.json'
    }
    return uri
  };
  /**
   * get config option, baseURL
   * @param resource
   * @returns {*}
   */
  _getOptions = (payload) => {
    let options = payload || {}
    if (!options.baseURL) {
      options.baseURL = this.$baseURL
    }

    return options
  };
};

// create instance
const apiService = new ApiService()
apiService.init()
// lock instance
Object.freeze(apiService)

export default apiService
