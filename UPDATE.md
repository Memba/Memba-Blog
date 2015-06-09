# Update Procedure

> These are instructions about updating various components

## General principle

We copy files from/to in the following order:

1. Kidoju Webfonts
2. Kidoju Widgets
3. Kidoju Webapp
4. Memba Blog
5. Kidoju Support

Each project has an ```update.cmd``` or ```update.sh``` script to copy files from previous projects in the chain above.
Each copied file is marked as **read-only** and should only be modified in its original project.

## nodeJS modules

### Global modules

```setup.cmd``` installs the latest version of required global modules.
They can be updated in Webstorm in the dialog after calling menu File > Settings > Languages & Frameworks > Node JS and NPM

### Local modules

```npm install``` installs the version of local modules specified in ```package.json```.

## Kidoju Server client API (components from Kidoju.Server)



## Kidoju Widgets (components from Kidoju.Widgets)



## Memba Widgets (components from Memba.Widgets)



## jQuery



## Kendo UI



### In styles/vendor/kendo/web/fonts/DejaVu/dejavu.less
 
remove ```./fonts/DejaVu``` from all paths

```less
/* sans-serif */
@font-face {
  font-family: "DejaVu Sans";
  src: url("./fonts/DejaVu/DejaVuSans.ttf") format("truetype");
}
```

The style above is incorrect. The style below is correct.

```less
/* sans-serif */
@font-face {
  font-family: "DejaVu Sans";
  src: url("DejaVuSans.ttf") format("truetype");
}
```

### In styles/vendor/kendo/web/common/inputs.less

add ```..\``` to textures paths

```less
background-image: url("textures/transtexture.png");
```

The style above is incorrect. The style below is correct.

```less
background-image: url("../textures/transtexture.png");
```
