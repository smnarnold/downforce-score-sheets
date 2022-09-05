import { useSelector } from 'react-redux';
import { wizardSlideIndex } from './wizardSlice';
import styled from "styled-components";

interface StyledProps {
  slidesTotal: number;
  wizardWidth: string;
  wizardTranslateX: string;
}

const StyledWizard = styled.div<StyledProps>`
  flex: 1 1 auto;
  position: relative;
  display: grid;
  grid-template-columns: repeat(${(props) => props.slidesTotal}, 1fr);
  grid-auto-rows: 1fr;
  left: 0;
  width: ${(props) => props.wizardWidth};
  height: 100%;
  transform: translateX(${(props) => props.wizardTranslateX});
  transition: transform 0.3s;

  &.slider-title {
    height: 100%;
  }
`;

interface WizardProps {
  slidesTotal: number;
  children: React.ReactNode;
  className?: string;
}

export default function Wizard({
  slidesTotal = 0,
  children = null,
  className = '',
}: WizardProps) {
  const slideIndex = useSelector(wizardSlideIndex);
  const wizardWidth:string = `${slidesTotal * 100}%`;
  const wizardTranslateX:string = `${slideIndex / slidesTotal * -100}%`;

  return (
    <StyledWizard
      className={className}
      slidesTotal={slidesTotal}
      wizardWidth={wizardWidth}
      wizardTranslateX={wizardTranslateX}
    >
      {children}
    </StyledWizard>
  );
}