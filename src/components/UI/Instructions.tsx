import styled from "styled-components";

const StyledInstructions = styled.p`
  font-style: italic;
  text-align: center;
  padding: 0 var(--spacer);
`;

function Instructions({ text } : { text: string }) {
  if (text.trim().length === 0) return <></>;

  return <StyledInstructions>{text}</StyledInstructions>;
}

export default Instructions;
