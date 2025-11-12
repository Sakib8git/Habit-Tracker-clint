import React from "react";
import styled from "styled-components";

const Button = ({ children, type = "button", onClick, disabled = false, className = "" }) => {
  return (
    <StyledWrapper>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    padding: 12.5px 30px;
    border: 0;
    border-radius: 100px;
    background-color: #2ba8fb;
    color: #ffffff;
    font-weight: bold;
    transition: all 0.5s;
    width: 100%;
    cursor: pointer;
  }

  button:hover:enabled {
    background-color: #6fc5ff;
    box-shadow: 0 0 20px #6fc5ff50;
    transform: scale(1.1);
  }

  button:active:enabled {
    background-color: #3d94cf;
    transition: all 0.25s;
    box-shadow: none;
    transform: scale(0.98);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default Button;