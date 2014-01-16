title: Vision for a new blog engine
description: We needed a free blogging platform to match the layout and style of an existing web application based on Twitter Bootstrap. We have discarded Blogger and Wordpress after realizing that building and maintaining a template based on Bootstrap was complex. We have come across Markdown as a nice way to separate layout from content, so we have searched for blog engines based on static site generators. We have found Jekyll and Octopress, which we have also discarded. So we have decided to develop <strong>Memba Mini Blog Engine</strong>.
author: webmaster@memba.org (Memba)
slug: vision-for-a-new-blog-engine
category: Design
pubDate: 2013-11-23T12:37:02.341Z
guid: 1FD270AE-DDAD-47C1-AE44-B533E12D48DE
link: http://localhost:63342/Blog/src/www/index.html#/blog/2013/11/vision-for-a-new-blog-engine

## Background

We needed a free blogging platform to match the layout and style of an existing web application based on [Twitter Bootstrap](http://getbootstrap.com).
We have discarded [Blogger](http://www.blogger.com) and [Wordpress](http://www.wordpress.com) after realizing that building and maintaining a template based on Bootstrap was complex.
We have come across [Markdown](http://daringfireball.net/projects/markdown/) as a nice way to separate layout from content, so we have searched for blog engines based on static site generators.
We have found [Jekyll](http://jekyllrb.com) and [Octopress](http://octopress.org), which we have also discarded after realizing that:

1. Starting a project was [not as easy as advertised](http://www.ostraining.com/blog/coding/static-site-generators/); To be fair, we had no prior experience with Ruby and we did not really want to clutter our environments with new technologies;
2. And in our opinion, the main weakness of these static site generators concerns the merging process: the blog posts you write (markdown) are not the blog files you publish (html) and any little change in the content requires that you rebuild and republish the entire site.

So we have decided to develop **Memba Mini Blog Engine**.

## Vision

The vision for **Memba Mini Blog Engine** is:

1. An easy setup to start a new project in minutes (not in hours) with free tools;
2. Blog posts that you write in Markdown and that you publish 'AS IS', allowing modifications that you can check live without rebuilding/republishing;
2. A layout that is very easy to change, assuming you understand Twitter Bootstrap (We might also consider an [HTML5 Boilerplate](http://html5boilerplate.com/) template to start with in the future);
3. A simple command to build indexes.