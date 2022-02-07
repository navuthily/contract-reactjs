import axios from "axios";
import { get, post, patch, del } from "./constant";
import callApi from "./utils";

export const getApi = function (param) {
  return callApi(param, get, null);
};
export const postApi = function (param, data) {
  return callApi(param, post, data);
}; 
export const patchApi = function (param, data) {
  return callApi(param, patch, data);
};