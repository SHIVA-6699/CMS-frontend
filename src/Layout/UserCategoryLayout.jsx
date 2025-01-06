import React from "react";
import CreateUserCategory from "../components/UserCategory/CreateUserCategory";
import UserCategoryList from "../components/UserCategory/UserCategoryList";

const UsersCategoryLayout = () => {
  return (
    <div className="page-content">
        <CreateUserCategory/>
        <UserCategoryList/>
    </div>
  );
};

export default UsersCategoryLayout;
