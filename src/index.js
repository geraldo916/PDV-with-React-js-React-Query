import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from 'react-query'
import './index.css'


const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient} >
      <Router>
          <App />
      </Router>
  </QueryClientProvider>,
  document.getElementById('root')
);

