import orange from './assets/orange.svg';
import search from './assets/search-normal.svg';
import heroImg from './assets/heroImg.svg';
import heroMob from './assets/heroMob.svg';
import { motion } from 'framer-motion';


const Hero = () => {
    return ( 
        <>
        <div className=" w-full flex flex-col items-center justify-center py-12 md:py-20 px-4 md:px-20">
            <motion.p 
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:0.3, duration:0.8}}
            className=" font-Outfit text-center text-4xl leading-[50px] md:text-[55px] font-semibold md:leading-[82.5px] md:px-[5%] lg:px-[13%] xl:px-[22%]">The Best System To Enhance Your <span className=" inline-flex flex-col w-[170px] md:w-[271px]">Education<img src={ orange } className=' -mt-2 md:-mt-5 w-[170px] md:w-[271px]' alt="" /></span></motion.p>

            <motion.p 
            initial={{y:50,opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:1.1, duration:0.8}}
            className=' text-xl font-normal font-Outfit text-center md:px-[4%] lg:px-[12%] xl:px-[18%] mt-3'>Seamlessly connect educators, students, and parents, while nurturing collaboration and individual exploration through our powerful education suite.</motion.p>

            <motion.div
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:1.5, duration:0.8}}
            className=' w-full md:w-[500px] lg:w-[600px] h-[54px] border-[3px] border-[#F1F1F1] rounded-[10px] flex items-center justify-between mt-12 bg-white pr-[6px]'>
                <img src={ search } className=' ml-4' alt="" />
                <input type="text" placeholder='Search for Books' className=' placeholder:text-[#000000CC] ml-3 font-Outfit h-[54px] w-full border-y-[3px] border-[#F1F1F1]' />
                <button className=' px-8 py-[8px] rounded-[5px] bg-[#2F52FF] font-Outfit text-center font-semibold text-base text-white'>Search</button>
            </motion.div>

            <motion.img
            initial={{y:50, opacity:0}}
            animate={{y:0, opacity:1}}
            transition={{delay:2.0, duration:0.8}}
            src={ heroImg } className=' hidden md:block mt-12' alt="Veclary" />
        </div>
        <motion.img
        initial={{y:50, opacity:0}}
        animate={{y:0, opacity:1}}
        transition={{delay:2.0, duration:0.8}}
        src={ heroMob } className=' block md:hidden mt-12 w-[100vw]' alt="Veclary" />
        </>
     );
} 
 
export default Hero;