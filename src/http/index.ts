import axios from "axios";

export const HttpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

// TODO possible to add retry's for failed requests.
