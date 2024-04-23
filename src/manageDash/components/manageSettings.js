import arrowBlue from './assets/arrowblue.svg';
import sound from './assets/sound.png';
import remind from './assets/remind.svg';
import time from './assets/time.svg';
import streak from './assets/streak.svg';
import board from './assets/board.svg';
import release from './assets/release.svg';
import star from './assets/star.svg';
import { useContext } from 'react';
import { ManageActivePageContext, ManageSidebarContext } from '../contexts/ManageActivePageContext';

const ManageSetting = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(ManageSidebarContext);
    const {activePage, setActivePage} = useContext(ManageActivePageContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full lg:w-[80%]">
            <span  onClick={() => handleClick('Home')} className=' cursor-pointer w-full flex flex-row p-6 items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Settings</p> 
            </span>

            <div className=' w-full py-4 px-6 font-Outfit text-base font-semibold'>APP SETTINGS</div>

            <div className=' mt-4 w-full'>
                <div className=' w-full py-4 flex flex-row items-center justify-between border-y px-6 border-[#EAEBF0]'>
                    <span className=' flex flex-row space-x-2 items-center'>
                        <img src={ sound } className=' w-4' alt="" />
                        <p className=' text-sm font-normal text-[#000000B2] font-Outfit '>Sound Effects</p>
                    </span>
                    {/* <!-- Rounded switch --> */}
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

            <div className=' w-full py-4 px-6 font-Outfit text-base mt-4 font-semibold'>NOTIFICATIONS</div>

            <div className=' mt-4 w-full'>
                <div className=' w-full py-4 flex flex-row items-center justify-between border-y px-6 border-[#EAEBF0]'>
                    <span className=' flex flex-row space-x-2 items-center'>
                        <img src={ remind } className=' h-4 w-4' alt="" />
                        <p className=' text-sm font-normal text-[#000000B2] font-Outfit '>Daily Reminder</p>
                    </span>
                    {/* <!-- Rounded switch --> */}
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div className=' w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]'>
                    <span className=' flex flex-row space-x-2 items-center'>
                        <img src={ time } className=' h-3 w-3' alt="" />
                        <p className=' text-sm font-normal text-[#000000B2] font-Outfit '>Reminder Time</p>
                    </span>
                    <p className=' font-Outfit text-xs text-[#000000B2]'>12:00 PM</p>
                </div>
                <div className=' w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]'>
                    <span className=' flex flex-row space-x-2 items-center'>
                        <img src={ streak } className=' h-4 w-4' alt="" />
                        <p className=' text-sm font-normal text-[#000000B2] font-Outfit '>Streaks</p>
                    </span>
                    {/* <!-- Rounded switch --> */}
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div className=' w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]'>
                    <span className=' flex flex-row space-x-2 items-center'>
                        <img src={ board } className=' h-4 w-4' alt="" />
                        <p className=' text-sm font-normal text-[#000000B2] font-Outfit '>Leaderboards</p>
                    </span>
                    {/* <!-- Rounded switch --> */}
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>
                <div className=' w-full py-4 flex flex-row items-center justify-between border-b px-6 border-[#EAEBF0]'>
                    <span className=' flex flex-row space-x-2 items-center'>
                        <img src={ star } className=' h-4 w-4' alt="" />
                        <p className=' text-sm font-normal text-[#000000B2] font-Outfit '>Promotions & Specials</p>
                    </span>
                    {/* <!-- Rounded switch --> */}
                    <label class="switch">
                        <input type="checkbox"/>
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>

        </div>
        </>
     );
}
 
export default ManageSetting;