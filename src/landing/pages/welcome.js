import logo from './assets/logo.svg';
import student from './assets/student.svg';
import teacher from './assets/teacher.svg';
import school from './assets/school.svg';
import vendor from './assets/vendor.svg';
import grid from './assets/grid.svg';
import ilus from './assets/illus.svg';
import prog from './assets/prog.svg';
import { Link } from 'react-router-dom';

const Welcome = () => {

    const place = [
        {image:student, name:'Student', link:'/studentlogin'},
        {image:teacher, name:'Teacher', link:'/teacherslogin'},
        {image:school, name:'School', link:''},
        {image:vendor, name:'Vendor', link:''}
    ]
    return ( 
        <>
        <div className=" w-full h-[100vh] flex justify-center items-center bg-[#f1f1f1] text-[#000]">
            <div className=" p-6 w-full max-w-[1280px] lg:max-h-[630px] bg-[#fff] h-full flex rounded-[15px] flex-row justify-center lg:justify-between">
                <div className=" w-full lg:w-[49%] h-full flex flex-col items-center justify-center">
                    <span className=" flex items-center space-x-2">
                        <img src={ logo } className=' w-16 h-6 md:w-10 md:h-6' alt="Veclary:The Best System To Enhance Your Education" />
                        <p className=' font-Outfit text-xl md:text-lg font-semibold text-[#121212]'>Veclary</p>
                    </span>
                    <p className=' font-Outfit font-semibold text-2xl mt-6 text-center'>Welcome to Velcary!</p>
                    <p className=' text-center font-Outfit font-normal text-base mt-3 px-[15%]'>Choose your user type to login or create an account.</p>

                    <div className=' mt-8 grid grid-cols-2 gap-[24px]'>
                        {place.map((item, index) =>(
                            <div key={index} className=' w-full flex flex-col justify-center'>
                                <Link to={ item.link }><div className=' w-[120px] h-[120px] bg-[#F5F5F5] rounded-[10px] flex items-center justify-center'>
                                    <img src={ item.image } className=' w-12' alt={ item.name } />
                                </div></Link>
                                <p className=' text-center font-Outfit mt-2 text-base font-medium'>{ item.name }</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{backgroundImage:`url(${grid})`, backgroundPosition:'center', backgroundSize:'cover'}} className=" w-full lg:w-[49%] bg-[#EBF5FF] rounded-[15px] relative hidden lg:flex flex-col justify-center px-5 py-6">
                    <span className=" absolute top-6 right-6 flex items-center space-x-2">
                        <img src={ logo } className=' w-16 h-6 md:w-10 md:h-6' alt="Veclary:The Best System To Enhance Your Education" />
                        <p className=' font-Outfit text-xl md:text-lg font-semibold text-[#121212]'>Veclary</p>
                    </span>

                    <div style={{backgroundImage:`url(${ilus})`, backgroundPosition:'center', backgroundSize:'cover'}} className=' w-full h-[250px] z-50 mt-12 rounded-[15px]'>
                        {/* <img src={ ilus } className='' alt="" /> */}
                    </div>            

                    <p className=' z-50  text-xl  font-semibold mt-16 font-Outfit'>Unlock Your Potential with Personalized Learning</p>
                    <p className=' z-50 font-Outfit mt-2 font-normal text-base'>Dive into Engaging Learning Experiences</p>

                    <img src={ prog } className=' z-50 w-[90%] absolute bottom-6 left-5' alt="" />

                    <div className=' w-full  absolute h-[100%] top-0 left-0 bg-gradient-to-b from-[rgba(235,245,255,0)] rounded-[15px] to-[rgba(235,245,255,1)]'></div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Welcome;