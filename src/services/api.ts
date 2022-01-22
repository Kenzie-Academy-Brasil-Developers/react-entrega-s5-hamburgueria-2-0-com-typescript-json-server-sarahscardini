import axios from "axios";

export const api = axios.create({
  baseURL: "https://hamburgueria-ts-json-server.herokuapp.com/",
});
