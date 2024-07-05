import blog1 from "./assets/blog1.svg";
import blog2 from "./assets/blog2.svg";
import blog3 from "./assets/blog3.svg";

const Blog = () => {
  const blogs = [
    {
      image: blog1,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog2,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
    {
      image: blog3,
      title: "Veclary review presentations",
      date: "25 Apr 2022 ",
    },
  ];
  return (
    <>
      <div className=" w-full flex flex-col items-center justify-center py-8 px-4 md:py-16 md:px-20">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          Our Latest Blog Posts
        </p>
        <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3 md:px-[12%]">
          The latest industry news, interviews, technologies, and resources.
        </p>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 my-16 w-full">
          {blogs.map((item, index) => (
            <div key={index} className=" w-full">
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" w-full h-[285px] rounded-[8px]"
              ></div>
              <p className=" mt-4  text-[#5F6D7E] text-sm font-Outfit font-medium">
                {item.date}
              </p>
              <p className=" font-Outfit font-semibold text-[#272D37] text-[22px] mt-2">
                {item.title}
              </p>
              <p className=" text-[#0530A1] font-Outfit text-[15px] font-semibold mt-4">
                Read more
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
