import axios from "axios";
import { API_URL } from "./constant";
export default function callApi(enpoint, method, body) {
  return axios({
    method,
    url: `${API_URL}/${enpoint}`,
    data: body,
  })
    .catch((err) => {
    console.log(err);
  });
}
