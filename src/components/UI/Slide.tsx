import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;

  > .body {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:only-child {
      justify-content: center;
    }
  }

  > header,
  > .body,
  > footer {
    position: relative;
    width: 100%;

    > *:first-child {
      margin-top: 0;
    }
    > *:last-child {
      margin-bottom: 0;
    }
  }

  > header,
  > footer {
    padding: 20px 0;
    flex: 0 0 auto;

    h1,
    h2,
    h3 {
      margin: 0;
    }
  }

  > footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--grey-light);
    padding-left: calc(var(--fz) * 2);
    padding-right: calc(var(--fz) * 2);

    > *:only-child { margin: 0 auto; }
  }
`;

interface SlideProps {
  header?: null | React.ReactNode;
  body?: null | React.ReactNode;
  footer?: null | React.ReactNode;
}

export default function Slide({ header, body, footer }: SlideProps) {
  return (
    <StyledSection className="slide">
      {header && <header>{header}</header>}
      {body && <div className="body">{body}</div>}
      {footer && <footer>{footer}</footer>}
    </StyledSection>
  );
}
