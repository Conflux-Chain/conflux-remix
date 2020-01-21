import { getAccounts, getTesseraParties, testUrls, updateWeb3Url } from '../api'
import { setTesseraOptions } from './tessera'
import { setError } from './error'
import { resetTransactionResults } from './contracts'

export function editNetwork (edit) {
  return { type: 'EDIT_NETWORK', payload: edit }
}

function setNetwork (endpoint, tesseraEndpoint, accounts, status, editing) {
  return {
    type: 'SET_NETWORK',
    payload: {
      endpoint,
      tesseraEndpoint,
      accounts,
      status,
      editing
    }
  }
}

/**
 * This action attempts to connect to the network, gets accounts, and gets the
 * tessera party keys if a url is provided. It then updates the current
 * network whether or not there were errors. If there were errors, it shows
 * them. It also resets transaction results in the deployed contract widgets
 * after connection to prevent confusion when switching nodes.
 *
 * @param endpoint Geth RPC Url (http://localhost:22000)
 * @param tesseraEndpoint Tessera party keys endpoint (http://localhost:9081/partyinfo/keys)
 * @returns thunk middleware dispatch function
 */
export function connectToNetwork (endpoint, tesseraEndpoint) {
  return async dispatch => {
    dispatch({ type: 'SET_NETWORK_CONNECTING' })
    let accounts = [], status = 'Disconnected', editing = true, error = ''
    try {
      if (endpoint) {
        await updateWeb3Url(endpoint, tesseraEndpoint)
        status = 'Connected'
        editing = false
        accounts = await getAccounts()
        const options = await getTesseraParties()
        dispatch(setTesseraOptions(options))
      } else {
        error = 'Please connect to a conflux node'
      }

    } catch (e) {
      console.log('Error fetching network data', e.message)
      error = e.message
    }

    dispatch(setError(error))

    dispatch(setNetwork(endpoint, tesseraEndpoint, accounts, status, editing))

    dispatch(resetTransactionResults())
  }
}

/**
 * This action attempts to connect to the given network, connecting if
 * successful and showing an error if unsuccessful.
 *
 * @param endpoint Conflux RPC Url (http://localhost:12593)
 * @returns thunk middleware dispatch function
 */
export function saveNetwork (endpoint = '') {
  return async dispatch => {
    try {

      await testUrls(endpoint)

      dispatch(connectToNetwork(endpoint))

    } catch (e) {
      console.log('Error fetching network data', e.message)
      dispatch(setError(e.message))
    }
  }
}

