import axios from 'axios';

function getParam (param) {
  param = param || {};
  param.t = new Date().getTime().toString();
  return param;
}

function getResult(res) {
  if(res.data.code === '0') {
    return Promise.resolve(res);
  } else {
    return Promise.reject({
      code:'001',
      result: '后端出错'
    });
  }
}

export default {
  $get: (baseUrl, p) => axios.get(baseUrl, getParam(p)).then(getResult),
  $post: (baseUrl, p) => axios.post(baseUrl, getParam(p)).then(getResult)
}