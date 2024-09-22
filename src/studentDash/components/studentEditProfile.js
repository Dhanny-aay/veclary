import { useContext, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import { DatePicker } from "rsuite";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import load from "./assets/load.gif";
import { handleStudentProfileUpdate } from "../../controllers/studentControllers/userAuthController";
import { useSnackbar } from "notistack";
import { handleAvatarUpload } from "../../controllers/generalController/authController";

const StudentEditProfile = ({ profile, loading }) => {
  const { activePage, setActivePage } = useContext(ActivePageContext);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const [loading1, setLoading1] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  // Flatten the nested profile object
  const flattenProfile = (profile) => ({
    name: profile.user.name,
    email: profile.user.email,
    schoolName: profile.student.schoolName,
    gender: profile.profile.gender,
    dateOfBirth: profile.profile.dateOfBirth,
    class: profile.profile.class,
    schoolIdentification: profile.student.schoolIdentification,
    address: profile.profile.address,
    nationality: profile.profile.nationality,
    state: profile.profile.state,
    nextOfKinName: profile.profile.nextOfKinName,
    nextOfKinNumber: profile.profile.nextOfKinNumber,
    nextOfKinAddress: profile.profile.nextOfKinAddress,
    nextOfKinRelationship: profile.profile.nextOfKinRelationship,
    mothersName: profile.profile.mothersName,
    mothersNumber: profile.profile.mothersNumber,
    mothersOccupation: profile.profile.mothersOccupation,
    fathersName: profile.profile.fathersName,
    fathersNumber: profile.profile.fathersNumber,
    fathersOccupation: profile.profile.fathersOccupation,
    // add other fields you need to flatten
  });

  const [currProfile, setCurrProfile] = useState(flattenProfile(profile));

  const handleClick = (page) => {
    setActivePage(page);
  };

  console.log(currProfile);

  console.log(profile);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrProfile({
      ...currProfile,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString();
    setCurrProfile({
      ...currProfile,
      dateOfBirth: formattedDate,
    });
  };

  const onSuccess = (response) => {
    setLoading1(false);
  };

  const onError = (error) => {
    setLoading1(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading1(true);
    const userData = currProfile;
    handleStudentProfileUpdate(userData, onSuccess, onError);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedImage(URL.createObjectURL(file));

      enqueueSnackbar("Uploading image...", { variant: "info" });

      const userData = new FormData();
      userData.append("avatar", file);

      try {
        await handleAvatarUpload(
          userData,
          () => {
            enqueueSnackbar("Upload successful!", { variant: "success" });
          },
          (error) => {
            enqueueSnackbar("Upload failed. Please try again.", {
              variant: "error",
            });
          }
        );
      } catch (error) {
        enqueueSnackbar("Upload failed. Please try again.", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar("Please upload a valid PNG or JPG file.", {
        variant: "error",
      });
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6"
      >
        <div className=" flex items-center justify-between  p-6 w-full">
          <span
            onClick={() => handleClick("Profile")}
            className=" cursor-pointer flex flex-row items-center"
          >
            <img src={arrowBlue} alt="" />
            <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
              Back
            </p>
            <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
              Edit Profile
            </p>
          </span>
          <button
            onClick={handleUpdate}
            className="  bg-[#0530A1] rounded-[30px] px-5 py-2 text-center font-Outfit shadow text-white text-sm font-medium"
          >
            {loading1 ? <img src={load} className=" w-6" alt="" /> : "Save"}
          </button>
        </div>

        <div className=" w-full flex flex-col items-center  p-6 justify-center">
          <span
            style={{
              backgroundImage:
                profile && profile?.user?.avatar?.url
                  ? `url(${profile.user.avatar.url})`
                  : "none",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor:
                profile && profile?.user?.avatar?.url
                  ? "transparent"
                  : "#EAEBF0", // Set color only if the image doesn't exist
            }}
            className="w-[110px] h-[110px] rounded-[50%] bg-[#F4F4F5] mt-4 relative flex"
          >
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Uploaded"
                className="w-full h-full rounded-full object-cover"
              />
            )}
            <input
              type="file"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              id="upload-input"
              onChange={handleImageChange}
            />
            <label
              htmlFor="upload-input"
              className="bg-[#0530A1] w-8 h-8 bottom-0 right-0 absolute rounded-full flex justify-center items-center cursor-pointer"
            >
              {/* <img src={uploadIcon} alt="upload icon" /> */}
            </label>
          </span>

          {loading ? (
            <Skeleton height={20} />
          ) : (
            profile && (
              <p className=" font-Outfit text-xl font-medium mt-3 capitalize">
                {profile.user.name}
              </p>
            )
          )}
        </div>

        <div className=" w-full py-4 px-6 font-Outfit text-base mt-3 border-b border-[#EAEBF0] font-semibold">
          PERSONAL INFORMATION
        </div>
        <div className=" mt-6 w-full px-6 flex flex-col">
          <div className=" w-full flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="name"
              className=" w-full mt-3 md:mt-0 flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Full Name
              <input
                type="text"
                name="name"
                value={currProfile.name}
                onChange={handleChange}
                className="w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="email"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Email Address
              <input
                type="text"
                name="email"
                value={currProfile.email}
                disabled
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="schoolName"
              className="w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              School Name
              <select
                name="schoolName"
                value={currProfile.schoolName}
                onChange={handleChange}
                className="w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              >
                <option value="">Select School...</option>
                <option value="Kings College">Kings College</option>
                <option value="Great School">Great School</option>
                <option value="Judith College">Judith College</option>
              </select>
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="Gender"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Gender
              <select
                value={currProfile.gender}
                name="gender"
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              >
                <option value="">Select Gender...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>

            <label
              htmlFor="dateOfBirth"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Date of Birth
              <DatePicker
                block
                selected={currProfile.dateOfBirth}
                onChange={handleDateChange}
                name="dateOfBirth"
                className=" w-full mt-2 text-sm font-normal text-[#667085] capitalize p-2.5 rounded-[8px]"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="class"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Class
              <select
                type="text"
                value={currProfile.class}
                name="class"
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              >
                <option value="">Select Class...</option>
                <option value="SS1">SS1</option>
                <option value="SS2">SS2</option>
              </select>
            </label>

            <label
              htmlFor="regId"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              School Registration Number
              <input
                type="text"
                value={currProfile.schoolIdentification}
                onChange={handleChange}
                disabled
                name="schoolIdentification"
                placeholder="SCI-20-0102"
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="address"
              className=" w-full flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Permanent Home Address
              <input
                type="text"
                name="address"
                value={currProfile.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="nationality"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Nationality
              <select
                type="text"
                name="nationality"
                value={currProfile.nationality}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              >
                <option value="">Select Nationality...</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
              </select>
            </label>

            <label
              htmlFor="state"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              State
              <select
                type="text"
                name="state"
                value={currProfile.state}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              >
                <option value="">Select State...</option>
                <option value="Ondo">Ondo</option>
                <option value="Accra">Accra</option>
              </select>
            </label>
          </div>
        </div>

        <div className=" w-full py-4 px-6 font-Outfit text-base mt-3 border-b border-[#EAEBF0] font-semibold">
          Parent/Guardian Information
        </div>

        <div className=" mt-6 w-full px-6 flex flex-col">
          <div className=" w-full flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="nextOfKinName"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Next of Kin Full Name
              <input
                type="text"
                name="nextOfKinName"
                value={currProfile.nextOfKinName}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="nextOfKinNumber"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Next of Kin Contact
              <input
                type="number"
                name="nextOfKinNumber"
                value={currProfile.nextOfKinNumber}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="nextOfKinAddress"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Next of Kin Address
              <input
                type="text"
                name="nextOfKinAddress"
                value={currProfile.nextOfKinAddress}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="nextOfKinRelationship"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Next of Kin Relationship
              <input
                type="text"
                name="nextOfKinRelationship"
                value={currProfile.nextOfKinRelationship}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="mothersName"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Mother’s Full Name
              <input
                type="text"
                name="mothersName"
                value={currProfile.mothersName}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="mothersNumber"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Mother’s Contact
              <input
                type="number"
                name="mothersNumber"
                value={currProfile.mothersNumber}
                onChange={handleChange}
                placeholder=""
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="mothersOccupation"
              className=" w-full   flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Occupation
              <input
                type="text"
                name="mothersOccupation"
                value={currProfile.mothersOccupation}
                onChange={handleChange}
                placeholder=""
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="fathersName"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Father’s Full Name
              <input
                type="text"
                name="fathersName"
                value={currProfile.fathersName}
                onChange={handleChange}
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>

            <label
              htmlFor="fathersNumber"
              className=" w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Father’s Contact
              <input
                type="text"
                name="fathersNumber"
                value={currProfile.fathersNumber}
                onChange={handleChange}
                placeholder=""
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>

          <div className=" w-full mt-4 flex flex-col md:flex-row items-center justify-between">
            <label
              htmlFor="fathersOccupation"
              className=" w-full  flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm"
            >
              Occupation
              <input
                type="text"
                name="fathersOccupation"
                value={currProfile.fathersOccupation}
                onChange={handleChange}
                placeholder=""
                className=" w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentEditProfile;
