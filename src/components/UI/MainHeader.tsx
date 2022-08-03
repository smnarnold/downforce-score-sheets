import { useContext } from 'react';
import AppContext from '../../store/app-context';
import BackBtn from "./BackBtn";
import logo from "../../images/downforce-logo.webp";
import styled from "styled-components";

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
    display: flex;
    justify-content: space-between;
    background-color: var(--blue-light);
    color: #fff;
    height: 40px;
    padding: 0 var(--spacer);
    margin-top: var(--spacer);
  }

  .title {
    @extend %styledText;
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1em;
    line-height: 0.8;
    margin: 0;

    &:only-child {
      margin: 0 auto;
    }
  }

  .spacer {
    width: 40px;
  }
`;

interface MainHeaderProps {
  slideTitle: string;
}

function MainHeader({
  slideTitle = "",
}: MainHeaderProps) {
  const ctx = useContext(AppContext);

  return (
    <StyledMainHeader>
      <picture>
        <img src={logo} alt="Downforce" />
      </picture>

      <nav>
        {ctx.slideIndex > 0 && <BackBtn />}
        {slideTitle && <h2 className="title">{slideTitle}</h2>}
        {ctx.slideIndex > 0 && <div className="spacer" />}
      </nav>
    </StyledMainHeader>
  );
}

export default MainHeader;
