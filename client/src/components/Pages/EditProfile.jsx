import React, { useState, useEffect } from "react";
import PageTitle from "../Layout/PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Alert } from "react-bootstrap";
import useForm  from "../../utils/useForm";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ChangePasswordDialog from "../DialogComponents/ChangePasswordDialog";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditProfile() {
  const { currentUser } = useAuth();
  const { editUserProperties, editUserPropertiesWithoutImage } = useAuth();
  const navigate = useNavigate();

  const [values, carChange] = useForm();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  
  const ImageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-15">
        <CircularProgress size={200} />
      </div>
    );
  }

  function handleSubmit() {
    try {
      values._id = currentUser._id;
      setError("");
      setLoading(true);
      if(currentUser.role === 1){
        values.mobile = `+972${values.mobile}`;
      }
      console.log(values);
      if (profileImage != null){
        const res = editUserProperties(values, values);
        if (res == typeof("")) {
          setError(res);
        } else {
          return navigate("/my-profile");
        }
      } else {
        const results = editUserPropertiesWithoutImage(values);
        if (results == typeof "" ) {
          setError(results);
        } else {
          navigate("/my-profile");
        }
      }
    } catch (err) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <PageTitle />
      <div className="mt-5 d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <div className="mt-5 mw-550">
            <h3>Edit Profile</h3>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
          <div className="d-flex mt-4 justify-content-center pos-rel">
            <img
              height={150}
              width={150}
              className="cover-back border-circle grey-border"
              src={
                profileImage
                  ? profileImage
                  : process.env.REACT_APP_S3 + user.image
              }
              alt="profile image"
            />
            <label htmlFor="file" className="bottom-right w-150">
              <div
                type="button"
                style={{
                  borderRadius: 50,
                  background: "#363636",
                  color: "white",
                  opacity: "0.70",
                  height: 50,
                  width: 50,
                }}
              >
                <div
                  style={{ top: "calc(50% - 12px)" }}
                  className="d-flex justify-content-center pos-rel"
                >
                  <EditIcon />
                </div>
              </div>
              <input
                id="file"
                type="file"
                accept="image/png, image/jpeg"
                name="image"
                className="display-none"
                onChange={(e) => {
                  carChange(e);
                  ImageHandler(e);
                }}
              />
            </label>
          </div>
          <div className="mt-5 col-2-input">
            <Form.Group className="mr-10">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                value={values.firstName ? values.firstName : user.firstName}
                onChange={(e) => {
                  carChange(e);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                value={values.lastName ? values.lastName : user.lastName}
                onChange={(e) => {
                  carChange(e);
                }}
              />
            </Form.Group>
          </div>
          <Form.Group className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={values.email ? values.email : user.email}
              onChange={(e) => {
                carChange(e);
              }}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Mobile</Form.Label>
            <div className="row">
              <div className="col-3">
                <Form.Control
                  type="text"
                  className="text-center ls-2"
                  readOnly
                  placeholder={"+972"}
                />
              </div>
              <div className="col-9">
                <Form.Control
                  name="mobile"
                  type="phone"
                  value={
                    values.mobile ? values.mobile : user.phoneNumber.substr(4)
                  }
                  onChange={(e) => {
                    carChange(e);
                  }}
                />
              </div>
            </div>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              readOnly
              placeholder={"*************"}
            />
          </Form.Group>
          <Form.Group className="row mt-3 mb-3 mw-550">
            <div className="col mr-10px">
              <Button
                onClick={() => navigate("/my-profile")}
                disabled={loading}
                className="cancel-back w-100 no-border color-white capital-letter ls-2"
              >
                Cancel
              </Button>
            </div>
            <div className="col">
              <Button
                disabled={loading}
                type="submit"
                className="green-back no-border w-100 color-white capital-letter ls-2"
              >
                Apply
              </Button>
            </div>
          </Form.Group>
          <ChangePasswordDialog />
        </Form>
      </div>
    </>
  );
}
