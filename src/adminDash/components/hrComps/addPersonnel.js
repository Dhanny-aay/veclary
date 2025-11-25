import { useState } from "react";
import close from "./assets/Button Close.svg";
import icon from "./assets/Icon.svg";

const AddHRPersonnel = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    department: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-2xl max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <span className="flex items-center space-x-2 ">
            <img src={icon} alt="Add Personnel" />
            <h2 className="text-xl font-semibold text-[#272D37]">
              Add New Personnel
            </h2>
          </span>
          <button onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Password", name: "password", type: "password" },
                { label: "Department", name: "department", type: "text" },
                { label: "Position", name: "position", type: "text" },
              ].map(({ label, name, type }) => (
                <label
                  key={name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
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
              {isSubmitting ? "Submitting..." : "Add Personnel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHRPersonnel;
