import { authUser } from "../constants";

export const logIn = async (email, password) => {
  return new Promise((resolve) => {
    let res = {
      status: false,
      message: "Something went wrong",
      data: null,
    };
    try {
      if (email !== authUser.email) {
        res.status = false;
        res.message = "Email is not matched";
      } else if (password !== authUser.password) {
        res.status = false;
        res.message = "Password is not matched";
      } else {
        res.status = true;
        res.data = "dummyAuthToken";
      }
      resolve(res);
    } catch (error) {
      resolve(res);
    }
  });
};
