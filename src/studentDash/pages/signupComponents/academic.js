import { useEffect, useState } from "react";
import progress1 from "../assets/progress1.svg";

const AcademicStudent = ({ formData, setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState(
    formData.interstedSubject ? formData.interstedSubject.split(", ") : []
  );

  useEffect(() => {
    // Update local state when formData changes
    setSelectedSubjects(
      formData.interstedSubject ? formData.interstedSubject.split(", ") : []
    );
  }, [formData.interstedSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubjectChange = (event) => {
    const subject = event.target.value;
    let updatedSubjects;

    if (event.target.checked) {
      if (selectedSubjects.length < 5) {
        updatedSubjects = [...selectedSubjects, subject];
        setSelectedSubjects(updatedSubjects);
      } else {
        alert("You can only select up to 5 subjects.");
        event.target.checked = false;
        return;
      }
    } else {
      updatedSubjects = selectedSubjects.filter((sub) => sub !== subject);
      setSelectedSubjects(updatedSubjects);
    }

    setFormData((prevData) => ({
      ...prevData,
      interstedSubject: updatedSubjects.join(", "),
    }));
  };

  const handleLearningPreferenceChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, bestLearningModel: value }));
  };

  return (
    <>
      <div className="w-full">
        <img src={progress1} className="w-full mt-3" alt="" />
        <p className="font-Outfit font-medium text-2xl mt-6">
          Academic Information
        </p>

        <div className="w-full mt-4 lg:overflow-y-scroll lg:h-[260px]">
          <label
            htmlFor="grade"
            className="flex flex-col w-full font-Outfit text-sm font-medium"
          >
            Class Level/Year
            <select
              id="grade"
              name="grade"
              value={formData.grade || ""}
              onChange={handleChange}
              className="border border-[#EAEBF0] h-[40px] p-2.5 text-[#000000B2] font-Outfit text-sm rounded-[15px] mt-2"
            >
              <option value="">Choose a Class</option>
              <option value="Jss1">Jss1</option>
              <option value="Jss2">Jss2</option>
            </select>
          </label>

          <label
            htmlFor="schoolName"
            className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            School Name (Optional)
            <input
              type="text"
              id="schoolName"
              name="schoolName"
              value={formData.schoolName || ""}
              onChange={handleChange}
              className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <label
            htmlFor="schoolIdentification"
            className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            School Identification
            <input
              type="text"
              id="schoolIdentification"
              name="schoolIdentification"
              value={formData.schoolIdentification || ""}
              onChange={handleChange}
              className="border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2"
            />
          </label>

          <label
            htmlFor="subjects"
            className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            What subjects are you most interested in?
            <div className="relative w-full">
              <input
                type="text"
                value={selectedSubjects.join(", ")}
                readOnly
                placeholder="Choose subjects"
                className="border border-[#EAEBF0] w-full h-[40px] p-2.5 text-[#000000B2] font-Outfit text-sm rounded-[15px] mt-2"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 shadow-md">
                  <div className="p-2 space-x-3">
                    {["Biology", "Chemistry", "Physics", "English"].map(
                      (subject) => (
                        <label
                          key={subject}
                          className="inline-flex items-center space-x-2 mt-2"
                        >
                          <input
                            type="checkbox"
                            value={subject}
                            onChange={handleSubjectChange}
                            checked={selectedSubjects.includes(subject)}
                          />
                          {subject}
                        </label>
                      )
                    )}
                    {/* Add more subjects as needed */}
                  </div>
                </div>
              )}
            </div>
          </label>

          <label
            htmlFor="learningPreference"
            className="flex flex-col w-full font-Outfit text-sm font-medium mt-4"
          >
            How do you learn best? (optional)
            <div className="w-full flex flex-row items-center justify-between mt-2">
              {["Visual learner", "Auditory learner"].map((preference) => (
                <span
                  key={preference}
                  className="w-[48%] border border-[#EAEBF0] rounded-[15px] px-[16px] py-[16px]"
                >
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="bestLearningModel"
                      value={preference}
                      className="form-radio h-3 w-3 text-blue-600"
                      checked={formData.bestLearningModel === preference}
                      onChange={handleLearningPreferenceChange}
                    />
                    <span className="ml-2 text-sm text-[#000000B2] font-Outfit font-normal">
                      {preference}
                    </span>
                  </label>
                </span>
              ))}
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default AcademicStudent;
