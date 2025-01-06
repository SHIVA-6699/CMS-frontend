import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "sonner";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Label,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";
import DeleteModal from "../Common/DeleteModal";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "../../redux/features/usersApi/usersApi";
import { useGetUserCategoryByIdQuery } from "../../redux/features/userCategory/userCategoryApi";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

function UserList() {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
  });
  const [userToDelete, setUserToDelete] = useState("");

  const { data, isLoading } = useGetUsersQuery();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const toggle = () => {
    if (modal) {
      setIsEdit(false);
      setFormData({
        name: "",
        email: "",
        userId: "",
      });
    }
    setModal(!modal);
  };

  const handleEditClick = (item) => {
    setIsEdit(true);
    setFormData({
      name: item.name,
      email: item.email,
      userId: item._id,
    });
    toggle();
  };

  const handleSave = async (values) => {
    const { name, email, userId } = values;
    console.log(userId)

    try {
      await editUser({ userId, name, email }).unwrap();
      toast.success("User updated successfully!");
      toggle();
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
    }
  };

  const handleDeleteClick = async () => {
    try {
      await deleteUser(userToDelete).unwrap();
      toast.success("User deleted successfully!");
      setDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        Cell: ({ cell: { value } }) => <div>{value}</div>,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value } }) => <div>{value}</div>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ cell: { value } }) => <div>{value}</div>,
      },
      {
        Header: "Role",
        accessor: "roleId",
        Cell: ({ cell: { value } }) => <div>{value?.name || "No role"}</div>, // Display role name
      },
      {
        Header: "Category",
        accessor: "categoryId",
        Cell: ({ cell: { value } }) => {
          const { data: categoryData } = useGetUserCategoryByIdQuery(value, {
            skip: !value, // Skip if categoryId is not available
          });

          // Wait for the category data to load and display category name
          return categoryData ? (
            categoryData.category.name
          ) : (
            <Spinner size="sm" color="primary" />
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleEditClick(row.original)}
            >
              <i className="mdi mdi-pencil font-size-18" />
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => {
                setUserToDelete(row.original._id);
                setDeleteModal(true);
              }}
            >
              <i className="mdi mdi-delete font-size-18" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
  });

  if (isLoading) {
    return (
      <div className="page-content">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteClick}
        onCloseClick={() => setDeleteModal(false)}
      />

      <div className="container-fluid">
        <Breadcrumbs title="Users" breadcrumbItem="Manage Users" />
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={data?.users || []}
                  isGlobalFilter
                  isAddTableWithoutBorderStrap
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} tag="h4">
            {isEdit ? "Edit User" : "Add User"}
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleSave}
              enableReinitialize
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <FormikForm>
                  <Row>
                    <Col className="col-12">
                      <div className="mb-3">
                        <Label className="form-label">Name</Label>
                        <Input
                          name="name"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.name && !!errors.name}
                        />
                        {touched.name && errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          invalid={touched.email && !!errors.email}
                        />
                        {touched.email && errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-end">
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                      >
                        Save
                      </button>
                    </Col>
                  </Row>
                </FormikForm>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

UserList.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default UserList;
