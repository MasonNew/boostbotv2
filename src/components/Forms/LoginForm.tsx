import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";

import "./LoginForm.scss";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { login } = useContext(AuthContext);
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("**required"),
    password: Yup.string().required("**required"),
  });

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                console.log('debug sub login')
                setSubmitting(true);
                setStatus();
                login(email, password).catch(
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
                  <span className="login100-form-title p-b-26">Login</span>

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
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center text-white">
                    <Link to={'/signup'}>
                      <span className="text-white">Don't have an account? Sign up now</span>
                    </Link>
                  </div>
                  <span className="text-white">{status}</span>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
