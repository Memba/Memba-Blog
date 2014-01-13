# Mini Blog Engine

>  A simple engine that separates layout from content for static blogs and web sites

## Why a new blog engine?
Jekyll or Octopress definitely does the job but the files you write (markdown) are not the files you publish (html).
Additionally, there is some infrastructure including Ruby to run Jekyll, which is not as simple as advertised.
The Mini Blog Engine relies on a simpler infrastructure to publish the same files you write in markdown language.

## Architecture and process
index.html is the default and only template based on [Twitter bootstrap] (http://www.getboostrap.com).
All content is written in [markdown] (http://daringfireball.net/projects/markdown) in the **new** subdirectory.
Before publishing, a [Grunt] (http://gruntjs.com/) task needs to be executed to validate markdown and build indexes (RSS feeds).
Indexes and markdown are interpreted in the browser by Javascript code relying upon the [Kendo UI framework] (http://www.kendoui.com).
This is the essential conceptual difference with Jekyll: there is no merging of content and layout before publishing: what you write is what you publish.

## Getting Started
The requirements are those of Grunt: you need to install [NodeJS] (http://nodejs.org/) and [Grunt] (http://gruntjs.com/).
Then we recommend cloning this Git project

## Disclaimer
Before you get too excited please consider that this is 'work in progress' which has not even reached an 'alpha' stage.

## Contributing
You can help by testing and reporting defects, making suggestions or even better contributing code fixes and improvements. In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/). We have provided setup.cmd and make.cmd to this effect.

## Release History
_v0.1.0_ - First commit

## Licensing
This code is bound to the GPL license considering the use of [Telerik's Kendo UI framework] (http://www.kendoui.com).
As far as Memba is concerned, this code is free to use for all types of applications.

Copyright (c) 2013-2014 Memba. All rights reserved.