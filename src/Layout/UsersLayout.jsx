import React from 'react'
import CreateUser from '../components/Users/createUser';
import UserList from '../components/Users/UserList';
import AssignRoleToUser from '../components/Users/AssignRoleToUser';
import AssignPermissionsToUser from '../components/Users/AssignPermissionsToUser';
import RemoveRoleFromUser from '../components/Users/RemoveRoleFromUser';
import RemovePermissionsFromUser from '../components/Users/RemovePermissionsFromUser';

const UsersLayout = () => {
  return (
    <div className="page-content">
      <CreateUser />
      <AssignRoleToUser />
    <AssignPermissionsToUser/>

    <RemovePermissionsFromUser/> 
    {/* <RemoveRoleFromUser/> */}
      {/* 

    */}
      <UserList />
    </div>
  );
}

export default UsersLayout