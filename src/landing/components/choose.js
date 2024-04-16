import teach from './assets/teach.svg';

const Choose = () => {
    return ( 
        <>
        <div className=" w-full flex flex-col items-center justify-center py-8 px-4 md:py-16 md:px-20">
            <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">Why Choose Us</p>
            <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 lg:px-[12%]">Keeping your eye on the ball while performing a deep dive on the start-up mentality to  derive convergence on cross-platform integration.</p>

            <div className=" w-full flex flex-col lg:flex-row md:justify-between items-center mt-12">

                <div style={{backgroundImage:`url(${teach})`, backgroundPosition:'center', backgroundSize:'cover'}}  className=" w-full lg:w-[48%] h-[560px] rounded-[10px] bg-[#ECF6E7]">

                </div>

                <div className=" w-full lg:w-[48%] mt-8 lg:mt-0 flex flex-col items-center justify-center">
                    <div className=" w-full">
                        <p className=" font-Outfit font-semibold text-xl md:text-2xl">Accessible and Affordable</p>
                        <p className=" font-Outfit text-base font-normal text-[#5F6D7E] mt-2">Veclary offers flexible pricing options to suit different needs and budgets, making high-quality education resources accessible to everyone.</p>
                    </div>
                    
                    <div className=" w-full py-8">
                        <p className=" font-Outfit font-semibold text-xl md:text-2xl">Data-Driven Insights</p>
                        <p className=" font-Outfit text-base font-normal text-[#5F6D7E] mt-2">Gain valuable data and analytics to track progress, identify areas for improvement, and make informed decisions to support learning success.</p>
                    </div>

                    <div className=" w-full pb-8">
                        <p className=" font-Outfit font-semibold text-xl md:text-2xl">Streamlined Workflows</p>
                        <p className=" font-Outfit text-base font-normal text-[#5F6D7E] mt-2">Simplify tasks, automate processes, and save valuable time with Veclary's powerful management tools for teachers and administrators.</p>
                    </div>

                    <div className=" w-full ">
                        <p className=" font-Outfit font-semibold text-xl md:text-2xl">Engaging Resources</p>
                        <p className=" font-Outfit text-base font-normal text-[#5F6D7E] mt-2">Dive into a vast library of interactive content, multimedia resources, and personalized recommendations to keep you motivated and engaged.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Choose;
