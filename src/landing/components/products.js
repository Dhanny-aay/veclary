import group1 from './assets/Group1.svg';
import group2 from './assets/Group2.svg';


const Products = () => {
    return ( 
        <>
        <div className=" w-full flex flex-col items-center justify-center py-8 md:py-16 px-4 md:px-20">
            <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">Explore Our Products</p>

            <div className=" grid grid-cols-1 lg:grid-cols-2 w-full mt-8 gap-[32px]">
                <div className=" bg-[#F8DB46] py-6 md:py-12 w-full rounded-[20px] relative h-[326px] md:h-[550px] overflow-hidden">
                    <p className=" font-Outfit mx-6 md:mx-12 text-lg md:text-[30px] font-semibold capitalize md:leading-[48px]">Efficient school management system</p>
                    <p className=" mt-2 mx-6 md:mx-12 text-sm md:text-xl font-normal font-Outfit text-[#000000B2]">All-in-one system for scheduling, attendance, grading, and communication.</p>

                    <div className=' w-full flex flex-row h-[200px] 2xl:h-[300px]'>
                        <img src={ group1 } className=' absolute bottom-12' alt="" />
                    </div>
                </div>
                <div className=" bg-[#FEDFC1] py-12 w-full rounded-[20px] relative h-[400px] md:h-[550px]">
                    <p className=" font-Outfit mx-6 md:mx-12 text-lg md:text-[30px] font-semibold capitalize md:leading-[48px]">our curated e-library</p>
                    <p className=" mt-2 mx-6 md:mx-12 text-sm md:text-xl font-normal font-Outfit text-[#000000B2]">Explore thousands of eBooks, articles, and multimedia Resources Tailored to All Ages, Interests, and Learning Levels, in Multiple Languages and Subjects.</p>
                    <div className=' w-full flex flex-row h-[200px] 2xl:h-[300px]'>
                        <img src={ group2 } className=' absolute bottom-12' alt="" />
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Products;