import styled from "styled-components";


// `` (back tick)->css코드 입력 가능
const Father = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
// const BoxTwo = styled.div`
//   background-color: tomato;
//   width: 100px;
//   height: 100px;
// `;
// const Text = styled.span`
//   color: white;
// `;

const Circle = styled(Box)` //Box의 모든 속성을 가져옴
  border-radius: 50px;
`; 

function App() {
  return (
  <Father>
    {/* <BoxOne>
      <Text>Hello</Text>
    </BoxOne>
    <BoxTwo /> */}
    <Box bgColor="teal"/>
    <Circle bgColor="tomato"/>
  </Father>
  );
}

export default App;
