import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ColorRing } from "react-loader-spinner";
import { UserContext } from "../userContext/userContext";

export default function Login() {

  let { setToken } = useContext(UserContext)

  let navigate = useNavigate();
  const [error, setErros] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerForm(values) {
    setIsLoading(true);

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        setIsLoading(false);
        setErros(error.response.data.message);
      });
    console.log(data);


    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      setToken(data.token)
      setIsLoading(false);
      navigate("/home");
    }
  }

  let validation = Yup.object({
    email: Yup.string()
      .required("email is required")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "email pattern is inavalid"
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /[a-z]{1,}[0-9]{5,10}/,
        `must be
    * Start with a letter
    * Be between 5 and 10 characters in total.
    * Can only contain letters (A-Z or a-z) and numbers (0-9)`
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: registerForm,
    validationSchema: validation,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2 className="fw-bold">login </h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        <div class="row align-items-center justify-content-center">
          <div class="my-2">
            <label for="email">Email :</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              type="email"
              id="email"
              class="form-control"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger my-4">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div class="my-2">
            <label for="email">Password :</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              id="password"
              class="form-control"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : null}
          </div>
        </div>
        {isLoading ? (
          <button
            type="button"
            disabled={!formik.isValid}
            className="my-3 p-2  d-block ms-auto btn bg-main text-white"
          >
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="my-3 p-2  d-block ms-auto btn bg-main text-white"
          >
            login
          </button>
        )}
      </form>
    </>
  );
}
