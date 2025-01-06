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
  Button,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";
import DeleteModal from "../Common/DeleteModal";
import {
  useDeletePermissionMutation,
  useEditPermissionMutation,
  useGetPermissionsQuery,
} from "../../redux/features/PermissionApi/createPermissionApi";

function GetPermission() {
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissionId: "",
  });

  const { data, isLoading } = useGetPermissionsQuery();
  const [editPermission] = useEditPermissionMutation();
  const [deletePermission] = useDeletePermissionMutation();

  const toggle = () => {
    if (modal) {
      setIsEdit(false);
      setFormData({ name: "", description: "", permissionId: "" });
    }
    setModal(!modal);
  };

  const handleEditClick = (item) => {
    setIsEdit(true);
    setFormData({
      name: item.name,
      description: item.description,
      permissionId: item._id,
    });
    toggle();
  };

  const handleSave = async () => {
    const { name, description, permissionId } = formData;

    if (!name.trim() || !description.trim()) {
      toast.error("Name and description are required.");
      return;
    }

    try {
      await editPermission({ permissionId, name, description }).unwrap();
      toast.success("Permission updated successfully!");
      toggle();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update permission. Please try again.");
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await deletePermission(id).unwrap();
      toast.success("Permission deleted successfully!");
      setDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete permission. Please try again.");
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
        Header: "Description",
        accessor: "description",
        Cell: ({ cell: { value } }) => <div>{value}</div>,
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
              onClick={() => handleDeleteClick(row.original._id)}
            >
              <i className="mdi mdi-delete font-size-18" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );

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
        <Breadcrumbs title="Permissions" breadcrumbItem="Manage Permissions" />
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={data?.permissions || []}
                  isGlobalFilter
                  isAddTableWithoutBorderStrap
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} tag="h4">
            {isEdit ? "Edit Permission" : "Add Permission"}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col className="col-12">
                  <div className="mb-3">
                    <Label className="form-label">Name</Label>
                    <Input
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">Description</Label>
                    <Input
                      name="description"
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="text-end">
                  <Button
                    type="button"
                    className="btn btn-success save-user"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

GetPermission.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default GetPermission;
