let common = {
	clone (obj) {
	  let buf;   
	  if (obj instanceof Array) {
	      buf = [];  // 创建一个空的数组
	      let i = obj.length;
	      while (i--) {
	          buf[i] = this.clone(obj[i]);
	      }
	      return buf;
	  } else if (obj instanceof Object){
	      buf = {};  // 创建一个空对象
	      for (let k in obj) {  // 为这个对象添加新的属性
	          buf[k] = this.clone(obj[k]);
	      }
	      return buf;
	  }else{
	      return obj;
	  }
	},
	getParamValueByKey (key) {
        let str = decodeURI(window.location.href);
        if(str.indexOf('?') == -1){
          return null;
        }
        let paramStr = str.split('?')[1];
        let paramArr = paramStr.split('&');
        let paramObj = {};
        for (let i = 0; i < paramArr.length; i++) {
          let param = paramArr[i];
          paramObj[param.split('=')[0]] = param.split('=')[1];
        }
        return paramObj[key];
    }
}

export default common;