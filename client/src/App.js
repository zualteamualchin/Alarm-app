import "./App.css";
import { Alert } from "./components/Alert";
import { Container } from "./components/Container";

function App() {
  return (
    <div className="flex flex-col items-center gap-8 justify-center h-screen ">
      <h1 className="text-3xl">ALARM </h1>
      <Container />
    </div>
  );
}

export default App;
