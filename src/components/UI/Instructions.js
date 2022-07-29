import styled from "styled-components";

const StyledInstructions = styled.p`
  font-style: italic;
  text-align: center;
  padding: 0 calc(var(--fz) * 2);
`;

export default function Instructions({ text }) {
  if (text.trim().length === 0) return;

  return <StyledInstructions>{text}</StyledInstructions>;
}
