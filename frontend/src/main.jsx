import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux"
import store from './store.jsx'
import AlertTemplate from "react-alert-template-basic"
import { positions, transitions, Provider as AlertProvider } from "react-alert"
const options = {
  timeout: 5000,
  positions: positions.TOP_CENTER,
  transitions: transitions.SCALE

}
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
)
