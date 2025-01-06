import React, { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";
import {
  Spinner,
  Form,
  Input,
  Label,
  Button,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import {
  useAddPermissionToRoleMutation,
  useGetRolesQuery,
} from "../../redux/features/rolesApi/roleApi";
import { useGetPermissionsQuery } from "../../redux/features/PermissionApi/createPermissionApi";

const AssignPermissionToRole = () => {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch permissions
  const { data: permissionsList, isLoading: isPermissionsLoading } =
    useGetPermissionsQuery();
  const permissions = permissionsList?.permissions || [];

  // Fetch roles
  const { data: rolesList, isLoading: isRolesLoading } = useGetRolesQuery();
  const roles = rolesList?.roles || [];

  // Mutation to assign permissions to a role
  const [addPermissionToRole, { isLoading: isAssigning }] =
    useAddPermissionToRoleMutation();

  const allPermissions = permissions.map((permission) => ({
    value: permission._id,
    label: permission.name,
  }));

  const handleAssignPermissions = async () => {
    if (!selectedRoleId) {
      toast.error("Please select a role.");
      return;
    }

    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission.");
      return;
    }

    try {
      const permissionIds = selectedPermissions.map((p) => p.value);

      await addPermissionToRole({
        roleId: selectedRoleId,
        permissions: permissionIds,
      }).unwrap();

      toast.success("Permissions successfully assigned to the role!");
      setSelectedPermissions([]); // Reset the selected permissions
    } catch (error) {
      console.error("Error assigning permissions:", error);
      toast.error("Failed to assign permissions. Please try again.");
    }
  };

  return (
    <Container fluid={true} className="">
      <Card>
        <CardBody>
          <h4 className="card-title">Assign Permissions to Role</h4>
          <Form>
            {/* Roles Dropdown */}
            <div className="mb-4">
              <Label className="form-label">Select Role</Label>
              {isRolesLoading ? (
                <Spinner color="primary" />
              ) : (
                <Input
                  type="select"
                  value={selectedRoleId}
                  onChange={(e) => setSelectedRoleId(e.target.value)}
                >
                  <option value="" disabled>
                    -- Select Role --
                  </option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </Input>
              )}
            </div>

            {/* Permissions Multi-Select */}
            <div className="mb-4">
              <Label className="form-label">Select Permissions</Label>
              {isPermissionsLoading ? (
                <Spinner color="primary" />
              ) : (
                <Select
                  isMulti
                  options={allPermissions}
                  value={selectedPermissions}
                  onChange={setSelectedPermissions}
                />
              )}
            </div>

            {/* Submit Button */}
            <Button
              color="primary"
              onClick={handleAssignPermissions}
              disabled={isAssigning || isPermissionsLoading || isRolesLoading}
            >
              {isAssigning ? "Assigning..." : "Assign Permissions"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AssignPermissionToRole;
