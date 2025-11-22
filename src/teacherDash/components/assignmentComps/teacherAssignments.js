import React, { useState, useEffect, useContext } from "react";
import nofeed from "./assets/nofeed.svg";
import { handleGetAssignmentsByTeacher } from "../../../controllers/teacherControllers/assignmentController";
import { handleGetTeacherClasses } from "../../../controllers/teacherControllers/teacherClassesControoller";
import { handleGetSubjects } from "../../../controllers/teacherControllers/gradesController";
import GenericLoadingSkeleton from "../../../utils/loadingSkeleton";
import { Plus, Eye, Trash2 } from "lucide-react";
import ViewAssignment from "./viewAssignment";
import DeleteAssignment from "./deleteAssignment";
import CreateAssignment from "./CreateAssignment";

const TeacherAssignments = ({ dashboard }) => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Upcoming");
  const [createAssignment, setCreateAssignment] = useState(false);
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [deletingAssignmentId, setDeletingAssignmentId] = useState(null);

  // Filter states
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const teacherId = dashboard?.teacher?._id;
  const schoolId = dashboard?.teacher?.school;

  const fetchAssignments = async () => {
    if (!teacherId) return;
    setLoading(true);
    try {
      const [assignmentResponse, classResponse, subjectResponse] =
        await Promise.all([
          handleGetAssignmentsByTeacher(teacherId),
          handleGetTeacherClasses(),
          handleGetSubjects(),
        ]);

      if (assignmentResponse?.assignments) {
        setAssignments(assignmentResponse.assignments);
      }
      if (classResponse?.classes) {
        setClasses(classResponse.classes || []);
      }
      if (subjectResponse?.data) {
        setSubjects(subjectResponse.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch assignments", error);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [dashboard]);

  useEffect(() => {
    let newFilteredAssignments = [...assignments];

    // Filter by status (Upcoming/Past)
    const now = new Date();
    if (activeFilter === "Upcoming") {
      newFilteredAssignments = newFilteredAssignments.filter(
        (a) => new Date(a.dueTime) >= now
      );
    } else if (activeFilter === "Past") {
      newFilteredAssignments = newFilteredAssignments.filter(
        (a) => new Date(a.dueTime) < now
      );
    }

    // Filter by class
    if (selectedClass !== "all") {
      newFilteredAssignments = newFilteredAssignments.filter(
        (a) => a.classId?._id === selectedClass
      );
    }

    // Filter by subject
    if (selectedSubject !== "all") {
      newFilteredAssignments = newFilteredAssignments.filter(
        (a) => a.subjectId?._id === selectedSubject
      );
    }

    setFilteredAssignments(newFilteredAssignments);
  }, [assignments, activeFilter, selectedClass, selectedSubject]);

  const handleCreationSuccess = () => {
    setCreateAssignment(false);
    fetchAssignments(); // Refetch assignments
  };

  const handleDeleteSuccess = () => {
    setDeletingAssignmentId(null);
    fetchAssignments();
  };

  const renderTableContent = () => {
    if (filteredAssignments.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="py-8 text-center">
            <div className="flex flex-col items-center">
              <img src={nofeed} alt="No assignments" className="w-24 h-24" />
              <p className="font-Outfit text-[#5F6D7E] mt-4">
                No assignments match the current filters.
              </p>
            </div>
          </td>
        </tr>
      );
    }

    return filteredAssignments.map((assignment, index) => {
      const isPast = new Date(assignment.dueTime) < new Date();
      return (
        <tr key={assignment._id}>
          <td className="font-Outfit py-4 px-6 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-left capitalize">
            {index + 1}
          </td>
          <td className="font-Outfit py-4 px-6 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-left capitalize">
            {assignment.title}
          </td>
          <td className="font-Outfit py-4 px-6 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-left capitalize">
            {assignment.subjectId?.name || "N/A"}
          </td>
          <td className="font-Outfit py-4 px-6 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-left capitalize">
            {assignment.classId?.name || "N/A"}
          </td>
          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 px-6 border-t border-[#EAEBF0] text-left capitalize">
            {new Date(assignment.dueTime).toLocaleDateString()}
          </td>
          <td className="font-Outfit text-sm py-4 px-6 border-t border-[#EAEBF0] text-left capitalize">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isPast
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isPast ? "Past" : "Upcoming"}
            </span>
          </td>
          <td className="font-Outfit text-sm text-[#5F6D7E] py-4 px-6 border-t border-[#EAEBF0] text-center">
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => setViewingAssignment(assignment)}
                className="text-gray-500 hover:text-[#0530A1]"
              >
                <Eye className="w-4" />
              </button>
              <button
                onClick={() => setDeletingAssignmentId(assignment._id)}
                className="text-gray-500 hover:text-red-600"
              >
                <Trash2 className="w-4" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="w-full">
      {viewingAssignment && (
        <ViewAssignment
          assignment={viewingAssignment}
          onBack={() => setViewingAssignment(null)}
        />
      )}
      {deletingAssignmentId && (
        <DeleteAssignment
          assignmentId={deletingAssignmentId}
          onCancel={() => setDeletingAssignmentId(null)}
          onSuccess={handleDeleteSuccess}
        />
      )}
      {createAssignment && (
        <CreateAssignment
          teacherId={teacherId}
          schoolId={schoolId}
          classes={classes}
          subjects={subjects}
          onCancel={() => setCreateAssignment(false)}
          onSuccess={handleCreationSuccess}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="flex border-b border-[#EAEBF0]">
          <button
            onClick={() => setActiveFilter("Upcoming")}
            className={`py-2 px-4 font-Outfit text-sm font-medium ${
              activeFilter === "Upcoming"
                ? "text-[#0530A1] border-b-2 border-[#0530A1]"
                : "text-[#5F6D7E]"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter("Past")}
            className={`py-2 px-4 font-Outfit text-sm font-medium ${
              activeFilter === "Past"
                ? "text-[#0530A1] border-b-2 border-[#0530A1]"
                : "text-[#5F6D7E]"
            }`}
          >
            Past
          </button>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
          >
            <option value="all">All Classes</option>
            {classes.map((c) => (
              <option key={c.classId} value={c.classId}>
                {c.className}
              </option>
            ))}
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-2 border border-[#DAE0E6] rounded-md font-Outfit text-sm"
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id} className=" capitalize">
                {s.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setCreateAssignment(true)}
            className="bg-[#0530A1] text-white font-Outfit text-sm font-medium py-2 px-4 rounded-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-white mr-2" />
            Create Assignment
          </button>
        </div>
      </div>

      <div className="border border-[#EAEBF0] rounded-[10px] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {[
                "S/N",
                "Title",
                "Subject",
                "Class",
                "Deadline",
                "Status",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-6 text-left"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td colSpan="7">
                <GenericLoadingSkeleton count={5} height={40} />
              </td>
            ) : (
              renderTableContent()
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherAssignments;
