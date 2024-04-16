import { useContext } from 'react';
import arrowBlue from './assets/arrowblue.svg';
import { DatePicker } from 'rsuite';
import { ActivePageContext, SidebarContext } from '../contexts/ActivePageContext';

const StudentEditProfile = () => {

    const {activePage, setActivePage} = useContext(ActivePageContext);
    const {sidebarVisible, setSidebarVisible} = useContext(SidebarContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className="absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6">
            <div className=" flex items-center justify-between  p-6 w-full">
                <span onClick={() => handleClick('Profile')} className=' cursor-pointer flex flex-row items-center'>
                    <img src={ arrowBlue } alt="" />
                    <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                    <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Edit Profile</p> 
                </span>
                <button className="  bg-[#2F52FF] rounded-[30px] px-5 py-2 text-center font-Outfit shadow text-white text-sm font-medium">Save</button>
            </div>

            <div className=' w-full flex flex-col items-center  p-6 justify-center'>
                <span className=' w-[110px] h-[110px] rounded-[50%] bg-[#F4F4F5] mt-4'></span>
                <p className=' font-Outfit text-xl font-medium mt-3'>Veek Design</p>
            </div>

            <div className=' w-full py-4 px-6 font-Outfit text-base mt-3 border-b border-[#EAEBF0] font-semibold'>PERSONAL INFORMATION</div>
            <div className=' mt-6 w-full px-6 flex flex-col'>

                <div className=' w-full flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Surname" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Surname
                        <input type="text" name='Surname' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>

                    <label htmlFor="Other Names" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Other Names
                        <input type="text" name='Other Names' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
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

                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Gender" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Gender
                        <select type="text" name='Gender' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'>
                            <option value="">Select Gender...</option>
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                    </label>

                    <label htmlFor="Dob" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Date of Birth
                        <DatePicker block className=' w-full mt-2 text-sm font-normal text-[#667085] capitalize p-2.5 rounded-[8px]' />
                    </label>
                </div>


                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Class" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Class
                        <select type="text" name='Class' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'>
                            <option value="">Select Class...</option>
                            <option value="">SS1</option>
                            <option value="">SS2</option>
                        </select>
                    </label>

                    <label htmlFor="Srn" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        School Registration Number
                        <input type="text" name='Srn' placeholder='SCI-20-0102' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>

                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="address" className=' w-full flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Permanent Home Address
                        <input type="text" name='address' placeholder='Enter Address' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>

                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Nationality" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Nationality
                        <select type="text" name='Nationality' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'>
                            <option value="">Select Nationality...</option>
                            <option value="">Nigeria</option>
                            <option value="">Ghana</option>
                        </select>
                    </label>

                    <label htmlFor="state" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        State
                        <select type="text" name='state' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'>
                            <option value="">Select State...</option>
                            <option value="">Ondo</option>
                            <option value="">Accra</option>
                        </select>
                    </label>
                </div>

            </div>

            <div className=' w-full py-4 px-6 font-Outfit text-base mt-3 border-b border-[#EAEBF0] font-semibold'>Parent/Guardian Information</div>

            <div className=' mt-6 w-full px-6 flex flex-col'>

                <div className=' w-full flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Next of Kin Full Name" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Next of Kin Full Name
                        <input type="text" name='Next of Kin Full Name' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>

                    <label htmlFor="Next of Kin Contact" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Next of Kin Contact
                        <input type="text" name='Next of Kin Contact' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>

                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Next of Kin Address" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Next of Kin Address
                        <input type="text" name='Next of Kin Address' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>

                    <label htmlFor="Next of Kin Relationship" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Next of Kin Relationship
                        <input type="text" name='Next of Kin Relationship' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'/>

                    </label>
                </div>

                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Mother’s Full Name" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Mother’s Full Name
                        <input type="text" name='Mother’s Full Name' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'/>
                    </label>

                    <label htmlFor="Mother’s Contact" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Mother’s Contact
                        <input type="text" name='Mother’s Contact' placeholder='' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>


                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Mother’s AddressClass" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Mother’s Address
                        <input type="text" name='Mother’s Address' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'/>
                    </label>

                    <label htmlFor="Occupation" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Occupation
                        <input type="text" name='Occupation' placeholder='' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>

                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Father’s Full Name" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Father’s Full Name
                        <input type="text" name='Father’s Full Name' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'/>
                    </label>

                    <label htmlFor="Father’s Contact" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Father’s Contact
                        <input type="text" name='Father’s Contact' placeholder='' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>


                <div className=' w-full mt-4 flex flex-col md:flex-row items-center justify-between'>

                    <label htmlFor="Father’s AddressClass" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Father’s Address
                        <input type="text" name='Father’s Address' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2'/>
                    </label>

                    <label htmlFor="Occupation" className=' w-full mt-3 md:mt-0 md:w-[49%] flex flex-col items-start font-Outfit text-[#344054] font-medium text-sm'>
                        Occupation
                        <input type="text" name='Occupation' placeholder='' className=' w-full text-sm font-normal text-[#667085] bg-[#F1F1F1] p-2.5 rounded-[8px] mt-2' />
                    </label>
                </div>


            </div>

        </div>
        </>
     );
}
 
export default StudentEditProfile;