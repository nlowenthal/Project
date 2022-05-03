import axios from "axios";
import { onGlobalSuccess, API_HOST_PREFIX } from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newsletter`;

const getPaginated = (pageIndex, pageSize) => {
    const config={
      method: "GET",
      url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    }
    return axios(config).then(onGlobalSuccess);
};

const getById = (Id) => {
    const config = {
        method: "GET",
        url: `${endpoint}/${Id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess);
};
const deleteById = (Id) => {
    const config = {
        method: "DELETE",
        url: `${endpoint}/${Id} `,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess);
};
const add = (payload) => {
    const config = {
        method: "POST",
        url: `${endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess);
};
const update = (payload, Id) => {
    const config = {
        method: "PUT",
        url: `${endpoint}/${Id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onGlobalSuccess);
};

const search = (pageIndex, pageSize, query) => {
    const config = {
      method: "GET",
      url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
      withCredentials: true,
      crossdomain: true,
      headers: {"Content-Type": "application/json"},
    }
    return axios(config).then(onGlobalSuccess);
}

const unsubscribe = (payload) => {
    const config={
      method: "PUT",
      url: `${endpoint}/subs`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    }
    return axios(config).then(onGlobalSuccess);
  }

export {
  getPaginated, getById,
    deleteById,
    add,
    update,
    search,
    unsubscribe
};