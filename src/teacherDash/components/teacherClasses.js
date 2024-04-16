import { useContext, useState } from "react";
import { TeacherActivePageContext, TeacherSidebarContext } from "../contexts/TeacherActivePageContext";
import arrowBlue from './assets/arrowblue.svg';
import classbg from './assets/classbg.svg';
import chart from './assets/chart.svg';
import chart1 from './assets/chart1.svg';
import chart2 from './assets/chart2.svg';
import nofeed from './assets/nofeed.svg';
import blueplus from './assets/blueplus.svg';
import file from './assets/file.svg';
import edit from './assets/edit.svg';
import trash from './assets/trash.svg';
import close from './assets/clos.svg';
import announce from './assets/announce.svg';
import { DatePicker } from "rsuite";

const TeacherClasses = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(TeacherSidebarContext);
    const {activePage, setActivePage} = useContext(TeacherActivePageContext);
    const [selectedClass, setSelectedClass] = useState(null);
    const [createSchedule, setCreateSchedule] = useState(false);




    const handleClick = (page) => {
        setActivePage(page);
    };
    

    const classInfo = [
        {class:'Jss1', subject:'Biology', noOfStudents:'75'},
        {class:'Sss1', subject:'Biology', noOfStudents:'86'}
    ];

    const handleClassClick = (classItem) => {
        setSelectedClass(classItem);
        // setSidebarVisible(false); // Hide sidebar when a class is clicked
    };

    const handleBackClick = () => {
        setSelectedClass(null); // Reset selected class when back is clicked
        // setSidebarVisible(true); // Show sidebar again
    };

    const performance = [
        {name:'Assignment', percentage:'90%', stat:'Weekly Stats', img:chart},
        {name:'Test', percentage:'88%', stat:'Monthly Growth', img:chart1},
        {name:'Examination', percentage:'70%', stat:'Monthly Growth', img:chart2},
    ];

    const resource = [
        {name:'Veclary Resources', size:'80.69 mb'},
        {name:'Veclary Updates', size:'320.69 mb'},
        {name:'Basic Science Jss 2', size:'100.69 mb'},
        {name:'Basic Science Jss 2', size:'100.69 mb'},
    ]

    return ( 
        <>
        { createSchedule && <div className=" w-[120%] h-[100vh] bg-[#1212128d] z-[99999] fixed top-0 -left-[20%] flex justify-center items-center">
            <div className=" w-full h-full flex justify-center items-center">
                <div className="ml-[20%] bg-[#FFFFFF] p-6 rounded-[15px] w-[400px]">
                    <span className=" w-full flex items-center justify-between">
                        <img src={ announce } alt="" />
                        <img onClick={()=>{setCreateSchedule(false)}} src={ close } className=" w-4" alt="" />
                    </span>
                    <p className=" text-lg text-[#272D37] font-semibold mt-6 font-Outfit">Create a schedule</p>
                    <label htmlFor="" className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                        Title
                        <input type="text" name="" placeholder="Enter title of schedule" className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]" id="" />
                    </label>
                    <label htmlFor="" className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                        Body
                        <textarea type="text" name="" placeholder="Enter body of schedule" className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 border border-[#DAE0E6] p-2.5 rounded-[5px]" id="" />
                    </label>

                    <div className=" w-full grid grid-cols-2 gap-4">
                        <label htmlFor="" className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                            Select time
                            <DatePicker className=" z-[99999] font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]" id="" />
                        </label>
                        <label htmlFor="" className=" w-full flex flex-col mt-6 text-[#272D37] font-Outfit font-medium text-sm">
                            Select date
                            <DatePicker className=" font-Outfit text-[#919BA7] placeholder:text-[#919BA7] text-sm font-normal w-full mt-2 rounded-[5px]" id="" />
                        </label>
                    </div>
                    <div className=" w-full mt-6 grid grid-cols-2 gap-4">
                        <button onClick={()=>{setCreateSchedule(false)}} className=" w-full py-3 font-Outfit rounded-md text-[#272D37] font-semibold border border-[#DAE0E6] text-base">Cancel</button>
                        <button className=" w-full py-3 font-Outfit rounded-md text-[#fff] bg-[#2F52FF] font-semibold text-base">Continue</button>
                    </div>
                </div>
            </div>
        </div>}

        {selectedClass ? (
            <div className="absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
                <span onClick={handleBackClick} className='cursor-pointer px-6 mt-6 flex flex-row items-center'>
                    <img src={arrowBlue} alt="" />
                    <p className='font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                    <p className='font-Outfit text-xl font-semibold mb-2 ml-3'>Class Details</p> 
                </span>

                <div className="px-6 mt-6 w-full">
                    <div className=' w-full items-start flex mt-6 justify-between'>
                        <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col text-[#272D37] text-xs font-medium'>
                            {selectedClass.class} {selectedClass.subject} Class
                                <input type="text" value={'Total Students:'+ ' ' + selectedClass.noOfStudents} className=' mt-2 text-[#272D37] text-sm w-[150px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5' />
                        </label>
                        <button onClick={()=>{setCreateSchedule(true)}} className=' text-center  text-sm font-Outfit font-medium text-white bg-[#2F52FF] py-2 px-3 md:px-6 rounded-[10px]'>Create a Schedule</button>
                    </div>
                </div>

                <div className="px-6 mt-6">
                    <p className=" font-Outfit text-lg font-semibold">Performance Analysis</p>
                    <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {performance.map((item, index) => (
                            <div key={index} className=" border border-[#EAEBF0] rounded-[10px] p-4">
                                <p className=" font-Outfit font-medium text-[#272D37] text-base">{ item.name }</p>
                                <div className=" w-full flex flex-row justify-between mt-2 items-end">
                                    <div className=" w-[40%]">
                                        <p className=" font-Outfit text-[#272D37] text-xl font-semibold">{ item.percentage }</p>
                                        <p className=" font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">{ item.stat }</p>
                                    </div>
                                    <div className=" w-[59%]">
                                        <img src={ item.img } className=" w-[100%] h-full" alt="" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" mt-6 px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className=" border border-[#EAEBF0] rounded-[10px]">
                        <div className=" w-full p-4 border-b border-[#eaebf0] flex items-center justify-between">
                            <p className=" font-Outfit text-sm text-[#272D37] font-medium">Resources</p>
                            <button className=" flex items-center space-x-2">
                                <p className=" text-xs font-normal font-Outfit">Add new</p>
                                <img src={ blueplus } alt="" />
                            </button>
                        </div>
                        <div className=' flex flex-col space-y-3 w-full h-full p-4'>
                            {resource.map((item, index) =>(
                                <div key={index} className=' w-full py-3 border-b border-[#EAEBF0] flex flex-row items-center justify-between'>
                                    <div className=' flex flex-row space-x-3'>
                                        <img src={ file } alt="" />
                                        <div className=''>
                                            <p className=' font-Outfit font-medium text-[#272D37] text-xs'>{item.name}</p>
                                            <p className=' font-Outfit text-[8px] text-[#5F6D7E]'>{item.size}</p>
                                        </div>
                                    </div>
                                    <span className=" flex space-x-3">
                                    <img src={ edit } className=" w-4" alt="" />
                                    <img src={ trash } className=" w-4" alt="" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className=" border border-[#EAEBF0] rounded-[10px]">
                        <div className=" w-full p-4 border-b border-[#eaebf0] flex items-center justify-between">
                            <p className=" font-Outfit text-sm text-[#272D37] font-medium">Assignments</p>
                            <button className=" flex items-center space-x-2">
                                <p className=" text-xs font-normal font-Outfit">Add new</p>
                                <img src={ blueplus } alt="" />
                            </button>
                        </div>
                        <div className=' flex flex-col space-y-3 w-full h-full p-4'>
                            {resource.map((item, index) =>(
                                <div key={index} className=' w-full py-3 border-b border-[#EAEBF0] flex flex-row items-center justify-between'>
                                    <div className=' flex flex-row space-x-3'>
                                        <img src={ file } alt="" />
                                        <div className=''>
                                            <p className=' font-Outfit font-medium text-[#272D37] text-xs'>{item.name}</p>
                                            <p className=' font-Outfit text-[8px] text-[#5F6D7E]'>{item.size}</p>
                                        </div>
                                    </div>
                                    <span className=" flex space-x-3">
                                    <img src={ edit } className=" w-4" alt="" />
                                    <img src={ trash } className=" w-4" alt="" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className=" border border-[#EAEBF0] rounded-[10px] p-4">
                        <p className=' font-Outfit text-lg font-semibold'>Students Feedbacks</p>
                        <div className=" flex flex-col items-center">
                            <img src={ nofeed } className=' mt-7' alt="" />
                            <p className=' font-Outfit text-center font-medium mt-3 text-base'>No Feedbacks</p>
                            <p className=' font-Outfit text-xs text-[#9E9E9E] mt-2 text-center'>When you have a feedback you’ll see them here</p>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div onClick={()=>{setSidebarVisible(false)}} className="absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
                <span onClick={() => handleClick('Home')} className='cursor-pointer px-6 mt-6 flex flex-row items-center'>
                    <img src={arrowBlue} alt="" />
                    <p className='font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                    <p className='font-Outfit text-xl font-semibold mb-2 ml-3'>Classes</p> 
                </span>
                <div className="px-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {classInfo.map((item, index) =>(
                        <div key={index} onClick={() => handleClassClick(item)} className="w-full bg-[#f8f8f8] rounded-[15px] p-6 cursor-pointer">
                            <p className="font-Outfit text-xl font-semibold text-[#121212]">{item.subject}</p>
                            <div style={{backgroundImage:`url(${classbg})`, backgroundPosition:'center', backgroundSize:'cover'}} className="w-full bg-[#C9E4FC] h-[200px] text-[#121212] rounded-[10px] font-Outfit font-semibold text-5xl flex items-center justify-center mt-4">
                                {item.class}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
        </>
     );
}
 
export default TeacherClasses;