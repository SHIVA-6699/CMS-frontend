import React, { useState, useMemo } from "react";
import {
  Button,
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  Col,
  Spinner,
} from "reactstrap";
import { toast } from "sonner";
import {
  useDeleteUserCategoryMutation,
  useGetUserCategoriesQuery,
  useEditUserCategoryMutation,
} from "../../redux/features/userCategory/userCategoryApi"; // Your API hooks
import TableContainer from "../../components/Common/TableContainer"; // Assuming you have a TableContainer component
import DeleteModal from "../Common/DeleteModal"; // Assuming you already have this component

const UserCategoryList = () => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Store category ID to delete

  const { data, isLoading, error } = useGetUserCategoriesQuery();
  const [deleteUserCategory] = useDeleteUserCategoryMutation();
  const [editUserCategory] = useEditUserCategoryMutation();

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id); // Set category ID to delete
    setDeleteModal(true); // Show the delete confirmation modal
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteUserCategory(categoryToDelete).unwrap();
      toast.success("User category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user category");
    } finally {
      setDeleteModal(false); // Close modal after deletion
      setCategoryToDelete(null); // Clear category ID after deletion
    }
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setModal(true);
  };

  const handleSave = async () => {
    if (!editData?.name.trim() || !editData?.description.trim()) {
      toast.error("Name and description are required.");
      return;
    }

    try {
      await editUserCategory({
        categoryId: editData._id,
        data: { name: editData.name, description: editData.description },
      }).unwrap();
      toast.success("User category updated successfully!");
      setModal(false); // Close modal
    } catch (error) {
      toast.error("Failed to update user category");
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="d-flex gap-3">
            <Button
              color="primary"
              onClick={() => handleEditClick(row.original)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              onClick={() => handleDeleteClick(row.original._id)} // Pass ID to handleDeleteClick
            >
              Delete
            </Button>
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

  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">User Categories</h4>
          <TableContainer
            columns={columns}
            data={data?.categories || []}
            isGlobalFilter
            isAddTableWithoutBorderStrap
          />
        </CardBody>
      </Card>

      {/* Your existing DeleteModal, passing the necessary props */}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={confirmDelete} // Handle the deletion when user confirms
        onCloseClick={() => setDeleteModal(false)} // Close the modal without deleting
      />

      {/* Edit Modal */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          {editData ? "Edit User Category" : "Add User Category"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col className="col-12">
                <div className="mb-3">
                  <Label className="form-label">Name</Label>
                  <Input
                    type="text"
                    value={editData?.name || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Description</Label>
                  <Input
                    type="text"
                    value={editData?.description || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button color="success" onClick={handleSave}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default UserCategoryList;
