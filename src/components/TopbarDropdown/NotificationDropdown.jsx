import  { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"

//Import images
import avatar3 from "../../assets/images/users/avatar-3.jpg"
import avatar4 from "../../assets/images/users/avatar-4.jpg"

//i18n

const NotificationDropdown = () => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="uil-bell"></i>
          <span className="badge bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 font-size-16"> {"Notifications"} </h6>
              </Col>
              <div className="col-auto">
                <Link to="#!" className="small">
                  {" "}
                  Mark all as read
                </Link>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-primary rounded-circle font-size-16">
                  <i className="uil-shopping-basket"></i>
                  </span>
                </div>
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">
                    {"Your order is placed"}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"If several languages coalesce the grammar"}
                    </p>
                    <p className="mb-0">
                    <i className="mdi mdi-clock-outline"></i>{" "}
                      {"3 min ago"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <img
                  src={avatar3}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">James Lemire</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"It will seem like simplified English"+ "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline"/>
                      {"1 hours ago"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <div className="avatar-xs me-3">
                  <span className="avatar-title bg-success rounded-circle font-size-16">
                    <i className="bx bx-badge-check"/>
                  </span>
                </div>
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">
                    {"Your item is shipped"}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {"If several languages coalesce the grammar"}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline"/>{" "}
                      {"3 min ago"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="" className="text-dark notification-item">
              <div className="d-flex align-items-start">
                <img
                  src={avatar4}
                  className="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div className="flex-1">
                  <h6 className="mt-0 mb-1">Salena Layfield</h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                      {
                        "As a skeptical Cambridge friend of mine occidental"
                       + "."}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline"/>
                      {"1 hours ago"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 text-center"
              to="#"
            ><i className="uil-arrow-circle-right me-1"></i>
              {" "}
              {"View all"}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default NotificationDropdown

NotificationDropdown.propTypes = {
  t: PropTypes.any
}