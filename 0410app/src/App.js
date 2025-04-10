import logo from './logo.svg';
import './App.css';
import ProductList from './productList.js';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  background-color: #282c34;
  color: white;
`;
const Card = styled.div`
  background-color: #61dafb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  `;
const Text = styled.h1`
  color: ${props => props.color || 'black'};
  font-size: ${props => props.Size};
`;

function App() {

  return (
    <div>
      <ProductList />

      <Container>
        <Card>
          <Text coler='red' Size='80px'>哈囉</Text>
        </Card>
      </Container>

    </div>
  );
}

export default App;
