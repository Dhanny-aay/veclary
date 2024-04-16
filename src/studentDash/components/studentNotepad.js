import arrowBlue from './assets/arrowblue.svg';
import bin from './assets/delete.svg';
import edit from './assets/change.svg';
import { useContext } from 'react';
import { ActivePageContext, SidebarContext } from '../contexts/ActivePageContext';


const StudentNotepad = () => {

    const {activePage, setActivePage} = useContext(ActivePageContext);
    const {sidebarVisible, setSidebarVisible} = useContext(SidebarContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    const notes = [
        {name:'Biology', time:'Updated 2h ago', desc:'Korem ipsum dolor sit amet, consectetur adipiscing elit Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....'},
        {name:'Chemistry', time:'Updated 2h ago', desc:'Korem ipsum dolor sit amet, consectetur adipiscing elit Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....'},
        {name:'Physics', time:'Updated 2h ago', desc:'Korem ipsum dolor sit amet, consectetur adipiscing elit Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....'},
        {name:'Economics', time:'Updated 2h ago', desc:'Korem ipsum dolor sit amet, consectetur adipiscing elit Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.....'},
    ];

    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className='absolute lg:left-[20%] top-[56px] w-full lg:w-[80%] pb-6'>
            <div className=' p-6 w-full flex justify-between items-center'>
                <span onClick={() => handleClick('Home')} className='flex cursor-pointer flex-row items-center'>
                    <img src={ arrowBlue } alt="" />
                    <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                    <p className=' font-Outfit text-xl font-semibold  mb-2 ml-3'>Notepad</p> 
                </span>
                <button className=' text-center  text-sm font-Outfit font-medium text-white bg-[#2F52FF] py-2 px-6 rounded-[10px]'>Add New Note</button>
            </div>

            <div className=' w-full grid lg:grid-cols-1 md:grid-cols-2 gap-6 px-6'>
                {notes.map((item, index) => (
                    <div key={index} className=' w-full bg-[#F8F8F8] p-4 rounded-[15px]'>
                        <div className=' w-full flex justify-between items-center pb-4 border-b border-[#000000]'>
                            <div className=''>
                                <p className=' font-Outfit text-lg font-medium text-[#272D37]'>{ item.name }</p>
                                <p className=' font-Outfit mt-1 text-xs font-normal text-[#272D37]'>{ item.time }</p>
                            </div>
                            <span className=' flex flex-row items-center space-x-3'>
                                <img src={ edit } className=' w-4'  alt="" />
                                <img src={ bin }  className=' w-4' alt="" />
                            </span>
                        </div>

                        <p className=' mt-4 font-Outfit text-sm text-[#12121299]'>{ item.desc }</p>
                    </div>
                ))}
            </div>
        </div>
        </>
     );
}
 
export default StudentNotepad;