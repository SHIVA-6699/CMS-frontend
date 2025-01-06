import React from 'react'
import CreateRole from '../components/Roles/createRole';
import GetRole from '../components/Roles/getRoles';
import AssignPermissionToRole from '../components/Roles/assignPermissionToRole';
import RemovePermissionFromRole from '../components/Roles/removePermissionToRole';

const RoleLayout = () => {
  return (
    <div className="page-content">
        <CreateRole/>
        <GetRole/>
        <AssignPermissionToRole/>
        <RemovePermissionFromRole/>
    </div>
  );
}

export default RoleLayout