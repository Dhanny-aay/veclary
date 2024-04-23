import backArr from './assets/backArr.svg';
import fwdArr from './assets/fwdArr.svg';
import trash from './assets/trash.svg';
import vis from './assets/vis.svg';


const FeesPaid = () => {

    const testData = [
        { name: 'Grand Rapids', time:'2021-05-21  12:39', Amount:'$10,000', id:'DF11CA4', session:'2019/2020', type:'School Fee', class: 'SSS1' , term:'1st & 2nd Term'},
        { name: 'Grand Rapids', time:'2021-05-21  12:39', Amount:'$10,000', id:'DF11CA4', session:'2019/2020', type:'School Fee', class: 'SSS1' , term:'1st & 2nd Term'},
        { name: 'Bell Gardens', time:'2021-05-21  12:39', Amount:'$10,000', id:'DF11CA4', session:'2019/2020', type:'School Fee', class: 'SSS1' , term:'1st & 2nd Term' },
        { name: 'Bell Gardens', time:'2021-05-21  12:39', Amount:'$10,000', id:'DF11CA4', session:'2019/2020', type:'School Fee', class:'Jss1'  , term:'1st & 2nd Term'},
        { name: 'Broomfield', time:'2021-05-21  12:39', Amount:'$10,000', id:'DF11CA4', session:'2019/2020', type:'School Fee', class: 'Jss1' , term:'1st & 2nd Term'}
    ];

    return ( 
        <>
        <div className=' w-full px-6 mt-6'>
            <div className=' w-full md:items-end flex flex-wrap md:flex-row mt-6 justify-between'>
                <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col w-[48%] mt-3 md:mt-0 md:w-[200px] text-[#272D37] text-xs font-medium'>
                    Payment Type
                    <select type="text" value={''} className=' mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5'>
                        <option value="">Select Payment Type</option>
                        <option value="Jss1"></option>
                    </select>
                </label>

                <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col w-[48%] mt-3 md:mt-0 md:w-[200px] text-[#272D37] text-xs font-medium'>
                    Class
                    <select type="text" value={''} className=' mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5'>
                        <option value="">Jss1</option>
                        <option value="Jss1"></option>
                    </select>
                </label>

                <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col w-[48%] mt-3 md:mt-0 md:w-[200px] text-[#272D37] text-xs font-medium'>
                    Session
                    <select type="text" value={''} className=' mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5'>
                        <option value="">2023/2024</option>
                        <option value="Jss1"></option>
                    </select>
                </label>

                <label htmlFor="Class Teacher" className=' font-Outfit flex flex-col w-[48%] mt-3 md:mt-0 md:w-[200px] text-[#272D37] text-xs font-medium'>
                    Term
                    <select type="text" value={''} className=' mt-2 text-[#272D37] text-sm w-full font-normal border border-[#DAE0E6] rounded-[5px] font-Outfit p-2.5'>
                        <option value="">1st Term</option>
                        <option value="Jss1"></option>
                    </select>
                </label>
            </div>

            <div className=' mt-6'>
                <p className=' font-semibold text-xl font-Outfit text-black'>Fees Paid</p>
                <div className=' border border-[#EAEBF0] px-3 mt-3 rounded-[10px]'>
                    <div className=" w-full overflow-x-auto">
                        <table className="border-collapse border-y border-[#EAEBF0] rounded-[10px] w-full">
                            <thead>
                                <tr>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">S/N</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Student Name</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Fee Type</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Transaction ID</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Time</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Session</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Session</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Term</th>
                                    <th className="border-b font-Outfit text-sm font-medium text-[#5F6D7E] border-[#EAEBF0] py-3 text-center px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testData.map((data, index) => (
                                    <tr key={index}>
                                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-sm text-[#5F6D7E] font-medium text-center">0{index + 1}</td>
                                        <td className=" font-Outfit py-4 border-t border-[#EAEBF0] text-[#272D37] font-medium text-sm text-center">{data.name}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.type}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.id}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.time}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.session}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.term}</td>
                                        <td className=" font-Outfit text-sm text-[#5F6D7E] py-4 border-t border-[#EAEBF0] text-center">{data.Amount}</td>
                                    
                                        <td className="  py-4 border-t border-[#EAEBF0] text-center flex justify-center items-center space-x-3">
                                            <img src={ vis } className=' w-3' alt="" />
                                            <img src={ trash } className=' w-3' alt="" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody> 
                        </table>
                    </div>
                    <div className=" w-full py-3 px-3 flex justify-between items-center">
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
 
export default FeesPaid;