import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Container,
  FormFeedback,
  Input,
  Form,
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateUserCategoryMutation } from "../../redux/features/userCategory/userCategoryApi";
const CreateUserCategory = () => {
  const [createUserCategory] = useCreateUserCategoryMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createUserCategory(values).unwrap();
        if (response.message === "User category created successfully") {
          toast.success("User category created successfully!");
          formik.resetForm();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error creating user category:", error);
        toast.error("Failed to create user category. Please try again.");
      }
    },
  });

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h4 className="card-title">Create User Category</h4>
          <Form onSubmit={formik.handleSubmit}>
            {/* User Category Name */}
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
              {formik.touched.name && formik.errors.name && (
                <FormFeedback>{formik.errors.name}</FormFeedback>
              )}
            </FormGroup>

            {/* Description */}
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.description && formik.errors.description
                }
              />
              {formik.touched.description && formik.errors.description && (
                <FormFeedback>{formik.errors.description}</FormFeedback>
              )}
            </FormGroup>

            {/* Submit Button */}
            <Button
              color="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner size="sm" /> : "Create Category"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CreateUserCategory;
