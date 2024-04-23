import arrowBlue from './assets/arrowblue.svg';
import { ManageActivePageContext, ManageSidebarContext } from '../contexts/ManageActivePageContext';
import { useContext } from 'react';
import file from './assets/file.svg';
import edit from './assets/edit.svg';
import trash from './assets/trash.svg';

const ManageAddResources = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(ManageSidebarContext);
    const {activePage, setActivePage} = useContext(ManageActivePageContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    const resource = [
        {name:'Veclary Resources', size:'80.69 mb'},
        {name:'Veclary Updates', size:'320.69 mb'},
        {name:'Basic Science Jss 2', size:'100.69 mb'},
        {name:'Basic Science Jss 2', size:'100.69 mb'},
    ]

    return ( 
        <>
        <div onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
            <span onClick={() => handleClick('Resources')} className=' cursor-pointer px-6 mt-6 flex flex-row items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Add Resources</p> 
            </span>

            <div className=' w-full md:items-end flex flex-col md:flex-row px-6 mt-6 justify-between'>
                <span className=" flex items-start space-x-6">
                    <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col text-[#272D37] text-xs font-medium'>
                        Class
                        <select type="text" value={''} className=' mt-2 text-[#272D37] text-sm w-[120px] md:w-[200px] font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5'>
                            <option value="">Jss1</option>
                            <option value="">SSS1</option>
                        </select>
                    </label>
                </span>

                <span className=" flex items-end mt-6 md:mt-0 space-x-3">
                    <button className=' text-center  text-sm font-Outfit font-medium text-white bg-[#2F52FF] py-2 px-3 md:px-6 rounded-[10px]'>Add New Resources</button>

                </span>
            </div>

            <div className=' w-full mt-6 px-6'>
                <div className=" w-full border border-[#EAEBF0] rounded-[10px]">
                    <div className=" w-full p-4 border-b border-[#eaebf0] flex items-center justify-between">
                        <p className=" font-Outfit text-sm text-[#272D37] font-medium">Biology</p>
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
            </div>
        </div>
        </>
    );
}
 
export default ManageAddResources;