import React, { useState } from "react";
import { toast } from "sonner";
import {Label,Input} from "reactstrap";
import {
  useGetUsersQuery,
  useRemoveRoleFromUserMutation
} from "../../redux/features/usersApi/usersApi";
import { Spinner, Button, Container, Card, CardBody } from "reactstrap";

const RemoveRoleFromUser = () => {
  const [selectedUser, setSelectedUser] = useState("");

  // Fetch users
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
  const users = usersData?.users;
const [removeRoleFromUser, { isLoading  }] = useRemoveRoleFromUserMutation();

const handleRemoveRole = async () => {
  try {
    await removeRoleFromUser({ userId: selectedUser }).unwrap();
    toast.success("Role removed successfully!");
  } catch (error) {
    toast.error("Failed to remove role.");
  }
};


  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Remove Role from User</h4>
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

          {/* Submit Button */}
          <Button
            color="danger"
            onClick={handleRemoveRole}
            disabled={isLoading|| usersLoading}
          >
            {isLoading ? "Removing..." : "Remove Role"}
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default RemoveRoleFromUser;
