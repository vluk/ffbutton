"use strict";
async function download_ebook(){
  let ffid = window.location.href.match(/forums\.sufficientvelocity\.com\/threads\/[\w-]+\.\d+/g)[0].split("/")[2];
  let ff = new SvDownloader(ffid);
  await ff.constructBook();
}

(async () => {
  var follow = document.querySelector("div.buttonGroup.threadmarks-reader a.button--link.button");
  if (follow != null){
    console.log(follow);
    let button = document.createElement("BUTTON")
    button.setAttribute("class", "button--link button");
    button.textContent = "Download";
    document.querySelector("div.buttonGroup.threadmarks-reader").insertBefore(button, follow);
    button.addEventListener("click", () => download_ebook());
  }
})();
