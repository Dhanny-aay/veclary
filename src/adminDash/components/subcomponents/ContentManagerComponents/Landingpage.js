import React, { useState, useEffect } from "react";
import pload from "./assets/pload.svg";
import { ContentService } from "../../../../services/adminService";
import SnackbarUtils from "../../../../utils/snackbarUtils";
import GenericLoadingSkeleton from "../../../../utils/loadingSkeleton";

const LandingPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await ContentService.getHomePageContent();
        if (response) {
          setContent(response);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch content.");
        SnackbarUtils.error(err.message || "Failed to fetch content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <GenericLoadingSkeleton count={5} />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <>
      <div className=" w-full mt-6">
        {/* Hero slide 1 */}
        <div>
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Hero Section slide 1
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.heroSlides?.[0]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={content?.heroSlides?.[0]?.subheading}
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.heroSlides?.[0]?.image || pload}
                  alt="Hero Slide 1"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Hero slide 2 */}
        <div className=" mt-8">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Hero Section slide 2
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.heroSlides?.[1]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={content?.heroSlides?.[1]?.subheading}
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.heroSlides?.[1]?.image || pload}
                  alt="Hero Slide 2"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Hero slide 3 */}
        <div className=" mt-8">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Hero Section slide 3
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.heroSlides?.[2]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={content?.heroSlides?.[2]?.subheading}
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.heroSlides?.[2]?.image || pload}
                  alt="Hero Slide 3"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Hero slide 4 */}
        <div className=" mt-8">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Hero Section slide 4
          </p>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.heroSlides?.[3]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={content?.heroSlides?.[3]?.subheading}
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.heroSlides?.[3]?.image || pload}
                  alt="Hero Slide 4"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Our Leaderboard Section */}
        <div className=" mt-8 w-full">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Our Leaderboard Section
          </p>

          <div className=" mt-3">
            <label
              htmlFor=""
              className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
            >
              Heading
              <textarea
                name=""
                className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                defaultValue={content?.leaderboard?.heading}
                id=""
              ></textarea>
            </label>
            <label
              htmlFor=""
              className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
            >
              Sub-Heading
              <textarea
                name=""
                className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                defaultValue={content?.leaderboard?.subheading}
                id=""
              ></textarea>
            </label>
          </div>
        </div>

        {/* What we offer Section */}
        <div className=" mt-8">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            What we offer Section
          </p>
          <div className=" grid grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading 1
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whatWeOffer?.heading1}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 1
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={content?.whatWeOffer?.subheading1}
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading 2
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whatWeOffer?.heading2}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 2
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={content?.whatWeOffer?.subheading2}
                  id=""
                ></textarea>
              </label>
            </div>
          </div>
        </div>

        {/*Who is veclary for? Section  */}
        <div className=" mt-8 w-full">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Who is veclary for? Section
          </p>
          <div className=" mt-3">
            <label
              htmlFor=""
              className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
            >
              Heading
              <textarea
                name=""
                className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                defaultValue={content?.whoIsVeclaryFor?.heading}
                id=""
              ></textarea>
            </label>
            <label
              htmlFor=""
              className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
            >
              Sub-Heading
              <textarea
                name=""
                className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                defaultValue={content?.whoIsVeclaryFor?.subheading}
                id=""
              ></textarea>
            </label>
          </div>
          {/* Who is veclary for? Section 1 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading for section 1
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whoIsVeclaryFor?.sections?.[0]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 1
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={
                    content?.whoIsVeclaryFor?.sections?.[0]?.subheading
                  }
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image 1
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.whoIsVeclaryFor?.sections?.[0]?.image || pload}
                  alt="Section 1"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
          {/* Who is veclary for? Section 2 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading for section 2
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whoIsVeclaryFor?.sections?.[1]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 2
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={
                    content?.whoIsVeclaryFor?.sections?.[1]?.subheading
                  }
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image 2
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.whoIsVeclaryFor?.sections?.[1]?.image || pload}
                  alt="Section 2"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
          {/* Who is veclary for? Section 3 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading for section 3
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whoIsVeclaryFor?.sections?.[2]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 3
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={
                    content?.whoIsVeclaryFor?.sections?.[2]?.subheading
                  }
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image 3
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.whoIsVeclaryFor?.sections?.[2]?.image || pload}
                  alt="Section 3"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
          {/* Who is veclary for? Section 4 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading for section 4
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whoIsVeclaryFor?.sections?.[3]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 4
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={
                    content?.whoIsVeclaryFor?.sections?.[3]?.subheading
                  }
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image 4
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.whoIsVeclaryFor?.sections?.[3]?.image || pload}
                  alt="Section 4"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
          {/* Who is veclary for? Section 5 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading for section 5
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whoIsVeclaryFor?.sections?.[4]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 5
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={
                    content?.whoIsVeclaryFor?.sections?.[4]?.subheading
                  }
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image 5
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.whoIsVeclaryFor?.sections?.[4]?.image || pload}
                  alt="Section 5"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
          {/* Who is veclary for? Section 6 */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
              >
                Heading for section 6
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                  defaultValue={content?.whoIsVeclaryFor?.sections?.[5]?.heading}
                  id=""
                ></textarea>
              </label>
              <label
                htmlFor=""
                className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
              >
                Sub-Heading 6
                <textarea
                  name=""
                  className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                  defaultValue={
                    content?.whoIsVeclaryFor?.sections?.[5]?.subheading
                  }
                  id=""
                ></textarea>
              </label>
            </div>
            <div>
              <p className="  font-Outfit text-[#272D37] font-medium text-sm">
                Upload hero image 6
              </p>
              <div className=" mt-2 w-full border border-[#DAE0E6] rounded-[5px] flex items-center justify-center flex-col p-6">
                <img
                  src={content?.whoIsVeclaryFor?.sections?.[5]?.image || pload}
                  alt="Section 6"
                />
                <p className=" mt-3 text-sm font-normal font-Outfit text-[#667085]">
                  <span className=" font-semibold text-[#0530A1] mr-1">
                    Click to upload
                  </span>
                  or drag and drop
                </p>
                <p className=" mt-1 text-xs font-normal font-Outfit text-[#667085]">
                   PDF, EPUB, or MOBI. (max. 200mb)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className=" mt-8 w-full">
          <p className=" font-Outfit text-[#121212] font-semibold text-xl">
            Footer
          </p>

          <div className=" mt-3">
            <label
              htmlFor=""
              className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm"
            >
              Footer Heading
              <textarea
                name=""
                className=" border border-[#DAE0E6] rounded-[6px] mt-2 resize-none"
                defaultValue={content?.footer?.heading}
                id=""
              ></textarea>
            </label>
            <label
              htmlFor=""
              className="flex flex-col font-Outfit text-[#272D37] font-medium text-sm mt-3"
            >
              Footer Sub-Heading
              <textarea
                name=""
                className=" border border-[#DAE0E6] rounded-[6px] mt-2 h-[100px] resize-none"
                defaultValue={content?.footer?.subheading}
                id=""
              ></textarea>
            </label>
          </div>
        </div>
      </div>
    </>
  ); 
};

export default LandingPage;
