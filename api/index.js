import {fetch,fetchUpload} from "axios";
import jk from 'jk'
var qs = require('qs');
export default {
    login(params) {
        return fetch({
            url:jk.login,
            method:'post',
            params
        });
    },
}
