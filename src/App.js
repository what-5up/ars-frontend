import './App.css';
import Main from "./Pages/Main";
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <div>
        <Main />
      </div>
    </ChakraProvider>

  );
}

export default App;
