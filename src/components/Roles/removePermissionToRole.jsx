import React, { useState, useEffect } from "react";
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
  useGetRolesQuery,
  useRemovePermissionFromRoleMutation,
  useGetPermissionsForRoleQuery,
} from "../../redux/features/rolesApi/roleApi";

const RemovePermissionFromRole = () => {
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);

  // Fetch roles
  const { data: rolesList, isLoading: isRolesLoading } = useGetRolesQuery();
  const roles = rolesList?.roles || [];

  // Fetch permissions for the selected role
  const { data: permissionsList, isLoading: isPermissionsLoading } =
    useGetPermissionsForRoleQuery(selectedRoleId, {
      skip: !selectedRoleId, // Skip fetching if no role is selected
    });

  // Update permissions list when role is selected
  useEffect(() => {
    if (permissionsList && permissionsList.permissions) {
      setRolePermissions(
        permissionsList.permissions.map((permission) => ({
          value: permission._id,
          label: permission.name,
        }))
      );
    }
  }, [permissionsList]);

  // Mutation to remove permissions from role
  const [removePermissionFromRole] = useRemovePermissionFromRoleMutation();

  const handleRemovePermissions = async () => {
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

      // Call the mutation to remove permissions from the selected role
      await removePermissionFromRole({
        roleId: selectedRoleId,
        permissions: permissionIds,
      });

      toast.success("Permissions successfully removed from the role!");
      setSelectedPermissions([]); // Reset selected permissions
    } catch (error) {
      console.error("Error removing permissions:", error);
      toast.error("Failed to remove permissions. Please try again.");
    }
  };

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Remove Permissions from Role</h4>
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
                  options={rolePermissions} // Use only the selected role's permissions
                  value={selectedPermissions}
                  onChange={setSelectedPermissions}
                />
              )}
            </div>

            {/* Submit Button */}
            <Button color="danger" onClick={handleRemovePermissions}>
              Remove Permissions
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default RemovePermissionFromRole;
