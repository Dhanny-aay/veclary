import { useState } from "react";
import img1 from './assets/img1.svg';
import img2 from './assets/img2.svg';
import img3 from './assets/img3.svg';
import img4 from './assets/img4.svg';
import img5 from './assets/img5.svg';
import img6 from './assets/img6.svg';
import img7 from './assets/img7.svg';

const Libary = () => {


    const categories = [
        { img:img1, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Science' },
        { img:img2, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Science' },
        { img:img3, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Science' },
        { img:img4, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Art' },
        { img:img5, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Art' },
        { img:img6, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Economics' },
        { img:img7, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Economics' },
        { img:img1, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Economics' },
        { img:img2, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Literature' },
        { img:img3, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'Literature' },
        { img:img4, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'History' },
        { img:img5, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'History' },
        { img:img6, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'History' },
        { img:img7, name: 'Chalice of the Gods', date:'February 24, 2023', tag: 'History' },
    ];

    //states
    const [activeButton, setActiveButton] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [filteredCategories, setFilteredCategories] = useState(categories);

    // Function to handle button click
    const handleButtonClick = (tag) => {
        setActiveButton(tag);
        if (tag === 'all') {
            setFilteredCategories(categories);
        } else {
            const filtered = categories.filter(category => category.tag === tag);
            setFilteredCategories(filtered);
        }
    };

    return ( 
        <>
        <div className=" py-8 md:py-16 px-4 md:px-20 w-full flex flex-col items-center justify-center">
            <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">Unlimited Access To Our Vast E-library </p>

            {/* Toggle options */}
            <div className="flex w-full flex-row items-center justify-start md:justify-center mt-8 overflow-auto">
                <button
                    className={`font-normal font-Outfit text-base md:text-xl md:w-auto transition-all ${activeButton === 'all' ? 'border-b-2 border-[#000]' : ''}`}
                    onClick={() => handleButtonClick('all')}
                >
                    All categories
                </button>
                {/* Display unique categories */}
                {Array.from(new Set(categories.map(category => category.tag))).map((tag, index) => (
                    <button
                        key={index}
                        className={`font-normal font-Outfit text-base md:text-xl px-5 transition-all ${activeButton === tag ? 'border-b-2 border-[#000]' : ''}`}
                        onClick={() => handleButtonClick(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className=" w-full mt-8 grid grid-cols-4 lg:grid-cols-7 gap-[3%]">
                {filteredCategories.map((item, index) => (
                    <div key={index} className=" w-full mt-4">
                        <div style={{backgroundImage:`url(${item.img})`, backgroundPosition:'center', backgroundSize:'cover'}}  className=" w-full h-[200px] rounded-md bg-[#f1f1f1]"></div>
                        <p className=" font-Outfit mt-3 text-sm md:text-base font-normal leading-5">{ item.name }</p>
                        <p className=" text-[#000000CC] font-Outfit text-[9px] md:text-xs mt-[6px]">{ item.date }</p>
                    </div>
                ))}
            </div>

            <div className=" w-full flex justify-center items-center">
                <button className=' mt-[160px] lg:mt-[72px] rounded-[5px] px-6 py-3 font-Outfit text-base font-semibold bg-[#2F52FF] shadow-sm shadow-[#1018280A] text-[#fff] text-center'>View all</button>
            </div>
        </div>
        </>
     );
}
 
export default Libary;