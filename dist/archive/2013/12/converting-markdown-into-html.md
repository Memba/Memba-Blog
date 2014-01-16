title: Converting markdown into html
description: The feasibility of the vision for <strong>Memba Mini Blog Engine</strong> was dependent upon finding an open source royalty-free Javascript API to convert Markdown into HTML. We have shortlisted 2 API's based on popularity. Our tests have demonstrated a significant difference between the two APIs.
author: Memba
slug: converting-markdown-into-html
category: Development
pubDate: 2013-12-07T18:17:41.125Z
guid: CCB9A18D-B8FA-4C72-A0D0-C58FD50A7468
link: http://localhost:63342/Blog/src/www/index.html#/blog/2013/12/converting-markdown-into-html

## Markdown API's

The feasibility of the vision for **Memba Mini Blog Engine** was dependent upon finding an open source royalty-free Javascript API to convert Markdown into HTML. We have shortlisted 2 API's based on popularity:

- [marked.js](https://github.com/chjj/marked)
- [markdown.js](https://github.com/evilstreak/markdown-js)

## Tests

Our tests have demonstrated a significant difference between the two APIs: markdown.js (v0.5.0) does not support inline html, which makes it impossible to embed youtube videos.

marked.js (v0.2.9) is also [available on a CDN](http://cdnjs.com/libraries/marked/). markdown.js (v0.5.0) is not.

Neither API's support [Markdown Metadata](http://hiltmon.com/blog/2012/06/18/markdown-metadata).

## Conclusion

We have therefore confirmed the feasibility of Memba Mini Blog Engine with marked.js (v0.2.9) which is also used in various projects including:

- [Epic Editor](http://epiceditor.com)
- [Dillinger](http://dillinger.io)