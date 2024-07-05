import cap from "./assets/cap.svg";
import globe from "./assets/globe.svg";
import scope from "./assets/scope.svg";
import board from "./assets/board.svg";
import mistry from "./assets/mistry.svg";
import pencil from "./assets/pencil.svg";
import lead1 from "./assets/lead1.svg";

const Leaderboard = () => {
  return (
    <>
      <div className=" mt-16 w-full px-4 md:px-12 flex flex-col items-center justify-center">
        <p className=" text-center font-Outfit font-semibold text-2xl md:text-[40px] md:leading-[60px]">
          Our Leaderboard
        </p>
        <p className=" font-Outfit text-center text-sm md:text-xl text-[#000000B2] font-normal mt-3">
          Complete a book/course to join this week’s leaderboard
        </p>
        <button className=" mt-8 md:mt-8 rounded-[8px] px-6 py-4 font-Outfit text-base font-semibold bg-[#0530A1] shadow-sm shadow-[#1018280A] text-[#fff] text-center">
          Continue Learning
        </button>

        <div className=" w-full flex flex-col justify-center items-center mt-16 space-y-7 overflow-x-auto scrollbar-hide">
          {/* row 1 */}
          <div className=" w-full flex flex-row space-x-3 items-center justify-center">
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
            <div className=" w-[295px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <span className=" bg-[#121212] w-[30px] h-[30px] rounded-full text-white font-Outfit text-base font-medium text-center flex justify-center items-center">
                1
              </span>
              <div
                style={{
                  backgroundImage: `url(${lead1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"
              ></div>
              <div className=" flex flex-col space-y-1">
                <p className=" font-Outfit font-bold text-sm text-[#121212]">
                  Devon Lane
                </p>
                <p className=" text-xs text-[#121212B2] font-Outfit font-normal">
                  Primary 6
                </p>
              </div>
              <p className=" text-[#272D37] font-Outfit font-medium text-base pl-3">
                2000pt
              </p>
            </div>
            <img src={cap} alt="" className="w-12 h-12" />
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
          </div>
          {/* row 2 */}
          <div className=" w-full flex flex-row space-x-3 items-center justify-center">
            <div className=" w-[295px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <span className=" bg-[#121212] w-[30px] h-[30px] rounded-full text-white font-Outfit text-base font-medium text-center flex justify-center items-center">
                2
              </span>
              <div
                style={{
                  backgroundImage: `url(${lead1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"
              ></div>
              <div className=" flex flex-col space-y-1">
                <p className=" font-Outfit font-bold text-sm text-[#121212]">
                  Devon Lane
                </p>
                <p className=" text-xs text-[#121212B2] font-Outfit font-normal">
                  Primary 6
                </p>
              </div>
              <p className=" text-[#272D37] font-Outfit font-medium text-base pl-2">
                2000pt
              </p>
            </div>
            <img src={globe} alt="" className="w-12 h-12" />
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
            <div className=" w-[295px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <span className=" bg-[#121212] w-[30px] h-[30px] rounded-full text-white font-Outfit text-base font-medium text-center flex justify-center items-center">
                3
              </span>
              <div
                style={{
                  backgroundImage: `url(${lead1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"
              ></div>
              <div className=" flex flex-col space-y-1">
                <p className=" font-Outfit font-bold text-sm text-[#121212]">
                  Devon Lane
                </p>
                <p className=" text-xs text-[#121212B2] font-Outfit font-normal">
                  Primary 6
                </p>
              </div>
              <p className=" text-[#272D37] font-Outfit font-medium text-base pl-2">
                2000pt
              </p>
            </div>
            <img src={board} alt="" className="w-12 h-12" />
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
          </div>
          {/* row 3 */}
          <div className=" w-full flex flex-row space-x-3 items-center justify-center pl-5">
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
            <img src={scope} alt="" className="h-12 w-12" />
            <div className=" w-[295px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <span className=" bg-[#121212] w-[30px] h-[30px] rounded-full text-white font-Outfit text-base font-medium text-center flex justify-center items-center">
                4
              </span>
              <div
                style={{
                  backgroundImage: `url(${lead1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"
              ></div>
              <div className=" flex flex-col space-y-1">
                <p className=" font-Outfit font-bold text-sm text-[#121212]">
                  Devon Lane
                </p>
                <p className=" text-xs text-[#121212B2] font-Outfit font-normal">
                  Primary 6
                </p>
              </div>
              <p className=" text-[#272D37] font-Outfit font-medium text-base pl-3">
                2000pt
              </p>
            </div>
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
          </div>
          {/* row 4 */}
          <div className=" w-full flex flex-row space-x-3 items-center justify-center">
            <div className=" w-[295px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <span className=" bg-[#121212] w-[30px] h-[30px] rounded-full text-white font-Outfit text-base font-medium text-center flex justify-center items-center">
                5
              </span>
              <div
                style={{
                  backgroundImage: `url(${lead1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"
              ></div>
              <div className=" flex flex-col space-y-1">
                <p className=" font-Outfit font-bold text-sm text-[#121212]">
                  Devon Lane
                </p>
                <p className=" text-xs text-[#121212B2] font-Outfit font-normal">
                  Primary 6
                </p>
              </div>
              <p className=" text-[#272D37] font-Outfit font-medium text-base pl-2">
                2000pt
              </p>
            </div>
            <img src={mistry} alt="" className="h-12 w-12" />
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
            <div className=" w-[295px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <span className=" bg-[#121212] w-[30px] h-[30px] rounded-full text-white font-Outfit text-base font-medium text-center flex justify-center items-center">
                6
              </span>
              <div
                style={{
                  backgroundImage: `url(${lead1})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"
              ></div>
              <div className=" flex flex-col space-y-1">
                <p className=" font-Outfit font-bold text-sm text-[#121212]">
                  Devon Lane
                </p>
                <p className=" text-xs text-[#121212B2] font-Outfit font-normal">
                  Primary 6
                </p>
              </div>
              <p className=" text-[#272D37] font-Outfit font-medium text-base pl-2">
                2000pt
              </p>
            </div>
            <img src={pencil} alt="" className="h-12 w-12" />
            <div className=" w-[200px] h-[83px] bg-[#F5F5F5] rounded-[17px] flex items-center space-x-3 p-4">
              <div className=" h-[50px] w-[50px] bg-[#D9D9D9] rounded-full"></div>
              <div className=" flex flex-col space-y-2">
                <span className=" w-[63px] h-[8px] bg-[#D9D9D9] rounded-[16px]"></span>
                <span className=" w-[31px] h-[6px] bg-[#D9D9D9] rounded-[16px]"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
