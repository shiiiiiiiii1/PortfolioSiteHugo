/* global data, url, title */
/* exported do_find, key */

var bodylist = [];
var id_stat = document.getElementById("stat");
var id_result = document.getElementById("result");
var id_navi = document.getElementById("navi");
var page_show_max = 10;
var Keycode = {
  enter: 13,
  left : 37,
  right: 39,
  up   : 38,
  down : 40
};

for(var i = 0; i < data.length; i++) {   // data配列の [title content] の形で順番に入っている。
  bodylist.push(data[i].title + " " + data[i].content);
}
// var bodyidx = bodylist.join("<>");   // 配列の区切りに "<>" 文字列を入れている。


/**
* 検索欄に打ち込まれた文字列の変換
*
* @params {allay} [現在の文字列の値, 配列の何番目か, 文字列の全部の値]
* @return {String} "[小文字大文字][小文字大文字][小文字大文字]"な感じで入ってる。おそらく正規表現で返している。
*/
function ignore_case() {
  var argument_array = arguments;   // 引数が存在したら引数分の配列を格納する。
  return "[" + argument_array[0] + argument_array[0].toUpperCase() + "]";
}


/**
* 検索欄に文字が打ち込まれるタイミングに毎回do_find関数が実行される。
*
* @params {String} 検索欄に打ち込まれた文字列全部
* @return {}
*/
function do_find(input_val) {
  if(this.lastquery == input_val) {   // 打ち込まれる前の値の文字列が、今打った値と同じ文字列だったら
    return;   // このif文ありえなそう？
  }
  this.lastquery = input_val;
  var re = find(input_val);   // 配列を返している
  if(re.length) {
    pagenavi(re);
    view(re);
  } else {
    pagenavi(0);
    view_delete();   // 検索結果を消す処理
  }
}

/**
*
*
* @params
* @params
*/
function key(c) {
  switch(c) {
    case Keycode.enter:
      move(1);
      break;
    case Keycode.left:
      move(-1);
      break;
    case Keycode.right:
      move(1);
      break;
    case Keycode.up:
      move(-1);
      break;
    case Keycode.down:
      move(1);
      break;
  }
}

/**
* 検索欄に文字が打ち込まれるタイミングにdo_findが呼ばれてその中でfind関数が実行される。
*
* この中で実行されていること
* - 与えられた引数から文字列の検索
* - 検索にヒットした文字列の配列を作っている。
*   - data配列の何番目にヒットしたか。
*   - その文字列の何番目の文字にヒットしたか。
*   - 今打ち込まれている文字列の長ざ。
* - この配列は2次元に設計されていて、それを返り値として返している。
*
* @params {String} 検索欄に打ち込まれた文字列全部
* @return {Array} 検索にヒットした数の配列
*/
function find(query) {
  if(!query) {
    return [];
  }
  var aimai, reg;
  if(query) {   // queryが存在するかどうかできな話？
    aimai = query.replace(/[a-z]/g, ignore_case);   // 文字列のa-zのものを全部置き換える。回数分実行される。
    try {   // 成功した場合
      reg = new RegExp(aimai, "g");   // aimaiと完全一致のもの。
    } catch(e) {   // 失敗した場合
      reg = /(.)/g;
    }
  } else {
    reg = /(.)/g;
  }
  var result = [];
  for(var i = 0; i < data.length; i++) {
    var data_string = bodylist[i];
    var res = reg.exec(data_string);   // 正規表現にマッチさせる。
    if(!res) {   // 全部の配列に一致する文字列があるか調べる。
      continue;
    }
    var current_length = res[0].length;   // 現在打ち込まれている文字列の長さ
    var idx = res.index;   // 文字列の何番目にマッチしたか
    if(idx != -1) {   // index番号が見つからないと -1
      result.push([i, idx, current_length]);   // [dataの何番目か, 文字列の何番目にマッチしたか, 現在打ち込まれている文字列の長さ]この配列をpushしている
    }
  }
  if(result.length) {   // 何件あったか。２次元配列になっている。
    id_stat.innerHTML = result.length + "件見つかりました。";
  }

  return result;
}

// function time2date(time) {
//   if(!this.cache) {
//     this.cache = {};
//   }
//   if(this.cache[time]) {
//     return this.cache[time];
//   }
//   var d = new Date(time * 1000);
//   this.cache[time] = d.formatTime("yyyy年mm月dd日");
//   return this.cache[time];
// }

function snippet(body, idx, len) {
  var start = idx - 20;
  return [ body.substring(start, idx),
    "<b>",
    body.substr(idx, len),
    "</b>",
    body.substr(idx+len, 50)
  ].join("");
}

/**
* ページの表示件数とページのリンク番号の表示
*
* @params {Array} 検索にヒットした数の配列
* @return {}
*/
function pagenavi(result) {
  var result_length = result.length;
  var ct = Math.ceil(result_length/page_show_max);   // 切り上げ
  var buf = [];
  for(var i = 0; i < ct; i++) {
    buf.push(
      "<span onclick='view(\"\"," , i+1 , ");sw(",i,")'>" , i+1 , "</span>"
    );
  }
  id_navi.innerHTML = buf.join("");
  add_class_selected(0);
}

/**
* 一番最初のページにselectedというClassをつける。
*
* @params {int}
* @return {}
*/
function add_class_selected(val) {   // valはint
  var span_id_navi = id_navi.getElementsByTagName("span");
  for(var i = 0; i < span_id_navi.length; i++) {
    span_id_navi[i].className = (i == val) ? "selected" : "";
  }
}

function move(move_val) {   // move_valはint
  var span_id_navi = id_navi.getElementsByTagName("span");   // spanの数
  var current_span_count;
  if(!span_id_navi.length) {   // idがnaviのspanタグがなかったら
    return;
  }
  for(var i=0; i < span_id_navi.length; i++) {
    if(span_id_navi[i].className == "selected") {
      current_span_count = i;
      break;
    }
  }
  var after_move = current_span_count + move_val;
  if(after_move < 0) {
    return;
  }
  if(after_move > span_id_navi.length-1) {
    after_move = 0;
  }
  add_class_selected(after_move);
  view("", after_move+1);
}

/**
*
*
* @params {result：Array}
* @params {result：}
* @return {}
*/
function view(result, offset) {
  if(!offset) {
    offset = 1;
  }
  if(!result) {
    result = this.last.reverse();   // 配列をひっくり返す
  } else {
    this.last = result;
  }
  var result_reverse = result.reverse();
  var buf = ["<dl>"];
  var count = 0;
  for(var i = (offset-1)*page_show_max; i < result_reverse.length; i++) {
    count++;
    if(count > page_show_max) {
      break;
    }
    var num = result_reverse[i][0];
    var idx = result_reverse[i][1];
    var len = result_reverse[i][2];
    with(data[num]) {
      buf.push(
        "<dt><a href='" , url , "'>" , title || "無題" , "</a>" , "<dd>" , snippet(bodylist[num], idx, len)
      );
    }
  }
  id_result.innerHTML = buf.join("");
}

function sw(t){
  var span = id_navi.getElementsByTagName("span");
  for(var i=0;i<span.length;i++){
    span[i].className = (i==t)?"selected":"";
  }
}

function view_delete() {
  id_stat.textContent = "検索結果が見つかりません";
  while(id_result.firstChild) {
    id_result.removeChild(id_result.firstChild);
  }
}