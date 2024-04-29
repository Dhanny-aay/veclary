import grid from './assets/grid.svg';
import logo from './assets/logo.svg';
import { Link } from 'react-router-dom';
import ilus1 from './assets/ilus1.svg';
import prog1 from './assets/prog1.svg';
import { useState } from 'react';
import PublishSignup from '../components/publishSignUp';
import AuthorSignup from '../components/authorSignup';


const VendorSignup = () => {

    const [selectedProfile, setSelectedProfile] = useState(null);

    const profile = [
        {name:'Publisher', component:< PublishSignup/>},
        {name:'Author', component:<AuthorSignup/>},
    ];

    const handleProfileSelect = (index) => {
        setSelectedProfile(profile[index].component);
    };

    // const handleProceed = () => {
    //     // Handle proceed action here, such as form submission or navigation
    //     console.log("Proceed button clicked");
    // };

    return ( 
        <>
        <div className=" w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
            <div className=" p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">

                <div className=' w-full lg:w-[49%] h-full flex flex-col md:px-10 relative'>
                    <p className=' font-Outfit text-[#2F52FF] text-2xl font-medium'>Sign up</p>
                    <p className=' text-[#12121266] font-Outfit text-lg font-normal mt-1'>Get Started Now</p>
                    <div className='w-full'>
                        {selectedProfile ? (
                            selectedProfile // Render the selected profile component
                        ) : (
                            <div className='w-full mt-6'>
                                <p className='font-Outfit text-xl font-semibold text-black'>Choose a Profile</p>
                                <div className='w-full mt-6 grid grid-cols-1 gap-4'>
                                    {profile.map((item, index) => (
                                        <button key={index} onClick={() => handleProfileSelect(index)} className='w-full h-[48px] border border-[#EAEBF0] rounded-[15px] p-1 flex flex-row space-x-4 items-center'>
                                            <span className='h-full w-[44px] bg-[#81B2FC] rounded-[13px]'></span>
                                            <p className='font-Outfit text-black font-medium text-base'>{item.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
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
 
export default VendorSignup;