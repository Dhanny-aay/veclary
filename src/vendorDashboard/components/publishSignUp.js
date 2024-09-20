import strength from "./assets/strength.svg";
import down from "./assets/down.svg";
import { Link, useNavigate } from "react-router-dom";
import progress from "./assets/progress.svg";
import progress1 from "./assets/progress1.svg";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import loadblk from "./assets/blackload.gif";
import load from "./assets/load.gif";
import { handlePublisherRegister } from "../../controllers/publisherController/authController";
import { handleBankVerify } from "../../controllers/generalController/generalController";
import BankSelector from "../../utils/bankSelector";

const PublishSignup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const req = [
    { name: "Characters", example: "8+" },
    { name: "Uppercase", example: "AA" },
    { name: "Lowercase", example: "aa" },
    { name: "Numbers", example: "123" },
    { name: "Symbol", example: "$#^" },
  ];

  const [companyInfo, setCompanyInfo] = useState(true);
  const [addInfo, setAddInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [bankCode, setBankCode] = useState("");
  const [loadingBank, setLoadingBank] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountName: "",
    accountNumber: "",
    bankName: "",
    numberOfAuthors: "",
    cacNumber: "",
    country: "",
    state: "",
    address: "",
    phone: "",
    publisher: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log(formData);

  const proceed = () => {
    const {
      name,
      cacNumber,
      numberOfAuthors,
      phone,
      address,
      state,
      country,
      bankName,
      accountNumber,
      accountName,
    } = formData;

    // Check if all fields are filled
    if (
      name &&
      cacNumber &&
      numberOfAuthors &&
      phone &&
      address &&
      state &&
      country &&
      bankName &&
      accountNumber &&
      accountName
    ) {
      setCompanyInfo(false);
      setAddInfo(true);
    } else {
      enqueueSnackbar("Please fill in all the fields before proceeding.", {
        variant: "error",
      });
    }
  };

  const onSuccess = () => {
    setLoading(false);
    navigate("/vendorlogin");
  };
  const onError = () => {
    setLoading(false);
    // navigate("/studentlogin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = formData;
    handlePublisherRegister(userData, onSuccess, onError);
  };

  const onSuccessBank = (response) => {
    setLoadingBank(false);
    console.log(response.data.account_name);

    // Update formData with the accountName from the response
    setFormData((prevData) => ({
      ...prevData,
      accountName: response.data.account_name,
    }));
  };

  const onErrorBank = () => {
    setLoadingBank(false);
    // navigate("/studentlogin");
  };
  const handleVerifyBank = () => {
    setLoadingBank(true);
    const userData = {
      account_bank: bankCode,
      account_number: formData.accountNumber,
    };
    handleBankVerify(userData, onSuccessBank, onErrorBank);
  };

  // Trigger bank verification when both bankCode and accountNumber are filled, and accountNumber is exactly 10 digits
  useEffect(() => {
    if (bankCode && formData.accountNumber.length === 10) {
      handleVerifyBank();
    }
  }, [bankCode, formData.accountNumber]);

  return (
    <>
      {companyInfo && (
        <div className=" w-full">
          <img src={progress} className=" w-full mt-3" alt="" />
          <p className=" font-Outfit font-medium text-2xl mt-6">
            Company Information
          </p>

          <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
            <label
              htmlFor="name"
              className=" flex flex-col w-full font-Outfit text-sm font-medium"
            >
              Company Name
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <div className=" w-full flex justify-between items-center">
              <label
                htmlFor="cacNumber"
                className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
              >
                Publisher CAC Number
                <input
                  type="text"
                  name="cacNumber"
                  value={formData.cacNumber || ""}
                  onChange={handleChange}
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>

              <label
                htmlFor="numberOfAuthors"
                className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
              >
                Number of Authors
                <input
                  type="number"
                  name="numberOfAuthors"
                  value={formData.numberOfAuthors || ""}
                  onChange={handleChange}
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>
            </div>

            <div className=" w-full flex items-end">
              <label
                htmlFor="phone"
                className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
              >
                Publisher Contact Information
                <input
                  type="number"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>
            </div>

            <label
              htmlFor="address"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Publisher Address
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <div className=" w-full flex justify-between items-end">
              <label
                htmlFor="state"
                className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
              >
                State
                <input
                  type="text"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>

              <label
                htmlFor="country"
                className=" flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4"
              >
                Country
                <input
                  type="text"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleChange}
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>
            </div>

            <label
              htmlFor="website"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Publisher Website (optional)
              <input
                type="text"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <div className=" w-full grid grid-cols-2 gap-4 items-end">
              <BankSelector
                handleChange={handleChange}
                formData={formData}
                setBankCode={setBankCode}
              />

              <label
                htmlFor="accountNumber"
                className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
              >
                Account Number
                <input
                  type="number"
                  name="accountNumber"
                  value={formData.accountNumber || ""}
                  onChange={handleChange}
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
                />
              </label>
            </div>

            <label
              htmlFor="accountName"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Account Name
              <span className=" flex flex-row w-full space-x-4 items-center">
                <input
                  type="text"
                  disabled
                  name="accountName"
                  value={formData.accountName || ""}
                  onChange={handleChange}
                  className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm w-full rounded-[15px] mt-2"
                />
                {loadingBank && (
                  <img src={loadblk} className=" w-4" alt="loading" />
                )}
              </span>
            </label>

            {/* <span className=" flex flex-row items-center space-x-3 mt-6">
              <p className=" font-Outfit text-base font-medium">
                Referral Code (optional)
              </p>
              <img src={down} alt="" />
            </span> */}
          </div>

          <div className=" mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10">
            <button
              onClick={proceed}
              className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[38px] text-white text-center font-Outfit text-base"
            >
              Proceed
            </button>
            <Link to="/vendorlogin">
              <p className=" mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center">
                Already have an Account?{" "}
                <span className=" text-[#0530A1]">Login</span>
              </p>
            </Link>
          </div>
        </div>
      )}

      {addInfo && (
        <div className=" w-full">
          <img src={progress1} className=" w-full mt-3" alt="" />
          <p className=" font-Outfit font-medium text-2xl mt-6">
            Account Information
          </p>

          <div className=" w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
            <label
              htmlFor="Email"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <label
              htmlFor="Password"
              className=" flex flex-col w-full font-Outfit text-sm font-medium mt-4"
            >
              Password
              <input
                type="password"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className=" border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
              />
            </label>

            <img src={strength} className=" w-full mt-5" alt="" />

            <p className=" font-Outfit text-base font-medium text-[#000000B2] mt-4">
              Password Strength Requirement
            </p>
            <div className=" flex flex-row justify-between items-center mt-4 w-full">
              {req.map((item, index) => (
                <span
                  key={index}
                  className=" flex flex-col text-center items-center"
                >
                  <p className=" font-Outfit text-lg font-medium text-[#01A85D]">
                    {item.example}
                  </p>
                  <p className=" font-Outfit text-sm text-[#12121266] font-medium">
                    {item.name}
                  </p>
                </span>
              ))}
            </div>
          </div>

          <div className=" mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className=" w-full bg-[#0530A1] rounded-[10px] flex items-center justify-center  h-[38px] text-white text-center font-Outfit text-base"
            >
              {loading ? <img src={load} className=" w-6" alt="" /> : "Proceed"}
            </button>

            <Link to="/vendorlogin">
              <p className=" mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center">
                Already have an Account?{" "}
                <span className=" text-[#0530A1]">Login</span>
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default PublishSignup;
