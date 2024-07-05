import Banner from "../components/banner";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";
import lines from "./assets/lines.svg";
import blog3 from "./assets/blog3.svg";
import blog2 from "./assets/blog2.svg";
import copy from "./assets/copy.svg";
import Blog from "../components/blog";

const DetailedBlog = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the width as needed
    };

    // Initial check on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        style={
          isMobile
            ? {
                backgroundImage: `url(${vector})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <Navbar />
        <div
          style={
            isMobile
              ? {}
              : {
                  backgroundImage: `url(${lines})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }
          }
          className="w-full flex flex-col items-center justify-center py-8 px-4 font-Outfit md:py-16 md:px-20 text-black"
        >
          <p className=" text-center font-Outfit font-semibold text-2xl md:text-[55px] text-[#101828] md:leading-[82px]">
            Veclary review presentations
          </p>
          <p className=" font-Outfit text-center text-sm md:text-xl text-[#101828] font-normal mt-3 md:px-[12%]">
            How do you create compelling presentations that wow your colleagues
            and impress your managers? Here’s how to get started.
          </p>
          <p className=" text-[#344054] font-Outfit font-semibold text-lg mt-6">
            Olivia Rhye
          </p>
          <p className=" font-Outfit text-base font-normal text-[#475467]">
            20 Jan 2024
          </p>
          <div className=" w-full md:px-[8%] mt-8">
            <div
              style={{
                backgroundImage: `url(${blog3})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full h-[400px] rounded-[10px]"
            ></div>
          </div>

          <div className=" mt-12 w-full md:px-[15%]">
            <p className=" font-Outfit font-normal text-[#475467] text-base md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
              massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
              purus. Non massa enim vitae duis mattis. Vel in ultricies vel
              fringilla.
            </p>
            <div className=" mt-12">
              <p className=" font-Outfit text-[#101828] font-semibold text-xl md:text-3xl">
                Introduction
              </p>
              <p className=" mt-6 font-Outfit font-normal text-base md:text-lg text-[#475467]">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id. Eget quis mi enim, leo
                lacinia pharetra, semper. Eget in volutpat mollis at volutpat
                lectus velit, sed auctor. Porttitor fames arcu quis fusce augue
                enim. Quis at habitant diam at. Suscipit tristique risus, at
                donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet
                sodales id est ac volutpat.{" "}
              </p>
            </div>
            <div
              style={{
                backgroundImage: `url(${blog2})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full h-[480px] rounded-[10px] mt-12"
            ></div>
            <p className=" mt-4 font-Outfit text-sm text-[#475467] font-normal">
              Image courtesy of Laura Davidson via Unsplash
            </p>
            <div className=" border-l-2 border-[#2F52FF] mt-12 px-5 py-2">
              <p className=" font-Outfit font-medium text-[#101828] text-xl md:text-2xl">
                “In a world older and more complete than ours they move finished
                and complete, gifted with extensions of the senses we have lost
                or never attained, living by voices we shall never hear.”
              </p>
              <p className=" mt-8 font-Outfit font-normal text-base text-[#475467]">
                —Veek Design, Product Designer
              </p>
            </div>

            <p className=" mt-12 font-Outfit font-normal text-base md:text-lg text-[#475467]">
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
              nulla odio nisl vitae. In aliquet pellentesque aenean hac
              vestibulum turpis mi bibendum diam. Tempor integer aliquam in
              vitae malesuada fringilla.
              <br />
              <br />
              Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
              commodo consectetur convallis risus. Sed condimentum enim
              dignissim adipiscing faucibus consequat, urna. Viverra purus et
              erat auctor aliquam. Risus, volutpat vulputate posuere purus sit
              congue convallis aliquet. Arcu id augue ut feugiat donec porttitor
              neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem
              id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
              <br />
              <br />
              Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
              mauris id. Non pellentesque congue eget consectetur turpis.
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
              aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
              felis elit erat nam nibh orci.
            </p>

            <div className=" mt-12">
              <p className=" font-Outfit text-[#101828] font-semibold text-xl md:text-3xl">
                Software and tools
              </p>
              <p className=" mt-6 font-Outfit font-normal text-base md:text-lg text-[#475467]">
                Pharetra morbi libero id aliquam elit massa integer tellus. Quis
                felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit
                dictumst ut eget a, elementum eu. Maecenas est morbi mattis id
                in ac pellentesque ac.
              </p>
            </div>

            <div className=" mt-12">
              <p className=" font-Outfit text-[#101828] font-semibold text-xl md:text-3xl">
                Other resources
              </p>
              <p className=" mt-6 font-Outfit font-normal text-base md:text-lg text-[#475467]">
                Sagittis et eu at elementum, quis in. Proin praesent volutpat
                egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi
                ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate
                consectetur ac ultrices at diam dui eget fringilla tincidunt.
                Arcu sit dignissim massa erat cursus vulputate gravida id. Sed
                quis auctor vulputate hac elementum gravida cursus dis.
                <br />
                <br />
                1. Lectus id duis vitae porttitor enim gravida morbi.
                <br />
                2. Eu turpis posuere semper feugiat volutpat elit, ultrices
                suspendisse. Auctor vel in vitae placerat.
                <br />
                3. Suspendisse maecenas ac donec scelerisque diam sed est duis
                purus.
                <br />
              </p>
            </div>

            <div
              style={{
                backgroundImage: `url(${blog2})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className=" w-full h-[480px] rounded-[10px] mt-12"
            ></div>
            <p className=" mt-4 font-Outfit text-sm text-[#475467] font-normal">
              Image courtesy of Laura Davidson via Unsplash
            </p>

            <p className=" mt-12 font-Outfit font-normal text-base md:text-lg text-[#475467]">
              Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
              nulla odio nisl vitae. In aliquet pellentesque aenean hac
              vestibulum turpis mi bibendum diam. Tempor integer aliquam in
              vitae malesuada fringilla.
              <br />
              <br />
              Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet
              commodo consectetur convallis risus. Sed condimentum enim
              dignissim adipiscing faucibus consequat, urna. Viverra purus et
              erat auctor aliquam. Risus, volutpat vulputate posuere purus sit
              congue convallis aliquet. Arcu id augue ut feugiat donec porttitor
              neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem
              id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
              <br />
              <br />
              Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
              mauris id. Non pellentesque congue eget consectetur turpis.
              Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
              aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
              felis elit erat nam nibh orci.
            </p>

            <div className=" mt-12">
              <p className=" font-Outfit text-[#101828] font-semibold text-xl md:text-3xl">
                Conclusion
              </p>
              <p className=" mt-6 font-Outfit font-normal text-base md:text-lg text-[#475467]">
                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus
                id scelerisque est ultricies ultricies. Duis est sit sed leo
                nisl, blandit elit sagittis. Quisque tristique consequat quam
                sed. Nisl at scelerisque amet nulla purus habitasse.
                <br />
                <br />
                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas
                condimentum mi massa. In tincidunt pharetra consectetur sed duis
                facilisis metus. Etiam egestas in nec sed et. Quis lobortis at
                sit dictum eget nibh tortor commodo cursus.
                <br />
                <br />
                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce
                aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare
                id morbi eget ipsum. Aliquam senectus neque ut id eget
                consectetur dictum. Donec posuere pharetra odio consequat
                scelerisque et, nunc tortor.
                <br />
                <br /> Nulla adipiscing erat a erat. Condimentum lorem posuere
                gravida enim posuere cursus diam.
              </p>
            </div>

            <button className=" mt-12 border border-[#D0D5DD] rounded-[8px] flex items-center flex-row space-x-2 px-4 py-[10px]">
              <img src={copy} alt="" />
              <p className=" font-Outfit text-[#344054] text-sm font-semibold">
                Copy Link
              </p>
            </button>
          </div>
          <Blog />
        </div>
        <Banner />
        <Footer />
      </div>
    </>
  );
};

export default DetailedBlog;
