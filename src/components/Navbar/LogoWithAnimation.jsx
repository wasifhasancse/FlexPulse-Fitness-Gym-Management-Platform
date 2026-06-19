"use client";

import { GiCentaurHeart } from "react-icons/gi";
import styled from "styled-components";

const LogoWithAnimation = () => {
  return (
    <StyledWrapper>
      <span className="brand-wrap" aria-label="FlexPulse">
        <span className="brand-icon" aria-hidden="true">
          <GiCentaurHeart size={20} />
        </span>
        <span className="brand-text">
          Flex<span className="brand-accent">Pulse</span>
        </span>
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .brand-wrap {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    position: relative;
    isolation: isolate;
  }

  .brand-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.85rem;
    color: white;
    background: linear-gradient(135deg, #222831 0%, #30475e 100%);
    box-shadow: 0 8px 24px rgba(34, 40, 49, 0.22);
    transition: all 0.3s ease;
  }

  .brand-text {
    color: #222831;
    font-weight: 800;
    font-size: 1.65rem;
    line-height: 1;
    letter-spacing: -0.03em;
    transition: color 0.3s ease;
  }

  html.dark & .brand-text {
    color: #f0f4f8;
  }

  .brand-accent {
    color: #f05454;
    transition: color 0.3s ease;
  }

  html.dark & .brand-accent {
    color: #f05454;
  }

  .brand-wrap::after {
    content: "";
    position: absolute;
    left: 0.5rem;
    right: -0.25rem;
    bottom: -0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: radial-gradient(
      circle at center,
      rgba(240, 84, 84, 0.28),
      transparent 72%
    );
    filter: blur(5px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .brand-wrap:hover .brand-icon {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 32px rgba(240, 84, 84, 0.24);
  }

  .brand-wrap:hover::after {
    opacity: 1;
  }

  @media (max-width: 480px) {
    .brand-text {
      font-size: 1.35rem;
    }
  }
`;

export default LogoWithAnimation;
