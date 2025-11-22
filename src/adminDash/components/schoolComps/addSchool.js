import React from "react";
import close from "./assets/Button Close.svg";
import icon from "./assets/Icon.svg";

const AddSchool = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newSchool = {};
    formData.forEach((value, key) => {
      newSchool[key] = value;
    });
    onSubmit(newSchool);
  };

  const AddNewSchoolSchema = {
    schoolName: "School Name",
    schoolEmail: "School Email",
    schoolReg: "School Registration Number",
    schoolCAC: "School CAC Number",
    schoolPhone: "School Phone",
    schoolWebsite: "School Website",
    schoolAddress: "School Address",
    adminName: "Admin Name",
    adminEmail: "Admin Email",
    AdminPassword: "Admin Password",
  };

  const inputTypes = {
    adminEmail: "email",
    schoolEmail: "email",
    AdminPassword: "password",
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
        <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-auto md:max-w-2xl">
          <div className="p-6 border-b flex justify-between items-center">
            <span className="flex items-center space-x-2">
              <img src={icon} alt="Add School" />
              <h2 className="text-xl font-semibold text-[#272D37]">
                Add New School
              </h2>
            </span>
            <button onClick={onClose}>
              <img src={close} alt="Close" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(AddNewSchoolSchema).map(([key, label]) => (
                  <label
                    key={key}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {label}
                    <input
                      type={inputTypes[key] || "text"}
                      id={key}
                      name={key}
                      required
                      placeholder={`Enter ${label}`}
                      className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#0530A1] text-white hover:bg-[#041D6D] font-semibold disabled:bg-gray-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add School"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSchool;
