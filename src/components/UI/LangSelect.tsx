import { useContext } from "react";
import styled from "styled-components";
import LangContext from "../../store/i18n-context";

const StyledLangSelect = styled.select`
  font-style: italic;
  text-align: center;
  padding: 0 var(--spacer);
`;

function LangSelect() {
  const langCtx = useContext(LangContext);

  return (
    <StyledLangSelect
      value={langCtx.lang}
      onChange={(e) => langCtx.onToggleLang(e.target.value)}
    >
      <option value={"en"}>English</option>
      <option value={"fr"}>Français</option>
    </StyledLangSelect>
  );
}

export default LangSelect;
