import { useContext } from "react";
import AppContext from "../../store/app-context";
import styled from "styled-components";

const StyledBackBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: transparent;
  border: none;
  color: currentColor;
  font-size: 1.25em;
  font-weight: bold;
  padding: 0 10px;
  transform: translateX(-10px);
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface BackBtnProps {
  text?: string;
}

export default function Btn({ text = "↩" }: BackBtnProps) {
  const ctx = useContext(AppContext);

  return (
    <StyledBackBtn onClick={ctx.onPrevSlide}>
      <span>{text}</span>
    </StyledBackBtn>
  );
}
