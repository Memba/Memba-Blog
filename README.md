# Memba Blog Engine

[![Build Status](https://travis-ci.org/Memba/Memba-Blog.svg?branch=master)](https://travis-ci.org/Memba/Memba-Blog)
[![Dependency Status](https://david-dm.org/Memba/Memba-Blog.svg)](https://david-dm.org/Memba/Memba-Blog)
[![devDependency Status](https://david-dm.org/Memba/Memba-Blog/dev-status.svg)](https://david-dm.org/Memba/Memba-Blog#info=devDependencies)
[![Inline docs](http://inch-ci.org/github/Memba/Memba-Blog.svg?branch=master)](http://inch-ci.org/github/Memba/Memba-Blog)

>  A nodeJS blog engine pulling markdown content from a Github repository.

## Demo

See a demo running at http://www.memba.com and https://kidoju.com/support.

## Why a new blog engine?

We needed a blog engine with:

1. pages and blog posts,
2. same look and feel as Kidoju, that is based on Twitter bootstrap (not easy to achieve with Wordpress, Ghost or Blogger),
3. multi-user with live edit (which discards the likes of Jekyll and Octopress).

and possibly the following nice-to-have:

1. nodeJS tooling,
2. markdown sources,
3. editing in Github.

## History

We initially built a server-less single page HTML application (version 0.0.1) which would pull markdown from URLs (possibly from Github) but we realized that it was poorly indexed by search engines.
So we rearchitected the project to convert markdown into html server side, dropping the SPA architecture.

## Architecture

This is a nodeJS + expressJS application which pulls markdown content from a Github repository.

## Getting started

//TODO

## Disclaimer

Before you get too excited please consider that this is 'work in progress' which has not even reached an 'alpha' stage.

## Contributing

You can help by testing and reporting defects, making suggestions or even better contributing code fixes and improvements. In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/). We have provided setup.cmd and make.cmd to this effect.

## Release History

_v0.0.1_ - Server-less SPA architecture
_v0.0.2_ - Server-side ExpressJS + EJS templates

## Licensing

This code is bound to the GPL license considering the use of [Telerik's Kendo UI framework](http://www.kendoui.com).
As far as Memba is concerned, this code is free to use for all types of applications.

Copyright (c) 2013-2015 Memba. All rights reserved.
