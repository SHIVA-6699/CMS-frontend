import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";
import DeleteModal from "../Common/DeleteModal";
import {
  useDeleteRoleMutation,
  useEditRoleMutation,
  useGetRolesQuery,
} from "../../redux/features/rolesApi/roleApi";

function GetRole() {
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { data, isLoading } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [editRole] = useEditRoleMutation();

  const toggle = () => {
    if (modal) {
      setIsEdit(false);
      setFormData({ name: "", description: "", permissions: [] });
    }
    setModal(!modal);
  };

  const toggleViewModal = () => {
    setViewModal(!viewModal);
  };

  const handleViewClick = (permissions) => {
    setSelectedPermissions(permissions);
    toggleViewModal();
  };

  const handleEditClick = (item) => {
    setIsEdit(true);
    setFormData({
      name: item.name,
      description: item.description,
      permissions: item.permissions || [],
    });
    toggle();
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteRole(id).unwrap();
      toast.success("Role deleted successfully!");
      setDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete role. Please try again.");
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
            <Link
              to="#"
              className="text-info"
              onClick={() => handleViewClick(row.original.permissions)}
            >
              <i className="mdi mdi-eye font-size-18" />
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
        <Breadcrumbs title="Roles" breadcrumbItem="Manage Roles" />
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <TableContainer
                  columns={columns}
                  data={data?.roles || []}
                  isGlobalFilter
                  isAddTableWithoutBorderStrap
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={viewModal} toggle={toggleViewModal}>
          <ModalHeader toggle={toggleViewModal} tag="h4">
            Role Permissions
          </ModalHeader>
          <ModalBody>
            <ul>
              {selectedPermissions.length > 0 ? (
                selectedPermissions.map((permission, index) => (
                  <li key={index}>{permission.name}</li>
                ))
              ) : (
                <p>No permissions assigned to this role.</p>
              )}
            </ul>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default GetRole;
