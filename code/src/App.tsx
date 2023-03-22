import styled from "styled-components";

const Paragraph = styled.p`
  color: red;

  strong {
    color: blue;
  }
`;

export default function App() {
  return (
    <Paragraph>
      Hello, world
      <strong>!</strong>
    </Paragraph>
  );
}
