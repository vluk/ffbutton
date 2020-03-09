"use strict";

// create an epub
class Epub {
  constructor(author, title, summary, link, info, site) {
    this.zip = new JSZip();
    let content = mimetype();
    this.zip.file("mimetype", content);
    this.zip.folder("OPS");
    this.zip.folder("OPS/book");
    this.zip.folder("OPS/css");
    this.zip.folder("OPS/images");
    this.zip.folder("META-INF");
    this.author = author;
    this.title = title;
    this.link = link;
    this.summary = summary;
    this.chapters = [];
    this.info = info;
    this.site = site;
  }

  makeContainer(){
    let content = container();
    this.zip.file("META-INF/container.xml", content);
  }

  makeCss(){
    console.log(this.site);
    switch (this.site) {
      case "ffn":
        this.zip.file("OPS/css/ffn.css", ffnCss());
        break;
      case "sb":
        this.zip.file("OPS/css/sb.css", sbCss());
        break;
      case "sv":
        this.zip.file("OPS/css/sv.css", svCss());
        break;
    }
    this.zip.file("OPS/css/main.css", mainCss());
  }

  makeOpf(){
    let content = opf(this.link, this.title, this.author, this.chapters, this.site);
    this.zip.file("OPS/package.opf", content);
  }

  makeToc(){
    let content = toc(this.title, this.chapters)
    this.zip.file("OPS/book/table-of-contents.xhtml", content);
  }

  makeFrontmatter(){
    let content = frontmatter(this.title, this.author, this.summary, this.info, this.link);
    this.zip.file("OPS/book/frontmatter.xhtml", content);
  }

  addChapter(chapter_title, chapter_number, html){
    this.chapters.push(chapter_title);
    let content = chapter(this.title, chapter_number, chapter_title, html, this.site);
    this.zip.file(`OPS/book/Chapter_${chapter_number}.xhtml`, content);
  }

  async finalize(){
    this.makeContainer();
    this.makeCss();
    this.makeOpf();
    this.makeToc();
    this.makeFrontmatter();
    // download the generated epub
    this.zip.generateAsync({type : "blob"}).then((content) => {
      saveAs(content, `${this.title.replace(/ /g, "")}.epub`);
    });
  }
}
