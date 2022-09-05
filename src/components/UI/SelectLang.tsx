import { useContext } from "react";
import styled from "styled-components";
import AppContext from "../../store/app-context";

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
  const appCtx = useContext(AppContext);

  return (
    <StyledLangSelect>
      {appCtx.getTranslation('language')}
      <select
        value={appCtx.lang}
        onChange={(e) => appCtx.onToggleLang(e.target.value)}
      >
        <option value={"en"}>English 🇬🇧</option>
        <option value={"fr"}>Français 🇫🇷</option>
        <option value={"es"}>Espagnol 🇪🇸</option>
        <option value={"de"}>Deutch 🇩🇪</option>
      </select>
    </StyledLangSelect>
  );
}

export default LangSelect;
