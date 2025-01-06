import React, { useState } from "react";
import { toast } from "sonner";
import {
  useGetUsersQuery,
  useAssignRoleToUserMutation
} from "../../redux/features/usersApi/usersApi";
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

import { useGetRolesQuery } from "../../redux/features/rolesApi/roleApi";
const AssignRoleToUser = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Fetch users and roles
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
   
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();

  const users=usersData?.users
   const roles = rolesData?.roles
  // Mutation to assign role to user
const [assignRoleToUser, { isLoading : isAssigning }] = useAssignRoleToUserMutation();

const handleAssignRole = async () => {
  try {
    await assignRoleToUser({
      userId: selectedUser,
      roleId: selectedRole,
    }).unwrap();
    toast.success("Role assigned successfully!");
  } catch (error) {
    toast.error("Failed to assign role.");
  }
};


  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Assign Role to User</h4>
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

            {/* Role Dropdown */}
            <div className="mb-4">
              <Label className="form-label">Select Role</Label>
              {rolesLoading ? (
                <Spinner color="primary" />
              ) : (
                <Input
                  type="select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">-- Select Role --</option>
                  {roles?.map((role) => (
                    <option key={role._id} value={role._id}>
                      {role.name}
                    </option>
                  ))}
                </Input>
              )}
            </div>

            {/* Submit Button */}
            <Button
              color="primary"
              onClick={handleAssignRole}
              disabled={isAssigning || usersLoading || rolesLoading}
            >
              {isAssigning ? "Assigning..." : "Assign Role"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AssignRoleToUser;
