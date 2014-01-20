title: Setup a development environment
description: Learn how to setup your development environment including nodejs and grunt to develop the <strong>grunt-blog</strong> plugin and the <strong>memba-blog</strong> single page application which together form the <strong>Memba Mini Blog Engine</strong>.
slug: setup-a-development-environment
author: webmaster@memba.org (Memba)
category: Development
pubDate: 2014-01-06T08:50:54.852Z
guid: B628A38A-36E9-4E46-9D9D-43CFBE2BC5DA
link: #/blog/2014/01/setup-a-development-environment

Before developing any feature of the **Memba Mini Blog Engine**, you need to setup your development environment, which is essentially **nodejs**, **grunt** and your preferred Javascript Integrated Development Environment (IDE). Ours is [Jetbrains WebStorm](http://www.jetbrains.com/webstorm/).

If you only plan to blog without modifying the code of the **Memba Mini Blog Engine**, please refer to our guide to [setup a blogging environment](#/blog/2014/01/setup-a-blogging-environment).

## Install nodejs

Simply download and execute the installer from the [nodsjs web site](http://nodejs.org/) and follow the instructions.

## Install grunt

Open a nodejs command prompt and run:

```shell
npm install -g grunt-cli
```

This is further detailed on the [Grunt web site](http://gruntjs.com/getting-started).

A nodsjs command prompt is a shell prompt where environment variables have been set. On Windows, the nodsjs command prompt is a DOS prompt initialized with a call to:

```shell
call "%ProgramFiles%\nodejs\nodevars.bat"
```

As a consequence, you can build command (batch) files for nodejs by prefixing your command files with the shell command above. As an example, our project includes a **make.cmd** command file:

``` shell
call "%ProgramFiles%\nodejs\nodevars.bat"
cd %~dp0
grunt --force
```

## Install git (optional)

Git is not required to develop any feature of the Memba Mini Blog Engine since you can download archived releases from:

- https://github.com/Memba/grunt-blog/releases
- https://github.com/Memba/Memba-Blog/releases

Nevertheless, installing and using git has two benefits:

1. You get a distributed Version Control System (VCS);
2. You can publish your blog to [GitHub pages](http://pages.github.com/) for free.

Simply download and execute the installer from the [Git web site](http://git-scm.com/downloads) and follow the instructions.

A tutorial about Git is beyond the scope of this blog post, but we recommend reading [Syncfusion's Git Succinctly](https://www.syncfusion.com/resources/techportal/ebooks/git).

## Get the code and build

In most scenarios, you would not need to download the source code for the **grunt-blog** plugin and you would discard any instructions below that mention it.

You can download archived releases from the links above or you can use Git as follows.

Open a shell prompt, go to the directory where you want Git to create your project directory and run either command:

```shell
git clone https://github.com/Memba/Memba-Blog.git
git clone https://github.com/Memba/grunt-blog.git
```

These commands will respectively create:

- a directory named **Memba-Blog**, containing the source code of the Single Page Application (SPA) of Memba Mini Blog Engine;
- a directory named **grunt-blog**, containing the source code of the grunt plugin of Memba Mini Blog Engine.

Each directory contains two command files:

- run **setup.cmd** to install all the node modules (essentially grunt plugins) required to build your project (*this needs only to be done once*);
- run **make.cmd** to built your project (*this needs to be done each time you make changes that you want to publish*).

TODO: OSX Instructions