import grid from './assets/grid.svg';
import logo from './assets/logo.svg';
import progress from './assets/progress.svg';
import progress1 from './assets/progress1.svg';
import progress2 from './assets/progress2.svg';
import { Link } from 'react-router-dom';
import down from './assets/down.svg';
import ilus1 from './assets/ilus1.svg';
import prog1 from './assets/prog1.svg';
import { useState } from 'react';
import individual from './assets/Individualplan.svg';
import pro from './assets/proplan.svg';
import ent from './assets/entplan.svg';

const ManageSignup = () => {

    const req = [
        {name:'Characters', example:'8+'},
        {name:'Uppercase', example:'AA'},
        {name:'Lowercase', example:'aa'},
        {name:'Numbers', example:'123'},
        {name:'Symbol', example:'$#^'}
    ]

    const [personal, setPersonal] = useState(true);
    const [academic, setAcademic] = useState(false);
    const [plans, setPlans] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);


    const plan = [
        { name: 'Individual', price: '₦900/mon', image: individual },
        { name: 'Pro', price: '₦2500/mon', image: pro },
        { name: 'Enterprise', price: 'Custom price/mon', image: ent }
    ];

    const handlePlanSelect = (index) => {
        setSelectedPlan(selectedPlan === index ? null : index);
    };

    return ( 
        <>
        <div className=" w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
            <div className=" p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">

                <div className=' w-full lg:w-[49%] h-full flex flex-col md:px-10 relative'>
                    <p className=' font-Outfit text-[#2F52FF] text-2xl font-medium'>Sign up</p>
                    <p className=' text-[#12121266] font-Outfit text-lg font-normal mt-1'>Get Started Now</p>
                    

                    {  personal && <div className='w-full'>
                        <img src={ progress } className=' w-full mt-3' alt="" />
                        <p className=' font-Outfit font-medium text-2xl mt-6'>School Information</p>

                        <div className=' w-full mt-4 lg:overflow-y-auto lg:h-[260px]'>
                            <label htmlFor="Email" className=' flex flex-col w-full font-Outfit text-sm font-medium'>
                                School Name
                                <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                            </label>

                            <div className=' w-full flex justify-between items-center'>
                                <label htmlFor="Email" className=' flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4'>
                                    School CAC Number
                                    <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                                </label>

                                <label htmlFor="Email" className=' flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4'>
                                    School Registration Number
                                    <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                                </label>
                            </div>

                            <div className=' w-full flex justify-between items-end'>
                                <label htmlFor="Email" className=' flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4'>
                                    School Contact Information
                                    <input type="email" placeholder='Enter Phone Number' className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                                </label>

                                <label htmlFor="Email" className=' flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4'>
                        
                                    <input type="email" placeholder='Enter Email Address' className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                                </label>
                            </div>

                            <label htmlFor="Email" className=' flex flex-col w-full font-Outfit text-sm font-medium mt-4'>
                                School Address
                                <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                            </label>

                            <div className=' w-full flex justify-between items-end'>
                                <label htmlFor="Email" className=' flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4'>
                                    State
                                    <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                                </label>

                                <label htmlFor="Email" className=' flex flex-col w-[48%] font-Outfit text-sm font-medium mt-4'>
                                    Country
                                    <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                                </label>
                            </div>

                            <label htmlFor="Email" className=' flex flex-col w-full font-Outfit text-sm font-medium mt-4'>
                                School Website (optional)
                                <input type="email" className=' border border-[#EAEBF0] h-[40px] mb-10 p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                            </label>

                        </div>
                    </div>}

                    {  academic && <div className='w-full'>
                        <img src={ progress1 } className=' w-full mt-3' alt="" />
                        <p className=' font-Outfit font-medium text-2xl mt-6'>Account Information</p>
                        <p className=' font-Outfit text-[#636363] font-normal text-sm'>A centralized hub for streamlined school operations</p>

                        <div className=' w-full mt-4 lg:overflow-y-scroll lg:h-[260px]'>
                            
                            <label htmlFor="Email" className=' flex flex-col w-full font-Outfit text-sm font-medium mt-4'>
                                Administrator Name
                                <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                            </label>

                            <label htmlFor="Email" className=' flex flex-col w-full font-Outfit text-sm font-medium mt-4'>
                                Administrator Email Address
                                <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                            </label>

                            <label htmlFor="Email" className=' flex flex-col mb-12 w-full font-Outfit text-sm font-medium mt-4'>
                                Administrator Password
                                <input type="email" className=' border border-[#EAEBF0] h-[40px] p-2.5 font-Outfit text-sm rounded-[15px] mt-2' />
                            </label>
                            
                        </div>
                    </div>}


                    {  plans && <div className='w-full'>
                        <img src={ progress2 } className=' w-full mt-3' alt="" />
                        <p className=' font-Outfit font-medium text-xl mt-6'>Unlock Velcary full learning experience by choosing a plan</p>

                        <div className='w-full mt-4 pb-8 lg:overflow-y-scroll lg:h-[260px]'>
                            <div className='mt-4 space-y-3 flex flex-col items-center w-full'>
                                {plan.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`w-full border ${
                                            selectedPlan === index
                                                ? 'border-[#2F52FF] border-2'
                                                : 'border-[#EAEBF0]'
                                        } flex py-4 px-5 rounded-[10px] flex-col justify-between items- bg-[#F4F4F5] cursor-pointer`}
                                        onClick={() => handlePlanSelect(index)}
                                    >
                                        <div className="flex items-center w-full justify-between space-x-2"> {/* Added container for plan details */}
                                            <span className=' flex items-center space-x-2'>
                                                <p className='font-Outfit text-base font-medium'>{item.name}</p>
                                                <p className='font-Outfit text-xs mb-2 text-[#00000094] font-medium'>{item.price}</p>
                                            </span>
                                            <img src={ down } alt="" />
                                        </div>
                                        {selectedPlan === index && (
                                            <img src={item.image} className='mt-6 w-full' alt='' />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}

                    <div className=' mt-16 lg:mt-0 lg:absolute bottom-0 w-full left-0 lg:px-10'>
                        <Link to='/managementDashboard' className=' w-full'><button className=' w-full bg-[#2F52FF] rounded-[10px] flex items-center justify-center  h-[38px] text-white text-center font-Outfit text-base'>Proceed</button></Link>
                        <Link to='/managementlogin'><p className=' mt-[19px] font-Outfit font-medium text-xs text-[#12121266] text-center'>Already have an Account? <span className=' text-[#2F52FF]'>Login</span></p></Link>
                    </div>
                </div>

                <div style={{backgroundImage:`url(${grid})`, backgroundPosition:'center', backgroundSize:'cover'}} className=" w-[49%] bg-[#EBF5FF] rounded-[15px] relative hidden lg:flex flex-col justify-center px-5 py-6">
                    <span className=" absolute top-6 right-6 flex items-center space-x-2">
                        <img src={ logo } className=' w-16 h-6 md:w-10 md:h-6' alt="Veclary:The Best System To Enhance Your Education" />
                        <p className=' font-Outfit text-xl md:text-lg font-semibold text-[#121212]'>Veclary</p>
                    </span>

                    <div style={{backgroundImage:`url(${ilus1})`, backgroundPosition:'center', backgroundSize:'cover'}} className=' w-full h-[250px] z-50 mt-12 rounded-[15px]'>
                
                    </div>

                    <p className=' z-50  text-xl  font-semibold mt-16 font-Outfit'>Empower Educators and elevate learning</p>
                    <p className=' z-50 font-Outfit mt-2 font-normal text-base'>unleashing productivity with velcary’s management Tools</p>

                    <img src={ prog1 } className=' z-50 w-[90%] absolute bottom-6 left-5' alt="" />

                    <div className=' w-full  absolute h-[100%] top-0 left-0 bg-gradient-to-b from-[rgba(235,245,255,0)] rounded-[15px] to-[rgba(235,245,255,1)]'></div>

                </div>
            </div>
        </div>
        </>
     );
}
 
export default ManageSignup;