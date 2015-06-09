webpackJsonp([16],{

/***/ 415:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */

	/* jshint browser:true */
	/* globals define: false, require: false */

	(function(f, define){
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(417), __webpack_require__(418)], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function() {

	    'use strict';

	    (function () {
	        var app = window.app || {};
	        app.cultures = app.cultures || {};
	        app.cultures.en = __webpack_require__(416);
	    }());

	    return window.app;

	}, __webpack_require__(132));


/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		"locale": "en",
		"languages": [
			{
				"value": "en",
				"name": "English",
				"icon": ""
			},
			{
				"value": "fr",
				"name": "French",
				"icon": ""
			}
		],
		"themes": [
			{
				"value": "black",
				"name": "Black",
				"colors": [
					"#0167cc",
					"#4698e9",
					"#272727"
				]
			},
			{
				"value": "blueopal",
				"name": "Blue Opal",
				"colors": [
					"#076186",
					"#7ed3f6",
					"#94c0d2"
				]
			},
			{
				"value": "bootstrap",
				"name": "Bootstrap",
				"colors": [
					"#3276b1",
					"#67afe9",
					"#fff"
				]
			},
			{
				"value": "default",
				"name": "Default",
				"colors": [
					"#ef6f1c",
					"#e24b17",
					"#5a4b43"
				]
			},
			{
				"value": "fiori",
				"name": "Fiori",
				"colors": [
					"#007cc0",
					"#e6f2f9",
					"#f0f0f0"
				]
			},
			{
				"value": "flat",
				"name": "Flat",
				"colors": [
					"#363940",
					"#2eb3a6",
					"#fff"
				]
			},
			{
				"value": "highcontrast",
				"name": "High Contrast",
				"colors": [
					"#b11e9c",
					"#880275",
					"#1b141a"
				]
			},
			{
				"value": "material",
				"name": "Material",
				"colors": [
					"#3f51b5",
					"#283593",
					"#fff"
				]
			},
			{
				"value": "materialblack",
				"name": "Material Black",
				"colors": [
					"#3f51b5",
					"#1c1c1c",
					"#4d4d4d"
				]
			},
			{
				"value": "metro",
				"name": "Metro",
				"colors": [
					"#8ebc00",
					"#787878",
					"#fff"
				]
			},
			{
				"value": "metroblack",
				"name": "Metro Black",
				"colors": [
					"#00aba9",
					"#0e0e0e",
					"#565656"
				]
			},
			{
				"value": "moonlight",
				"name": "Moonlight",
				"colors": [
					"#ee9f05",
					"#40444f",
					"#212a33"
				]
			},
			{
				"value": "office365",
				"name": "Office 365",
				"colors": [
					"#0072c6",
					"#cde6f7",
					"#fff"
				]
			},
			{
				"value": "silver",
				"name": "Silver",
				"colors": [
					"#298bc8",
					"#515967",
					"#eaeaec"
				]
			},
			{
				"value": "uniform",
				"name": "Uniform",
				"colors": [
					"#666",
					"#ccc",
					"#fff"
				]
			}
		],
		"meta": {
			"author": "Memba Sarl",
			"title": "Memba",
			"description": "Memba are the proud makers of Kidoju",
			"keywords": "Memba, Kidoju, teach, learn, knowledge, test, blog, article, documentation, ebook, video, webinar, slide",
			"category": "Miscellaneous",
			"icon": "typewriter"
		},
		"header": {
			"navbar": {
				"toggle": "Toggle navigation",
				"search": {
					"text": "Search",
					"placeholder": "Search..."
				}
			}
		},
		"footer": {
			"copyright": "Copyright &copy; 2014-2015 Memba Sarl",
			"language": {
				"label": "Language:",
				"tooltip": "Change your language."
			},
			"theme": {
				"label": "Theme:",
				"tooltip": "Change your page theme."
			}
		},
		"error": {
			"icon": "error",
			"back": "Back"
		},
		"groups": {
			"authors": {
				"icon": "users3",
				"heading": "Authors"
			},
			"calendar": {
				"icon": "calendar",
				"heading": "Calendar"
			},
			"categories": {
				"icon": "tags",
				"heading": "Categories"
			}
		},
		"home": {
			"icon": "typewriter"
		},
		"search": {
			"title": {
				"icon": "magnifying_glass",
				"heading": "Search results"
			}
		},
		"errors": {
			"generic": {
				"400": {
					"status": 400,
					"title": "400 - Bad Request",
					"message": "We are sorry, but there is something wrong in your request. The URL may be misspelled."
				},
				"404": {
					"status": 404,
					"title": "404 - Not Found",
					"message": "We are sorry, the page you requested cannot be found. The URL may be misspelled or the page you're looking for is no longer available."
				},
				"500": {
					"status": 500,
					"title": "500 - Generic Error",
					"message": "We are sorry, there has been an unknown error."
				}
			},
			"middleware": {},
			"models": {
				"contentModel": {
					"md_extension": {
						"message": "We are sorry, there has been an unknown error."
					},
					"unexpected_commits": {
						"message": "We are sorry, there has been an unknown error."
					}
				}
			},
			"routes": {
				"hookRoute": {
					"badAgent": {
						"message": "Unexpected user agent: `%s`."
					}
				}
			}
		}
	}

/***/ },

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* Kendo UI v2015.1.429 (http://www.telerik.com/kendo-ui)
	* Copyright 2015 Telerik AD. All rights reserved.
	*
	* Kendo UI commercial licenses may be obtained at
	* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
	* If you do not own a commercial license, this file shall be governed by the trial license terms.
	*/
	(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function( window, undefined ) {
	    var kendo = window.kendo || (window.kendo = { cultures: {} });
	    kendo.cultures["en-GB"] = {
	        name: "en-GB",
	        numberFormat: {
	            pattern: ["-n"],
	            decimals: 2,
	            ",": ",",
	            ".": ".",
	            groupSize: [3],
	            percent: {
	                pattern: ["-n%","n%"],
	                decimals: 2,
	                ",": ",",
	                ".": ".",
	                groupSize: [3],
	                symbol: "%"
	            },
	            currency: {
	                pattern: ["-$n","$n"],
	                decimals: 2,
	                ",": ",",
	                ".": ".",
	                groupSize: [3],
	                symbol: "£"
	            }
	        },
	        calendars: {
	            standard: {
	                days: {
	                    names: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	                    namesAbbr: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
	                    namesShort: ["Su","Mo","Tu","We","Th","Fr","Sa"]
	                },
	                months: {
	                    names: ["January","February","March","April","May","June","July","August","September","October","November","December"],
	                    namesAbbr: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
	                },
	                AM: ["AM","am","AM"],
	                PM: ["PM","pm","PM"],
	                patterns: {
	                    d: "dd/MM/yyyy",
	                    D: "dd MMMM yyyy",
	                    F: "dd MMMM yyyy HH:mm:ss",
	                    g: "dd/MM/yyyy HH:mm",
	                    G: "dd/MM/yyyy HH:mm:ss",
	                    m: "d MMMM",
	                    M: "d MMMM",
	                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
	                    t: "HH:mm",
	                    T: "HH:mm:ss",
	                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
	                    y: "MMMM yyyy",
	                    Y: "MMMM yyyy"
	                },
	                "/": "/",
	                ":": ":",
	                firstDay: 1
	            }
	        }
	    }
	})(this);


	return window.kendo;

	}, __webpack_require__(132));

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* Kendo UI v2015.1.429 (http://www.telerik.com/kendo-ui)
	* Copyright 2015 Telerik AD. All rights reserved.
	*
	* Kendo UI commercial licenses may be obtained at
	* http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
	* If you do not own a commercial license, this file shall be governed by the trial license terms.
	*/
	(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function ($, undefined) {
	/* FlatColorPicker messages */

	if (kendo.ui.FlatColorPicker) {
	kendo.ui.FlatColorPicker.prototype.options.messages =
	$.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages,{
	  "apply": "Apply",
	  "cancel": "Cancel"
	});
	}

	/* ColorPicker messages */

	if (kendo.ui.ColorPicker) {
	kendo.ui.ColorPicker.prototype.options.messages =
	$.extend(true, kendo.ui.ColorPicker.prototype.options.messages,{
	  "apply": "Apply",
	  "cancel": "Cancel"
	});
	}

	/* ColumnMenu messages */

	if (kendo.ui.ColumnMenu) {
	kendo.ui.ColumnMenu.prototype.options.messages =
	$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
	  "sortAscending": "Sort Ascending",
	  "sortDescending": "Sort Descending",
	  "filter": "Filter",
	  "columns": "Columns",
	  "done": "Done",
	  "settings": "Column Settings",
	  "lock": "Lock",
	  "unlock": "Unlock"
	});
	}

	/* Editor messages */

	if (kendo.ui.Editor) {
	kendo.ui.Editor.prototype.options.messages =
	$.extend(true, kendo.ui.Editor.prototype.options.messages,{
	  "bold": "Bold",
	  "italic": "Italic",
	  "underline": "Underline",
	  "strikethrough": "Strikethrough",
	  "superscript": "Superscript",
	  "subscript": "Subscript",
	  "justifyCenter": "Center text",
	  "justifyLeft": "Align text left",
	  "justifyRight": "Align text right",
	  "justifyFull": "Justify",
	  "insertUnorderedList": "Insert unordered list",
	  "insertOrderedList": "Insert ordered list",
	  "indent": "Indent",
	  "outdent": "Outdent",
	  "createLink": "Insert hyperlink",
	  "unlink": "Remove hyperlink",
	  "insertImage": "Insert image",
	  "insertFile": "Insert file",
	  "insertHtml": "Insert HTML",
	  "viewHtml": "View HTML",
	  "fontName": "Select font family",
	  "fontNameInherit": "(inherited font)",
	  "fontSize": "Select font size",
	  "fontSizeInherit": "(inherited size)",
	  "formatBlock": "Format",
	  "formatting": "Format",
	  "foreColor": "Color",
	  "backColor": "Background color",
	  "style": "Styles",
	  "emptyFolder": "Empty Folder",
	  "uploadFile": "Upload",
	  "orderBy": "Arrange by:",
	  "orderBySize": "Size",
	  "orderByName": "Name",
	  "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
	  "deleteFile": 'Are you sure you want to delete "{0}"?',
	  "overwriteFile": 'A file with name "{0}" already exists in the current directory. Do you want to overwrite it?',
	  "directoryNotFound": "A directory with this name was not found.",
	  "imageWebAddress": "Web address",
	  "imageAltText": "Alternate text",
	  "imageWidth": "Width (px)",
	  "imageHeight": "Height (px)",
	  "fileWebAddress": "Web address",
	  "fileTitle": "Title",
	  "linkWebAddress": "Web address",
	  "linkText": "Text",
	  "linkToolTip": "ToolTip",
	  "linkOpenInNewWindow": "Open link in new window",
	  "dialogUpdate": "Update",
	  "dialogInsert": "Insert",
	  "dialogButtonSeparator": "or",
	  "dialogCancel": "Cancel",
	  "createTable": "Create table",
	  "addColumnLeft": "Add column on the left",
	  "addColumnRight": "Add column on the right",
	  "addRowAbove": "Add row above",
	  "addRowBelow": "Add row below",
	  "deleteRow": "Delete row",
	  "deleteColumn": "Delete column"
	});
	}

	/* FileBrowser messages */

	if (kendo.ui.FileBrowser) {
	kendo.ui.FileBrowser.prototype.options.messages =
	$.extend(true, kendo.ui.FileBrowser.prototype.options.messages,{
	  "uploadFile": "Upload",
	  "orderBy": "Arrange by",
	  "orderByName": "Name",
	  "orderBySize": "Size",
	  "directoryNotFound": "A directory with this name was not found.",
	  "emptyFolder": "Empty Folder",
	  "deleteFile": 'Are you sure you want to delete "{0}"?',
	  "invalidFileType": "The selected file \"{0}\" is not valid. Supported file types are {1}.",
	  "overwriteFile": "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
	  "dropFilesHere": "drop file here to upload",
	  "search": "Search"
	});
	}

	/* FilterCell messages */

	if (kendo.ui.FilterCell) {
	kendo.ui.FilterCell.prototype.options.messages =
	$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
	  "isTrue": "is true",
	  "isFalse": "is false",
	  "filter": "Filter",
	  "clear": "Clear",
	  "operator": "Operator"
	});
	}

	/* FilterCell operators */

	if (kendo.ui.FilterCell) {
	kendo.ui.FilterCell.prototype.options.operators =
	$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
	  "string": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to",
	    "startswith": "Starts with",
	    "contains": "Contains",
	    "doesnotcontain": "Does not contain",
	    "endswith": "Ends with"
	  },
	  "number": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to",
	    "gte": "Is greater than or equal to",
	    "gt": "Is greater than",
	    "lte": "Is less than or equal to",
	    "lt": "Is less than"
	  },
	  "date": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to",
	    "gte": "Is after or equal to",
	    "gt": "Is after",
	    "lte": "Is before or equal to",
	    "lt": "Is before"
	  },
	  "enums": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to"
	  }
	});
	}

	/* FilterMenu messages */

	if (kendo.ui.FilterMenu) {
	kendo.ui.FilterMenu.prototype.options.messages =
	$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
	  "info": "Show items with value that:",
	  "isTrue": "is true",
	  "isFalse": "is false",
	  "filter": "Filter",
	  "clear": "Clear",
	  "and": "And",
	  "or": "Or",
	  "selectValue": "-Select value-",
	  "operator": "Operator",
	  "value": "Value",
	  "cancel": "Cancel"
	});
	}

	/* FilterMenu operator messages */

	if (kendo.ui.FilterMenu) {
	kendo.ui.FilterMenu.prototype.options.operators =
	$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
	  "string": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to",
	    "startswith": "Starts with",
	    "contains": "Contains",
	    "doesnotcontain": "Does not contain",
	    "endswith": "Ends with"
	  },
	  "number": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to",
	    "gte": "Is greater than or equal to",
	    "gt": "Is greater than",
	    "lte": "Is less than or equal to",
	    "lt": "Is less than"
	  },
	  "date": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to",
	    "gte": "Is after or equal to",
	    "gt": "Is after",
	    "lte": "Is before or equal to",
	    "lt": "Is before"
	  },
	  "enums": {
	    "eq": "Is equal to",
	    "neq": "Is not equal to"
	  }
	});
	}

	/* Gantt messages */

	if (kendo.ui.Gantt) {
	kendo.ui.Gantt.prototype.options.messages =
	$.extend(true, kendo.ui.Gantt.prototype.options.messages,{
	  "actions": {
	    "addChild": "Add Child",
	    "append": "Add Task",
	    "insertAfter": "Add Below",
	    "insertBefore": "Add Above",
	    "pdf": "Export to PDF"
	  },
	  "cancel": "Cancel",
	  "deleteDependencyWindowTitle": "Delete dependency",
	  "deleteTaskWindowTitle": "Delete task",
	  "destroy": "Delete",
	  "editor": {
	    "assingButton": "Assign",
	    "editorTitle": "Task",
	    "end": "End",
	    "percentComplete": "Complete",
	    "resources": "Resources",
	    "resourcesEditorTitle": "Resources",
	    "resourcesHeader": "Resources",
	    "start": "Start",
	    "title": "Title",
	    "unitsHeader": "Units"
	  },
	  "save": "Save",
	  "views": {
	    "day": "Day",
	    "end": "End",
	    "month": "Month",
	    "start": "Start",
	    "week": "Week",
	    "year": "Year"
	  }
	});
	}

	/* Grid messages */

	if (kendo.ui.Grid) {
	kendo.ui.Grid.prototype.options.messages =
	$.extend(true, kendo.ui.Grid.prototype.options.messages,{
	  "commands": {
	    "cancel": "Cancel changes",
	    "canceledit": "Cancel",
	    "create": "Add new record",
	    "destroy": "Delete",
	    "edit": "Edit",
	    "save": "Save changes",
	    "select": "Select",
	    "update": "Update"
	  },
	  "editable": {
	    "cancelDelete": "Cancel",
	    "confirmation": "Are you sure you want to delete this record?",
	    "confirmDelete": "Delete"
	  }
	});
	}

	/* Groupable messages */

	if (kendo.ui.Groupable) {
	kendo.ui.Groupable.prototype.options.messages =
	$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
	  "empty": "Drag a column header and drop it here to group by that column"
	});
	}

	/* NumericTextBox messages */

	if (kendo.ui.NumericTextBox) {
	kendo.ui.NumericTextBox.prototype.options =
	$.extend(true, kendo.ui.NumericTextBox.prototype.options,{
	  "upArrowText": "Increase value",
	  "downArrowText": "Decreate value"
	});
	}

	/* Pager messages */

	if (kendo.ui.Pager) {
	kendo.ui.Pager.prototype.options.messages =
	$.extend(true, kendo.ui.Pager.prototype.options.messages,{
	  "display": "{0} - {1} of {2} items",
	  "empty": "No items to display",
	  "page": "Page",
	  "of": "of {0}",
	  "itemsPerPage": "items per page",
	  "first": "Go to the first page",
	  "previous": "Go to the previous page",
	  "next": "Go to the next page",
	  "last": "Go to the last page",
	  "refresh": "Refresh",
	  "morePages": "More pages"
	});
	}

	/* PivotGrid messages */

	if (kendo.ui.PivotGrid) {
	kendo.ui.PivotGrid.prototype.options.messages =
	$.extend(true, kendo.ui.PivotGrid.prototype.options.messages,{
	  "measureFields": "Drop Data Fields Here",
	  "columnFields": "Drop Column Fields Here",
	  "rowFields": "Drop Rows Fields Here"
	});
	}

	/* PivotFieldMenu messages */

	if (kendo.ui.PivotFieldMenu) {
	kendo.ui.PivotFieldMenu.prototype.options.messages =
	$.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages,{
	  "info": "Show items with value that:",
	  "filterFields": "Fields Filter",
	  "filter": "Filter",
	  "include": "Include Fields...",
	  "title": "Fields to include",
	  "clear": "Clear",
	  "ok": "Ok",
	  "cancel": "Cancel",
	  "operators": {
	    "contains": "Contains",
	    "doesnotcontain": "Does not contain",
	    "startswith": "Starts with",
	    "endswith": "Ends with",
	    "eq": "Is equal to",
	    "neq": "Is not equal to"
	  }
	});
	}

	/* RecurrenceEditor messages */

	if (kendo.ui.RecurrenceEditor) {
	kendo.ui.RecurrenceEditor.prototype.options.messages =
	$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
	  "frequencies": {
	    "never": "Never",
	    "hourly": "Hourly",
	    "daily": "Daily",
	    "weekly": "Weekly",
	    "monthly": "Monthly",
	    "yearly": "Yearly"
	  },
	  "hourly": {
	    "repeatEvery": "Repeat every: ",
	    "interval": " hour(s)"
	  },
	  "daily": {
	    "repeatEvery": "Repeat every: ",
	    "interval": " day(s)"
	  },
	  "weekly": {
	    "interval": " week(s)",
	    "repeatEvery": "Repeat every: ",
	    "repeatOn": "Repeat on: "
	  },
	  "monthly": {
	    "repeatEvery": "Repeat every: ",
	    "repeatOn": "Repeat on: ",
	    "interval": " month(s)",
	    "day": "Day "
	  },
	  "yearly": {
	    "repeatEvery": "Repeat every: ",
	    "repeatOn": "Repeat on: ",
	    "interval": " year(s)",
	    "of": " of "
	  },
	  "end": {
	    "label": "End:",
	    "mobileLabel": "Ends",
	    "never": "Never",
	    "after": "After ",
	    "occurrence": " occurrence(s)",
	    "on": "On "
	  },
	  "offsetPositions": {
	    "first": "first",
	    "second": "second",
	    "third": "third",
	    "fourth": "fourth",
	    "last": "last"
	  },
	  "weekdays": {
	    "day": "day",
	    "weekday": "weekday",
	    "weekend": "weekend day"
	  }
	});
	}

	/* Scheduler messages */

	if (kendo.ui.Scheduler) {
	kendo.ui.Scheduler.prototype.options.messages =
	$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
	  "allDay": "all day",
	  "date": "Date",
	  "event": "Event",
	  "time": "Time",
	  "showFullDay": "Show full day",
	  "showWorkDay": "Show business hours",
	  "today": "Today",
	  "save": "Save",
	  "cancel": "Cancel",
	  "destroy": "Delete",
	  "deleteWindowTitle": "Delete event",
	  "ariaSlotLabel": "Selected from {0:t} to {1:t}",
	  "ariaEventLabel": "{0} on {1:D} at {2:t}",
	  "editable": {
	    "confirmation": "Are you sure you want to delete this event?"
	  },
	  "views": {
	    "day": "Day",
	    "week": "Week",
	    "workWeek": "Work Week",
	    "agenda": "Agenda",
	    "month": "Month"
	  },
	  "recurrenceMessages": {
	    "deleteWindowTitle": "Delete Recurring Item",
	    "deleteWindowOccurrence": "Delete current occurrence",
	    "deleteWindowSeries": "Delete the series",
	    "editWindowTitle": "Edit Recurring Item",
	    "editWindowOccurrence": "Edit current occurrence",
	    "editWindowSeries": "Edit the series",
	    "deleteRecurring": "Do you want to delete only this event occurrence or the whole series?",
	    "editRecurring": "Do you want to edit only this event occurrence or the whole series?"
	  },
	  "editor": {
	    "title": "Title",
	    "start": "Start",
	    "end": "End",
	    "allDayEvent": "All day event",
	    "description": "Description",
	    "repeat": "Repeat",
	    "timezone": " ",
	    "startTimezone": "Start timezone",
	    "endTimezone": "End timezone",
	    "separateTimezones": "Use separate start and end time zones",
	    "timezoneEditorTitle": "Timezones",
	    "timezoneEditorButton": "Time zone",
	    "timezoneTitle": "Time zones",
	    "noTimezone": "No timezone",
	    "editorTitle": "Event"
	  }
	});
	}

	/* Slider messages */

	if (kendo.ui.Slider) {
	kendo.ui.Slider.prototype.options =
	$.extend(true, kendo.ui.Slider.prototype.options,{
	  "increaseButtonTitle": "Increase",
	  "decreaseButtonTitle": "Decrease"
	});
	}

	/* TreeView messages */

	if (kendo.ui.TreeView) {
	kendo.ui.TreeView.prototype.options.messages =
	$.extend(true, kendo.ui.TreeView.prototype.options.messages,{
	  "loading": "Loading...",
	  "requestFailed": "Request failed.",
	  "retry": "Retry"
	});
	}

	/* Upload messages */

	if (kendo.ui.Upload) {
	kendo.ui.Upload.prototype.options.localization=
	$.extend(true, kendo.ui.Upload.prototype.options.localization,{
	  "select": "Select files...",
	  "cancel": "Cancel",
	  "retry": "Retry",
	  "remove": "Remove",
	  "uploadSelectedFiles": "Upload files",
	  "dropFilesHere": "drop files here to upload",
	  "statusUploading": "uploading",
	  "statusUploaded": "uploaded",
	  "statusWarning": "warning",
	  "statusFailed": "failed",
	  "headerStatusUploading": "Uploading...",
	  "headerStatusUploaded": "Done"
	});
	}

	/* Validator messages */

	if (kendo.ui.Validator) {
	kendo.ui.Validator.prototype.options.messages =
	$.extend(true, kendo.ui.Validator.prototype.options.messages,{
	  "required": "{0} is required",
	  "pattern": "{0} is not valid",
	  "min": "{0} should be greater than or equal to {1}",
	  "max": "{0} should be smaller than or equal to {1}",
	  "step": "{0} is not valid",
	  "email": "{0} is not valid email",
	  "url": "{0} is not valid URL",
	  "date": "{0} is not valid date",
	  "dateCompare": "End date should be greater than or equal to the start date"
	});
	}
	})(window.kendo.jQuery);


	return window.kendo;

	}, __webpack_require__(132));

/***/ }

});