window.onload = function() {
  document.getElementById("q").focus();
};


// mReplace関数の作成
// patはint型・flagはboolean型
// flag を patに置き換える？
{
  var $_String = String.prototype;

  $_String.mReplace = function(pat, flag) {
    var temp = this;   // 中格好で定義されているオブジェクトのこと
    if(!flag){
      flag = "";
    }
    for(var i in pat){
      var re = new RegExp(i, flag);   //
      temp = temp.replace(re, pat[i]);   //
    }
    return temp;
  };
}


// 日付とかの表示に使う関数をオブジェクトにぶっ込んでる。
{
  var $_Date = Date.prototype;

  $_Date.format = "yyyy-mm-dd HH:MM:SS";
  $_Date.formatTime = function(format) {
    var yy;
    var o = {
      yyyy : ((yy = this.getYear()) < 2000)? yy+1900 : yy,
      mm   : this.getMonth() + 1,
      dd   : this.getDate(),
      HH   : this.getHours(),
      MM   : this.getMinutes(),
      SS   : this.getSeconds()
    };
    for(var i in o){
      if (o[i] < 10) o[i] = "0" + o[i];
    }
    return (format) ? format.mReplace(o) : this.format.mReplace(o);
  };
}