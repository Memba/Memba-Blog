/*! Copyright ©2013-2019 Memba® Sarl. All rights reserved. - Version 0.3.8 dated 15-Jan-2020 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{286:function(e,t,o){"use strict";o.r(t);var a=o(614),s=(o(615),o(616),o(0)),i=o.n(s);if(window.kendo&&window.kendo.ui){window.kendo.ex=window.kendo.ex||{};var r=window.kendo,n=r.ex,l=n.markeditor,d=n.mathinput,u=r.ui,p=u.AssetManager,c=u.AudioVideo,m=u.BaseDialog,g=u.BasicList,y=u.CodeEditor,h=u.Explorer,f=u.ImageList,k=u.MarkEditor,b=u.MultiInput,v=u.MultiQuiz,w=u.Navigation,x=u.PlayBar,C=u.PropertyGrid,S=u.Quiz,T=u.Social,M=u.Stage,A=u.StyleEditor;if(p){var D=p.prototype.options;D.messages=i.a.extend(!0,D.messages,{toolbar:{upload:"Upload",delete:"Delete",filter:"Collection: ",search:"Search"},tabs:{default:"Project"},data:{defaultName:"Uploading...",defaultImage:""}})}if(c){var q=c.prototype.options;q.messages=i.a.extend(!0,q.messages,{play:"Play/Pause",mute:"Mute/Unmute",fullScreen:"Full Screen",notSupported:"Media not supported"})}if(m){var I=m.prototype.options;I.messages=i.a.extend(!0,I.messages,{title:{error:"Error",info:"Information",success:"Success",warning:"Warning"},actions:{cancel:{action:"cancel",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",text:"Cancel"},close:{action:"close",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",primary:!0,text:"Close"},create:{action:"create",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/plus.svg",primary:!0,text:"Create"},no:{action:"no",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",text:"No"},ok:{action:"ok",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg",primary:!0,text:"OK"},yes:{action:"yes",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg",primary:!0,text:"Yes"}}})}if(g){var F=g.prototype.options;F.messages=i.a.extend(!0,F.messages,{toolbar:{add:"Add"},validation:{value:"A value is required."}})}if(y){var P=y.prototype.options;P.messages=i.a.extend(!0,P.messages,{formula:"Formula:",notApplicable:"N/A",solution:"Solution:",params:"Params:",value:"Value:",test:"Test",success:"Success",failure:"Failure",omit:"Omit",error:"Error"})}if(h){var R=h.prototype.options;R.messages=i.a.extend(!0,R.messages,{empty:"No item to display"})}if(f){var B=f.prototype.options;B.messages=i.a.extend(!0,B.messages,{toolbar:{add:"Add"},validation:{text:"An alternate text of 1 to 100 characters is required.",url:"An image url is required."}})}if(k){var N=k.prototype.options;N.messages=i.a.extend(!0,N.messages,{image:"An undescribed image",link:"Click here"})}if(l&&l.messages.dialogs&&(l.messages.dialogs=i.a.extend(!0,l.messages.dialogs,{cancel:'<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/close.svg" class="k-image">Cancel',okText:'<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg" class="k-image">OK',headingsDialog:{title:"Start Cap",buttons:{h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6"}},linkDialog:{title:"Hyperlink",labels:{text:"Url"}},imageDialog:{title:"Image",labels:{url:"Url"}},latexDialog:{title:"Mathematic Expression",labels:{display:"Display",inline:"inline"}},previewDialog:{title:"Preview"}})),l&&l.messages.toolbar&&(l.messages.toolbar=i.a.extend(!0,l.messages.toolbar,{undo:"Undo",redo:"Redo",headings:"Headings",headingsButtons:{h1:"Heading 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6"},bold:"Bold",italic:"Italic",bulleted:"Bulleted List",numbered:"Numbered List",blockquote:"Blockquote",hrule:"Horizontal Rule",link:"Hyperlink",image:"Image",code:"Code",latex:"Mathematic Expression",preview:"Preview in New Window"})),d&&d.messages.dialogs&&(d.messages.dialogs=i.a.extend(!0,d.messages.dialogs,{keypad:{title:"KeyPad",buttons:{comma:",",stop:".",n0:"0",n1:"1",n2:"2",n3:"3",n4:"4",n5:"5",n6:"6",n7:"7",n8:"8",n9:"9",a:"a",b:"b",c:"c",i:"i",j:"j",k:"k",n:"n",p:"p",q:"q",x:"x",y:"y",z:"z",pi:"Pi",infty:"Infinity",space:"Space",subscript:"Subscript"}},basic:{title:"Basic",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",frac:"Fraction",sqrt:"Square root",pow2:"Power of 2",pow3:"Power of 3",sin:"Sine",cos:"Cosine",tan:"Tangent"}},greek:{title:"Greek",buttons:{alpha:"Alpha",beta:"Beta",gamma:"Gamma",delta:"Delta",epsilon:"Epsilon",zeta:"Zeta",eta:"Eta",theta:"Theta",iota:"Iota",kappa:"Kappa",lambda:"Lambda",mu:"Mu",nu:"Nu",xi:"Xi",omicron:"Omicron",pi:"Pi",rho:"Rho",sigma:"Sigma",tau:"Tau",upsilon:"Upsilon",phi:"Phi",chi:"Chi",psi:"Psi",omega:"Omega"}},operators:{title:"Operators",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",bleft:"Left square bracket [",bright:"Right square bracket ]",cleft:"Left curly bracket {",cright:"Right curly bracket }",vleft:"Left vertical line |",vright:"Right vertical line |",lt:"Lower than",le:"Lower than or equal",gt:"Greater than",ge:"Greater than or equal",neq:"Not equal",approx:"Approximate",propto:"Proportional",plusminus:"Plus-Minus",percent:"Percent",not:"Not",and:"And",or:"Or",circ:"Composition",nabla:"Nabla"}},expressions:{title:"Functions",buttons:{sqrt:"Square root",cubert:"Cube root",nthroot:"Nth root",pow2:"Power of 2",pow3:"Power of 3",pow:"Power",log:"Logarithm",log10:"Logarithm base 10",ln:"Naperian logarithm",sin:"Sine",cos:"Cosine",tan:"Tangent",arcsin:"Arc sine",arccos:"Arc cosine",arctan:"Arc tangent",deriv:"Derivative",partial:"Partial derivative",int:"Integral",oint:"Contour integral",sum:"Sum",prod:"Product",lim:"Limit"}},sets:{title:"Sets",buttons:{cset:"Complexes",pset:"Primes",nset:"Naturals",qset:"Rationals",rset:"Reals",zset:"Integers",emptyset:"Empty set",forall:"For all",exists:"Exists",nexists:"Not exists",in:"In",nin:"Not in",subset:"Subset",supset:"Superset",nsubset:"Not subset",nsupset:"Not superset",intersection:"Intersection",union:"Union",to:"To",implies:"Implies",impliedby:"Implied by",nimplies:"Not implies",iff:"Equivalent to"}},matrices:{title:"Matrices",buttons:{vector:"Vector",widehat:"Widehat (angle)",matrix:"Matrix",pmatrix:"Matrix with parentheses",bmatrix:"Matrix with square brackets",bbmatrix:"Matrix with curly braces",vmatrix:"Matrix with vertical lines",vvmatrix:"Matrix with double vertical lines",column:"Add column",row:"Add row"}},statistics:{title:"Statistics",buttons:{factorial:"Factorial",binomial:"Binomial",overline:"Overline (mean)"}}})),d&&d.messages.toolbar&&(d.messages.toolbar=i.a.extend(!0,d.messages.toolbar,{field:{title:"Field"},backspace:{title:"Backspace"},keypad:{title:"KeyPad",buttons:{comma:",",stop:".",n0:"0",n1:"1",n2:"2",n3:"3",n4:"4",n5:"5",n6:"6",n7:"7",n8:"8",n9:"9",a:"a",b:"b",c:"c",i:"i",j:"j",k:"k",n:"n",p:"p",q:"q",x:"x",y:"y",z:"z",pi:"Pi",infty:"Infinity",space:"Space",subscript:"Subscript"}},basic:{title:"Basic",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",frac:"Fraction",sqrt:"Square root",pow2:"Power of 2",pow3:"Power of 3",sin:"Sine",cos:"Cosine",tan:"Tangent"}},greek:{title:"Greek",buttons:{alpha:"Alpha",beta:"Beta",gamma:"Gamma",delta:"Delta",epsilon:"Epsilon",zeta:"Zeta",eta:"Eta",theta:"Theta",iota:"Iota",kappa:"Kappa",lambda:"Lambda",mu:"Mu",nu:"Nu",xi:"Xi",omicron:"Omicron",pi:"Pi",rho:"Rho",sigma:"Sigma",tau:"Tau",upsilon:"Upsilon",phi:"Phi",chi:"Chi",psi:"Psi",omega:"Omega"}},operators:{title:"Operators",buttons:{equal:"Equal",plus:"Plus",minus:"Minus",cdot:"Times",times:"Times",div:"Divide",pleft:"Left parenthesis (",pright:"Right parenthesis )",bleft:"Left square bracket [",bright:"Right square bracket ]",cleft:"Left curly bracket {",cright:"Right curly bracket }",vleft:"Left vertical line |",vright:"Right vertical line |",lt:"Lower than",le:"Lower than or equal",gt:"Greater than",ge:"Greater than or equal",neq:"Not equal",approx:"Approximate",propto:"Proportional",plusminus:"Plus-Minus",percent:"Percent",not:"Not",and:"And",or:"Or",circ:"Composition",nabla:"Nabla"}},expressions:{title:"Functions",buttons:{sqrt:"Square root",cubert:"Cube root",nthroot:"Nth root",pow2:"Power of 2",pow3:"Power of 3",pow:"Power",log:"Logarithm",log10:"Logarithm base 10",ln:"Naperian logarithm",sin:"Sine",cos:"Cosine",tan:"Tangent",arcsin:"Arc sine",arccos:"Arc cosine",arctan:"Arc tangent",deriv:"Derivative",partial:"Partial derivative",int:"Integral",oint:"Contour integral",sum:"Sum",prod:"Product",lim:"Limit"}},sets:{title:"Sets",buttons:{cset:"Complexes",pset:"Primes",nset:"Naturals",qset:"Rationals",rset:"Reals",zset:"Integers",emptyset:"Empty set",forall:"For all",exists:"Exists",nexists:"Not exists",in:"In",nin:"Not in",subset:"Subset",supset:"Superset",nsubset:"Not subset",nsupset:"Not superset",intersection:"Intersection",union:"Union",to:"To",implies:"Implies",impliedby:"Implied by",nimplies:"Not implies",iff:"Equivalent to"}},matrices:{title:"Matrices",buttons:{vector:"Vector",widehat:"Widehat (angle)",matrix:"Matrix",pmatrix:"Matrix with parentheses",bmatrix:"Matrix with square brackets",bbmatrix:"Matrix with curly braces",vmatrix:"Matrix with vertical lines",vvmatrix:"Matrix with double vertical lines",column:"Add column",row:"Add row"}},statistics:{title:"Statistics",buttons:{factorial:"Factorial",binomial:"Binomial",overline:"Overline (mean)"}}})),b){var z=b.prototype.options;z.messages=i.a.extend(!0,z.messages,{clear:"Clear",delete:"Delete"})}if(v){var E=v.prototype.options;E.messages=i.a.extend(!0,E.messages,{placeholder:"Select..."})}if(w){var L=w.prototype.options;L.messages=i.a.extend(!0,L.messages,{empty:"No item to display"})}if(x){var H=x.prototype.options;H.messages=i.a.extend(!0,H.messages,{empty:"No page to display",page:"Page",of:"of {0}",first:"Go to the first page",previous:"Go to the previous page",next:"Go to the next page",last:"Go to the last page",refresh:"Refresh",morePages:"More pages"})}if(C){var U=C.prototype.options;U.messages=i.a.extend(!0,U.messages,{property:"Property",value:"Value"})}if(S){var W=S.prototype.options;W.messages=i.a.extend(!0,W.messages,{optionLabel:"Select..."})}if(T){var O=T.prototype.options;O.messages=i.a.extend(!0,O.messages,{classroom:"Share to Google Classroom",facebook:"Share to Facebook",google:"Share to Google+",linkedin:"Share to LinkedIn",pinterest:"Share to Pinterest",twitter:"Share to Twitter"})}if(M){var G=M.prototype.options;G.messages=i.a.extend(!0,G.messages,{contextMenu:{delete:"Delete",duplicate:"Duplicate"},noPage:"Please add or select a page"})}if(A){var j=A.prototype.options;j.messages=i.a.extend(!0,j.messages,{columns:{name:"Name",value:"Value"},toolbar:{create:"New Style",destroy:"Delete"},validation:{name:"Name is required",value:"Value is required"}})}}window.kendo.culture("en-GB");t.default={webapp:a}},614:function(e){e.exports=JSON.parse('{"locale":"en","languages":[{"value":"en","name":"English","icon":""},{"value":"fr","name":"French","icon":""}],"themes":[{"value":"black","name":"Black","colors":[]},{"value":"bootstrap","name":"Bootstrap","colors":[]},{"value":"flat","name":"Flat","colors":[]},{"value":"highcontrast","name":"High Contrast","colors":[]},{"value":"indigo","name":"Indigo","colors":[]},{"value":"nordic","name":"Nordic","colors":[]},{"value":"memba","name":"Memba","colors":[]},{"value":"turquoise","name":"Turquoise","colors":[]},{"value":"urban","name":"Urban","colors":[]},{"value":"vintage","name":"Vintage","colors":[]}],"meta":{"author":"Memba Sarl","title":"Memba","description":"Memba are the proud makers of Kidoju","keywords":"Memba, Kidoju, teach, learn, knowledge, test, blog, article, documentation, ebook, video, webinar, slide","category":"Miscellaneous","icon":"typewriter"},"header":{"navbar":{"toggle":"Toggle navigation","search":{"text":"Search","placeholder":"Search..."}}},"footer":{"copyright":"Version %s - Copyright &copy; 2013-2019 Memba Sarl.","language":{"label":"Language:"},"theme":{"label":"Theme:"}},"error":{"icon":"error","back":"Back"},"groups":{"authors":{"icon":"users3","heading":"Authors"},"calendar":{"icon":"calendar","heading":"Calendar"},"categories":{"icon":"tags","heading":"Categories"}},"home":{},"search":{"title":{"icon":"magnifying_glass","heading":"Search results"},"message":"No result."},"errors":{"http":{"400":{"status":400,"title":"400 - Bad Request","message":"We are sorry, but there is something wrong in your request. The URL may be misspelled."},"401":{"status":401,"title":"401 - Unauthorized","message":"We are sorry, but your request is unauthorized."},"403":{"status":403,"title":"403 - Forbidden","message":"We are sorry, but your request is forbidden."},"404":{"status":404,"title":"404 - Not Found","message":"We are sorry, the page you requested cannot be found. The URL may be misspelled or the page you\'re looking for is no longer available."},"500":{"status":500,"title":"500 - Generic Error","message":"We are sorry, there has been an unknown error."},"1000":{"status":500,"title":"1000 - Disable private mode or upgrade your browser","message":"This web site requires recent browser features including (but not limited to) audio and video, blobs, canvas, css transforms, file api, local and session storage, scalable vector graphics and web workers."}},"mongoose":{"validation":{"status":400,"title":"400 - Bad Request","message":"Database validation error."}},"params":{"invalidFileId":{"status":404,"title":"404 - Not Found","message":"Invalid file id: use a name of 3 to 50 and an extension of 2 to 7 alphanumeric characters"},"invalidLanguage":{"status":404,"title":"404 - Not Found","message":"Invalid language: this language is not implemented."},"invalidMonth":{"status":404,"title":"404 - Not Found","message":"Invalid month: use a two-digit number between 01 and 12"},"invalidObjectId":{"status":404,"title":"404 - Not Found","message":"Invalid object identifier: an identifier is an hexadecimal string of 24 characters."},"invalidProvider":{"status":404,"title":"404 - Not Found","message":"Invalid provider: use `facebook`, `google`, `live` or `twitter`"},"invalidYear":{"status":404,"title":"404 - Not Found","message":"Invalid year: use a four-digit number between 2014 and the current year"}},"routes":{"hookRoute":{"badAgent":{"status":400,"title":"400 - Bad Request","message":"Unexpected user agent: `%s`."}}}}}')},615:function(e,t,o){var a,s,i;s=[o(107)],void 0===(i="function"==typeof(a=function(){kendo.cultures["en-GB"]={name:"en-GB",numberFormat:{pattern:["-n"],decimals:2,",":",",".":".",groupSize:[3],percent:{pattern:["-n%","n%"],decimals:2,",":",",".":".",groupSize:[3],symbol:"%"},currency:{name:"British Pound",abbr:"GBP",pattern:["-$n","$n"],decimals:2,",":",",".":".",groupSize:[3],symbol:"£"}},calendars:{standard:{days:{names:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],namesAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],namesShort:["Su","Mo","Tu","We","Th","Fr","Sa"]},months:{names:["January","February","March","April","May","June","July","August","September","October","November","December"],namesAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},AM:["AM","am","AM"],PM:["PM","pm","PM"],patterns:{d:"dd/MM/yyyy",D:"dd MMMM yyyy",F:"dd MMMM yyyy HH:mm:ss",g:"dd/MM/yyyy HH:mm",G:"dd/MM/yyyy HH:mm:ss",m:"d MMMM",M:"d MMMM",s:"yyyy'-'MM'-'dd'T'HH':'mm':'ss",t:"HH:mm",T:"HH:mm:ss",u:"yyyy'-'MM'-'dd HH':'mm':'ss'Z'",y:"MMMM yyyy",Y:"MMMM yyyy"},"/":"/",":":":",firstDay:1}}}})?a.apply(t,s):a)||(e.exports=i)},616:function(e,t,o){var a,s,i;s=[o(107)],void 0===(i="function"==typeof(a=function(){var e;e=window.kendo.jQuery,kendo.ui.FlatColorPicker&&(kendo.ui.FlatColorPicker.prototype.options.messages=e.extend(!0,kendo.ui.FlatColorPicker.prototype.options.messages,{apply:"Apply",cancel:"Cancel",noColor:"no colour",clearColor:"Clear colour"})),kendo.ui.ColorPicker&&(kendo.ui.ColorPicker.prototype.options.messages=e.extend(!0,kendo.ui.ColorPicker.prototype.options.messages,{apply:"Apply",cancel:"Cancel",noColor:"no colour",clearColor:"Clear colour"})),kendo.ui.ColumnMenu&&(kendo.ui.ColumnMenu.prototype.options.messages=e.extend(!0,kendo.ui.ColumnMenu.prototype.options.messages,{sortAscending:"Sort Ascending",sortDescending:"Sort Descending",filter:"Filter",column:"Column",columns:"Columns",columnVisibility:"Column Visibility",clear:"Clear",cancel:"Cancel",done:"Done",settings:"Edit Column Settings",lock:"Lock",unlock:"Unlock"})),kendo.ui.DateRangePicker&&(kendo.ui.DateRangePicker.prototype.options.messages=e.extend(!0,kendo.ui.DateRangePicker.prototype.options.messages,{startLabel:"Start",endLabel:"End"})),kendo.ui.Editor&&(kendo.ui.Editor.prototype.options.messages=e.extend(!0,kendo.ui.Editor.prototype.options.messages,{bold:"Bold",italic:"Italic",underline:"Underline",strikethrough:"Strikethrough",superscript:"Superscript",subscript:"Subscript",justifyCenter:"Center text",justifyLeft:"Align text left",justifyRight:"Align text right",justifyFull:"Justify",insertUnorderedList:"Insert unordered list",insertOrderedList:"Insert ordered list",indent:"Indent",outdent:"Outdent",createLink:"Insert hyperlink",unlink:"Remove hyperlink",insertImage:"Insert image",insertFile:"Insert file",insertHtml:"Insert HTML",viewHtml:"View HTML",fontName:"Select font family",fontNameInherit:"(inherited font)",fontSize:"Select font size",fontSizeInherit:"(inherited size)",formatBlock:"Format",formatting:"Format",foreColor:"Colour",backColor:"Background colour",style:"Styles",emptyFolder:"Empty Folder",uploadFile:"Upload",overflowAnchor:"More tools",orderBy:"Arrange by:",orderBySize:"Size",orderByName:"Name",invalidFileType:'The selected file "{0}" is not valid. Supported file types are {1}.',deleteFile:'Are you sure you want to delete "{0}"?',overwriteFile:'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',directoryNotFound:"A directory with this name was not found.",imageWebAddress:"Web address",imageAltText:"Alternate text",imageWidth:"Width (px)",imageHeight:"Height (px)",fileWebAddress:"Web address",fileTitle:"Title",linkWebAddress:"Web address",linkText:"Text",linkToolTip:"ToolTip",linkOpenInNewWindow:"Open link in new window",dialogUpdate:"Update",dialogInsert:"Insert",dialogButtonSeparator:"or",dialogCancel:"Cancel",cleanFormatting:"Clean formatting",createTable:"Create table",addColumnLeft:"Add column on the left",addColumnRight:"Add column on the right",addRowAbove:"Add row above",addRowBelow:"Add row below",deleteRow:"Delete row",deleteColumn:"Delete column",dialogOk:"Ok",tableWizard:"Table Wizard",tableTab:"Table",cellTab:"Cell",accessibilityTab:"Accessibility",caption:"Caption",summary:"Summary",width:"Width",height:"Height",units:"Units",cellSpacing:"Cell Spacing",cellPadding:"Cell Padding",cellMargin:"Cell Margin",alignment:"Alignment",background:"Background",cssClass:"CSS Class",id:"ID",border:"Border",borderStyle:"Border Style",collapseBorders:"Collapse borders",wrapText:"Wrap text",associateCellsWithHeaders:"Associate headers",alignLeft:"Align Left",alignCenter:"Align Center",alignRight:"Align Right",alignLeftTop:"Align Left Top",alignCenterTop:"Align Center Top",alignRightTop:"Align Right Top",alignLeftMiddle:"Align Left Middle",alignCenterMiddle:"Align Center Middle",alignRightMiddle:"Align Right Middle",alignLeftBottom:"Align Left Bottom",alignCenterBottom:"Align Center Bottom",alignRightBottom:"Align Right Bottom",alignRemove:"Remove Alignment",columns:"Columns",rows:"Rows",selectAllCells:"Select All Cells",print:"Print",headerRows:"Header Rows",headerColumns:"Header Columns",tableSummaryPlaceholder:"Summary attribute is not HTML5 compatible.",associateNone:"None",associateScope:"Associate using 'scope' attribute",associateIds:"Associate using Ids",copyFormat:"Copy format",applyFormat:"Apply format"})),kendo.ui.FileBrowser&&(kendo.ui.FileBrowser.prototype.options.messages=e.extend(!0,kendo.ui.FileBrowser.prototype.options.messages,{uploadFile:"Upload",orderBy:"Arrange by",orderByName:"Name",orderBySize:"Size",directoryNotFound:"A directory with this name was not found.",emptyFolder:"Empty Folder",deleteFile:'Are you sure you want to delete "{0}"?',invalidFileType:'The selected file "{0}" is not valid. Supported file types are {1}.',overwriteFile:'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',dropFilesHere:"drop file here to upload",search:"Search"})),kendo.ui.FilterCell&&(kendo.ui.FilterCell.prototype.options.messages=e.extend(!0,kendo.ui.FilterCell.prototype.options.messages,{isTrue:"is true",isFalse:"is false",filter:"Filter",clear:"Clear",operator:"Operator"})),kendo.ui.FilterCell&&(kendo.ui.FilterCell.prototype.options.operators=e.extend(!0,kendo.ui.FilterCell.prototype.options.operators,{string:{eq:"Is equal to",neq:"Is not equal to",startswith:"Starts with",contains:"Contains",doesnotcontain:"Does not contain",endswith:"Ends with",isnull:"Is null",isnotnull:"Is not null",isempty:"Is empty",isnotempty:"Is not empty",isnullorempty:"Has no value",isnotnullorempty:"Has value"},number:{eq:"Is equal to",neq:"Is not equal to",gte:"Is greater than or equal to",gt:"Is greater than",lte:"Is less than or equal to",lt:"Is less than",isnull:"Is null",isnotnull:"Is not null"},date:{eq:"Is equal to",neq:"Is not equal to",gte:"Is after or equal to",gt:"Is after",lte:"Is before or equal to",lt:"Is before",isnull:"Is null",isnotnull:"Is not null"},enums:{eq:"Is equal to",neq:"Is not equal to",isnull:"Is null",isnotnull:"Is not null"}})),kendo.ui.FilterMenu&&(kendo.ui.FilterMenu.prototype.options.messages=e.extend(!0,kendo.ui.FilterMenu.prototype.options.messages,{info:"Show items with value that:",title:"Show items with value that",isTrue:"is true",isFalse:"is false",filter:"Filter",clear:"Clear",and:"And",or:"Or",selectValue:"-Select value-",operator:"Operator",value:"Value",cancel:"Cancel",done:"Done",into:"in"})),kendo.ui.FilterMenu&&(kendo.ui.FilterMenu.prototype.options.operators=e.extend(!0,kendo.ui.FilterMenu.prototype.options.operators,{string:{eq:"Is equal to",neq:"Is not equal to",startswith:"Starts with",contains:"Contains",doesnotcontain:"Does not contain",endswith:"Ends with",isnull:"Is null",isnotnull:"Is not null",isempty:"Is empty",isnotempty:"Is not empty",isnullorempty:"Has no value",isnotnullorempty:"Has value"},number:{eq:"Is equal to",neq:"Is not equal to",gte:"Is greater than or equal to",gt:"Is greater than",lte:"Is less than or equal to",lt:"Is less than",isnull:"Is null",isnotnull:"Is not null"},date:{eq:"Is equal to",neq:"Is not equal to",gte:"Is after or equal to",gt:"Is after",lte:"Is before or equal to",lt:"Is before",isnull:"Is null",isnotnull:"Is not null"},enums:{eq:"Is equal to",neq:"Is not equal to",isnull:"Is null",isnotnull:"Is not null"}})),kendo.ui.FilterMultiCheck&&(kendo.ui.FilterMultiCheck.prototype.options.messages=e.extend(!0,kendo.ui.FilterMultiCheck.prototype.options.messages,{checkAll:"Select All",clearAll:"Clear All",clear:"Clear",filter:"Filter",search:"Search",cancel:"Cancel",selectedItemsFormat:"{0} items selected",done:"Done",into:"in"})),kendo.ui.Gantt&&(kendo.ui.Gantt.prototype.options.messages=e.extend(!0,kendo.ui.Gantt.prototype.options.messages,{actions:{addChild:"Add Child",append:"Add Task",insertAfter:"Add Below",insertBefore:"Add Above",pdf:"Export to PDF"},cancel:"Cancel",deleteDependencyWindowTitle:"Delete dependency",deleteTaskWindowTitle:"Delete task",destroy:"Delete",editor:{assingButton:"Assign",editorTitle:"Task",end:"End",percentComplete:"Complete",resources:"Resources",resourcesEditorTitle:"Resources",resourcesHeader:"Resources",start:"Start",title:"Title",unitsHeader:"Units"},save:"Save",views:{day:"Day",end:"End",month:"Month",start:"Start",week:"Week",year:"Year"}})),kendo.ui.Grid&&(kendo.ui.Grid.prototype.options.messages=e.extend(!0,kendo.ui.Grid.prototype.options.messages,{commands:{cancel:"Cancel changes",canceledit:"Cancel",create:"Add new record",destroy:"Delete",edit:"Edit",excel:"Export to Excel",pdf:"Export to PDF",save:"Save changes",select:"Select",update:"Update"},editable:{cancelDelete:"Cancel",confirmation:"Are you sure you want to delete this record?",confirmDelete:"Delete"},noRecords:"No records available.",search:"Search...",groupHeader:"Press ctrl + space to group",ungroupHeader:"Press ctrl + space to ungroup"})),kendo.ui.Groupable&&(kendo.ui.Groupable.prototype.options.messages=e.extend(!0,kendo.ui.Groupable.prototype.options.messages,{empty:"Drag a column header and drop it here to group by that column"})),kendo.ui.NumericTextBox&&(kendo.ui.NumericTextBox.prototype.options=e.extend(!0,kendo.ui.NumericTextBox.prototype.options,{upArrowText:"Increase value",downArrowText:"Decrease value"})),kendo.ui.MediaPlayer&&(kendo.ui.MediaPlayer.prototype.options.messages=e.extend(!0,kendo.ui.MediaPlayer.prototype.options.messages,{pause:"Pause",play:"Play",mute:"Mute",unmute:"Unmute",quality:"Quality",fullscreen:"Full Screen"})),kendo.ui.Pager&&(kendo.ui.Pager.prototype.options.messages=e.extend(!0,kendo.ui.Pager.prototype.options.messages,{allPages:"All",display:"{0} - {1} of {2} items",empty:"No items to display",page:"Page",of:"of {0}",itemsPerPage:"items per page",first:"Go to the first page",previous:"Go to the previous page",next:"Go to the next page",last:"Go to the last page",refresh:"Refresh",morePages:"More pages"})),kendo.ui.TreeListPager&&(kendo.ui.TreeListPager.prototype.options.messages=e.extend(!0,kendo.ui.TreeListPager.prototype.options.messages,{allPages:"All",display:"{0} - {1} of {2} items",empty:"No items to display",page:"Page",of:"of {0}",itemsPerPage:"items per page",first:"Go to the first page",previous:"Go to the previous page",next:"Go to the next page",last:"Go to the last page",refresh:"Refresh",morePages:"More pages"})),kendo.ui.PivotGrid&&(kendo.ui.PivotGrid.prototype.options.messages=e.extend(!0,kendo.ui.PivotGrid.prototype.options.messages,{measureFields:"Drop Data Fields Here",columnFields:"Drop Column Fields Here",rowFields:"Drop Rows Fields Here"})),kendo.ui.PivotFieldMenu&&(kendo.ui.PivotFieldMenu.prototype.options.messages=e.extend(!0,kendo.ui.PivotFieldMenu.prototype.options.messages,{info:"Show items with value that:",filterFields:"Fields Filter",filter:"Filter",include:"Include Fields...",title:"Fields to include",clear:"Clear",ok:"Ok",cancel:"Cancel",operators:{contains:"Contains",doesnotcontain:"Does not contain",startswith:"Starts with",endswith:"Ends with",eq:"Is equal to",neq:"Is not equal to"}})),kendo.ui.RecurrenceEditor&&(kendo.ui.RecurrenceEditor.prototype.options.messages=e.extend(!0,kendo.ui.RecurrenceEditor.prototype.options.messages,{frequencies:{never:"Never",hourly:"Hourly",daily:"Daily",weekly:"Weekly",monthly:"Monthly",yearly:"Yearly"},hourly:{repeatEvery:"Repeat every: ",interval:" hour(s)"},daily:{repeatEvery:"Repeat every: ",interval:" day(s)"},weekly:{interval:" week(s)",repeatEvery:"Repeat every: ",repeatOn:"Repeat on: "},monthly:{repeatEvery:"Repeat every: ",repeatOn:"Repeat on: ",interval:" month(s)",day:"Day "},yearly:{repeatEvery:"Repeat every: ",repeatOn:"Repeat on: ",interval:" year(s)",of:" of "},end:{label:"End:",mobileLabel:"Ends",never:"Never",after:"After ",occurrence:" occurrence(s)",on:"On "},offsetPositions:{first:"first",second:"second",third:"third",fourth:"fourth",last:"last"},weekdays:{day:"day",weekday:"weekday",weekend:"weekend day"}})),kendo.ui.Scheduler&&(kendo.ui.Scheduler.prototype.options.messages=e.extend(!0,kendo.ui.Scheduler.prototype.options.messages,{allDay:"all day",date:"Date",event:"Event",time:"Time",showFullDay:"Show full day",showWorkDay:"Show business hours",today:"Today",save:"Save",cancel:"Cancel",destroy:"Delete",resetSeries:"Reset Series",deleteWindowTitle:"Delete event",ariaSlotLabel:"Selected from {0:t} to {1:t}",ariaEventLabel:"{0} on {1:D} at {2:t}",editable:{confirmation:"Are you sure you want to delete this event?"},views:{day:"Day",week:"Week",workWeek:"Work Week",agenda:"Agenda",month:"Month",timeline:"Timeline"},recurrenceMessages:{deleteWindowTitle:"Delete Recurring Item",resetSeriesWindowTitle:"Reset Series",deleteWindowOccurrence:"Delete current occurrence",deleteWindowSeries:"Delete the series",editWindowTitle:"Edit Recurring Item",editWindowOccurrence:"Edit current occurrence",editWindowSeries:"Edit the series",deleteRecurring:"Do you want to delete only this event occurrence or the whole series?",editRecurring:"Do you want to edit only this event occurrence or the whole series?"},editor:{title:"Title",start:"Start",end:"End",allDayEvent:"All day event",description:"Description",repeat:"Repeat",timezone:" ",startTimezone:"Start timezone",endTimezone:"End timezone",separateTimezones:"Use separate start and end time zones",timezoneEditorTitle:"Timezones",timezoneEditorButton:"Time zone",timezoneTitle:"Time zones",noTimezone:"No timezone",editorTitle:"Event"}})),kendo.spreadsheet&&kendo.spreadsheet.messages.borderPalette&&(kendo.spreadsheet.messages.borderPalette=e.extend(!0,kendo.spreadsheet.messages.borderPalette,{allBorders:"All borders",insideBorders:"Inside borders",insideHorizontalBorders:"Inside horizontal borders",insideVerticalBorders:"Inside vertical borders",outsideBorders:"Outside borders",leftBorder:"Left border",topBorder:"Top border",rightBorder:"Right border",bottomBorder:"Bottom border",noBorders:"No border",reset:"Reset colour",customColor:"Custom colour...",apply:"Apply",cancel:"Cancel"})),kendo.spreadsheet&&kendo.spreadsheet.messages.dialogs&&(kendo.spreadsheet.messages.dialogs=e.extend(!0,kendo.spreadsheet.messages.dialogs,{apply:"Apply",save:"Save",cancel:"Cancel",remove:"Remove",retry:"Retry",revert:"Revert",okText:"OK",formatCellsDialog:{title:"Format",categories:{number:"Number",currency:"Currency",date:"Date"}},fontFamilyDialog:{title:"Font"},fontSizeDialog:{title:"Font size"},bordersDialog:{title:"Borders"},alignmentDialog:{title:"Alignment",buttons:{justtifyLeft:"Align left",justifyCenter:"Center",justifyRight:"Align right",justifyFull:"Justify",alignTop:"Align top",alignMiddle:"Align middle",alignBottom:"Align bottom"}},mergeDialog:{title:"Merge cells",buttons:{mergeCells:"Merge all",mergeHorizontally:"Merge horizontally",mergeVertically:"Merge vertically",unmerge:"Unmerge"}},freezeDialog:{title:"Freeze panes",buttons:{freezePanes:"Freeze panes",freezeRows:"Freeze rows",freezeColumns:"Freeze columns",unfreeze:"Unfreeze panes"}},validationDialog:{title:"Data Validation",hintMessage:"Please enter a valid {0} value {1}.",hintTitle:"Validation {0}",criteria:{any:"Any value",number:"Number",text:"Text",date:"Date",custom:"Custom Formula",list:"List"},comparers:{greaterThan:"greater than",lessThan:"less than",between:"between",notBetween:"not between",equalTo:"equal to",notEqualTo:"not equal to",greaterThanOrEqualTo:"greater than or equal to",lessThanOrEqualTo:"less than or equal to"},comparerMessages:{greaterThan:"greater than {0}",lessThan:"less than {0}",between:"between {0} and {1}",notBetween:"not between {0} and {1}",equalTo:"equal to {0}",notEqualTo:"not equal to {0}",greaterThanOrEqualTo:"greater than or equal to {0}",lessThanOrEqualTo:"less than or equal to {0}",custom:"that satisfies the formula: {0}"},labels:{criteria:"Criteria",comparer:"Comparer",min:"Min",max:"Max",value:"Value",start:"Start",end:"End",onInvalidData:"On invalid data",rejectInput:"Reject input",showWarning:"Show warning",showHint:"Show hint",hintTitle:"Hint title",hintMessage:"Hint message",ignoreBlank:"Ignore blank"},placeholders:{typeTitle:"Type title",typeMessage:"Type message"}},exportAsDialog:{title:"Export...",labels:{fileName:"File name",saveAsType:"Save as type",exportArea:"Export",paperSize:"Paper size",margins:"Margins",orientation:"Orientation",print:"Print",guidelines:"Guidelines",center:"Center",horizontally:"Horizontally",vertically:"Vertically"}},modifyMergedDialog:{errorMessage:"Cannot change part of a merged cell."},useKeyboardDialog:{title:"Copying and pasting",errorMessage:"These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",labels:{forCopy:"for copy",forCut:"for cut",forPaste:"for paste"}},unsupportedSelectionDialog:{errorMessage:"That action cannot be performed on multiple selection."},insertCommentDialog:{title:"Insert comment",labels:{comment:"Comment",removeComment:"Remove comment"}},insertImageDialog:{title:"Insert image",info:"Drag an image here, or click to select",typeError:"Please select a JPEG, PNG or GIF image"}})),kendo.spreadsheet&&kendo.spreadsheet.messages.filterMenu&&(kendo.spreadsheet.messages.filterMenu=e.extend(!0,kendo.spreadsheet.messages.filterMenu,{sortAscending:"Sort range A to Z",sortDescending:"Sort range Z to A",filterByValue:"Filter by value",filterByCondition:"Filter by condition",apply:"Apply",search:"Search",addToCurrent:"Add to current selection",clear:"Clear",blanks:"(Blanks)",operatorNone:"None",and:"AND",or:"OR",operators:{string:{contains:"Text contains",doesnotcontain:"Text does not contain",startswith:"Text starts with",endswith:"Text ends with"},date:{eq:"Date is",neq:"Date is not",lt:"Date is before",gt:"Date is after"},number:{eq:"Is equal to",neq:"Is not equal to",gte:"Is greater than or equal to",gt:"Is greater than",lte:"Is less than or equal to",lt:"Is less than"}}})),kendo.spreadsheet&&kendo.spreadsheet.messages.colorPicker&&(kendo.spreadsheet.messages.colorPicker=e.extend(!0,kendo.spreadsheet.messages.colorPicker,{reset:"Reset color",customColor:"Custom color...",apply:"Apply",cancel:"Cancel"})),kendo.spreadsheet&&kendo.spreadsheet.messages.toolbar&&(kendo.spreadsheet.messages.toolbar=e.extend(!0,kendo.spreadsheet.messages.toolbar,{addColumnLeft:"Add column left",addColumnRight:"Add column right",addRowAbove:"Add row above",addRowBelow:"Add row below",alignment:"Alignment",alignmentButtons:{justtifyLeft:"Align left",justifyCenter:"Center",justifyRight:"Align right",justifyFull:"Justify",alignTop:"Align top",alignMiddle:"Align middle",alignBottom:"Align bottom"},backgroundColor:"Background",bold:"Bold",borders:"Borders",colorPicker:{reset:"Reset colour",customColor:"Custom colour..."},copy:"Copy",cut:"Cut",deleteColumn:"Delete column",deleteRow:"Delete row",excelImport:"Import from Excel...",filter:"Filter",fontFamily:"Font",fontSize:"Font size",format:"Custom format...",formatTypes:{automatic:"Automatic",number:"Number",percent:"Percent",financial:"Financial",currency:"Currency",date:"Date",time:"Time",dateTime:"Date time",duration:"Duration",moreFormats:"More formats..."},formatDecreaseDecimal:"Decrease decimal",formatIncreaseDecimal:"Increase decimal",freeze:"Freeze panes",freezeButtons:{freezePanes:"Freeze panes",freezeRows:"Freeze rows",freezeColumns:"Freeze columns",unfreeze:"Unfreeze panes"},insertComment:"Insert comment",insertImage:"Insert image",italic:"Italic",merge:"Merge cells",mergeButtons:{mergeCells:"Merge all",mergeHorizontally:"Merge horizontally",mergeVertically:"Merge vertically",unmerge:"Unmerge"},open:"Open...",paste:"Paste",quickAccess:{redo:"Redo",undo:"Undo"},saveAs:"Save As...",sort:"Sort",sortAsc:"Sort ascending",sortDesc:"Sort descending",sortButtons:{sortSheetAsc:"Sort sheet A to Z",sortSheetDesc:"Sort sheet Z to A",sortRangeAsc:"Sort range A to Z",sortRangeDesc:"Sort range Z to A"},textColor:"Text Colour",textWrap:"Wrap text",underline:"Underline",validation:"Data validation..."})),kendo.spreadsheet&&kendo.spreadsheet.messages.view&&(kendo.spreadsheet.messages.view=e.extend(!0,kendo.spreadsheet.messages.view,{nameBox:"Name Box",errors:{shiftingNonblankCells:"Cannot insert cells due to data loss possibility. Select another insert location or delete the data from the end of your worksheet.",filterRangeContainingMerges:"Cannot create a filter within a range containing merges",validationError:"The value that you entered violates the validation rules set on the cell."},tabs:{home:"Home",insert:"Insert",data:"Data"}})),kendo.ui.Slider&&(kendo.ui.Slider.prototype.options=e.extend(!0,kendo.ui.Slider.prototype.options,{increaseButtonTitle:"Increase",decreaseButtonTitle:"Decrease"})),kendo.ui.TreeList&&(kendo.ui.TreeList.prototype.options.messages=e.extend(!0,kendo.ui.TreeList.prototype.options.messages,{noRows:"No records to display",loading:"Loading...",requestFailed:"Request failed.",retry:"Retry",commands:{edit:"Edit",update:"Update",canceledit:"Cancel",create:"Add new record",createchild:"Add child record",destroy:"Delete",excel:"Export to Excel",pdf:"Export to PDF"}})),kendo.ui.TreeView&&(kendo.ui.TreeView.prototype.options.messages=e.extend(!0,kendo.ui.TreeView.prototype.options.messages,{loading:"Loading...",requestFailed:"Request failed.",retry:"Retry"})),kendo.ui.Upload&&(kendo.ui.Upload.prototype.options.localization=e.extend(!0,kendo.ui.Upload.prototype.options.localization,{select:"Select files...",cancel:"Cancel",retry:"Retry",remove:"Remove",uploadSelectedFiles:"Upload files",dropFilesHere:"drop files here to upload",statusUploading:"uploading",statusUploaded:"uploaded",statusWarning:"warning",statusFailed:"failed",headerStatusUploading:"Uploading...",headerStatusUploaded:"Done"})),kendo.ui.Validator&&(kendo.ui.Validator.prototype.options.messages=e.extend(!0,kendo.ui.Validator.prototype.options.messages,{required:"{0} is required",pattern:"{0} is not valid",min:"{0} should be greater than or equal to {1}",max:"{0} should be smaller than or equal to {1}",step:"{0} is not valid",email:"{0} is not valid email",url:"{0} is not valid URL",date:"{0} is not valid date",dateCompare:"End date should be greater than or equal to the start date"})),kendo.ui.Dialog&&(kendo.ui.Dialog.prototype.options.messages=e.extend(!0,kendo.ui.Dialog.prototype.options.localization,{close:"Close"})),kendo.ui.Alert&&(kendo.ui.Alert.prototype.options.messages=e.extend(!0,kendo.ui.Alert.prototype.options.localization,{okText:"OK"})),kendo.ui.Confirm&&(kendo.ui.Confirm.prototype.options.messages=e.extend(!0,kendo.ui.Confirm.prototype.options.localization,{okText:"OK",cancel:"Cancel"})),kendo.ui.Prompt&&(kendo.ui.Prompt.prototype.options.messages=e.extend(!0,kendo.ui.Prompt.prototype.options.localization,{okText:"OK",cancel:"Cancel"})),kendo.ui.List&&(kendo.ui.List.prototype.options.messages=e.extend(!0,kendo.ui.List.prototype.options.messages,{clear:"clear",noData:"No data found."})),kendo.ui.DropDownList&&(kendo.ui.DropDownList.prototype.options.messages=e.extend(!0,kendo.ui.DropDownList.prototype.options.messages,kendo.ui.List.prototype.options.messages)),kendo.ui.ComboBox&&(kendo.ui.ComboBox.prototype.options.messages=e.extend(!0,kendo.ui.ComboBox.prototype.options.messages,kendo.ui.List.prototype.options.messages)),kendo.ui.AutoComplete&&(kendo.ui.AutoComplete.prototype.options.messages=e.extend(!0,kendo.ui.AutoComplete.prototype.options.messages,kendo.ui.List.prototype.options.messages)),kendo.ui.MultiColumnComboBox&&(kendo.ui.MultiColumnComboBox.prototype.options.messages=e.extend(!0,kendo.ui.MultiColumnComboBox.prototype.options.messages,kendo.ui.List.prototype.options.messages)),kendo.ui.DropDownTree&&(kendo.ui.DropDownTree.prototype.options.messages=e.extend(!0,kendo.ui.DropDownTree.prototype.options.messages,{singleTag:"item(s) selected",clear:"clear",deleteTag:"delete",noData:"No data found."})),kendo.ui.MultiSelect&&(kendo.ui.MultiSelect.prototype.options.messages=e.extend(!0,kendo.ui.MultiSelect.prototype.options.messages,{singleTag:"item(s) selected",clear:"clear",deleteTag:"delete",noData:"No data found."})),kendo.ui.Chat&&(kendo.ui.Chat.prototype.options.messages=e.extend(!0,kendo.ui.Chat.prototype.options.messages,{placeholder:"Type a message...",toggleButton:"Toggle toolbar",sendButton:"Send message"}))})?a.apply(t,s):a)||(e.exports=i)}}]);