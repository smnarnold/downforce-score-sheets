import styled from "styled-components";

const StyledWizard = styled.main`
  flex: 1 1 auto;
  position: relative;
  display: grid;
  grid-template-columns: repeat(${props => props.slidesTotal}, 1fr);
  grid-auto-rows: 1fr;
  left: 0;
  width: ${props => props.wizardWidth};
  transform: translateX(${props => props.wizardTranslateX});
  transition: transform 0.3s;
`;

export default function Wizard({ slideIndex, slidesTotal=0, children }) {
  const wizardWidth = `${slidesTotal * 100}%`;
  const wizardTranslateX = `${(slideIndex / slidesTotal) * -100}%`;

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