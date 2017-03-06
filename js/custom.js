var url_mine = window.location.href.split("/")[4];   // アドレスを取得し、"/"で区切り配列にし、その5番目の値を取得する。
if (url_mine == "") {
  document.getElementById("menu-home-mine").classList.add('active');
} else if(url_mine == "about") {
  document.getElementById("menu-about-mine").classList.add('active');
} else if(url_mine == "contact") {
  document.getElementById("menu-contact-mine").classList.add('active');
}