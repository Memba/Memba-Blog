# Graphics

Graphics are produced with Adobe Illustrator unless specified otherwise.

# kidoju.logo

Font elements need to be converted as outline before exporting to SVG.

First the following lines need to be removed:

```
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

Then the SVG file needs to be opened and disable layers need to be removed to save space:

```xml
<g id="Black_background" display="none">
	<rect x="-5.1" y="-7.1" display="inline" stroke="#000000" width="350" height="170"/>
</g>
<g id="Layer_with_papryrus_font" display="none">
	
		<text transform="matrix(1 0 0 1 121.4833 91.9433)" display="inline" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2" font-family="'Papyrus-Regular'" font-size="100">idoju</text>
	<g display="inline">
		<defs>
			<circle id="SVGID_1_" cx="68.5" cy="73.3" r="50"/>
		</defs>
		<clipPath id="SVGID_2_">
			<use xlink:href="#SVGID_1_"  overflow="visible"/>
		</clipPath>
		<g clip-path="url(#SVGID_2_)">
			<circle fill="#F26722" cx="68.5" cy="73.3" r="50"/>
			
				<text transform="matrix(1 0 0 1 29.4091 106.5507)" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="3" font-family="'Papyrus-Regular'" font-size="96">K</text>
		</g>
	</g>
</g>
```

The remaining layer has been renamed from:

```xml
<g id="Layer_with_outlines">
```

to

```xml
<g id="logo">
```

for cleaner CSS

http://tools.dynamicdrive.com/favicon/
http://www.adobe.com/inspire/2013/09/exporting-svg-illustrator.html
