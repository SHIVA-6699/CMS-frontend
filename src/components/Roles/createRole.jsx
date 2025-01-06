import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetPermissionsQuery } from "../../redux/features/PermissionApi/createPermissionApi";
import { useCreateRoleMutation } from "../../redux/features/rolesApi/roleApi";
import { toast } from "sonner";
const CreateRole = () => {
  const { data: permissionslist, isLoading, error } = useGetPermissionsQuery();
  const permissions = permissionslist?.permissions;

  const [selectedMulti, setSelectedMulti] = useState([]);
  const [createRole, { isLoading: isCreating, error: createRoleError }] =
    useCreateRoleMutation();

  const optionGroup = permissions
    ? permissions.map((permission) => ({
        value: permission._id,
        label: permission.name
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      }))
    : [];

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      permissions: [], // Array to store selected permission IDs
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter the role name"),
      description: Yup.string(),
      permissions: Yup.array()
        .of(Yup.string())
        .min(1, "Please select at least one permission"),
    }),
    onSubmit: (values) => {
      const roleData = { ...values, permissions: values.permissions }; // Send only the permission IDs
      createRole(roleData).then(() => {
        if (!createRoleError) {
          // Handle success, e.g., show a success message, reset the form, or redirect
          toast.success("Role created successfully");
        }
      });
    },
  });

  const handleMultiChange = (selectedOptions) => {
    setSelectedMulti(selectedOptions || []);
    validation.setFieldValue(
      "permissions",
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Create Role</h4>
          <p className="card-title-desc">
            Fill out the form below to create a new role
          </p>
          <Form className="needs-validation" onSubmit={validation.handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label htmlFor="validationCustom01">Role Name</Label>
                  <input
                    name="name"
                    placeholder="Role name"
                    type="text"
                    className="form-control"
                    id="validationCustom01"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.name || ""}
                    invalid={
                      validation.touched.name && validation.errors.name
                        ? true
                        : false
                    }
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">
                      {validation.errors.name}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup className="mb-3">
                  <Label htmlFor="validationCustom02">Role Description</Label>
                  <input
                    name="description"
                    placeholder="Role description"
                    type="text"
                    className="form-control"
                    id="validationCustom02"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.description || ""}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="12">
                <div className="mb-0">
                  <Label className="control-label">Select Permissions</Label>
                  {isLoading ? (
                    <p>Loading permissions...</p>
                  ) : error ? (
                    <p>Error loading permissions</p>
                  ) : (
                    <Select
                      value={selectedMulti}
                      isMulti
                      onChange={handleMultiChange}
                      options={optionGroup}
                      classNamePrefix="select2-selection"
                    />
                  )}
                  {validation.touched.permissions &&
                  validation.errors.permissions ? (
                    <FormFeedback type="invalid" className="d-block">
                      {validation.errors.permissions}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Button color="primary" type="submit" disabled={isCreating}>
              {isCreating ? "Creating Role..." : "Create Role"}
            </Button>
            {createRoleError && (
              <p className="text-danger mt-3">{createRoleError.message}</p>
            )}
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CreateRole;
