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

const CreateArticle = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]); // State to store category list

  // Fetch categories (simulate API call)
  useEffect(() => {
    // Replace with your actual API call
    const fetchCategories = async () => {
      const mockCategories = [
        { _id: "1", name: "Technology" },
        { _id: "2", name: "Health" },
        { _id: "3", name: "Education" },
      ];
      setCategories(mockCategories);
    };

    fetchCategories();
  }, []);

  // Form validation schema
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    subtitle: Yup.string(),
    subDescription: Yup.string(),
    image: Yup.mixed().required("Image is required"),
    externalLink: Yup.string().url("Invalid URL").nullable(),
    youtubeVideoLink: Yup.string().url("Invalid YouTube URL").nullable(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      category: "",
      title: "",
      subtitle: "",
      description: "",
      subDescription: "",
      image: null, // File input
      externalLink: "",
      youtubeVideoLink: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        // Convert FormData to log in the console
        const formData = new FormData();
        formData.append("category", values.category);
        formData.append("title", values.title);
        formData.append("subtitle", values.subtitle);
        formData.append("description", values.description);
        formData.append("subDescription", values.subDescription);
        formData.append("image", values.image);
        formData.append("externalLink", values.externalLink);
        formData.append("youtubeVideoLink", values.youtubeVideoLink);

        // Simulate API submission
        setTimeout(() => {
          console.log(
            "Submitted Data:",
            Object.fromEntries(formData.entries())
          );
          toast.success("Content created successfully!");
          setIsSubmitting(false);
          formik.resetForm();
        }, 1500);
      } catch (error) {
        toast.error("Failed to create content.");
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container fluid>
      <Card>
        <CardBody>
          <h4 className="card-title">Create Content</h4>
          <Form onSubmit={formik.handleSubmit}>
            {/* Category Dropdown */}
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={formik.touched.category && formik.errors.category}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Input>
              {formik.touched.category && formik.errors.category && (
                <div className="text-danger">{formik.errors.category}</div>
              )}
            </FormGroup>

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

            {/* Subtitle */}
            <FormGroup>
              <Label for="subtitle">Subtitle</Label>
              <Input
                type="text"
                id="subtitle"
                name="subtitle"
                value={formik.values.subtitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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

            {/* Sub Description */}
            <FormGroup>
              <Label for="subDescription">Sub Description</Label>
              <Input
                type="textarea"
                id="subDescription"
                name="subDescription"
                value={formik.values.subDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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

            {/* External Link */}
            <FormGroup>
              <Label for="externalLink">External Link</Label>
              <Input
                type="text"
                id="externalLink"
                name="externalLink"
                value={formik.values.externalLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.externalLink && formik.errors.externalLink
                }
              />
              {formik.touched.externalLink && formik.errors.externalLink && (
                <div className="text-danger">{formik.errors.externalLink}</div>
              )}
            </FormGroup>

            {/* YouTube Video Link */}
            <FormGroup>
              <Label for="youtubeVideoLink">YouTube Video Link</Label>
              <Input
                type="text"
                id="youtubeVideoLink"
                name="youtubeVideoLink"
                value={formik.values.youtubeVideoLink}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.youtubeVideoLink &&
                  formik.errors.youtubeVideoLink
                }
              />
              {formik.touched.youtubeVideoLink &&
                formik.errors.youtubeVideoLink && (
                  <div className="text-danger">
                    {formik.errors.youtubeVideoLink}
                  </div>
                )}
            </FormGroup>

            {/* Submit Button */}
            <Button type="submit" color="primary" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="sm" /> : "Create Content"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default CreateArticle;
