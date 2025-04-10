import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';
import store from './store/store.ts';
import { Provider } from 'react-redux';
import ThemeProvider from './theme/ThemeProvider.tsx';
import './main.scss';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
