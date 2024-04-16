import { useContext } from "react";
import { TeacherActivePageContext, TeacherSidebarContext } from "../contexts/TeacherActivePageContext";
import arrowBlue from './assets/arrowblue.svg';
import backArr from './assets/backArr.svg';
import fwdArr from './assets/fwdArr.svg';


const TeacherRecords = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(TeacherSidebarContext);
    const {activePage, setActivePage} = useContext(TeacherActivePageContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    const testData = [
        { regNo: 'SCI-20-0102', exam: 32, name: 'Grand Rapids', test1: 8, test2: 5, test3: 10 },
        { regNo: 'SCI-20-0103', exam: 29, name: 'Bell Gardens', test1: 9, test2: 4, test3: 10 },
        { regNo: 'SCI-20-0104', exam: 30, name: 'Broomfield', test1: 10, test2: 7, test3: 2 },
        { regNo: 'SCI-20-0105', exam: 15, name: 'Springfield', test1: 7, test2: 9, test3: 10 },
        { regNo: 'SCI-20-0106', exam: 39, name: 'Kalamazoo', test1: 3, test2: 10, test3: 10 }
    ];


    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
            <span onClick={() => handleClick('Home')} className=' cursor-pointer px-6 mt-6 flex flex-row items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>My Records</p> 
            </span>

            <div className=' w-full items-start flex px-6 mt-6 justify-between'>
               <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col text-[#272D37] text-xs font-medium'>
                    Subject Taught
                    <input type="text" value={'Biology'} className=' mt-2 text-[#272D37] text-sm w-[120px] md:w-auto font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5' />
               </label>
               <button className=' text-center  text-sm font-Outfit font-medium text-white bg-[#2F52FF] py-2 px-3 md:px-6 rounded-[10px]'>Add New Record</button>
            </div>

            <div className=' mt-6 px-6'>
                <div className=' border border-[#EAEBF0] rounded-[10px]'>
                    <div className="w-full overflow-x-auto">
                        <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
                            <thead>
                                <tr>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">S/N</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Student Names</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Registration Number</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Test 1</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Test 2</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Test 3</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Exam</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 px-4 text-center">Total Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testData.map((data, index) => (
                                    <tr key={index}>
                                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">0{index + 1}</td>
                                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">{data.name}</td>
                                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">{data.regNo}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test1}/10</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test2}/10</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test3}/10</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.exam}/40</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test1 + data.test2 + data.test3 + data.exam}/70</td>
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                    <div className=" w-full py-3 px-3 flex justify-between items-center">
                        <span className=" flex space-x-1">
                            <img src={ backArr } alt="" />
                            <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">Prev</p>
                        </span>
                        <span className=" flex items-end space-x-4">
                            <p className=" font-Outfit text-sm text-[#2F52FF]">1</p>
                            <p className=" font-Outfit text-sm">2</p>
                            <p className=" font-Outfit text-sm">...</p>
                            <p className=" font-Outfit text-sm">5</p>
                            <p className=" font-Outfit text-sm">6</p>
                        </span>
                        <span className=" flex space-x-1">
                            <p className=" font-Outfit font-medium text-[#5F6D7E] text-sm">Next</p>
                            <img src={ fwdArr } alt="" />
                        </span>
                    </div>
                </div>
            </div>

        </div>
        </>
     );
}
 
export default TeacherRecords;