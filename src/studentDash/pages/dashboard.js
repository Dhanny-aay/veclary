import { useContext, useEffect, useState } from "react";
import Headbar from "../components/headbar";
import Sidebar from "../components/sidebar";
import StudentAssignment from "../components/studentAssignment";
import StudentClassroom from "../components/studentClassroom";
import StudentEditProfile from "../components/studentEditProfile";
import StudentNotepad from "../components/studentNotepad";
import StudentPerfomance from "../components/studentPerformance";
import StudentSettings from "../components/studentSetting";
import StudentHome from "../components/studenthome";
import StudentLib from "../components/studentlib";
import StudentProfile from "../components/studentprofile";
import StudentSub from "../components/studentsub";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";
import StudentPayment from "../components/studentPayment";
import McqView from "../components/mcqView";
import McqQuestions from "../components/mcqQuestions";
import BookReader from "../components/bookReader";
import StudentAssistant from "../components/studentAssistant";
import { handleGetStudentProfile } from "../../controllers/studentControllers/userAuthController";
import { handleGetNotes } from "../../controllers/studentControllers/noteController";
import AddNote from "../components/addNote";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../../controllers/generalController/authController";

const Dashboard = () => {
  const [veclaryToken, setVeclaryToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState([]);
  const [newNote, setNewNote] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the item from localStorage
    const storedItem = localStorage.getItem("veclary_token");
    // Set the token if it exists
    if (storedItem) {
      setVeclaryToken(storedItem);
    } else {
      navigate("/studentlogin");
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await handleGetStudentProfile();
        if (data) {
          setProfile(data);
        } else {
          // enqueueSnackbar("Failed to fetch profile data", { variant: "error" });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        // enqueueSnackbar("An error occurred while fetching profile data", {
        //   variant: "error",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fetchNote = async () => {
    try {
      const data = await handleGetNotes();
      if (data) {
        setNote(
          data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        );
      } else {
        enqueueSnackbar("Failed to fetch Note data", { variant: "error" });
      }
    } catch (error) {
      console.error("Error fetching note:", error);
      enqueueSnackbar("An error occurred while fetching Note data", {
        variant: "error",
      });
    }
  };

  // console.log(note);

  useEffect(() => {
    fetchNote();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshToken();
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const componentMap = {
    Home: <StudentHome profile={profile} loading={loading} />,
    Lib: <StudentLib />,
    Subject: <StudentSub />,
    Profile: <StudentProfile profile={profile} loading={loading} />,
    Settings: <StudentSettings />,
    Classroom: <StudentClassroom />,
    EditProfile: <StudentEditProfile profile={profile} loading={loading} />,
    Performance: <StudentPerfomance />,
    Assignment: <StudentAssignment />,
    McqView: <McqView />,
    McqQuestions: <McqQuestions />,
    Notepad: (
      <StudentNotepad
        note={note}
        setNewNote={setNewNote}
        fetchNote={fetchNote}
      />
    ),
    Payments: <StudentPayment />,
    Reader: <BookReader />,
    Assistant: <StudentAssistant />,
  };

  const { activePage } = useContext(ActivePageContext);
  const { setSidebarVisible } = useContext(SidebarContext);

  useEffect(() => {
    setSidebarVisible(false);
  }, [activePage, setSidebarVisible]);

  const ComponentToRender = componentMap[activePage] || null;

  return (
    <>
      <div className=" relative">
        <Sidebar />
        <Headbar profile={profile} />
        {ComponentToRender}
        {newNote && <AddNote setNewNote={setNewNote} fetchNote={fetchNote} />}
      </div>
    </>
  );
};

export default Dashboard;
