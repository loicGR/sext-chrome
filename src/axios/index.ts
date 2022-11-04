import axios from 'axios';
import { AccountId, JwtToken, SapiUrl } from '@src/utils/storage.utils';

async function globals() {
  axios.defaults.baseURL = await SapiUrl.get()
  axios.defaults.headers['scapin-conkey'] = 'account-admin'
}

// Register Global configuration
globals().then()

// Add a request interceptor
axios.interceptors.request.use(async (config) => {

  if (config.headers) {
    config.headers['scapin-token'] = await JwtToken.get()
    config.headers['scapin-account'] = await AccountId.get()
  }

  // Do something before request is sent
  return config

}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(async (response) => {

  const updatedToken = response.headers['scapin-token']
  // console.log('Réactualisation du token =', updatedToken)
  if (updatedToken) {
    await JwtToken.set(updatedToken);
  }

  return response

}, (error) => {
  // Do something with response error
  return Promise.reject(error)
})

export default axios
