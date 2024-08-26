import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import AdminHeader from "./HeaderAdmin";

const Profile = () => {
  const [profile, setProfile] = useState({
    Name: "Chandrakant Pawar",
    Mobile: "+91 8849038912",
    Email: "chandrakantpawar590@gmail.com",
    Age: "21",
    Address: "Surat, Gujarat",
    BloodGroup: "O+",
    Photo:
      "https://firebasestorage.googleapis.com/v0/b/final-pr-1a4a6.appspot.com/o/manlogo.avif?alt=media&token=0747196c-c112-4bda-9aa0-1c2b2771fd23",
  });

  const [editable, setEditable] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    setEditable(false);
    console.log("Saving changes:", profile);
  };

  const handleInputChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handlePhotoEdit = async (event) => {
    const newPhoto = event.target.files[0];
    const storageRef = ref(storage, `profilePhotos/${newPhoto.name}`);

    setIsUploading(true);

    try {
      await uploadBytes(storageRef, newPhoto);
      console.log("Photo uploaded successfully");

      const downloadURL = await getDownloadURL(storageRef);
      console.log("Download URL:", downloadURL);

      setProfile((prevProfile) => ({
        ...prevProfile,
        Photo: downloadURL,
      }));

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      setIsUploading(false);
    }
  };

  const renderEditableField = (field, value) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        autoFocus
      />
    );
  };

  const renderField = (field, value) => {
    return (
      <td className="ps-2">
        {editable ? renderEditableField(field, value) : <span>{value}</span>}
      </td>
    );
  };

  return (
    <>
      <AdminHeader />
      <div className="d-flex justify-content-center mt-3">
        <div className="main pt-1">
          <h2 className="clr-set fs-2">Profile</h2>
          <div className="card20">
            <div className="card-body d-flex align-items-center">
              <div className="details col-7 position-relative">
                <table>
                  <tbody>
                    <tr>
                      <td>Name</td>
                      <td className="ps-1">:</td>
                      {renderField("Name", profile.Name)}
                    </tr>
                    <tr>
                      <td>Mobile No</td>
                      <td className="ps-1">:</td>
                      {renderField("Mobile", profile.Mobile)}
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td className="ps-1">:</td>
                      {renderField("Email", profile.Email)}
                    </tr>
                    <tr>
                      <td>Age</td>
                      <td className="ps-1">:</td>
                      {renderField("Age", profile.Age)}
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td className="ps-1">:</td>
                      {renderField("Address", profile.Address)}
                    </tr>
                    <tr>
                      <td>Blood Group</td>
                      <td className="ps-1">:</td>
                      {renderField("BloodGroup", profile.BloodGroup)}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="photo col position-relative">
                <i
                  className="fa fa-pen fa-xs edit cursor-pointer"
                  onClick={handleEdit}
                ></i>
                <label
                  htmlFor="photoUpload"
                  className={editable ? "editable-photo" : ""}
                >
                  <img
                    src={profile.Photo}
                    alt="profile"
                    className={editable ? "editable-photo" : ""}
                    style={{ opacity: isUploading ? 0.5 : 1 }}
                  />
                  {isUploading && <p>Uploading...</p>}{" "}
                  {/* Show uploading status */}
                  <input
                    type="file"
                    id="photoUpload"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePhotoEdit}
                    disabled={!editable}
                  />
                </label>
              </div>
            </div>
            {editable && (
              <div className="card-footer text-center">
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isUploading}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
