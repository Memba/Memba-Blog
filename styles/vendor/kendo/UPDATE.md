After upgrading Kendo UI

1) use delcss.cmd to remove all CSS files
2) in kendo/web/fonts/DejaVu/dejavu.less, replace ```url("fonts/DejaVu/``` with ```url("``` 
3) in kendo/web/common/inputs.less, replace ```url("textures``` with ```url("../textures```
