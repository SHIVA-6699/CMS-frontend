import React from "react";
import CreatePermissionForm from "../components/Permissions/CreatePermission";
import GetPermission from "../components/Permissions/GetPermission";

const PremissionLayout = () => {
  return (
    <div className="page-content">
      <CreatePermissionForm />
      <GetPermission />
    </div>
  );
};

export default PremissionLayout;
