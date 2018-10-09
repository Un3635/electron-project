import Appconfig from '../config';
import api from './api';

/** 
 * 获取币种的助记词
 * param: 
 *    coin: BTC,
 *    end: 开始
 *    end: 结束
 */
const generate = (coin, start, end) => api.$post(Appconfig.baseUrl + '/generate', {coin: coin, start: start, end: end});


const getMnemonic = (coin) => api.$post(Appconfig.baseUrl + '/getMnemonic', {'coin': coin});




export default {
  generate: generate,
  getMnemonic: getMnemonic,
};