import logo from './assets/logo.svg';
import homeAc from './assets/home.svg';
import home from './assets/hme.svg';
import studnt from './assets/studnt.svg'; 
import teach from './assets/teach.svg'; 
import book from './assets/book.svg'; 
import table from './assets/table.svg'; 
import bursary from './assets/bursary.svg'; 
import setting from './assets/setting.svg';
import settingAc from './assets/blueSetting.svg';
import logout from './assets/logout.svg';
import clos from './assets/clos.svg';
import { useContext } from 'react';
import { ManageActivePageContext, ManageSidebarContext } from '../contexts/ManageActivePageContext';

const ManageSidebar = () => {

    const {activePage, setActivePage} = useContext(ManageActivePageContext);
    const {sidebarVisible, setSidebarVisible} = useContext(ManageSidebarContext);

    const sidebar = [
        { name: 'Home', img: home, activeImg: homeAc, page: 'Home' },
        { name: 'Students', img: studnt, activeImg: studnt, page: 'Students' },
        { name: 'Teachers', img: teach, activeImg: teach, page: 'Teachers' },
        { name: 'Resources', img: book, activeImg: book, page: 'Resources' },
        { name: 'Timetable', img: table, activeImg: table, page: 'Timetable' },
        { name: 'Bursary', img: bursary, activeImg: bursary, page: 'Bursary' },
    ]

    const bottom = [
        {name:'Setting', img:setting, activeImg: settingAc, page: 'Settings'},
        {name:'Logout', img:logout },
    ]


    const handleClick = (page) => {
        setActivePage(page);
    };
    

    return ( 
        <>
        <div
            className={`fixed top-0 left-0 z-[999] w-[80%] md:w-[40%] lg:w-[20%] h-[100vh] bg-[#F5F5F5] ${
                sidebarVisible
                    ? 'lg:translate-x-0 translate-x-0'
                    : 'lg:translate-x-0 -translate-x-full'
            } transition-transform`}
        >
            <div className=' w-full h-full relative'>
                <div className=" w-full flex justify-between border-b py-3 h-[56px] px-6 border-[#EAEBF0]">
                    <span className="flex items-center space-x-2">
                        <img src={ logo } className=' w-10 h-6' alt="Veclary:The Best System To Enhance Your Education" />
                        <p className=' font-Outfit text-xl md:text-lg font-semibold text-[#121212]'>Veclary</p>
                    </span>
                    <img src={ clos } onClick={()=>{setSidebarVisible(false)}} className=' lg:hidden w-5' alt="" />
                </div>

                <div className=' mt-5'>
                    <div className=''>
                        {/* Sidebar content */}
                        {sidebar.map((item, index) => (
                        <button
                            key={index}
                            className={`text-center py-2 px-6 flex flex-row space-x-4 items-center ${
                            activePage === item.page ? 'text-[#2F52FF]' : 'text-[#929292]'
                            }`}
                            onClick={() => handleClick(item.page)}
                        >
                            <img src={activePage === item.page ? item.activeImg : item.img} className='w-4 h-4' alt="" />
                            <p className='font-Outfit text-xs'>{item.name}</p>
                        </button>
                        ))}

                    </div>
                </div>

                <div className=' w-full absolute bottom-12 lg:bottom-6'>

                    <div className=' mt-4'>
                        <div className=''>
                        
                            {bottom.map((item, index) => (
                            <button
                                key={index}
                                className={`text-center py-2 px-6 flex flex-row space-x-4 items-center ${
                                activePage === item.page ? 'text-[#2F52FF]' : 'text-[#929292]'
                                }`}
                                onClick={() => handleClick(item.page)}
                            >
                                <img src={activePage === item.page ? item.activeImg : item.img} className='w-4 h-4' alt="" />
                                <p className='font-Outfit text-xs'>{item.name}</p>
                            </button>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
     );
}
 
export default ManageSidebar;