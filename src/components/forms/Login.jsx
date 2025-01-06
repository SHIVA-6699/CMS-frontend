import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

import { logIn, selectToken } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [login] = useLoginMutation();
  const token = useAppSelector(selectToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Decode token if it exists
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token); // Decoding the token
      if (decodedToken?.exp * 1000 < Date.now()) {
        // If token expired, redirect to login page
        dispatch(logIn(null)); // Clear token in Redux if expired
      } else {
        // Redirect to home page if the token is valid
        navigate("/");
      }
    }
  }, [token, dispatch, navigate]);

 const handleLogin = async (e) => {
   e.preventDefault();

   try {
     const response = await login({ email, password }).unwrap();
 
     const token = response?.accessToken;
     if (response?.accessToken) {
      const user = jwtDecode(response.accessToken)
      const role = user?.role;
      const rolePer = user?.rolePer;
       // Store the token in Redux
       dispatch(logIn({token,user,role,rolePer}));
       navigate("/"); // Redirect after successful login
     } else {
       toast.error("Login failed! Please try again.");
     }
   } catch (error) {
     console.error("Login error: ", error); // Log the full error object for debugging

     // Check if error.response exists and has a message
     if (error?.data?.message) {
       toast.error(error?.data?.message);
     } else {
       toast.error("Login failed! Please try again.");
     }
   }
 };


  useEffect(() => {
    document.body.className = "authentication-bg";
    return function cleanup() {
      document.body.className = "";
    };
  }, []);

  // Redirect if the token is present (meaning already logged in)
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/" className="mb-5 d-block auth-logo">
                  <img
                    src={logo}
                    alt=""
                    height="22"
                    className="logo logo-dark"
                  />
                  <img
                    src={logolight}
                    alt=""
                    height="22"
                    className="logo logo-light"
                  />
                </Link>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Welcome Back !</h5>
                    <p className="text-muted">
                      Sign in to continue to Minible.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <Form className="form-horizontal" onSubmit={handleLogin}>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <div className="float-end">
                          <Link to="/forgot-password" className="text-muted">
                            Forgot password?
                          </Link>
                        </div>
                        <Label className="form-label">Password</Label>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-primary text-white border-primary"
                            >
                              <i className="mdi mdi-facebook" />
                            </Link>
                          </li>
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          Don&apos;t have an account ?{" "}
                          <a
                            href="/register"
                            className="fw-medium text-primary"
                          >
                            Signup now
                          </a>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} Minible. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
