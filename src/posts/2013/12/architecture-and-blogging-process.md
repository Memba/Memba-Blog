title: Architecture and blogging process
description: <div><strong>Memba Mini Blog Engine</strong> has 3 building blocks:<ol><li>The content which you write as markdown files (with metadata);</li><li>A Grunt task which you execute on the command line to build an RSS index of your content;</li><li>A Single Page Application (SPA) embedding widgets to display indexes, content, comments and like buttons in the browser.</li></ol></div>
slug: architecture-and-blogging-process
author: webmaster@memba.org (Memba)
category: Design
pubDate: 2013-12-15T10:33:07.222Z
guid: E9B19AF7-3473-40A6-B57A-2AA0AEC7DA15
link: #/blog/2013/12/architecture-and-blogging-process
enclosure: ./posts/2013/12/architecture-and-blogging-process-001.png

## Architecture

**Memba Mini Blog Engine** has 3 building blocks:

1. The content which you write as markdown files (with metadata);
2. A Grunt task which you execute on the command line to build an RSS index of your content;
3. A Single Page Application (SPA) embedding widgets to display indexes, content, comments and like buttons in the browser.

## Blogging Process

After setting up your blog, the blogging process has 3 steps:

1. Write blog posts as markdown files with a title and a description and save them in the **new** directory;
2. Execute the Grunt task to validate and update markdown files, organise them chronologically in the **archive** directory and produce index.rss;
3. Publish the **archive** directory, and more particularly your new markdown files and the updated index.rss, to your production environment.

![first image](./posts/2013/12/architecture-and-blogging-process-001.png)

![second image](./posts/2013/12/architecture-and-blogging-process-002.png)

## Building Blocks

### Markdown files

Read [John Gruber's blog](http://daringfireball.net/projects/markdown/syntax) to learn Markdown syntax.

A typical markdown file as you would write it looks like follows:

```
title: my blog post title
description: my blog post description

## a first paragraph title

first paragraph

## a second paragraph title

second paragraph
```

The title and description metadata are mandatory. Note that we start with a level 2 heading because the title is automatically added as a level 1 heading, so you don't have to repeat it.

After processing by **grunt-blog**, your markdown file is updated as follows:

```
title: my blog post title
description: my blog post description
slug: my-blog-post-title
author: Memba
category: Web Development
pubDate: 2014-01-15T21:16:41.048Z
guid: 596F2813-D6C4-47AD-B694-F7F3319CAD6F
link: #/blog/2014/01/my-blog-post-title

## a first paragraph title

first paragraph

## a second paragraph title

second paragraph
```

Several metadata key:value pairs are added to your markdown file by **grunt-blog**:

- **slug**: the title is "slugified" for pretty [permalinks](http://en.wikipedia.org/wiki/Permalink)
- **author**: unless already defined in your file, the author's email is filled with the value of options.managingEditor from gruntfile.js.
- **category**: unless already defined in your file, the category is filled with the value of options.category from gruntfile.js.
- **pubDate**: unless already defined in your file, the pubDate is the time when grunt-blog is run.
- **guid**: unless already defined in your file, a random guid is generated. We do not recommend modifying this value.
- **link**: unless already defined in your file, a pretty link is generated from the slug. We do not recommend modifying this value either.

These metadata are used to build the **index.rss** feed. You can change these metadata and run grunt-blog again to update **index.rss**. The corresponding item in **index.rss** is reproduced below:

```xml
<item>
  <title>my blog post title</title>
  <link>http://miniblog.memba.com#/blog/2014/01/my-blog-post-title</link>
  <description><![CDATA[my blog post description]]></description>
  <author>Memba</author>
  <category>Web Development</category>
  <pubDate>2014-01-15T21:16:41.048Z</pubDate>
  <guid isPermaLink="false">urn:uuid:596F2813-D6C4-47AD-B694-F7F3319CAD6F</guid>
</item>
```

### grunt-blog

[grunt-blog](https://npmjs.org/package/grunt-blog) is the Grunt task which:

1. validates and updates markdown files, copying them from the **new** directory to the **archive** directory where they are organised chronologically;
2. indexes markdown files, generating the **index.rss** feed.

This task requires [nodejs](http://nodejs.org/) and [Grunt](http://gruntjs.com/).

For more information on configuring **grunt-blog** to publish your blog, please consult our [setup page](#/blog/2014/01/setup-a-blogging-environment).

If you want to improve grunt-blog, please [setup a development environment](#/blog/2014/01/setup-a-development-environment) and read about [building and debugging grunt-blog](#/blog/2014/01/building-and-debugging-grunt-blog).

### Single Page Application

[Memba-Blog](https://github.com/Memba/Memba-Blog) is the web application which displays your blog posts (markdown files) in the browser.

For more information on setting up **memba-blog** to publish your blog, please consult our [setup page](#/blog/2014/01/setup-a-blogging-environment).

If you want to add features to your blogging web site, please [setup a development environment](#/blog/2014/01/setup-a-development-environment) and read about [building and debugging memba-blog](#/blog/2014/01/building-and-debugging-memba-blog).

### Selling Point