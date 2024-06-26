import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Transition } from "@headlessui/react";

function Navbar({ auth: { isAuthenticated, loading, isAdmin }, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const authLinks = (
    <div>
      <Link
        to="#!"
        onClick={logout}
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        <i className="fas fa-sign-out-alt"></i>{" "}
        <span className="hide-sm">Logout</span>
      </Link>
    </div>
  );

  const guestLinks = (
    <>
      {/* <Link
        to="/register"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Register
      </Link> */}

      <Link
        to="/login"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Login
      </Link>
    </>
  );

  return (
    <nav className="bg-black  w-full fixed z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div id="logo" className="">
            <p className="text-white font-signature text-4xl">COD 2k24</p>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Problems
                </Link>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Evaluate
                  </Link>
                ) : (
                  <Link
                    to="/points"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Points
                  </Link>
                )}
                <Link
                  to="/leaderboard"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Leaderboard
                </Link>
                {!loading && (
                  <div>{isAuthenticated ? authLinks : guestLinks}</div>
                )}
                {isAdmin && (
                  <Link
                    to="/admin/form"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Upload Form
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/dashboard"
                className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Problems
              </Link>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Evaluate
                </Link>
              ) : (
                <Link
                  to="/points"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Points
                </Link>
              )}
              <Link
                to="/leaderboard"
                className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Leaderboard
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/form"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Upload Form
                </Link>
              )}
              {!loading && (
                <div>{isAuthenticated ? authLinks : guestLinks}</div>
              )}      
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
