import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import store from './store';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
