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
import { useCreateLiveStreamMutation } from "../../../redux/features/LiveStream/liveStreamApi";
const CreateLive = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createLiveStream] = useCreateLiveStreamMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  streamLink: Yup.string()
    .url("Invalid streamLink URL")
    .required("streamLink is required"),
  isActive: Yup.boolean().required("Select live stream status"),
  thumbnail: Yup.mixed().nullable()
    .test(
      "fileSize",
      "File is too large",
      (value) => !value || value.size <= 5000000 // Max 5MB, if value exists
    )
    .test("fileType", "Unsupported File Format", (value) =>
      value
        ? ["image/jpeg", "image/png", "image/gif"].includes(value.type)
        : true
    ),
});

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      streamLink: "",
      isActive: true,
      thumbnail: null, // Add the thumbnail to the form data
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        console.log(values);
        await createLiveStream(values).unwrap(); // Using FormData for file upload
        toast.success("Live session created successfully!");
        setIsSubmitting(false);
        formik.resetForm();
        setThumbnailPreview(null);
      } catch (error) {
        toast.error("Failed to create live session.");
        setIsSubmitting(false);
      }
    },
  });

  // Handle thumbnail preview and update Formik's field
  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file)); // Set preview
      formik.setFieldValue("thumbnail", file); // Set Formik's field value
    }
  };

  return (
      <Container fluid>
        <Card>
          <CardBody>
            <h4 className="card-title">Create Live Session</h4>
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
                />
              </FormGroup>

              {/* streamLink */}
              <FormGroup>
                <Label for="streamLink">Stream Link</Label>
                <Input
                  type="text"
                  id="streamLink"
                  name="streamLink"
                  value={formik.values.streamLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  invalid={formik.touched.streamLink && formik.errors.streamLink}
                />
                {formik.touched.streamLink && formik.errors.streamLink && (
                  <div className="text-danger">{formik.errors.streamLink}</div>
                )}
              </FormGroup>

              {/* Is Active (Dropdown) */}
              <FormGroup>
                <Label for="isActive">Is Active</Label>
                <Input
                  type="select"
                  id="isActive"
                  name="isActive"
                  value={formik.values.isActive}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Input>
                {formik.touched.isActive && formik.errors.isActive && (
                  <div className="text-danger">{formik.errors.isActive}</div>
                )}
              </FormGroup>

              {/* Thumbnail Upload */}
              <FormGroup>
                <Label for="thumbnail">Thumbnail</Label>
                <Input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleThumbnailChange}
                  invalid={formik.touched.thumbnail && formik.errors.thumbnail}
                />
                {formik.touched.thumbnail && formik.errors.thumbnail && (
                  <div className="text-danger">{formik.errors.thumbnail}</div>
                )}

                {/* Thumbnail Preview */}
                {thumbnailPreview && (
                  <div className="mt-2">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </FormGroup>

              {/* Submit Button */}
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" /> : "Create Live"}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
  );
};

export default CreateLive;
