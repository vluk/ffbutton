"use strict";

class SbDownloader{
  constructor(ffid){
    this.url = `https://forums.spacebattles.com/threads/${ffid}/reader/`;
  }

  async collect_info(){
    let response = await fetch(this.url);
    let result = await response.text();
    let htmlContent = result;
    let domparser = new DOMParser();
    let doc = domparser.parseFromString(htmlContent, 'text/html');
    let title_text = doc.querySelector("div.p-title h1.p-title-value").textContent;

    this.title = title_text.replace(/\(.*\)|\[.*\]/g, "").trim();
    this.author = doc.querySelector("div.p-description a.username").textContent.trim();

    let pageNav = doc.querySelector("div.pageNavSimple")

    if(pageNav == null){
      this.pages = 1
    } else {
      let content = pageNav.textContent;
      let of = content.search(" of ");
      this.pages = content.slice(of + 4);
    }

    this.info = "";
    this.summary = "";
    this.epub = new Epub(this.author, this.title, this.summary, this.url, this.info, "sb");
    this.current_chapter = 1;
  }

  async add_chapter(chapter_node){
    let chapter_title = chapter_node.querySelectorAll("span.threadmarkLabel")[0].textContent.trim();

    // remove "Click to expand/shrink..." dialogue
    Array.from(chapter_node.querySelectorAll(".bbCodeBlock-expandLink")).map((element) => element.remove());
    Array.from(chapter_node.querySelectorAll(".bbCodeBlock-shrinkLink")).map((element) => element.remove());

    let content = chapter_node.querySelectorAll("div.bbWrapper")[0];
    let xhtml_content = new XMLSerializer().serializeToString(content);
    xhtml_content = ""
    this.epub.addChapter(chapter_title, this.current_chapter++, xhtml_content);
  }

  async add_page(page_number){
    let page_url = this.url + "page-" + page_number;
    let response = await fetch(page_url);
    // back-off
    if (response.status == 429){
      await new Promise(r => setTimeout(r, parseInt(response.headers.get("retry-after") * 1000)));
      response = await fetch(page_url);
    }
    let result = await response.text();
    let htmlContent = result;
    let domparser = new DOMParser();
    let doc = domparser.parseFromString(htmlContent, 'text/html');
    let chapters = Array.from(doc.querySelectorAll("article.message"));
    chapters.map(async (chapter_node) => {await this.add_chapter(chapter_node)});
  }

  async get_pages(){
    for (let i = 0; i < parseInt(this.pages, 10); i++){
      await this.add_page(i+1);
    }
  }

  async constructBook(){
    await this.collect_info();
    await this.get_pages();
    await this.epub.finalize();
  }
}

