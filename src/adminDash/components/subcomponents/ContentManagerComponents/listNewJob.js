import React, { useState, useEffect } from "react";
import close from "../../assets/Button Close.svg";
import { Plus, Trash2 } from "lucide-react";

const ListNewJob = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const initialResponsibility = { title: "", details: [""] };
  const initialState = {
    role: "",
    salary: "",
    currency: "naira",
    description: "",
    responsibilities: [initialResponsibility],
    state: "",
    city: "",
    country: "Nigeria",
    status: "active",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialState);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResponsibilityChange = (index, e) => {
    const { name, value } = e.target;
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index][name] = value;
    setFormData((prev) => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const handleDetailChange = (respIndex, detailIndex, e) => {
    const { value } = e.target;
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[respIndex].details[detailIndex] = value;
    setFormData((prev) => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [
        ...prev.responsibilities,
        { ...initialResponsibility },
      ],
    }));
  };

  const removeResponsibility = (index) => {
    if (formData.responsibilities.length > 1) {
      const newResponsibilities = formData.responsibilities.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        responsibilities: newResponsibilities,
      }));
    }
  };

  const addDetail = (respIndex) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[respIndex].details.push("");
    setFormData((prev) => ({ ...prev, responsibilities: newResponsibilities }));
  };

  const removeDetail = (respIndex, detailIndex) => {
    const newResponsibilities = [...formData.responsibilities];
    if (newResponsibilities[respIndex].details.length > 1) {
      newResponsibilities[respIndex].details.splice(detailIndex, 1);
      setFormData((prev) => ({
        ...prev,
        responsibilities: newResponsibilities,
      }));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] font-Outfit">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[600px] max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center shrink-0">
          <h2 className="text-xl font-semibold text-[#272D37]">
            Add New Job Listing
          </h2>
          <button onClick={onClose}>
            <img src={close} alt="Close" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          <form onSubmit={handleSubmit} id="add-job-form" className="space-y-6">
            <label className="block text-sm font-medium text-gray-700">
              Job title
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                placeholder="Enter job title"
                className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Salary
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 100000"
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Currency
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] bg-white capitalize"
                >
                  <option value="naira">Naira</option>
                  <option value="usd">USD</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Status
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] bg-white capitalize"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block text-sm font-medium text-gray-700">
                Country
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Nigeria"
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                State
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Lagos"
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                City
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Ikeja"
                  className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                />
              </label>
            </div>

            <label className="block text-sm font-medium text-gray-700">
              Job description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter job description"
                rows="4"
                className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1] resize-none"
              ></textarea>
            </label>

            <div>
              <h5 className="text-md font-semibold text-gray-800 mb-3">
                Responsibilities
              </h5>
              <div className="space-y-4">
                {formData.responsibilities.map((resp, respIndex) => (
                  <div
                    key={respIndex}
                    className="p-4 border rounded-lg space-y-3 bg-gray-50"
                  >
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-gray-700 w-full">
                        Responsibility Title
                        <input
                          type="text"
                          name="title"
                          value={resp.title}
                          onChange={(e) =>
                            handleResponsibilityChange(respIndex, e)
                          }
                          required
                          placeholder="e.g., Budget and Forecasting"
                          className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                        />
                      </label>
                      {formData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeResponsibility(respIndex)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Details
                      </p>
                      {resp.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <input
                            type="text"
                            value={detail}
                            onChange={(e) =>
                              handleDetailChange(respIndex, detailIndex, e)
                            }
                            required
                            placeholder={`Detail ${detailIndex + 1}`}
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-[#0530A1] focus:border-[#0530A1]"
                          />
                          {resp.details.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeDetail(respIndex, detailIndex)
                              }
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addDetail(respIndex)}
                        className="text-sm text-[#0530A1] font-semibold flex items-center space-x-1 mt-2"
                      >
                        <Plus size={16} />
                        <span>Add Detail</span>
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="text-sm text-[#0530A1] font-bold flex items-center space-x-1"
                >
                  <Plus size={18} />
                  <span>Add Responsibility</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t shrink-0">
          <button
            type="submit"
            form="add-job-form"
            className="w-full py-3 rounded-lg bg-[#0530A1] text-white hover:bg-[#042882] font-semibold disabled:bg-gray-400 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListNewJob;
