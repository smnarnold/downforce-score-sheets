import { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import { getCarTheme } from "../helpers";
import styled from "styled-components";
import { updateBets } from "../Slides/Bets/betsSlice";
import AppContext from "../../store/app-context";

const StyledRadioImage = styled.label`
  position: relative;
  display: block;
  width: 100%;
  margin: 1em 0 0;

  input {
    display: none;
  }

  img {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    margin: 0.25em 0 0;
    opacity: 0.35;
    transition: opacity 0.15s ease-in-out;
    cursor: pointer;
  }

  &:hover img,
  &.is-active img {
    opacity: 1;
  }
`;

interface IRadioImage {
  id: string;
  name: string;
  img: string;
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  value: string;
  checked?: boolean;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function RadioImage({
  id = "",
  name,
  img,
  width,
  height,
  label,
  className,
  value = '',
  checked,
  callback,
}: IRadioImage) {
  return (
    <StyledRadioImage key={id} className={`${checked && "is-active"}`}>
        {label ? `${label}` : ""}
        <input
          type="radio"
          name={name}
          value={id}
          onChange={callback}
        />

      <img 
        src={img} 
        alt={label} 
        width={width ? width : ''} 
        height={height ? height : ''} />
    </StyledRadioImage>
  );
}

export default RadioImage;
