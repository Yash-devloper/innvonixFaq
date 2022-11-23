import { apiHandler } from "../utils/axios";

export const axiosPost = async (url, data) => {
  if (!data) return;
  let response = {};
  try {
    const result = await apiHandler.post(url, data);
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response) {
      if (e.response.status == 400) {
        response.status = false;
        response.message = e.response.data.message;
      } else if (e.response.status == 500) {
        response.status = false;
        response.message = "Internal server error";
      } else {
        response.status = false;
        response.message = "something went wrong";
      }
    }
  }
  return response;
};

export const axiosGet = async (url) => {
  let response = {};
  try {
    const result = await apiHandler.get(url);
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response.status == 400) {
      response.status = false;
      response.message = e.response.data.message;
    } else if (e.response.status == 500) {
      response.status = false;
      response.message = "Internal server error";
    } else {
      response.status = false;
      response.message = "something went wrong";
    }
  }
  return response;
};

export const axiosDelete = async (url) => {
  let response = {};
  try {
    const result = await apiHandler.delete(url);
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response.status == 400) {
      response.status = false;
      response.message = e.response.data.message;
    } else if (e.response.status == 500) {
      response.status = false;
      response.message = "Internal server error";
    } else {
      response.status = false;
      response.message = "something went wrong";
    }
  }
  return response;
};

export const axiosPut = async (url, data) => {
  if (!data) return;
  let response = {};

  try {
    const result = await apiHandler.put(url, data);
    response.status = true;
    response.data = result.data;
  } catch (e) {
    if (e.response) {
      if (e.response.status == 400) {
        response.status = false;
        response.message = e.response.data.message;
      } else if (e.response.status == 500) {
        response.status = false;
        response.message = "Internal server error";
      } else {
        response.status = false;
        response.message = "something went wrong";
      }
    }
  }
  return response;
};
