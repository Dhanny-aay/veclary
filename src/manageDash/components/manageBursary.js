import { ManageActivePageContext, ManageSidebarContext } from '../contexts/ManageActivePageContext';
import { useContext, useState } from 'react';
import arrowBlue from './assets/arrowblue.svg';
import bus from './assets/bus.svg';
import bus1 from './assets/bus1.svg';
import FeesDue from './feesDue';
import FeeSchedule from './feeschedule';
import FeesPaid from './feesPaid';
import FeesReminder from './feesReminder';



const ManageBursary = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(ManageSidebarContext);
    const {activePage, setActivePage} = useContext(ManageActivePageContext);
    const [activeButton, setActiveButton] = useState('FeesDue');


    const handleClick = (page) => {
        setActivePage(page);
    };

    const analysis = [
        {name:'Percentage of Fee Paid', percentage:'70%', stat:'Yearly Stats', para:'', img:bus},
        {name:'Number of Unpaid  Fees', percentage:'800', stat:'Yearly Stats', para:'Students', img:bus1},
    ];


    const buttons = [
        { label: 'Fees Due', value: 'FeesDue', component: <FeesDue /> },
        { label: 'Fees Schedules', value: 'FeesSchedules', component: <FeeSchedule/> },
        { label: 'Fees Paid', value: 'FeesPaid', component:<FeesPaid/> },
        { label: 'Fee Reminder', value: 'FeeReminder', component:<FeesReminder/> }
    ];
    

    const handleButtonClick = (value) => {
        setActiveButton(value);
        // Add logic for button click action here
    };




    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
            <span onClick={() => handleClick('Home')} className=' cursor-pointer px-6 mt-6 flex flex-row items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Bursary</p> 
            </span>


            <div className=" px-6 mt-6">
                <p className=" font-Outfit text-lg font-semibold">Analysis</p>
                <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {analysis.map((item, index) => (
                        <div key={index} className=" border border-[#EAEBF0] rounded-[10px] p-4">
                            <div className=" w-full flex flex-row justify-between mt-2 items-center">
                                <div className=" w-[48%]">
                                    <p className=" font-Outfit font-medium text-[#272D37] text-base">{ item.name }</p>
                                    <p className=" font-Outfit text-[#272D37] text-xl font-semibold">{ item.percentage }</p>
                                    <p className=" font-Outfit text-[#5F6D7E] text-sm mt-2 font-medium">{ item.stat }</p>
                                </div>
                                <div className=" w-[48%] h-full flex items-center space-x-6">
                                    <img src={ item.img } className=" h-full w-full" alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 mt-6 font-Outfit">
                <div className="w-full border-b pb- border-[#EAECF0] h-full">
                    <div className="flex">
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                className={`font-medium font-Outfit text-sm pb-4 px-2 transition-all ${
                                    activeButton === button.value
                                        ? 'border-b-2 border-[#2F52FF] text-[#2F52FF]'
                                        : ''
                                }`}
                                onClick={() => handleButtonClick(button.value)}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                {buttons.find(button => button.value === activeButton).component}
            </div>


        </div>
        </>
     );
}
 
export default ManageBursary;