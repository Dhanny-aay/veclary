import { useEffect, useState } from "react";
import { handleGetBanks } from "../controllers/generalController/generalController";

const BankSelector = ({ formData, handleChange, setBankCode }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State to handle search term
  const [showSuggestions, setShowSuggestions] = useState(false); // To toggle suggestions

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await handleGetBanks();
        if (data) {
          setBanks(data.data);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching banks:", error);
        // enqueueSnackbar("An error occurred while fetching profile data", {
        //   variant: "error",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  // Filter banks based on search term
  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle suggestion click
  const handleSuggestionClick = (bankName, bankCode) => {
    setSearchTerm(bankName); // Update input with selected bank name
    setBankCode(bankCode); // Update the bank code with selected bank code
    // Update the bankName in formData using handleChange
    handleChange({
      target: {
        name: "bankName",
        value: bankName,
      },
    });
    setShowSuggestions(false); // Hide suggestions after selection
  };

  if (loading)
    return (
      <label
        htmlFor="bankName"
        className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
      >
        Bank Name
        <input
          value="Loading Banks......"
          className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
        />
      </label>
    );

  return (
    <div className="relative flex flex-col w-full font-Outfit text-sm font-medium mt-4">
      <label htmlFor="bankName">Bank Name</label>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Bank"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSuggestions(true); // Show suggestions as user types
        }}
        className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
      />

      {/* Show dropdown suggestions */}
      {showSuggestions && searchTerm && (
        <ul className="absolute z-10 w-full bg-white border border-[#EAEBF0] max-h-60 overflow-auto mt-1 rounded-lg shadow-lg">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(item.name, item.code)} // Now properly set both name and code
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-2">No banks found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BankSelector;
