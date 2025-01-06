import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  FormFeedback,
  Form,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreatePermissionMutation } from "../../redux/features/PermissionApi/createPermissionApi";
import { toast } from "sonner";
const CreatePermissionForm = () => {

  const [createPermission]=useCreatePermissionMutation();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter the permission name"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("Permission data:", values);
      createPermission(values).unwrap()
      toast.success("Permission Created Successfully")
    },
  });

  return (
      <Container fluid={true}>
        <Card>
          <CardBody>
            <h4 className="card-title">Create Permission</h4>
            <p className="card-title-desc">
              Fill out the form below to create a new permission.
            </p>
            <Form
              className="needs-validation"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor="validationCustom01">Permission Name</Label>
                    <Input
                      name="name"
                      placeholder="Permission name"
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.name || ""}
                      invalid={
                        validation.touched.name && validation.errors.name
                          ? true
                          : false
                      }
                    />
                    {validation.touched.name && validation.errors.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup className="mb-3">
                    <Label htmlFor="validationCustom02">
                      Permission Description
                    </Label>
                    <Input
                      name="description"
                      placeholder="Permission description"
                      type="text"
                      className="form-control"
                      id="validationCustom02"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.description || ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Submit Form
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Container>
  );
};

export default CreatePermissionForm;
