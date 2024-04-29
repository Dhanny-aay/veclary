import { useContext } from "react";
import arrowBlue from './assets/arrowblue.svg';
import backArr from './assets/backArr.svg';
import fwdArr from './assets/fwdArr.svg';
import { VendorActivePageContext, VendorSidebarContext } from "../contexts/VendorActivePageContext";

const VendorAuthors = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(VendorSidebarContext);
    const {activePage, setActivePage} = useContext(VendorActivePageContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    const table = [
        {name:'Griselda', genre:['Novels', 'Text Books'], uploaded:'10'},
        {name:'Joseph', genre:['Novels', 'Text Books'], uploaded:'12'},
        {name:'Queen', genre:['Novels', 'Text Books'], uploaded:'10'},
        {name:'John', genre:['Novels', 'Text Books'], uploaded:'12'},
        {name:'Springfield', genre:['Novels', 'Text Books'], uploaded:'121'}
    ];

    return ( 
        <>
        <div  onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
            <span onClick={() => handleClick('Home')} className=' cursor-pointer px-6 mt-6 flex flex-row items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Authors</p> 
            </span>

            <span className=" px-6">
                <button className=" px-4 py-2 mt-6 rounded-[10px] bg-[#2F52FF] font-medium font-Outfit text-sm text-white">Add New Author</button>
            </span>
            
            <div className=" px-6">
                <div className=" w-full rounded-[10px] border mt-6 border-[#EAEBF0]">
                    <div className=" overflow-x-auto">
                        <table className="border-collapse w-full">
                            <thead>
                                <tr className="border-b border-[#eaecf0] px-4 py-3">
                                    <th className="font-Outfit font-medium text-[#667085] w-[50px] text-xs text-left py-2 px-4">S/N</th>
                                    <th className="font-Outfit font-medium text-[#667085] text-xs text-left py-2 px-4">Names of Authors</th>
                                    <th className="font-Outfit font-medium text-[#667085] text-xs py-2 px-4">Genre</th>
                                    <th className="font-Outfit font-medium text-[#667085] text-xs py-2 px-4">Uploaded Books</th>
                                    <th className="font-Outfit font-medium text-[#667085] text-xs text-center  py-2 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table.map((item, index) => (
                                    <tr key={index} className="border-b border-[#EAECF0]">
                                        <td className="text-left w-[50px] py-2 px-4">0{index + 1}</td>
                                        <td className="text-left py-2 px-4 flex flex-col">
                                            <p className="font-Outfit text-[#101828] text-sm font-medium">{item.name}</p>
                                        </td>
                                        <td className="text-sm font-Outfit text-[#667085] text-center py-2 space-x-2 px-4">{item.genre.map((item, index) => (
                                            <button key={index} className=" py-1 px-2 rounded-[15px] bg-[#17BD8D1A] text-[#17BD8D] font-Outfit text-xs font-normal">{item}</button>
                                        ))}</td>
                                        <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4">{item.uploaded}</td>
                                        <td className="text-sm font-Outfit text-[#667085] text-center py-2 px-4 flex space-x-3 justify-center items-center">
                                            <button onClick={() => handleClick('Author_Profile')} className=' px-2 py-1 font-medium font-Outfit text-xs text-white bg-[#2F52FF] rounded-[10px]' >View Profile</button>
                                            <button className=' px-2 py-1 font-medium font-Outfit text-xs text-black bg-[#F5F5F5] rounded-[10px]' >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className=" w-full py-3 px-3 flex justify-between items-end">
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
 
export default VendorAuthors;