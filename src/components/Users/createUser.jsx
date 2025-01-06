import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
  Card,
  CardBody,
} from "reactstrap";
import { toast } from "sonner";
import { useCreateUserMutation } from "../../redux/features/usersApi/usersApi"; 
import { useGetRolesQuery } from "../../redux/features/rolesApi/roleApi";
import { useGetUserCategoriesQuery } from "../../redux/features/userCategory/userCategoryApi"; 

const CreateUser = () => {
  const [roles, setRoles] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch roles and categories
  const { data: rolesData, isLoading: isRolesLoading } = useGetRolesQuery();
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetUserCategoriesQuery();

  const [createUser, { isLoading: isUserCreating }] = useCreateUserMutation();

  useEffect(() => {
    if (rolesData) {
      setRoles(rolesData.roles);
    }
    if (categoriesData) {
      setCategories(categoriesData.categories);
    }
  }, [rolesData, categoriesData]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      roleId: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      roleId: Yup.string().required("Role is required"),
      categoryId: Yup.string().required("User category is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createUser(values).unwrap();
      console.log(response)
        if (response.message === "User created successfully") {
          toast.success("User created successfully!");
          formik.resetForm();
        } else {
          toast.error(response.message || "An error occurred.");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("Failed to create user. Please try again.");
      }
    },
  });

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Create New User</h4>
          <Form onSubmit={formik.handleSubmit}>
            {/* User Name */}
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.name && formik.errors.name}
              />
            </FormGroup>
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}

            {/* User Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.email && formik.errors.email}
              />
            </FormGroup>
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}

            {/* User Password */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.password && formik.errors.password}
              />
            </FormGroup>
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}

            {/* Role Dropdown */}
            <FormGroup>
              <Label for="roleId">Role</Label>
              {isRolesLoading ? (
                <Spinner color="primary" />
              ) : (
                <Input
                  type="select"
                  name="roleId"
                  id="roleId"
                  value={formik.values.roleId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.roleId && formik.errors.roleId}
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
            </FormGroup>
            {formik.touched.roleId && formik.errors.roleId && (
              <div className="text-danger">{formik.errors.roleId}</div>
            )}

            {/* Category Dropdown */}
            <FormGroup>
              <Label for="categoryId">User Category</Label>
              {isCategoriesLoading ? (
                <Spinner color="primary" />
              ) : (
                <Input
                  type="select"
                  name="categoryId"
                  id="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={
                    formik.touched.categoryId && formik.errors.categoryId
                  }
                >
                  <option value="" disabled>
                    -- Select Category --
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
              )}
            </FormGroup>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div className="text-danger">{formik.errors.categoryId}</div>
            )}

            {/* Submit Button */}
            <Button
              color="primary"
              type="submit"
              disabled={formik.isSubmitting || isUserCreating}
            >
              {isUserCreating ? <Spinner size="sm" /> : "Create User"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CreateUser;
