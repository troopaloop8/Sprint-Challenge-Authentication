import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

const SignUpForm = ({ touched, errors, status }) => {
  const [user, setUser] = useState([]);

  console.log("user", user);
  useEffect(() => {
    status && setUser((users) => [...users, status]);
  }, [status]);

  return (
    <div>
      <h1>Member Sign Up</h1>
      <div className="form-container">
        <Form>
          <div className="field-container">
            <label>
              Name:
              <Field type="text" name="username" placeholder="name" />
              {touched.username && errors.username && (
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
  mapPropsToValues: (props) => ({
    username: "",
    password: "",
  }),
  validationSchema: yup.object().shape({
    username: yup.string().required("Your name is required!"),
    password: yup.string().required("Password is required!"),
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    // console.log("Submitting!", formikBag)
    // POST body === {}
    axios
      .post("http://localhost:3300/api/auth/register", values)
      .then((response) => {
        console.log(response);
        setStatus(response.data);
        resetForm();
      })
      .catch((err) => console.log(err.response));
  },
})(SignUpForm);
