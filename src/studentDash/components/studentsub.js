import arrowBlue from "./assets/arrowblue.svg";
import biology from "./assets/biolo.svg";
import chem from "./assets/chemistry.svg";
import maths from "./assets/math.svg";
import geopgraphy from "./assets/geo.svg";
import hist from "./assets/hist.svg";
import bookimg from "./assets/bookimg.svg";
import phys from "./assets/physics.svg";
import { useContext, useState } from "react";
import like from "./assets/like.svg";
import share from "./assets/share.svg";
import {
  ActivePageContext,
  SidebarContext,
} from "../contexts/ActivePageContext";

const StudentSub = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showSubjects, setShowSubjects] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { sidebarVisible, setSidebarVisible } = useContext(SidebarContext);
  const { activePage, setActivePage } = useContext(ActivePageContext);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const subject = [
    {
      name: "Biology",
      content: [
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
      ],
      img: biology,
    },

    {
      name: "Chemistry",
      content: [
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
      ],
      img: chem,
    },

    {
      name: "Mathematics",
      content: [
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
      ],
      img: maths,
    },

    {
      name: "Geography",
      content: [
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
      ],
      img: geopgraphy,
    },

    {
      name: "History",
      content: [
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
      ],
      img: hist,
    },

    {
      name: "Physics",
      content: [
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "School Assigned Books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Other Related books",
        },
        {
          img: bookimg,
          name: "Chalice of the Gods",
          date: "February 24, 2023",
          desc: "Biology 2e is designed to cover the scope and sequence requirements of a typical two-semester biology course for science majors. The text provides comprehensive coverage of foundational research and core biology concepts through an evolutionary lens. Biology includes rich features that engage students in scientific inquiry, highlight careers in the biological sciences, and offer everyday applications. The book also includes various types of practice and homework questions that help students understand—and apply—key concepts.",
          author:
            "Mary Ann Clark, Texas Wesleyan University Matthew Douglas, Grand Rapids Community College Jung Choi, Georgia Institute of Technology",
          tag: "Course Resources",
        },
      ],
      img: phys,
    },
  ];

  const [activeButton, setActiveButton] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleButtonClick = (tag) => {
    setActiveButton(tag);
    setSelectedTag(tag);
    if (tag === "all") {
      setFilteredCategories(selectedSubject.content);
    } else {
      const filtered = selectedSubject.content.filter(
        (category) => category.tag === tag
      );
      setFilteredCategories(filtered);
    }
  };

  const handleClick = (subject) => {
    setSelectedSubject(subject);
    setShowSubjects(false);
    setFilteredCategories(subject.content);
    setActiveButton("all");
    setSelectedTag("all");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleBack = () => {
    if (selectedItem) {
      setSelectedItem(null); // Clear selectedItem
    } else {
      setSelectedSubject(null); // Clear selectedSubject if selectedItem is not present
      setShowSubjects(true); // Show subjects again
    }
  };

  return (
    <>
      {!selectedItem && (
        <div
          onClick={() => {
            setSidebarVisible(false);
          }}
          className="absolute lg:left-[20%] top-[56px] p-6 w-full lg:w-[80%]"
        >
          <span className="flex flex-row items-center">
            {selectedSubject && (
              <>
                <img src={arrowBlue} alt="" onClick={handleBack} />
                <p
                  className="font-Outfit text-[#0530A1] text-sm font-medium cursor-pointer"
                  onClick={handleBack}
                >
                  Back
                </p>
              </>
            )}
            <p className="font-Outfit text-xl font-semibold mb-2 ml-3">
              Subjects
            </p>
          </span>

          {showSubjects && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subject.map((subject, index) => (
                <div
                  key={index}
                  className="w-full bg-[#f8f8f8] p-6 rounded-[15px]"
                  onClick={() => handleClick(subject)}
                >
                  <p className="font-Outfit text-xl font-semibold">
                    {subject.name}
                  </p>
                  <div className="w-full h-[200px] mt-6 rounded-[10px] flex justify-center items-center bg-[#C9E4FC]">
                    <img
                      src={subject.img}
                      className="w-[50%] h-[150px]"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedSubject && !selectedItem && (
        <div
          onClick={() => {
            setSidebarVisible(false);
          }}
          className="absolute lg:left-[20%] top-[102px] py-6 w-full lg:w-[80%]"
        >
          <div className=" w-full px-6 bg-[#C9E4FC] flex justify-between items-center">
            <p className=" font-Outfit text-3xl font-semibold py-[32px]">
              {selectedSubject.name}
            </p>
            <img
              src={selectedSubject.img}
              className=" w-[13%] h-[100px] py-1"
              alt=""
            />
          </div>

          <div className=" w-full px-6 mt-6">
            <p className=" font-Outfit text-xl font-semibold">
              Explore E-Books on {selectedSubject.name}
            </p>
            <div className="flex w-full flex-row items-center justify-start mt-8 overflow-auto space-x-6 border-b border-[#EAEBF0]">
              <button
                className={`font-normal font-Outfit text-sm pb-2 text-[#00000080] md:w-auto transition-all ${
                  activeButton === "all"
                    ? "border-b-[3px] border-[#0530A1] text-[#0530A1]"
                    : ""
                }`}
                onClick={() => handleButtonClick("all")}
              >
                All
              </button>
              {/* Display unique categories */}
              {Array.from(
                new Set(selectedSubject.content.map((category) => category.tag))
              ).map((tag, index) => (
                <button
                  key={index}
                  className={`font-normal font-Outfit pb-2 text-sm text-[#00000080] transition-all ${
                    activeButton === tag
                      ? "border-b-[3px] border-[#0530A1] text-[#0530A1]"
                      : ""
                  }`}
                  onClick={() => handleButtonClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className=" grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 mt-4">
              {filteredCategories.map((item, index) => (
                <div
                  key={index}
                  className=" flex flex-col w-full"
                  onClick={() => handleItemClick(item)}
                >
                  <span
                    style={{
                      backgroundImage: `url(${item.img})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className=" w-full h-[150px] bg-[#fff]"
                  ></span>
                  <p className=" mt-3 font-Outfit text-xs font-normal">
                    {item.name}
                  </p>
                  <p className=" font-Outfit text-[10px] text-[#000000CC]">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedItem && (
        <div
          onClick={() => {
            setSidebarVisible(false);
          }}
          className="absolute lg:left-[20%] top-[56px] py-6 w-full lg:w-[80%]"
        >
          <div className="flex px-6 items-center space-x-3">
            <span className="flex items-center">
              <img src={arrowBlue} alt="" onClick={handleBack} />
              <p
                className="font-Outfit text-[#0530A1] text-sm font-medium cursor-pointer ml-1"
                onClick={handleBack}
              >
                Back
              </p>
            </span>
            <p className="font-Outfit text-2xl mb-2 font-semibold">Books</p>
            {/* You can add more details or components here */}
          </div>

          <div
            style={{
              backgroundImage: `url(${selectedItem.img})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className=" w-full bg-[#C9E4FC] mt-6 flex h-[120px] px-6 relative items-center"
          >
            <p className=" font-Outfit text-3xl font-semibold text-white z-[99]">
              {selectedItem.name}
            </p>
            <div className=" w-full absolute h-full left-0 top-0 bg-[#ffffff03] backdrop-blur-[2px]"></div>
          </div>

          <div className=" w-full p-6 flex justify-between flex-col space-y-6 lg:space-y-0 lg:flex-row items-start lg:items-center">
            <span className=" flex flex-col">
              <p className=" font-Outfit text-base font-semibold">Author:</p>
              <span className=" text-xs font-Outfit w-[250px] mt-2 font-normal">
                {selectedItem.author}
              </span>
            </span>
            <span className=" flex flex-col">
              <p className=" font-Outfit text-base font-semibold">Publisher:</p>
              <span className=" text-xs font-Outfit w-[250px] mt-2 font-normal">
                N/A
              </span>
            </span>

            <div className=" flex items-center space-x-8">
              <button className=" flex flex-col items-center space-y-2">
                <img src={like} alt="" />
                <p className=" font-Outfit text-sm font-normal text-[#222328]">
                  Add to favorite
                </p>
              </button>

              <button className=" flex flex-col items-center space-y-2">
                <img src={share} alt="" />
                <p className=" font-Outfit text-sm font-normal text-[#222328]">
                  Share
                </p>
              </button>
              <button
                onClick={() => handlePageClick("Reader")}
                className=" text-center  text-base font-Outfit font-medium text-white bg-[#0530A1] py-3 px-8 rounded-[10px]"
              >
                Open Book
              </button>
            </div>
          </div>
          <div className=" px-6">
            <span className=" flex flex-col">
              <p className=" font-Outfit text-base font-semibold">
                Description:
              </p>
              <span className=" text-xs font-Outfit mt-2 font-normal">
                {selectedItem.desc}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSub;
