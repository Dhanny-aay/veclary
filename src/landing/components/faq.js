import { useState } from 'react';
import arrowDown from './assets/arrow-down.svg';

const Faq = () => {


    const faqsData = [
        {
          question: "What are the different subscription plans offered by Velcary, and what are the benefits of each?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
          question: "Is Velcary safe for my child to use and what privacy measures are in place?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
          question: "How does Velcary personalize the learning experience for students?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            question: "Can I use Velcary on my mobile phone or tablet?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        {
            question: "How can I contact Velcary customer support if I have any questions?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        },
        
    ];

    const [openIndex, setOpenIndex] = useState(null);
    
      const toggleDropDown = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

      
    return ( 
        <div className=" px-4 md:px-6">
            <div className=" bg-[#121212] py-8 md:py-16 px-7 md:px-14 rounded-[20px]">
                <p className=" text-center font-Outfit text-white font-semibold text-2xl md:text-[40px] md:leading-[60px]">Our FAQs</p>
                <p className=" font-Outfit text-center text-sm md:text-xl text-[#fff] font-normal mt-3 mb-16 md:px-[12%]">Frequently asked questions?</p>

                {faqsData.map((faq, index) => (
                <div
                key={index}
                onClick={() => toggleDropDown(index)}
                className={`border-y py-6 w-full faq border-[#EAEBF0]${
                    openIndex === index ? ' active' : ''
                }`}
                >
                <div className="flex flex-row w-full justify-between items-center">
                    <p className="font-Outfit text-[#fff] text-sm md:text-base lg:text-xl font-medium">
                    {faq.question}
                    </p>
                    <img
                    src={arrowDown}
                    className={`${
                        openIndex === index ? 'transform rotate-180' : ''
                    } transition-transform duration-300`}
                    alt=""
                    />
                </div>
                <div className={`answer${openIndex === index ? ' open' : ''}`}>
                    <p className="font-Outfit text-[#fff] font-normal text-sm md:text-base mt-5 transition-all duration-500">
                    {faq.answer}
                    </p>
                </div>
                </div>
            ))}

            </div>
        </div>
     );
}
 
export default Faq;