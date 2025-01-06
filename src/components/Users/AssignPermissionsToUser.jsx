import React, { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";
import {
  useGetUsersQuery,
  useAssignPermissionsToUserMutation
} from "../../redux/features/usersApi/usersApi";
import { useGetPermissionsQuery } from "../../redux/features/PermissionApi/createPermissionApi";
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

const AssignPermissionsToUser = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  // Fetch users and permissions
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
  const { data: permissionsList, isLoading: permissionsLoading } =
    useGetPermissionsQuery();
  const users = usersData?.users

  // Mutation to assign permissions to user
const [assignPermissionsToUser, { isLoading : isAssigning }] =
  useAssignPermissionsToUserMutation();


  const allPermissions = permissionsList?.permissions?.map((permission) => ({
    value: permission._id,
    label: permission.name,
  }));


const handleAssignPermissions = async () => {
  try {
    await assignPermissionsToUser({
      userId: selectedUser,
      permissionIds: selectedPermissions.map((p) => p.value),
    }).unwrap();
    toast.success("Permissions assigned successfully!");
       setSelectedUser(""); 
       setSelectedPermissions([]);
  } catch (error) {
    toast.error("Failed to assign permissions.");
  }
};


  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Assign Permissions to User</h4>
          <Form>
            {/* User Dropdown */}
            <div className="mb-4">
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
              disabled={isAssigning || usersLoading || permissionsLoading}
            >
              {isAssigning ? "Assigning..." : "Assign Permissions"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AssignPermissionsToUser;
