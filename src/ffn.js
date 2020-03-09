"use strict";
async function download_ebook(){
  let ffid = window.location.href.match(/fanfiction.net\/s\/[0-9]+/g)[0].split("/")[2];
  let ff = new FfnDownloader(ffid);
  await ff.constructBook();
}
(async () => {
  var follow = document.querySelector("#profile_top button");
  let button = document.createElement("BUTTON")
  button.setAttribute("class", "btn pull-right");
  button.setAttribute("type", "button");
  button.textContent = "Download";
  document.querySelector("#profile_top").insertBefore(button, follow.nextSibling);
  button.addEventListener("click", () => download_ebook());
})();
