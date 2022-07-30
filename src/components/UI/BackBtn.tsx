import styled from "styled-components";

const StyledBackBtn = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: transparent;
  border: none;
  color: currentColor;
  font-weight: bold;
  line-height: 0.5;
  width: 40px;
  height: 100%;
  padding: 0;
`;

interface BackBtnProps {
  text?: string;
  goToPrevSlide: () => void;
}

export default function Btn({ text = "↩", goToPrevSlide }: BackBtnProps) {
  return <StyledBackBtn onClick={goToPrevSlide}>{text}</StyledBackBtn>;
}
