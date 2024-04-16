import logo from './assets/logo.svg';
import down from './assets/down.svg';
import go from './assets/go.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {

    function overlay(){
        //check classlist
        const overlayDiv = document.getElementById('overlay');
        if(overlayDiv.classList.contains('-translate-y-[500px]')){
            overlayDiv.classList.remove('-translate-y-[500px]')
        }
        else if(!overlayDiv.classList.contains('-translate-y-[500px]')){
            overlayDiv.classList.add('-translate-y-[500px]')
        }
    };

    return ( 
        <>
        <div className=' w-full flex justify-end items-end pr-8'>
            <div id="overlay" className=" w-[203px] bg-[#FFFFFFBD] rounded-[18px] backdrop-blur-xl p-6 flex flex-col -translate-y-[500px] shadow transition-all duration-700 top-[78px] fixed z-[99]">
                <div className="w-full flex flex-col space-y-[18px] font-Outfit text-[#121212] text-[15px]">
                    
                    <p className=" font-normal transition-all cursor-pointer">Home</p>

                    <span className=' flex items-center w-full justify-between'>
                        <p className=''>Products</p>
                        <img src={ down } alt="" />
                    </span>
                    <span className=' flex items-center w-full justify-between'>
                        <p className=''>Company</p>
                        <img src={ go } alt="" />
                    </span>
                    <span className=' flex items-center w-full justify-between'>
                        <p className=''>Career</p>
                        <img src={ go } alt="" />
                    </span>
                    <span className=' flex items-center w-full justify-between'>
                        <p className=''>Blog</p>
                        <img src={ go } alt="" />
                    </span>
                </div>
                <span className=' mt-8 flex md:hidden items-center justify-between w-full'>
                    <Link to='/getStarted'><button className=' rounded-[4px] px-4 py-3 font-Outfit text-xs font-semibold border border-[#1212121A] shadow-sm shadow-[#1018280A] text-[#121212] text-center'>Sign Up</button></Link>
                    <button className=' rounded-[4px] px-4 py-3 font-Outfit text-xs font-semibold bg-[#2F52FF] shadow-sm shadow-[#1018280A] text-[#fff] text-center'>Log In</button>
                </span>
            </div>
        </div>


        <div className=" w-full px-4 md:px-20">
            <div className=" flex flex-row justify-between items-center py-9 md:py-5 md:border-b border-[#121212]">
                <span className=" flex items-center space-x-2">
                    <img src={ logo } className=' w-16 h-6 md:w-auto md:h-auto' alt="Veclary:The Best System To Enhance Your Education" />
                    <p className=' font-Outfit text-xl md:text-2xl font-semibold text-[#121212]'>Veclary</p>
                </span>
                <span className=' hidden lg:flex flex-row items-center space-x-10 font-Outfit font-normal text-[#121212] text-[15px]'>
                    <p className=''>Home</p>
                    <span className=' flex items-center space-x-1'>
                        <p className=''>Products</p>
                        <img src={ down } alt="" />
                    </span>
                    <p className=''>Company</p>
                    <p className=''>Career</p>
                    <p className=''>Blog</p>
                </span>

                <span className=' hidden md:flex flex-row items-center space-x-3'>
                    <Link to='/getStarted'><button className=' rounded-[5px] px-6 py-3 font-Outfit text-base font-semibold bg-[#F1F1F1] shadow-sm shadow-[#1018280A] text-[#121212] text-center'>Sign Up</button></Link>
                    <button className=' rounded-[5px] px-6 py-3 font-Outfit text-base font-semibold bg-[#2F52FF] shadow-sm shadow-[#1018280A] text-[#fff] text-center'>Log In</button>
                    <span className=' w-10 h-10 rounded-[50%] bg-[#f1f1f1] hidden md:flex lg:hidden items-center justify-center'>
                        <div 
                        onClick={ overlay }
                        className="menu-icon">
                            <input className="menu-icon__cheeckbox" type="checkbox" />
                            <div>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </span>
                </span>

                <span className=' w-10 h-10 rounded-[50%] bg-[#f1f1f1] flex md:hidden items-center justify-center'>
                    <div 
                    onClick={ overlay }
                    className="menu-icon md:hidden">
                        <input className="menu-icon__cheeckbox" type="checkbox" />
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </span>
            </div>
        </div>
        </>
     );
}
 
export default Navbar;