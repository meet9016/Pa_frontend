import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { HelmetProvider } from 'react-helmet-async'
// import PageMeta, { AppWrapper } from './pages/utils.jsx/PageMeta.jsx'

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <StrictMode>
      {/* <AppWrapper> */}
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
      {/* </AppWrapper> */}
    </StrictMode>
  </HelmetProvider>,
)
