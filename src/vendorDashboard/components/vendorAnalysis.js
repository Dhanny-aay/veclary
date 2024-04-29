import { useContext } from "react";
import arrowBlue from './assets/arrowblue.svg';
import chart from './assets/chart.svg';
import chart1 from './assets/chart1.svg';
import chart2 from './assets/chart2.svg';
import { VendorActivePageContext, VendorSidebarContext } from "../contexts/VendorActivePageContext";


const VectorAnalysis = () => {

    const {sidebarVisible, setSidebarVisible} = useContext(VendorSidebarContext);
    const {activePage, setActivePage} = useContext(VendorActivePageContext);

    const handleClick = (page) => {
        setActivePage(page);
    };

    const analysis = [
        {name:'E-Book Completion', percentage:'90%', stat:'Weekly Stats', img:chart},
        {name:'Total Book Sold', percentage:'88', stat:'All Stats', img:chart1},
        {name:'User Retention', percentage:'88%', stat:'Weekly Stats', img:chart2},
    ];

    const transactions = [
        {name:'Chemistry TextBook', author:'By Veek design', amount:'$30,021.23', status:'Processing', date:'Jan 11, 2022'},
        {name:'Chemistry TextBook', author:'By Veek design', amount:'$10,021.23', status:'Declined', date:'Jan 13, 2022'},
        {name:'Chemistry TextBook', author:'By Veek design', amount:'$30,021.23', status:'Processing', date:'Jan 1, 2022'},
        {name:'Chemistry TextBook', author:'By Veek design', amount:'$20,021.23', status:'Success', date:'Jan 12, 2022'},
        {name:'Chemistry TextBook', author:'By Veek design', amount:'$30,021.23', status:'Success', date:'Jan 13, 2022'},
    ]


    return ( 
        <>
        <div  onClick={()=>{setSidebarVisible(false)}} className=" absolute lg:left-[20%] top-[56px] w-full pb-6 lg:w-[80%]">
            <span onClick={() => handleClick('Home')} className=' cursor-pointer px-6 mt-6 flex flex-row items-center'>
                <img src={ arrowBlue } alt="" />
                <p className=' font-Outfit text-[#2F52FF] text-sm font-medium'>Back</p>
                <p className=' font-Outfit text-xl font-semibold mb-2 ml-3'>Analysis</p> 
            </span>

            <div className=' mt-6 px-6'>
                <div className=" mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analysis.map((item, index) => (
                        <div key={index} className=" border border-[#EAEBF0] rounded-[10px] p-4">
                            <p className=" font-Outfit font-medium text-[#272D37] text-base">{ item.name }</p>
                            <div className=" w-full flex flex-row justify-between mt-2 items-end">
                                <div className=" w-[40%]">
                                    <p className=" font-Outfit text-[#272D37] text-xl font-semibold">{ item.percentage }</p>
                                    <p className=" font-Outfit text-[#5F6D7E] text-xs mt-2 font-medium">{ item.stat }</p>
                                </div>
                                <div className=" w-[59%]">
                                    <img src={ item.img } className=" w-[100%] h-full" alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=" px-6 mt-6">
                <div className=" border border-[#EAECF0] rounded-[8px]">
                    <div className=" w-full p-4">
                        <p className=" font-Outfit text-lg text-[#101828] font-medium">All Transactions</p>
                    </div>

                    <div className=" overflow-x-auto">
                        <table className="border-collapse w-full">
                            <thead>
                                <tr className="border-b bg-[#F9FAFB] px-4 py-3">
                                    <th className=" font-Outfit text-[#667085] text-xs text-left py-2 px-4">Transaction</th>
                                    <th className=" font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">Amount</th>
                                    <th className=" font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">Status</th>
                                    <th className=" font-Outfit text-[#667085] text-xs text-left w-[160px] py-2 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className=' border-b border-[#EAECF0]'>
                                        <td className=" text-left py-2 px-4 flex flex-col">
                                            <p className="font-Outfit text-[#101828] text-sm font-semibold">{transaction.name}</p>
                                            <p className="font-Outfit text-[#667085] -mt-[2px] text-xs">{transaction.author}</p>
                                        </td>
                                        <td className=" text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">{transaction.amount}</td>
                                        <td className=" text-left w-[160px] py-2 px-4">
                                            <button className={`py-1 px-2 text-xs font-medium rounded-[18px] flex items-center space-x-2 ${
                                                transaction.status === 'Processing' ? 'text-[#344054] bg-[#3440541a]' :
                                                transaction.status === 'Declined' ? 'text-[#B42318] bg-[#B423181a]' :
                                                transaction.status === 'Success' ? 'text-[#027A48] bg-[#027A481a]' : ''
                                            }`}>
                                                <span className={`w-[6px] h-[6px] rounded-[50%] ${
                                                    transaction.status === 'Processing' ? 'bg-[#344054]' :
                                                    transaction.status === 'Declined' ? 'bg-[#B42318]' :
                                                    transaction.status === 'Success' ? 'bg-[#027A48]' : ''
                                                }`}></span>
                                                <p>{transaction.status}</p>
                                            </button>
                                        </td>
                                        <td className=" text-sm font-Outfit text-[#667085] text-left w-[160px] py-2 px-4">{transaction.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className=" ">
                        <p className=" font-Outfit text-[#667085] text-xs">Transaction</p>
                    </div>
                </div>
            </div>

        </div>
        </>
    );
}
 
export default VectorAnalysis;