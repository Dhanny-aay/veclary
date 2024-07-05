import arrowBlue from "./assets/arrowblue.svg";
import search from "./assets/Search.svg";
import bookmark from "./assets/Bookmark.svg";
import edit from "./assets/UX_Writing.png";
import { useContext, useState } from "react";
import { ActivePageContext } from "../contexts/ActivePageContext";

const BookReader = () => {
  const { activePage, setActivePage } = useContext(ActivePageContext);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <>
      <div className=" fixed h-dvh w-full bg-white left-0 right-0 z-[99999]">
        <div className=" relative">
          {/* headbar */}
          <div className=" w-full py-8 px-8 flex items-center justify-between fixed top-0 left-0 bg-white">
            <span
              onClick={() => handleClick("Home")}
              className=" cursor-pointer flex w-[300px] flex-row items-center"
            >
              <img src={arrowBlue} alt="" />
              <p className=" font-Outfit text-[#0530A1] text-sm font-medium">
                Back
              </p>
              <p className=" font-Outfit text-xl font-semibold mb-2 ml-3">
                E-Library
              </p>
            </span>
            <p className=" font-Outfit text-[#00000080] w-[300px] text-[32px] font-semibold">
              Chalice of the Gods
            </p>
            <span className=" flex items-center justify-end w-[300px] space-x-4">
              <img src={search} alt="search" />
              <img src={bookmark} alt="bookmark" />
              <img src={edit} alt="edit" />
            </span>
          </div>

          {/* content */}
          <div className=" w-full overflow-y-auto pb-8 mt-24 h-[70vh]">
            <div className=" w-full px-[20%] mt-6">
              <p className=" font-Outfit text-[#101828] font-semibold text-3xl">
                Introduction
              </p>
              <p className=" font-Outfit text-[#475467] text-lg font-normal mt-6">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
                <br />
                <br />
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
              <p className=" font-Outfit text-[#475467] text-lg font-normal mt-6">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
                <br />
                <br />
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
            </div>
          </div>

          {/* progress bar */}
          <div className=" flex flex-col items-center justify-center fixed w-full left-0 bottom-0 h-[120px] bg-white px-8">
            <p className=" text-center font-Outfit text-[#00000080] font-semibold text-lg">
              Page 1 of 120
            </p>
            <div className=" w-full h-2 rounded-[5px] bg-[#F5F8FE] mt-6 relative">
              <span className=" w-[4%] absolute h-2 top-0 left-0 rounded-[5px] bg-[#0530A1]"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookReader;
