import axios from "axios";

export const apiHandler = axios.create({
  baseURL: "https://617a3c9fcb1efe001700fd1a.mockapi.io/api",
  headers: {
    "Content-type": "application/json",
  },
});
