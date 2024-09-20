import { useContext, useEffect, useState } from "react";
import arrowBlue from "./assets/arrowblue.svg";
import edit from "./assets/edit.svg";
import userPlus from "./assets/user-plus.svg";
import {
  VendorActivePageContext,
  VendorSidebarContext,
  VendorUserType,
} from "../contexts/VendorActivePageContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import load from "./assets/load.gif";
import { handlePublisherProfileUpdate } from "../../controllers/publisherController/generalController";
import { handleAuthorProfileUpdate } from "../../controllers/authorController/generalContoller";

const VendorProfile = ({ profile, loading, role }) => {
  const { sidebarVisible, setSidebarVisible } =
    useContext(VendorSidebarContext);
  const { activePage, setActivePage } = useContext(VendorActivePageContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading1, setLoading1] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    numberOfAuthors: "",
    cacNumber: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    avatar: null,
  });

  useEffect(() => {
    if (profile && profile.length > 0) {
      // Initialize form data with profile values
      setFormData({
        name: profile[0]?.name || "",
        phone: profile[1]?.phone || "",
        email: profile[0]?.email || "",
        address: profile[1]?.address || "",
        state: profile[1]?.state || "",
        numberOfAuthors: profile[1]?.numberOfAuthors || "",
        cacNumber: profile[1]?.cacNumber || "",
        accountName: profile[1]?.accountName || "",
        accountNumber: profile[1]?.accountNumber || "",
        bankName: profile[1]?.bankName || "",
        avatar: profile[1]?.avatar || null, // If profile has an avatar, include it
      });
    }
  }, [profile]);

  // Handle change function to update state when input values change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = (page) => {
    setActivePage(page);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setSelectedImage(URL.createObjectURL(file)); // Show preview
      setFormData((prevState) => ({
        ...prevState,
        avatar: file, // Set avatar as the uploaded file
      }));
    }
  };

  const onSuccess = () => {
    setLoading1(false);
  };
  const onError = () => {
    setLoading1(false);
    // navigate("/studentlogin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading1(true);

    const userData = formData;

    if (role === "AUTHOR") {
      // Call handleAuthorProfileUpdate if the role is AUTHOR
      handleAuthorProfileUpdate(userData, onSuccess, onError);
    } else {
      // Call handlePublisherProfileUpdate otherwise
      handlePublisherProfileUpdate(userData, onSuccess, onError);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Home")}
          className=" cursor-pointer px-6 mt-6 flex flex-row items-center"
        >
          <img src={arrowBlue} alt="" />
          <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
            Back
          </p>
          <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
            Profile
          </p>
        </span>

        <div className=" mt-8 flex items-center flex-row px-6 justify-between">
          <div className=" flex items-center space-x-4">
            <span className="w-[160px] h-[160px] rounded-[50%] bg-[#f8f8f8] border-4 border-white shadow shadow-[#10182814] relative flex">
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
            <span>
              {loading ? (
                <Skeleton height={30} width={200} />
              ) : (
                profile && (
                  <p className="font-Outfit font-medium text-[#101828] text-xl md:text-3xl capitalize">
                    {profile[0].name}
                  </p>
                )
              )}

              {loading ? (
                <Skeleton height={15} width={250} />
              ) : (
                profile && (
                  <p className="font-normal text-sm font-Outfit text-[#667085]">
                    {profile[0].email}
                  </p>
                )
              )}
            </span>
          </div>

          <div className=" flex">
            {/* <button className=" flex items-center space-x-2 px-4 py-2 border border-[#D0D5DD] rounded-[8px]">
              <img src={edit} alt="" />
              <p className=" font-Outfit text-sm font-semibold text-[#344054]">
                Edit Profile
              </p>
            </button> */}
            <button
              disabled={loading1}
              onClick={handleSubmit}
              className=" flex items-center px-4 py-2 bg-[#0530A1] rounded-[8px] text-white font-Outfit text-sm font-medium"
            >
              {/* <img src={userPlus} alt="" /> */}
              {loading1 ? <img src={load} className=" w-6" alt="" /> : "Save"}
            </button>
          </div>
        </div>

        <div className=" w-full mt-6 px-6">
          <p className=" font-medium text-lg font-Outfit text-[#101828]">
            Personal info
          </p>
          <p className=" font-Outfit text-sm font-normal pb-3 border-b border-[#EAECF0] w-full text-[#667085]">
            Update your photo and personal details here.
          </p>
          {loading ? (
            <div>
              <Skeleton height={35} />
              <Skeleton height={35} style={{ marginTop: "2rem" }} />
              <Skeleton height={35} style={{ marginTop: "2rem" }} />
              <Skeleton height={35} style={{ marginTop: "2rem" }} />
              {/* Add as many Skeletons as necessary to match the structure */}
            </div>
          ) : (
            profile && (
              <>
                <label
                  htmlFor="name"
                  className=" flex flex-col w-full font-Outfit text-sm font-medium mt-7"
                >
                  Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=""
                    className=" border border-[#EAEBF0] h-[40px] text-[#00000079] p-2.5 capitalize font-Outfit text-sm rounded-[8px] mt-2"
                  />
                </label>

                <div className=" w-full flex justify-between items-end">
                  <label
                    htmlFor="phone"
                    className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                  >
                    Phone Number
                    <input
                      type="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                    />
                  </label>

                  <label
                    htmlFor="Email"
                    className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                  >
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                    />
                  </label>
                </div>

                <div>
                  <div className=" w-full flex justify-between items-end">
                    <label
                      htmlFor="address"
                      className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                    >
                      Address
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder=""
                        className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                      />
                    </label>

                    <label
                      htmlFor="state"
                      className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                    >
                      State
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder=""
                        className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                      />
                    </label>
                  </div>
                  {profile && profile[0] && profile[0].role !== "AUTHOR" && (
                    <div className=" w-full flex justify-between items-end">
                      <label
                        htmlFor="numberOfAuthors"
                        className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                      >
                        Number Of Authors
                        <input
                          type="text"
                          name="numberOfAuthors"
                          value={formData.numberOfAuthors}
                          onChange={handleChange}
                          placeholder=""
                          className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                        />
                      </label>

                      <label
                        htmlFor="cacNumber"
                        className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                      >
                        CAC Number
                        <input
                          type="text"
                          name="cacNumber"
                          value={formData.cacNumber}
                          onChange={handleChange}
                          placeholder=""
                          className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                        />
                      </label>
                    </div>
                  )}

                  <div className=" w-full flex justify-between items-end">
                    <label
                      htmlFor="accountName"
                      className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                    >
                      Account Name
                      <input
                        type="email"
                        name="accountName"
                        value={formData.accountName}
                        onChange={handleChange}
                        placeholder="Enter Account Name"
                        className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                      />
                    </label>

                    <label
                      htmlFor="accountNumber"
                      className=" flex flex-col w-[49%] font-Outfit text-sm font-medium mt-4"
                    >
                      Account Number
                      <input
                        type="number"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder="Enter Account Number"
                        className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                      />
                    </label>
                  </div>

                  <label
                    htmlFor="bankName"
                    className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
                  >
                    Bank Name
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      placeholder="Enter Bank Name"
                      className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-[#00000079] text-sm rounded-[8px] mt-2"
                    />
                  </label>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
