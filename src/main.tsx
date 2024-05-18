import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TonConnectUIProvider } from "@tonconnect/ui-react";


const manifestURL = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestURL}>
    <App />
  </TonConnectUIProvider>
)
