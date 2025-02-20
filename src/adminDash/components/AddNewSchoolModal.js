import React from "react";

const AddNewSchoolModal = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newSchool = {};
    formData.forEach((value, key) => {
      newSchool[key] = value;
    });
    onSubmit(newSchool);
    onClose();
  };

  const AddNewSchoolSchema = {
    adminName: "",
    adminEmail: "",
    AdminPassword: "",
    schoolEmail: "",
    schoolName: "",
    schoolReg: "",
    schoolCAC: "",
    schoolPhone: "",
    schoolWebsite: "",
    schoolAddress: "",
  };
  const labels = {
    adminName: "Admin Name",
    adminEmail: "Admin Email",
    AdminPassword: "Admin Password",
    schoolEmail: "School Email",
    schoolName: "School Name",
    schoolReg: "School Registration Number",
    schoolCAC: "School CAC Number",
    schoolPhone: "School Phone",
    schoolWebsite: "School Website",
    schoolAddress: "School Address",
  };
  const types = {
    adminName: "text",
    adminEmail: "email",
    AdminPassword: "password",
    schoolEmail: "email",
    schoolName: "text",
    schoolReg: "text",
    schoolCAC: "text",
    schoolPhone: "text",
    schoolWebsite: "text",
    schoolAddress: "text",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-[#0530A1]">
          Add New School
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {Object.keys(AddNewSchoolSchema).map((key) => (
              <span key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700"
                >
                  {labels[key]}
                </label>
                <input
                  type={types[key]}
                  id={key}
                  name={key}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                />
              </span>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#0530A1] text-white hover:bg-[#041D6D]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewSchoolModal;
