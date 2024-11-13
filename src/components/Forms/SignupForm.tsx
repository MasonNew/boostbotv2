import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";

import "./LoginForm.scss";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  // const { login } = useContext(AuthContext);
  const { register } = useContext(AuthContext);
  const initialValues: SignupFormValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("**required"),
    email: Yup.string().email("Invalid email address").required("**required"),
    password: Yup.string().required("**required"),
  });
console.log('debug signup form')
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={({ username, email, password }, { setStatus, setSubmitting }) => {
                console.log('debug sub register', username, email, password)
                setSubmitting(true);
                setStatus();
                register({username, email, password}).catch(
                  (error: { response: { data: { message: any } } }) => {
                    if (error.response) {
                      setStatus(error.response.data.message);
                    } else {
                      setStatus("Some error occured. Please try again.");
                    }
                    setSubmitting(false);
                  }
                );
              }}
            >
              {({ values, isSubmitting, status }) => (
                <Form className="login100-form validate-form">
                  <span className="login100-form-title p-b-26">Register</span>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Enter User Name"
                  >
                    <Field
                      className={`input100 ${
                        values.username.length !== 0 ? "has-val" : ""
                      }`}
                      type="text"
                      name="username"
                      id="userame"
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="User Name"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="username"
                      component="span"
                    />
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Valid email is: a@b.c"
                  >
                    <Field
                      className={`input100 ${
                        values.email.length !== 0 ? "has-val" : ""
                      }`}
                      type="email"
                      id="email"
                      name="email"
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Email Address"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="email"
                      component="span"
                    />
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Enter password"
                  >
                    <Field
                      className={`input100 ${
                        values.password.length !== 0 ? "has-val" : ""
                      }`}
                      type="password"
                      name="password"
                      id="password"
                    />
                    <span
                      className="focus-input100"
                      data-placeholder="Password"
                    />
                    <ErrorMessage
                      className="error-message"
                      name="password"
                      component="span"
                    />
                  </div>
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn" />
                      <button
                        className="login100-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                  <a href="/" className="flex justify-center mt-2">{status}{` `}Login now</a>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
