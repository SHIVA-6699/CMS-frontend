import React, { useState } from "react";
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

const CreateBreakingNews = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    source: Yup.string(),
    priority: Yup.string().required("Priority is required"),
    image: Yup.mixed()
      .test(
        "fileType",
        "Only image files are allowed",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      )
      .nullable(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      source: "",
      priority: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("source", values.source);
        formData.append("priority", values.priority);
        if (values.image) {
          formData.append("image", values.image);
        }

        // Simulating API call
        setTimeout(() => {
          console.log("Breaking News Submitted:", values);
          toast.success("Breaking News created successfully!");
          setIsSubmitting(false);
          formik.resetForm();
        }, 1500);
      } catch (error) {
        toast.error("Failed to create breaking news.");
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <Card>
          <CardBody>
            <h4 className="card-title">Create Breaking News</h4>
            <Form onSubmit={formik.handleSubmit}>
              {/* Title */}
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.title && formik.errors.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-danger">{formik.errors.title}</div>
                )}
              </FormGroup>

              {/* Description */}
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={
                    formik.touched.description && formik.errors.description
                  }
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-danger">{formik.errors.description}</div>
                )}
              </FormGroup>

              {/* Source */}
              <FormGroup>
                <Label for="source">Source</Label>
                <Input
                  type="text"
                  id="source"
                  name="source"
                  value={formik.values.source}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormGroup>

              {/* Priority */}
              <FormGroup>
                <Label for="priority">Priority</Label>
                <Input
                  type="select"
                  id="priority"
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.priority && formik.errors.priority}
                >
                  <option value="" disabled>
                    Select Priority
                  </option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Input>
                {formik.touched.priority && formik.errors.priority && (
                  <div className="text-danger">{formik.errors.priority}</div>
                )}
              </FormGroup>

              {/* Image Upload */}
              <FormGroup>
                <Label for="image">Upload Image</Label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.image && formik.errors.image}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-danger">{formik.errors.image}</div>
                )}
              </FormGroup>

              {/* Submit Button */}
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" /> : "Create Breaking News"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default CreateBreakingNews;
