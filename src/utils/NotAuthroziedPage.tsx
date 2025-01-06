import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  document.title =
    "Not Authorized | Minible - Responsive Bootstrap 5 Admin Dashboard";

  const handleBackToHome = () => {
    navigate("/"); // Redirect to the home page or any other appropriate page
  };

  return (
    <React.Fragment>
      <div className="page-content d-flex align-items-center justify-content-center vh-100">
        <Container>
          <Row className="text-center">
            <Col lg={6} md={8} sm={12} className="mx-auto">
              <div className="p-4">
                <img
                  src="/403.png"
                  alt="Not Authorized"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <h1 className="display-4">403 - Not Authorized</h1>
                <p className="text-muted mb-4">
                  You don't have permission to access this page. Please contact
                  your administrator if you believe this is a mistake.
                </p>
                <Button color="primary" onClick={handleBackToHome}>
                  Back to Home
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default NotAuthorized;
