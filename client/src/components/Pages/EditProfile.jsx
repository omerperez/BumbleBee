import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Alert } from "react-bootstrap";
import useForm  from "../../utils/useForm";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import Loading from "../Layout/Loading";
import {
  ImageHandler,
  InitDefauleUserProperties,
  ValidateEmail,
  checkLanguageInput,
} from "../authComponents/userFunctions";
import { error403 } from "../images/projectImages";

export default function EditProfile({ setOpen, mobileNumber, setFlag, flag }) {
  const { currentUser } = useAuth();
  const { editUserProperties, editUserPropertiesWithoutImage } = useAuth();
  const [values, carChange] = useForm();
  const [mobile, setMobile] = useState(mobileNumber);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/user/my-user/${currentUser._id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  async function handleSubmit() {
    InitDefauleUserProperties(values, user);
    setError("");
    setLoading(true);
    user._id = currentUser._id;
    let mNumber;
    if(error){
      return error;
    }
    if (user.role === 1) {
      if (mobile == null){
        setMobile(user.phoneNumber);
      }
      mNumber = mobile.includes("+972") ? mobile : `+972${mobile}`;
      values.phoneNumber = mNumber;
    } else {
      values.phoneNumber = mobile;
    }
    try {
      if (profileImage != null) {
        const res = await editUserProperties(values);
        if (res._id === user._id) {
          setFlag(!flag);
          setOpen(false);
        } else {
          setError(res);
        }
      } else {
        const results = await editUserPropertiesWithoutImage(values);
        if (results._id === user._id) {
          setFlag(!flag);
          setOpen(false);
        } else {
          setError(results);
        }
      }
    } catch (err) {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ minWidth: 350, minHeight: 350 }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <div className="mw-550">
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
              onError={error403}
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
                  ImageHandler(e, setProfileImage);
                }}
              />
            </label>
          </div>
          <div className="mt-5 row">
            <Form.Group className="col-12 col-md-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                type="text"
                defaultValue={user.firstName}
                value={values.firstName}
                onChange={(e) => {
                  checkLanguageInput(e, setError);
                  carChange(e);
                }}
              />
            </Form.Group>
            <Form.Group className="col-12 col-md-6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                type="text"
                defaultValue={user.lastName}
                value={values.lastName}
                onChange={(e) => {
                  checkLanguageInput(e, setError);
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
              defaultValue={user.email}
              value={values.email}
              onChange={(e) => {
                ValidateEmail(e.target.value);
                carChange(e);
              }}
            />
          </Form.Group>
          {user.role !== 1 ? (
            <Form.Group id="mobile" className="mb-2 mt-4">
              <PhoneInput
                defaultCountry="IL"
                placeholder="Mobile"
                value={mobile ? mobile : mobileNumber}
                onChange={setMobile}
              />
            </Form.Group>
          ) : (
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
                    name="phoneNumber"
                    type="phone"
                    defaultValue={
                      values.phoneNumber && values.phoneNumber.includes("+972")
                        ? values.phoneNumber.split("+972")[1]
                        : values.phoneNumber ?? user.phoneNumber.substr(4)
                    }
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Form.Group>
          )}
          <Form.Group className="mt-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              name="website"
              type="url"
              defaultValue={user.website ?? "Website Not Valid"}
              value={values.website}
              onChange={(e) => {
                carChange(e);
              }}
            />
          </Form.Group>
          {/* <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              readOnly
              placeholder={"*************"}
            />
          </Form.Group> */}
          <Form.Group className="row mt-3 mb-3 mw-550">
            <div className="col mr-10px">
              <Button
                onClick={() => setOpen(false)}
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
        </Form>
      </div>
    </>
  );
}
