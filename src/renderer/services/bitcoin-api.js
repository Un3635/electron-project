import Appconfig from '../config';
import api from './api';

/** 
 * 获取币种的助记词
 * param: 
 *    coin: BTC
 */
// const getMnemonic = () => api.$get(Appconfig.baseUrl + '/mnemonic', {coin: 'BTC'});
const getMnemonic = () => api.$post(Appconfig.baseUrl + '/mnemonic', {coin: 'BTC'});
// const getMnemonic = () => api.$get(Appconfig.baseUrl + '/mnemonic?coin=BTC', {coin: 'BTC'});



export default {
  getMnemonic: getMnemonic
};