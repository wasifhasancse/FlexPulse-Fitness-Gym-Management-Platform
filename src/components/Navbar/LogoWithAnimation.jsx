"use client";

import styled from "styled-components";

const LogoWithAnimation = () => {
  return (
    <StyledWrapper>
      <span className="ui-logo">
        <span className="text-[#5e41de] dark:text-[#a78bfa] uppercase">
          Idea
          <span className="text-[#a78bfa] dark:text-[#5e41de]">Vault</span>
        </span>
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* From Uiverse.io by SteveBloX */
  .ui-logo {
    position: relative;
    padding: 2px 5px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  @media (min-width: 768px) {
    .ui-logo {
      padding: 2px 5px;
      font-size: 1.375rem;
    }
  }

  .ui-logo:active {
    transform: scale(0.95);
  }

  .ui-logo:before,
  .ui-logo:after {
    position: absolute;
    content: "";
    width: 150%;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);
    z-index: -1000;
    background-repeat: no-repeat;
  }

  .ui-logo:hover:before {
    top: -70%;
    background-image:
      radial-gradient(circle, #5e41de 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #5e41de 20%, transparent 30%),
      radial-gradient(circle, #a78bfa 20%, transparent 20%),
      radial-gradient(circle, #5e41de 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #a78bfa 15%, transparent 20%),
      radial-gradient(circle, #5e41de 20%, transparent 20%),
      radial-gradient(circle, #a78bfa 20%, transparent 20%),
      radial-gradient(circle, #5e41de 20%, transparent 20%),
      radial-gradient(circle, #a78bfa 20%, transparent 20%);
    background-size:
      10% 10%,
      20% 20%,
      15% 15%,
      20% 20%,
      18% 18%,
      10% 10%,
      15% 15%,
      10% 10%,
      18% 18%;
    background-position: 50% 120%;
    animation: purpleTopBubbles 0.6s ease;
  }

  @keyframes purpleTopBubbles {
    0% {
      background-position:
        5% 90%,
        10% 90%,
        10% 90%,
        15% 90%,
        25% 90%,
        25% 90%,
        40% 90%,
        55% 90%,
        70% 90%;
    }

    50% {
      background-position:
        0% 80%,
        0% 20%,
        10% 40%,
        20% 0%,
        30% 30%,
        22% 50%,
        50% 50%,
        65% 20%,
        90% 30%;
    }

    100% {
      background-position:
        0% 70%,
        0% 10%,
        10% 30%,
        20% -10%,
        30% 20%,
        22% 40%,
        50% 40%,
        65% 10%,
        90% 20%;
      background-size:
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%;
    }
  }

  .ui-logo:hover::after {
    bottom: -70%;
    background-image:
      radial-gradient(circle, #5e41de 20%, transparent 20%),
      radial-gradient(circle, #a78bfa 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #5e41de 15%, transparent 20%),
      radial-gradient(circle, #a78bfa 20%, transparent 20%),
      radial-gradient(circle, #5e41de 20%, transparent 20%),
      radial-gradient(circle, #a78bfa 20%, transparent 20%),
      radial-gradient(circle, #5e41de 20%, transparent 20%);
    background-size:
      15% 15%,
      20% 20%,
      18% 18%,
      20% 20%,
      15% 15%,
      20% 20%,
      18% 18%;
    background-position: 50% 0%;
    animation: purpleBottomBubbles 0.6s ease;
  }

  @keyframes purpleBottomBubbles {
    0% {
      background-position:
        10% -10%,
        30% 10%,
        55% -10%,
        70% -10%,
        85% -10%,
        70% -10%,
        70% 0%;
    }

    50% {
      background-position:
        0% 80%,
        20% 80%,
        45% 60%,
        60% 100%,
        75% 70%,
        95% 60%,
        105% 0%;
    }

    100% {
      background-position:
        0% 90%,
        20% 90%,
        45% 70%,
        60% 110%,
        75% 80%,
        95% 70%,
        110% 10%;
      background-size:
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%,
        0% 0%;
    }
  }
`;

export default LogoWithAnimation;
