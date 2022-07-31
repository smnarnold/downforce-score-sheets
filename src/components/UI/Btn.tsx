import styled from "styled-components";

const StyledBtn = styled.button`
  display: inline-block;
  background-color: var(--red);
  line-height: 1.5;
  font-style: italic;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  padding: 0.5rem 0.75rem;
  border: none;
  user-select: none;
  outline: none;
  vertical-align: middle;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:hover {
    background-color: var(--red-dark);
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem var(--red-light);
  }

  &[disabled] {
    opacity: 0.65;
  }

  &.theme-yellow {
    background-color: var(--yellow);
    color: var(--black);

    &:hover {
      background-color: var(--yellow-dark);
    }

    &:focus {
      box-shadow: 0 0 0 0.2rem var(--yellow-light);
    }
  }
`;

interface BtnProps {
  text?: string;
  theme?: string;
  disabled?: boolean;
  callback: () => void;
}

export default function Btn({ text = '', theme = "red", callback, ...rest }: BtnProps) {
  return (
    <StyledBtn className={`btn theme-${theme}`} {...rest} onClick={callback}>
      {text}
    </StyledBtn>
  );
}
