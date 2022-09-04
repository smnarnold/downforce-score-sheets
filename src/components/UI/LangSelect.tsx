import { useContext } from "react";
import styled from "styled-components";
import LangContext from "../../store/i18n-context";

const StyledLangSelect = styled.label`
  color: currentColor;

  select {
    display: block;
    width: 100%;
    height: 40px;
    font-size: 1em;
    font-style: italic;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    margin: 0.25em 0 0;
    padding: 0 var(--spacer);
  }
`;

function LangSelect() {
  const langCtx = useContext(LangContext);

  return (
    <StyledLangSelect>
      {langCtx.get('language')}
      <select
        value={langCtx.lang}
        onChange={(e) => langCtx.onToggleLang(e.target.value)}
      >
        <option value={"en"}>English</option>
        <option value={"fr"}>Français</option>
      </select>
    </StyledLangSelect>
  );
}

export default LangSelect;
