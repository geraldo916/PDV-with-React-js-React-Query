import './styles/App.css'
import Routes from "./routes/Routes"

import { ReactQueryDevtools } from 'react-query-devtools'


function App() {
  return (
      <div className="App">
        <div className="container" >
          <Routes/>
        </div>
      </div>
  );
}

export default App;
