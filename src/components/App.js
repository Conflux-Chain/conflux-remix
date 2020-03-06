import React from 'react'
import './App.css'
import { Network } from './Network'

import { TxMetadata } from './TxMetadata'
import { Deploy } from './Deploy'
import { ContractList } from './ContractList'
import { appStyle, footerStyle, logoStyle } from '../utils/Styles'
import { Error } from './Error'
import { useSelector } from 'react-redux'

function App() {
  const isConnected = useSelector(
    state => state.network.status !== 'Disconnected')

  return (
    <div style={appStyle} className="App">
      <Error/>
      <Network/>
      {isConnected && <TxMetadata/>}
      <br/>
      {isConnected && <Deploy/>}
      <br/>
      {isConnected && <ContractList/>}
      <div style={{ flexGrow: 1 }}/>
      <Footer/>
    </div>
  );
}

function Footer () {
  return <div style={footerStyle}>
    <div><a href={"https://www.conflux-chain.org/zh/developer/"} rel="noopener noreferrer" target="_blank">Help</a> | v{process.env.REACT_APP_VERSION}</div>
    <img style={logoStyle} src={'logo.png'} alt="Conflux Logo"/>
  </div>
}

export default App;
