import io from 'socket.io-client';
import Axios from 'axios';
import QueryString from "querystring";

const Unique_URL = function (url, isEnd) {
  url = url.replace(/^\//, "");
  url = url.replace(/\/$/, "");
  return url + (isEnd ? "" : "/");
}

class ODCClient {

  constructor(serverURL) {
    console.log(serverURL);
    Axios.post('/api/socket.io').then(() => {
      this.socket = io(serverURL);
    })
    this.serverURL = this.setServerUrl(serverURL);
    this.services = {};
    this.$api = new ODCCientApi("api");
  }

  service(name) {
    name = name.replace(/^\//, "");
    if (!this.services[name]) {
      this.services[name] = new ODCClientService(name);
    }
    return this.services[name];
  }

  setServerUrl(url) {
    this.serverURL = Unique_URL(url);
  }

  resultProcess(res, resolve, reject) {
    if(res.error) {
      reject(res.error);
    }
    resolve(res.data);
  }
}

class ODCClientService {
  constructor(serverURL, name) {
    this.serverURL = serverURL;
    this.name = name;
  }
  get(id) {
    return Axios.get(this.url("get", id)).then(res => res.data);
  }
  post(data) {
    return Axios.post(this.url("post"), {
      data
    }).then(res => res.data);
  }
  put(data) {
    return Axios.put(this.url("put"), {
      data
    }).then(res => res.data);
  }
  delete(id) {
    Axios.delete(this.url("delete", id)).then(res => res.data);
  }

  // on(funcName, data) {

  // }
  url(...args) {
    return this.serverURL + this.name + '/' + args.join("/");
  }
}

class ODCCientApi {
  constructor(apiUrl) {
    this.apiUrl = Unique_URL(apiUrl);
  }
  get(url, { params = [], query = {} }) {
    return Axios.get(
      this.renderURL(this.apiUrl + Unique_URL(url, true), params, query)
    ).then(res => res.data);
  }

  post(url, { params, query, data } = {}) {
    var real_url = this.renderURL(this.apiUrl + Unique_URL(url, true), params, query);
    return Axios.post(
      "/" + real_url,
      data
    ).then(res => {
      return res.data
    });
  }

  renderURL(url, params = [], query = {}) {
    console.log('============')
    var temp = url;
    if (params.length > 0) {
      temp + "/" + params.join("/");
    }
    if (Object.keys(query).length > 0) {
      temp += "?" + QueryString.stringify(query);
    }
    return temp;
  }

}

export default ODCClient
