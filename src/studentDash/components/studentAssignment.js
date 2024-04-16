import { useContext } from 'react';
import arrowBlue from './assets/arrowblue.svg';
import { ActivePageContext, SidebarContext } from '../contexts/ActivePageContext';


const StudentAssignment = () => {

    const {activePage, setActivePage} = useContext(ActivePageContext);
    const {sidebarVisible, setSidebarVisible} = useContext(SidebarContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    // Sample data for the table
    const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'];
    const testData = [
        { subject: 'Mathematics', test1: 8, test2: 5, test3: 10 },
        { subject: 'English', test1: 9, test2: 4, test3: 10 },
        { subject: 'Physics', test1: 10, test2: 7, test3: 2 },
        { subject: 'Chemistry', test1: 7, test2: 9, test3: 10 },
        { subject: 'Biology', test1: 3, test2: 10, test3: 10 }
    ];

    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6">
            <span onClick={() => handleClick('Classroom')} className=' cursor-pointer w-full flex flex-row p-6 items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Assignments</p> 
            </span>

            <div className=' w-full items-center flex px-6 justify-between'>
                <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col text-[#272D37] text-xs font-medium'>
                    Choose assignment shown
                    <select className=' mt-2 text-[#272D37] text-sm w-[120px] md:w-[190px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5'>
                        <option value="">Present assignment</option>
                    </select>
                </label>
               <button className=' text-center  text-sm font-Outfit font-medium text-white bg-[#2F52FF] py-2 px-3 md:px-6 rounded-[10px]'>Upload Assignment</button>
            </div>

            <div className=' mt-6 px-6'>
                <div className=' border border-[#EAEBF0] rounded-[10px]'>
                    <table className="border-collapse border border-[#EAEBF0] rounded-[10px] w-full">
                        <thead>
                            <tr>
                                <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">S/N</th>
                                <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">Subject</th>
                                <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">Test 1</th>
                                <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">Test 2</th>
                                <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">Test 3</th>
                                <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center">Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testData.map((data, index) => (
                                <tr key={index}>
                                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">0{index + 1}</td>
                                    <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">{data.subject}</td>
                                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test1}/10</td>
                                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test2}/10</td>
                                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test3}/10</td>
                                    <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.test1 + data.test2 + data.test3}/30</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default StudentAssignment;