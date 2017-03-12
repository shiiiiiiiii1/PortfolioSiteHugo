var url_mine = window.location.href.split("/")[4];   // アドレスを取得し、"/"で区切り配列にし、その5番目の値を取得する。
if (url_mine == "") {   // homeページ
  document.getElementById("menu-home-mine").classList.add('active');
  document.getElementById("copyright-p-mine").style.backgroundColor = "#f4f4f4";
} else if(url_mine == "about") {   // aboutページ
  document.getElementById("menu-about-mine").classList.add('active');
} else if(url_mine == "contact") {   // contactページ
  document.getElementById("menu-contact-mine").classList.add('active');
} else if(url_mine == "search") {   // indexページ
  document.getElementById("menu-search-mine").classList.add('active');
}