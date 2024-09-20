import React, { useState, useRef, useEffect } from "react";
import x from "./assets/x.svg";
import x1 from "./assets/x (1).svg";
import x2 from "./assets/x (2).svg";

const LabelSelector = ({ labels, setLabels }) => {
  const [labelInput, setLabelInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null); // For handling clicks outside

  // Predefined list of labels
  const predefinedLabels = [
    "Sci-Fi",
    "Novel",
    "Read Alone",
    "Adventure",
    "Mystery",
  ];

  // Predefined colors for different labels
  const labelColors = {
    "Sci-Fi": { text: "#026AA2", background: "#f0f9ff" },
    Novel: { text: "#3538CD", background: "#EEF4FF" },
    "Read Alone": { text: "#C11574", background: "#FDF2FA" },
    Adventure: { text: "#D97706", background: "#FFF7ED" },
    Mystery: { text: "#6B7280", background: "#EDE9FE" },
    default: { text: "#333", background: "#f0f0f0" },
  };

  // Handle input change
  const handleInputChange = (e) => {
    setLabelInput(e.target.value);
    setShowDropdown(true); // Show dropdown when typing
  };

  // Handle key down to add label on "Enter"
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && labelInput.trim()) {
      e.preventDefault();
      addLabel(labelInput.trim());
    }
  };

  // Add label to the array
  const addLabel = (label) => {
    if (!labels.includes(label)) {
      setLabels((prev) => [...prev, label]); // Add the new label
    }
    setLabelInput(""); // Clear input
    setShowDropdown(false); // Hide dropdown after selection
  };

  // Handle label selection from dropdown
  const handleLabelClick = (label) => {
    addLabel(label);
  };

  // Remove label from the array
  const removeLabel = (labelToRemove) => {
    setLabels(labels.filter((label) => label !== labelToRemove));
  };

  // Handle click outside of input/dropdown to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Open dropdown when input is focused
  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  return (
    <>
      {/* Label input field */}
      <label className="w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
        Add book label
        <input
          type="text"
          value={labelInput}
          placeholder="Search for Label"
          className="font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          ref={inputRef}
        />
      </label>

      {/* Dropdown list of predefined labels */}
      {showDropdown && (
        <ul
          className="w-full mt-2 border border-[#DAE0E6] rounded-[5px] max-h-48 overflow-y-auto"
          ref={inputRef}
        >
          {predefinedLabels
            .filter((label) =>
              label.toLowerCase().includes(labelInput.toLowerCase())
            )
            .map((label, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-[#f0f0f0]"
                onClick={() => handleLabelClick(label)}
              >
                {label}
              </li>
            ))}
        </ul>
      )}

      {/* Display selected labels as tags */}
      <span className="flex flex-row flex-wrap items-center space-x-3 mt-6">
        {labels.map((label, index) => {
          const { text, background } =
            labelColors[label] || labelColors.default;
          return (
            <button
              key={index}
              className="py-[2px] px-2 rounded-[16px] font-Outfit text-xs font-medium flex items-center space-x-1"
              style={{ color: text, backgroundColor: background }}
            >
              <p>{label}</p>
              <img
                src={index === 0 ? x : index === 1 ? x1 : x2}
                alt="Remove label"
                onClick={() => removeLabel(label)}
                className="cursor-pointer"
              />
            </button>
          );
        })}
      </span>
    </>
  );
};

export default LabelSelector;
