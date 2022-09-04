import styled from "styled-components";

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: currentColor;
  padding: 0 10px;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;

  svg, path { fill: currentColor; }

  &:hover { background-color: rgba(0, 0, 0, 0.1); }
`;

interface IIconBtn {
  Icon: any;
  callback: () => void;
}

export default function IconBtn({ Icon, callback }: IIconBtn) {
  return (
    <StyledBtn onClick={callback}>
      <Icon />
    </StyledBtn>
  );
}
