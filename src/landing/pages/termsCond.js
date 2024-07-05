import Footer from "../components/footer";
import Navbar from "../components/navbar";
import lines from "./assets/lines.svg";
import vector from "./assets/Vector.svg";
import { useState, useEffect } from "react";

const TermsCond = () => {
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
          <p className=" font-semibold text-3xl md:text-[55px] md:leading-[82px] font-Outfit text-center md:px-[15%]">
            Our Terms And Conditions
          </p>
          <p className=" text-center font-normal mt-3 text-[#000000CC] font-Outfit text-lg md:text-xl md:px-[15%] ">
            A friendly guide to how things work when you use our platform. It's
            important, so please read it carefully. By using Veclary, you're
            agreeing to these terms.
          </p>
          <div className=" my-10 md:my-16 md:px-[15%]">
            <div className=" font-Outfit font-normal text-base space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Definitions
              </p>
              <p className=" text-[#000000CC] text-base text-justify">
                The following terms "Veclary," "we," "us," or "our" refer to
                Veclary Limited, the provider of the Veclary platform, while
                "Platform" refers to the Veclary website, mobile applications,
                and all related services, and "User," "you," or "your" refers to
                any individual or entity that accesses or uses the Platform, and
                "Content" refers to any information, data, text, software,
                music, sound, photographs, graphics, video, messages, or other
                materials uploaded, posted, or otherwise made available on the
                Platform.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Acceptance of Terms
              </p>
              <p className=" text-[#000000CC] text-base text-justify">
                By accessing or using the Platform, you agree to be bound by
                these Terms and Conditions and our Privacy Policy. If you do not
                agree with these terms, you may not use the Platform.
              </p>
            </div>

            <div className=" font-Outfit font-normal text-base mt-8 space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                User Accounts and Eligibility
              </p>
              <p className=" text-[#000000CC] text-base text-justify">
                <span className=" text-black font-semibold">
                  Account Creation:
                </span>
                 To access certain features of the Platform, you may be required
                to create an account. You must provide accurate and complete
                information when creating an account and keep your information
                updated.
                <br />
                <span className=" text-black font-semibold">
                  Account Security: 
                </span>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
                <br />
                <span className=" text-black font-semibold">Eligibility:</span>
                 You must be at least 13 years old to use the Platform. If you
                are under 18, you represent that you have obtained the consent
                of a parent or legal guardian to use the Platform. <br />
                <span className=" text-black font-semibold">
                  Schools and Publishers:
                </span>
                 Separate terms may apply to schools and publishers who use the
                Platform for educational or commercial purposes.
              </p>
            </div>

            <div className=" font-Outfit font-normal text-base mt-8 space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                User Content
              </p>
              <p className=" font-Outfit text-base text-[#000000CC] font-normal">
                <span className=" text-black font-semibold">Ownership:</span>
                 You retain ownership of any intellectual property rights you
                hold in the Content you create or submit to the Platform.
                <br />
                <span className=" text-black font-semibold">License: </span>By
                submitting Content to the Platform, you grant Veclary a
                worldwide, non-exclusive, royalty-free, sublicensable, and
                transferable license to use, reproduce, distribute, prepare
                derivative works of, display, and perform the Content in
                connection with the Platform and Veclary's business.
                <br />
                <span className=" text-black font-semibold">
                  Acceptable Use:
                </span>
                 You agree not to upload, post, or otherwise make available on
                the Platform any Content that is unlawful, harmful, threatening,
                abusive, harassing, defamatory, vulgar, obscene, invasive of
                another's privacy, hateful, or discriminatory.
              </p>
            </div>

            <div className=" font-Outfit font-normal text-base mt-8 space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Veclary Content
              </p>
              <p className=" text-[#000000CC] text-base text-justify">
                All content provided by Veclary on the Platform, including but
                not limited to text, software, graphics, logos, and images, is
                the property of Veclary or its licensors and is protected by
                copyright, trademark, and other intellectual property laws.
              </p>
            </div>

            <div className=" font-Outfit font-normal text-base mt-8 text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Prohibited Conduct
              </p>
              <p className=" font-semibold">You agree not to:</p>
              <p className="  text-[#000000CC] text-base">
                Violate any applicable laws or regulations.
              </p>
              <p className="  text-[#000000CC] text-base">
                Infringe upon the intellectual property rights of Veclary or any
                third party.
              </p>
              <p className="  text-[#000000CC] text-base">
                Use the Platform for any unauthorized or illegal purpose.
              </p>
              <p className="  text-[#000000CC] text-base">
                Interfere with or disrupt the operation of the Platform or the
                servers or networks connected to the Platform.
              </p>
              <p className="  text-[#000000CC] text-base">
                Attempt to gain unauthorized access to any portion of the
                Platform or any other accounts, computer systems, or networks
                connected to the Platform.
              </p>
            </div>

            <div className=" font-Outfit font-normal text-base mt-8 text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Termination
              </p>
              <p className=" text-[#000000CC] text-base">
                Veclary reserves the right to suspend or terminate your access
                to the Platform at any time, for any reason, without notice or
                liability.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Disclaimer of Warranties
              </p>
              <p className=" text-[#000000CC] text-base">
                THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
                VECLARY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND,
                EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE PLATFORM OR THE
                INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THE
                PLATFORM.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Limitation of Liability
              </p>
              <p className=" text-[#000000CC] text-base">
                TO THE FULLEST EXTENT PERMITTED BY LAW, VECLARY WILL NOT BE
                LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE
                PLATFORM, INCLUDING, BUT NOT LIMITED TO, DIRECT, INDIRECT,
                INCIDENTAL, PUNITIVE, AND CONSEQUENTIAL DAMAGES.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-semibold text-center">
                Indemnification
              </p>
              <p className=" text-[#000000CC] text-base">
                You agree to indemnify and hold Veclary harmless from any
                claims, losses, damages, liabilities, and expenses (including
                attorneys' fees) arising from your use of the Platform or your
                violation of these Terms and Conditions.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-[#000000CC] text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-medium text-black text-center">
                Modifications to Terms
              </p>
              <p>
                Veclary reserves the right to modify these Terms and Conditions
                at any time. Your continued use of the Platform following any
                such modification constitutes your agreement to be bound by the
                modified terms.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-[#000000CC] text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-medium text-black text-center">
                Governing Law and Dispute Resolution
              </p>
              <p>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of the Federal Republic of Nigeria. Any
                dispute arising from or relating to these Terms and Conditions
                will be subject to the exclusive jurisdiction of the courts of
                Nigeria.
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-[#000000CC] text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-medium text-black text-center">
                Contact Information
              </p>
              <p>
                If you have any questions or concerns regarding these Terms and
                Conditions, please contact Veclary at [email protected]
              </p>
            </div>
            <div className=" font-Outfit font-normal text-base mt-8 text-[#000000CC] text-justify space-y-3">
              <p className=" font-Outfit text-2xl font-medium text-black text-center">
                Please read these terms carefully before using the Veclary
                platform.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TermsCond;
