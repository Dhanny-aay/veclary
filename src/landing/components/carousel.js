import React from "react";
import styled, { keyframes, css } from "styled-components";
import slack from "./assets/slack.svg";
import trello from "./assets/trello.svg";
import mailchimp from "./assets/mailchimp.svg";
import medium from "./assets/medium.svg";
import google from "./assets/google.svg";
import pintrest from "./assets/pintrest.svg";

const row1 = [slack, trello, mailchimp, medium, google, pintrest];

const Carousel = () => {
  return (
    <>
      <div className=" px-4 md:px-16 w-full font-Outfit">
        <p className="text-[#000] font-semibold text-xl px-[8%] md:px-0 text-center">
          Join 100+ Schools using our product like
        </p>

        <AppContainer>
          <Wrapper>
            <Marquee>
              <MarqueeGroup>
                {row1.map((image, i) => (
                  <span
                    key={i}
                    className=" px-3 md:px-8 md:py-4 bg-[#f9f9f9] rounded-[5px] md:mx-6 md:w-auto"
                  >
                    <img src={image} className=" w-[95px]" alt="" />
                  </span>
                ))}
              </MarqueeGroup>

              <MarqueeGroup>
                {row1.map((image, i) => (
                  <span
                    key={i}
                    className=" px-3 md:px-8 md:py-4 bg-[#f9f9f9] rounded-[5px] md:mx-6 md:w-auto"
                  >
                    <img src={image} className=" w-[95px]" alt="" />
                  </span>
                ))}
              </MarqueeGroup>
            </Marquee>
          </Wrapper>
        </AppContainer>
      </div>
    </>
  );
};

export default Carousel;

const AppContainer = styled.div`
  width: 100%;
  color: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Marquee = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  user-select: none;
`;

const scrollX = keyframes`
  from {
    left: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const common = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  white-space: nowrap;

  animation: ${scrollX} 30s linear infinite;
`;

const MarqueeGroup = styled.div`
  ${common}

  }
`;
