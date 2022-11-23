import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../../services/auth";
import { UserContext } from "../../../contexts/userContext";

const loginFormSchema = yup
  .object({
    email: yup
      .string("Enter valid email address")
      .email("Enter Valid email address")
      .required("Email address is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LogInForm = () => {
  const [isLogging, setIsLogging] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onLogin = async (formData) => {
    const { email, password } = formData;
    setIsLogging(true);
    try {
      const res = await logIn(email, password);
      setIsLogging(false);
      if (!res.status && res.message) {
        return alert(res.message);
      }
      if (res.status && res.data) {
        setUser(res.data);
        reset({
          email: "",
          password: "",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      setIsLogging(false);
    }
  };

  return (
    <div className="w-40">
      <h1>Login</h1><br></br>
      <div className="badge text-bg-warning">
      <h6>Email : test@gmail.com , Password : Test@12345</h6>
      </div>
      <form onSubmit={handleSubmit(onLogin)}>
        <div className="form-group mt-4">
          {/* <label>Email address</label> */}
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            {...register("email")}
            placeholder="Enter email address"
          />
          {errors?.email && (
            <small id="emailHelp" className="form-text text-danger">
              {errors?.email?.message}
            </small>
          )}
        </div>
        <div className="form-group mt-3">
          {/* <label for="password">Password</label> */}
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            aria-describedby="passwordHelp"
            placeholder="Enter Password"
            {...register("password")}
          />
          {errors?.password && (
            <small id="passwordHelp" className="form-text text-danger">
              {errors?.password?.message}
            </small>
          )}
        </div>
        <button
          type="submit"
          disabled={isLogging}
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LogInForm;
