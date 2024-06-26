import React, { Fragment, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import Header from "./Header";

// const navigate = useNavigate();
const Login = ({ login, isAuthenticated, isAdmin }) => {
  useEffect(() => {
    document.title = "COD 2k24 | LogIn";
  }, []);

  const [formData, setFormData] = useState({
    teamName: "",
    password: "",
  });

  const { teamName, password } = formData;
  const [error, setError] = useState("");

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(teamName, password);
      console.log("Login successful:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.errors[0].msg;
        setError(errorMessage);
      } else {
        console.error("An unexpected error occurred:", error);
        setError("Invalid Credentials.");
      }
    }
  };

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin" />;
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const fixedInputClass =
    "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";

  return (
    <Fragment>
      <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black to-gray-800">
        <div className="text-white w-4/5 md:w-4/12 bg-gray-700 rounded-lg  shadow-md shadow-white">
          <Header
            heading="Login"
            paragraph="Don't have an account? &nbsp;"
            linkName="Register"
            linkUrl="/register"
          />

          <form className="p-5 space-y-6" onSubmit={(e) => onSubmit(e)}>
            <div className="-space-y-px">
              <div className="my-5 mx-5">
                <input
                  type="text"
                  placeholder="Team Name"
                  name="teamName"
                  value={teamName}
                  required
                  onChange={(e) => onChange(e)}
                  className={fixedInputClass}
                />
              </div>
              <div className="my-5 mx-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  required
                  className={fixedInputClass}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="">
              <Header linkName="Forgot Password?" linkUrl="/forget" />
            </div>
            {/* //Button */}
            <>
              {
                <button
                  type="submit"
                  className="mb-5 group relative w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
                  value="Login/"
                >
                  {" "}
                  Login
                </button>
              }
              {error && (
                <p className="text-center text-red-500 text-sm">{error}</p>
              )}
            </>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

export default connect(mapStateToProps, { login })(Login);
