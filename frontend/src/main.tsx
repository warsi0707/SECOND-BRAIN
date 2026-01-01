import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './redux/store/store.tsx'
// import { Provider } from 'react-redux'
// import { store } from './redux/store/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position='bottom-right'/>
      <App />
    </Provider>
  </StrictMode>
)
