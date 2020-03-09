"use strict";

// scrapes fanfiction.net for an ebook
class FfnDownloader{
  constructor(ffid){
    this.url = `https://www.fanfiction.net/s/${ffid}/`;
  }

  async collectInfo(){
    let response = await fetch(this.url);
    let result = await response.text();
    let htmlContent = result;
    let domparser = new DOMParser();
    let doc = domparser.parseFromString(htmlContent, 'text/html');
    let profile = doc.getElementById("profile_top").textContent;
    this.author = doc.querySelector("#profile_top a.xcontrast_txt").textContent;
    this.title = doc.querySelector("b.xcontrast_txt").textContent;
    this.summary = doc.querySelector("div.xcontrast_txt").textContent;
    this.info = doc.querySelector("span.xgray.xcontrast_txt").textContent;
    // gets list of chapters
    let chapter_select = doc.querySelector("#chap_select")
    if (chapter_select == null){
      this.chapters = [FfnDownloader.encodeXml(this.title)]
    } else {
      let options = chapter_select.childNodes;
      this.chapters = Array.from(options).map((option) => {
        let fullOption = FfnDownloader.encodeXml(option.textContent);
        let dots = fullOption.search('. ');
        // remove the chapter number
        return fullOption.slice(dots + 2);
      });
    }
    this.epub = new Epub(this.author, this.title, this.summary, this.url, this.info, "ffn");
  }

  static encodeXml(s) {
      return (s
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\t/g, '&#x9;')
          .replace(/\n/g, '&#xA;')
          .replace(/\r/g, '&#xD;')
      );
  }

  async addChapter(chapterTitle, chapterNumber){
    let response = await fetch(this.url + chapterNumber);
    let result = await response.text();
    let domparser = new DOMParser();
    let page = domparser.parseFromString(result, 'text/html');
    let content = page.querySelector("#storytext")
    let xhtml_content = new XMLSerializer().serializeToString(content)
    this.epub.addChapter(chapterTitle, chapterNumber, xhtml_content);
  }

  async getChapters(){
    for (let i = 0; i < this.chapters.length; i++){
      await this.addChapter(this.chapters[i], i + 1);
    }
  }

  async constructBook(){
    await this.collectInfo();
    await this.getChapters();
    await this.epub.finalize();
  }
}
