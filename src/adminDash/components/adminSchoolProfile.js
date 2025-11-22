import { useContext, useState, useEffect } from "react";
import {
  AdminActivePageContext,
  AdminSidebarContext,
} from "../contexts/AdminActivePageContext";
import { AdminNavContext } from "../contexts/AdminNavContext";
import { SchoolService } from "../../services/adminService";
import arrowBlue from "./assets/arrowblue.svg";
import Information from "./schoolComps/information";
import TeacherSchoolProfile from "./schoolComps/teacherSchoolProfile";
import StudentSchoolProfile from "./schoolComps/studentSchoolProfile";
import SnackbarUtils from "../../utils/snackbarUtils";
import GenericLoadingSkeleton from "../../utils/loadingSkeleton";
import AddTeacher from "./schoolComps/addTeacher";
import { handleGetGeneralSubjects } from "../../controllers/generalController/generalController";

const AdminSchoolProfile = () => {
  const { sidebarVisible, setSidebarVisible } = useContext(AdminSidebarContext);
  const { activePage, setActivePage } = useContext(AdminActivePageContext);
  const { schoolId } = useContext(AdminNavContext);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState("Information");
  const [isAddTeacherModalOpen, setAddTeacherModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const handleClick = (page) => {
    setActivePage(page);
  };

  const fetchSchool = async () => {
    if (!schoolId) {
      setError("No school ID provided.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await SchoolService.getSchoolById(schoolId);
      setSchool(response?.school);
      setTeachers(response?.teachers || []);
      setStudents(response?.students || []);
    } catch (err) {
      setError(err.message || "Failed to fetch school profile.");
      SnackbarUtils.error(err.message || "Failed to fetch school profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchool();
    const fetchSubjects = async () => {
      try {
        const subjectData = await handleGetGeneralSubjects();
        setSubjects(subjectData || []);
      } catch (error) {
        SnackbarUtils.error("Failed to fetch subjects.");
      }
    };
    fetchSubjects();
  }, [schoolId]);

  const handleOpenAddTeacherModal = () => setAddTeacherModalOpen(true);
  const handleCloseAddTeacherModal = () => setAddTeacherModalOpen(false);

  const handleAddNewTeacher = async (teacherData) => {
    setIsSubmitting(true);
    try {
      const payload = { ...teacherData, schoolId };
      const response = await SchoolService.addTeacher(payload);
      if (response) {
        SnackbarUtils.success("New Teacher Added Successfully!");
        fetchSchool(); // Refetch school data to update the teachers list
      }
    } catch (error) {
      SnackbarUtils.error(
        error.message || "Failed to add teacher. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      handleCloseAddTeacherModal();
    }
  };

  const buttons = [
    {
      label: "Information",
      value: "Information",
      component: <Information school={school} loading={loading} />,
    },
    {
      label: "Teachers",
      value: "Teachers",
      component: (
        <TeacherSchoolProfile
          teachers={teachers}
          loading={loading}
          onOpenAddTeacherModal={handleOpenAddTeacherModal}
        />
      ),
    },
    {
      label: "Students",
      value: "Students",
      component: <StudentSchoolProfile students={students} loading={loading} />,
    },
  ];

  const handleButtonClick = (value) => {
    setActiveButton(value);
    // Add logic for button click action here
  };

  return (
    <>
      <AddTeacher
        isOpen={isAddTeacherModalOpen}
        onClose={handleCloseAddTeacherModal}
        onSubmit={handleAddNewTeacher}
        isSubmitting={isSubmitting}
        subjects={subjects}
      />
      <div
        onClick={() => {
          setSidebarVisible(false);
        }}
        className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
      >
        <span
          onClick={() => handleClick("Schools")}
          className="cursor-pointer flex flex-row items-center"
        >
          <img src={arrowBlue} alt="Back Arrow" />
          <p className="font-Outfit text-[#0530A1] text-sm font-medium">Back</p>
          <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
            School Profile
          </p>
        </span>

        <div className=" mt-8 flex items-center flex-row justify-between">
          {loading ? (
            <div className="flex items-center space-x-4 w-full">
              <GenericLoadingSkeleton circle={true} height={160} width={160} />
              <div className="space-y-2">
                <GenericLoadingSkeleton height={30} width={250} />
                <GenericLoadingSkeleton height={20} width={200} />
              </div>
            </div>
          ) : (
            <div className=" flex items-center space-x-4">
              <img
                src={school?.schoolLogo}
                alt="School Logo"
                className=" w-[160px] h-[160px] rounded-[50%] bg-[#f8f8f8] border-4 border-white shadow shadow-[#10182814] object-cover"
              />
              <span>
                <p className=" font-medium text-3xl text-[#101828] font-Outfit capitalize">
                  {school?.schoolName || "School Name"}
                </p>
                <p className=" font-normal text-sm font-Outfit text-[#667085]">
                  {school?.schoolEmail || "schoolemail@gmail.com"}
                </p>
              </span>
            </div>
          )}

          <div className=" space-x-4 flex">
            <button className=" flex items-center space-x-2 px-4 py-2 bg-[#0530A1] rounded-[8px]">
              {/* <img src={userPlus} alt="" /> */}
              <p className=" font-Outfit text-sm font-semibold text-[#fff]">
                Upload Document
              </p>
            </button>
          </div>
        </div>

        <div className=" mt-6 font-Outfit">
          <p className=" font-semibold text-2xl font-Outfit text-[#000]">
            School Details
          </p>
          <div className="w-full border-b mt-6 border-[#EAECF0] h-full">
            <div className="flex">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  className={`font-medium font-Outfit text-sm pb-4 px-2 transition-all ${
                    activeButton === button.value
                      ? "border-b-2 border-[#0530A1] text-[#0530A1]"
                      : ""
                  }`}
                  onClick={() => handleButtonClick(button.value)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          {buttons.find((button) => button.value === activeButton).component}
        </div>
      </div>
    </>
  );
};

export default AdminSchoolProfile;
