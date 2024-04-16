import { useContext } from "react";
import { TeacherActivePageContext, TeacherSidebarContext } from "../contexts/TeacherActivePageContext";
import arrowBlue from './assets/arrowblue.svg';
import edit from './assets/edit.svg';


const TeacherEditProfile = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(TeacherSidebarContext);
    const {activePage, setActivePage} = useContext(TeacherActivePageContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    return ( 
        <>
        <div  onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
            <span onClick={() => handleClick('Profile')} className=' cursor-pointer px-6 mt-6 flex flex-row items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Edit Profile</p> 
            </span>

            <div className=' px-6 w-full flex flex-col items-center justify-center mt-16'>
                <span className=' w-[120px] h-[120px] rounded-[50%] bg-[#f8f8f8]'></span>
                <p className=' font-Outfit w-full text-center text-xl font-medium text-[#272D37] mt-2'>Dave Jones</p>
            </div>

            <div className="mt-6 w-full px-6 flex flex-col">
                <div className=' w-full flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Surname" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Full Name
                        <input type="text" name='Surname' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>

                    <label htmlFor="Other Names" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Subject Taught
                        <select type="text" name='Subject' value='Biology' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'>
                            <option value="">Select Subject...</option>
                            <option value="Biology">Biology</option>
                        </select>
                    </label>
                    </div>

                    <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="email" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Email Address
                        <input type="text" name='email' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>

                    <label htmlFor="School" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        School
                        <select type="text" name='School' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'>
                            <option value="">Select School...</option>
                        </select>
                    </label>
                </div>
                <span className=" flex items-center mt-6 space-x-3">
                    <button onClick={() => handleClick('Profile')} className=" font-Outfit font-semibold text-sm py-2 px-4 rounded-[30px] border border-[#D0D5DD]">Back</button>
                    <button className=" font-Outfit font-semibold text-sm py-2 px-4 rounded-[30px] bg-[#2F52FF] text-white">Save</button>
                </span>
            </div>
        </div>
        </>
     );
}
 
export default TeacherEditProfile;