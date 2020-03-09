// templates for an epub file
mimetype = () => `application/epub+zip`;

container = () =>`<?xml version='1.0' encoding='utf-8'?>
<container xmlns='urn:oasis:names:tc:opendocument:xmlns:container' version='1.0'>
  <rootfiles>
    <rootfile full-path='OPS/package.opf' media-type='application/oebps-package+xml'/>
  </rootfiles>
</container>`;

ffnCss = () => `body{
  font-family: Verdana,'Lucida Grande','Lucida Sans Unicode','Open Sans',Arial,sans-serif;
  font-size: 1em;
  line-height: 1.25;
}

.filler{
  height: 30mm;
}

.omni-chapter-title{
  text-align: center;
  font-size: 200%;
  font-weight: bold;
}
.omni-title{
  font-size: 200%;
  text-align: center;
}`;

sbCss = () => `body{
  font-family: tahoma,arial,helvetica,sans-serif;
}
.filler{
  height: 30mm;
}

a{
  color: rgb(0,255,0);
  text-decoration: none;
}

.adv_accordion dt, .adv_tabs_noscript_title{
  border-top: 1px solid rgb(65, 92, 135);
  border-left: 1px solid rgb(65, 92, 135);
  border-right: 1px solid rgb(65, 92, 135);
  margin-bottom: 0;
  margin-top: 10px;
  margin-left: 0;
  page-break-after: avoid;
}

.adv_accordion dd, .adv_tabs_noscript_content {
  margin-left: 0;
  margin-top: 0;
  border: 1px solid rgb(65, 92, 135);
  padding: 10px;
  page-break-before: avoid;

}

blockquote{
  margin: none;
}

.omni-chapter-title{
  text-align: center;
  font-size: 200%;
  font-weight: bold;
}

.omni-title{
  font-size: 200%;
  text-align: center;
}
.omni-spoilerTextContainer{
  margin-top: 10px;
  font-weight: bold;
}

.bbCodeSpoilerText{
  display: inline-block;
  border-radius: 2px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.bbCodeQuote{
  display: inline-block;
  border-radius: 2px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.bbCodeBlock{
  display: inline-block;
  border-radius: 2px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.quoteContainer{
  display: inline-block;
  border-radius: 2px;
  border: 1px dashed rgb(65, 92, 135);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.smilie{
  display: none;
}
`;

svCss = () => `body{
  font-family: 'Trebuchet MS',Helvetica,Arial,sans-serif;
}

.filler{
  height: 30mm;
}

a{
  color: rgb(40,161,221) !important;
  text-decoration: none;
}

.adv_accordion dt, .adv_tabs_noscript_title{
  border-top: 1px solid rgb(48,75,101);
  border-left: 1px solid rgb(48,75,101);
  border-right: 1px solid rgb(48,75,101);
  margin-bottom: 0;
  margin-top: 10px;
  margin-left: 0;
  page-break-after: avoid;
}

.adv_accordion dd, .adv_tabs_noscript_content {
  margin-left: 0;
  margin-top: 0;
  border: 1px solid rgb(48,75,101);
  padding: 10px;
  page-break-before: avoid;

}

blockquote{
  display: inline-block;
  margin: none;
}

.omni-chapter-title{
  text-align: center;
  font-size: 200%;
  font-weight: bold;
}
.omni-title{
  font-size: 200%;
  text-align: center;
}
.omni-spoilerTextContainer{
  margin-top: 10px;
  font-weight: bold;
}

.bbCodeSpoilerText{
  display: inline-block;
  border-radius = 2px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.bbCodeQuote{
  display: inline-block;
  border-radius = 2px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.bbCodeBlock{
  display: inline-block;
  border-radius = 2px;
  background-color: rgba(0,0,0,0.1);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.quoteContainer{
  display: inline-block;
  border-radius = 2px;
  border: 1px dashed rgb(65, 92, 135);
  border: 1px solid rgb(92, 92, 92);
  padding: 10px;
}

.smilie{
  display: none;
}
`;

mainCss = () => `@charset "utf-8";
@namespace epub 'http://www.idpf.org/2007/ops';

body {
  margin: 0;
}

h1, h2 {
  -epub-hyphens: none;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  hyphens: none;
}

p, blockquote {
  orphans: 2;
  widows: 2;
}

p, figcaption {
  -epub-hyphens: auto;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}

h1, h2, h3, h4, h5, h6,
table, img, figure, video,
[data-page-break~=inside][data-page-break~=avoid] { page-break-inside:  avoid; }
[data-page-break~=after]                          { page-break-after:  always; }
h1, h2, h3, h4, h5, h6,
[data-page-break~=after][data-page-break~=avoid]  { page-break-after:   avoid; }
[data-page-break~=before]                         { page-break-before: always; }
[data-page-break~=before][data-page-break~=avoid] { page-break-before:  avoid; }
img[data-page-break~=before]                      { page-break-before:   left; }
`;

opf = (link, title, author, chapters, site) => `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" xml:lang="en" unique-identifier="uid"
  prefix="dc: http://purl.org/dc/elements/1.1/">

<metadata xmlns:dc='http://purl.org/dc/elements/1.1/'>
    <dc:identifier id='uid'>${link}</dc:identifier>
    <dc:source id='src-id'>${link}</dc:source>
    <dc:title id='title'>${title}</dc:title>
    <dc:description>Downloaded via cutie</dc:description> <dc:subject>Fanfic</dc:subject>
    <dc:language>en</dc:language>
    <dc:date>${(new Date()).toISOString()}</dc:date>
    <meta property="dcterms:modified">${(new Date()).toISOString()}</meta>
    <dc:creator id='author'>${author}</dc:creator>
  </metadata>

  <manifest>


    <!-- Book -->
    <item media-type='application/xhtml+xml'    id='frontmatter'           href='book/frontmatter.xhtml'/>
    <item media-type='application/xhtml+xml'    id='book-toc'              href='book/table-of-contents.xhtml' properties='nav'/>

    ${chapters.map((chapter, i) => `
      <item id='chapter_${i+1}' href='book/Chapter_${i+1}.xhtml' media-type='application/xhtml+xml' properties="remote-resources"/>
`).join('')}

    <!-- CSS -->
    <item media-type='text/css'                 id='css-main'               href='css/main.css'/>
    <item media-type='text/css'                 id='css-custom'             href='css/${site}.css'/>


    <!-- Images -->
    <item media-type='image/png'    id='smilies'           href='images/xenforo-smilies-sprite.png'/>


  </manifest>

  <spine toc='book-toc-ncx'>

    <itemref idref='frontmatter'/>
    <itemref idref='book-toc'/>
    ${chapters.map((chapter, i) => `
      <itemref linear='yes' idref='chapter_${i+1}'/>
    `).join('')}

  </spine>

</package>`;

toc = (title, chapters) => `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
    <head>
        <meta charset='utf-8' />
        <title>${title}</title>
        <link href='../css/main.css' rel='stylesheet'/>
        <link href='../css/ffn.css' rel='stylesheet'/>

    </head>
    <body>
        <nav style='margin-left:10px;padding-left:10px' epub:type='toc'>
            <h1 class='omni-title'><b>Contents</b></h1>
            <ol start='1' class='contents-list'>
            ${chapters.map((chapter, i) => `
              <li><a href="Chapter_${i + 1}.xhtml">${chapter}</a></li>
            `).join('')}
            </ol>
        </nav>
    </body>
</html>`;

frontmatter = (title, author, summary, info, link) => `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
  <head>
        <meta charset='utf-8' />
    <title>${title}</title>
    <link href='../css/main.css' rel='stylesheet'/>
    <link href='../css/ffn.css' rel='stylesheet'/>

  </head>
  <body>
    <h1 class='omni-title'><b>${title}</b></h1>
    <h3 class= 'omni-subtitle'>by <em>${author}</em></h3>
    <br />
    <ul>

          <li><strong>Summary:</strong> ${summary}</li>

          <li><strong>Info:</strong> ${info}</li>

        <li><strong>Source:</strong> <a href="${link}">${link}</a></li>
    </ul>

  </body>
</html>`;

chapter = (title, chapter_number, chapter_title, html, site) => `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
  <head>
		<meta charset='utf-8' />
    <title>${title}</title>
    <link href='../css/main.css' rel='stylesheet'/>
    <link href='../css/${site}.css' rel='stylesheet'/>
  </head>
  <body>
    <section epub:type='chapter'>
        <h1 id='c${chapter_number}' class='omni-chapter-title'>${chapter_title}</h1>
      <hr />
      ${html}
    </section>
  </body>
</html>`;

