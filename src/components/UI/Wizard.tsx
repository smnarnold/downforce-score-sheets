import styled from "styled-components";

interface StyledProps {
  slidesTotal: number;
  wizardWidth: string;
  wizardTranslateX: string;
}

const StyledWizard = styled.main<StyledProps>`
  flex: 1 1 auto;
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props.slidesTotal}, 1fr);
  grid-auto-rows: 1fr;
  left: 0;
  width: ${(props) => props.wizardWidth};
  transform: translateX(${(props) => props.wizardTranslateX});
  transition: transform 0.3s;
`;

export default function Wizard({
  slideIndex = 0,
  slidesTotal = 0,
  children = null,
}) {
  const wizardWidth : string = `${slidesTotal * 100}%`;
  const wizardTranslateX : string = `${(slideIndex / slidesTotal) * -100}%`;

  return (
    <StyledWizard
      slidesTotal={slidesTotal}
      wizardWidth={wizardWidth}
      wizardTranslateX={wizardTranslateX}
    >
      {children}
    </StyledWizard>
  );
}
