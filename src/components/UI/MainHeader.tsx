import { useSelector } from 'react-redux';
import { wizardSlideIndex } from './Wizard/wizardSlice';
import BackBtn from "./BackBtn";
import logo from "../../images/downforce-logo.webp";
import styled from "styled-components";
import Wizard from './Wizard/Wizard';
import { useContext } from 'react';
import LangContext from '../../store/i18n-context';

const StyledMainHeader = styled.header`
  flex: 0 0 auto;
  position: relative;

  picture {
    display: block;
    position: relative;
    width: 100%;
    padding: 0 var(--spacer);
  }

  img {
    display: block;
    width: 100%;
  }

  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    background-color: var(--blue-light);
    color: #fff;
    margin: var(--spacer) 0 0;
    padding: 0 var(--spacer);
    overflow: hidden;
  }

  .title {
    flex: 1 1 auto;
    display: block;
    position: relative;
    height: 100%;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    line-height: 0.8;
    margin: 0;
    width: calc(100% - 80px);
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 80px;
      height: 100%;
      z-index: 1;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, var(--blue-light), transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, var(--blue-light), transparent);
    }
  }

  .slide-title {
    height: 100%;
  }

  .slide-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .cell {
    position: relative;
    flex: 0 0 40px;
    width: 40px;
    z-index: 1;
  }
`;

interface MainHeaderProps {
  data: any[];
}

function MainHeader({
  data = [],
}: MainHeaderProps) {
  const langCtx = useContext(LangContext);
  const slideIndex = useSelector(wizardSlideIndex);
  const slides = data.map((slide) => <div className="slide-title">{langCtx.get(`${slide.id}Title`)}</div>)

  return (
    <StyledMainHeader>
      <picture>
        <img src={logo} alt="Downforce" />
      </picture>

      <nav>
        <div className="cell">
          {slideIndex > 0 && <BackBtn />}
        </div>
        
        <div className="title">
          <Wizard slidesTotal={data.length} className="slider-title">
            {slides}
          </Wizard>
        </div>

        <div className="cell"></div>
      </nav>
    </StyledMainHeader>
  );
}

export default MainHeader;
