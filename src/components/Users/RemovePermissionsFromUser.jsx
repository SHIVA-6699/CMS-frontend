import React, { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "sonner";
import {
  Label,
  Input,
  Spinner,
  Button,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import {
  useGetUsersQuery,
  useGetUserPermissionsQuery, // This is used to fetch user-specific permissions
  useRemovePermissionsFromUserMutation,
} from "../../redux/features/usersApi/usersApi";

const RemovePermissionsFromUser = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch users
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
  const users = usersData?.users;

  // Fetch permissions for the selected user
  const { data: userPermissionsData, isLoading: permissionsLoading } =
    useGetUserPermissionsQuery(selectedUser, {
      skip: !selectedUser, // Skip if no user is selected
    });

  // Mutation to remove permissions from user
  const [removePermissionsFromUser, { isLoading: isRemoving }] =
    useRemovePermissionsFromUserMutation();

  // Permissions related to the selected user (only the user's current permissions)
  const userPermissions = userPermissionsData?.permissions || [];

  const handleRemovePermissions = async () => {
    try {
      await removePermissionsFromUser({
        userId: selectedUser,
        permissionId: selectedPermissions.map((p) => p.value), 
      }).unwrap();
      toast.success("Permissions removed successfully!");
      setSelectedUser(""); // Reset user selection
      setSelectedPermissions([]); // Reset permissions selection
    } catch (error) {
      toast.error("Failed to remove permissions.");
    }
  };

  const userPermissionsOptions = userPermissions.map((permission) => ({
    value: permission._id,
    label: permission.name,
  }));

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Remove Permissions from User</h4>
          <div className="mb-4">
            {/* User Dropdown */}
            <Label className="form-label">Select User</Label>
            {usersLoading ? (
              <Spinner color="primary" />
            ) : (
              <Input
                type="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">-- Select User --</option>
                {users?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </Input>
            )}
          </div>

          {/* Permissions Multi-Select */}
          <div className="mb-4">
            <Label className="form-label">Select Permissions</Label>
            {permissionsLoading ? (
              <Spinner color="primary" />
            ) : (
              <Select
                isMulti
                options={userPermissionsOptions} // Only show the permissions the user currently has
                value={selectedPermissions}
                onChange={setSelectedPermissions}
                isDisabled={!selectedUser} // Disable if no user selected
              />
            )}
          </div>

          {/* Submit Button */}
          <Button
            color="danger"
            onClick={handleRemovePermissions}
            disabled={
              isRemoving || usersLoading || permissionsLoading || !selectedUser
            }
          >
            {isRemoving ? "Removing..." : "Remove Permissions"}
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default RemovePermissionsFromUser;
