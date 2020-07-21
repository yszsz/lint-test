import { getServer } from 'utils/common';
import Http from 'utils/http';
import cookie from 'js-cookie';

export default Http.create({
  servers: getServer(),
  contentType: 'json',
  authorityFailureCodes: [401],
  header() {
    return {
      Authorization: cookie.get('token')
    }
  },
  responseDataValidator(_responseData) {
    return _responseData.code !== 200 && _responseData.code !== '200';
  },
});
