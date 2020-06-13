import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const Login = ({ touched, errors, status }) => {
  const [user, setUser] = useState([]);

  console.log("user", user);
  useEffect(() => {
    status && setUser(users => [...users, status]);
  }, [status]);

  return (
    <div>
      <h1>Member Login</h1>
      <div className="form-container">
        <Form>
          <div className="field-container">
            <label>
              Name:
              <Field type="text" name="username" placeholder="name" />
              {touched.name && errors.name && (
                <p className="errors">{errors.username}</p>
              )}
            </label>
          </div>

          <div className="field-container">
            <label>
              Password:
              <Field type="password" name="password" placeholder="password" />
              {touched.password && errors.password && (
                <p className="errors">{errors.password}</p>
              )}
            </label>
          </div>

          


          <button>Submit</button>
        </Form>
      </div>

     
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    username: "",
    password: ""
  }),
  validationSchema: yup.object().shape({
    username: yup.string().required("Your name is required!"),
    password: yup.string().required("Password is required!")
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    // console.log("Submitting!", formikBag)
    // POST body === {}
    axiosWithAuth()
      .post("http://localhost:3300/api/auth/login", values)
      .then(response => {
        console.log("LOGIN RESPONSE", response);
        setStatus(response.data);
        localStorage.setItem("token", response.data.token)
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(Login);