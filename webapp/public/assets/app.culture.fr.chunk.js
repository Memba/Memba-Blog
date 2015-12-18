webpackJsonp([2],{

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
	 * Sources at https://github.com/Memba
	 */
	
	/* jshint browser:true */
	/* globals define: false, require: false */
	
	(function (f, define) {
	    'use strict';
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(213),
	        __webpack_require__(214)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function () {
	
	    'use strict';
	
	    (function () {
	        var app = window.app = window.app || {};
	        app.cultures = app.cultures || {};
	        app.cultures.fr = __webpack_require__(215);
	        window.kendo.culture('fr-FR');
	    }());
	
	    return window.app;
	
	}, __webpack_require__(201));


/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* Kendo UI v2015.3.1111 (http://www.telerik.com/kendo-ui)
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
	    kendo.cultures["fr-FR"] = {
	        name: "fr-FR",
	        numberFormat: {
	            pattern: ["-n"],
	            decimals: 2,
	            ",": " ",
	            ".": ",",
	            groupSize: [3],
	            percent: {
	                pattern: ["-n %","n %"],
	                decimals: 2,
	                ",": " ",
	                ".": ",",
	                groupSize: [3],
	                symbol: "%"
	            },
	            currency: {
	                name: "Euro",
	                abbr: "EUR",
	                pattern: ["-n $","n $"],
	                decimals: 2,
	                ",": " ",
	                ".": ",",
	                groupSize: [3],
	                symbol: "€"
	            }
	        },
	        calendars: {
	            standard: {
	                days: {
	                    names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
	                    namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
	                    namesShort: ["di","lu","ma","me","je","ve","sa"]
	                },
	                months: {
	                    names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
	                    namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]
	                },
	                AM: [""],
	                PM: [""],
	                patterns: {
	                    d: "dd/MM/yyyy",
	                    D: "dddd d MMMM yyyy",
	                    F: "dddd d MMMM yyyy HH:mm:ss",
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
	
	}, __webpack_require__(201));

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* Kendo UI v2015.3.1111 (http://www.telerik.com/kendo-ui)
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
	/* Filter cell operator messages */
	
	if (kendo.ui.FilterCell) {
	kendo.ui.FilterCell.prototype.options.operators =
	$.extend(true, kendo.ui.FilterCell.prototype.options.operators,{
	  "date": {
	    "eq": "Est égal à",
	    "gte": "Est postérieur ou égal à",
	    "gt": "Est postérieur",
	    "lte": "Est antérieur ou égal à",
	    "lt": "Est antérieur",
	    "neq": "N’est pas égal à"
	  },
	  "number": {
	    "eq": "Est égal à",
	    "gte": "Est supérieur ou égal à",
	    "gt": "Est supérieur à",
	    "lte": "Est inférieur ou égal à",
	    "lt": "Est inférieur à",
	    "neq": "N’est pas égal à"
	  },
	  "string": {
	    "endswith": "Se termine par",
	    "eq": "Est égal à",
	    "neq": "N’est pas égal à",
	    "startswith": "Commence par",
	    "contains": "Contient",
	    "doesnotcontain": "Ne contient pas"
	  },
	  "enums": {
	    "eq": "Est égal à",
	    "neq": "N’est pas égal à"
	  }
	});
	}
	
	/* Filter menu operator messages */
	
	if (kendo.ui.FilterMenu) {
	kendo.ui.FilterMenu.prototype.options.operators =
	$.extend(true, kendo.ui.FilterMenu.prototype.options.operators,{
	  "date": {
	    "eq": "Est égal à",
	    "gte": "Est postérieur ou égal à",
	    "gt": "Est postérieur",
	    "lte": "Est antérieur ou égal à",
	    "lt": "Est antérieur",
	    "neq": "N’est pas égal à"
	  },
	  "number": {
	    "eq": "Est égal à",
	    "gte": "Est supérieur ou égal à",
	    "gt": "Est supérieur à",
	    "lte": "Est inférieur ou égal à",
	    "lt": "Est inférieur à",
	    "neq": "N’est pas égal à"
	  },
	  "string": {
	    "endswith": "Se termine par",
	    "eq": "Est égal à",
	    "neq": "N’est pas égal à",
	    "startswith": "Commence par",
	    "contains": "Contient",
	    "doesnotcontain": "Ne contient pas"
	  },
	  "enums": {
	    "eq": "Est égal à",
	    "neq": "N’est pas égal à"
	  }
	});
	}
	
	/* ColumnMenu messages */
	
	if (kendo.ui.ColumnMenu) {
	kendo.ui.ColumnMenu.prototype.options.messages =
	$.extend(true, kendo.ui.ColumnMenu.prototype.options.messages,{
	  "columns": "Colonnes",
	  "sortAscending": "Tri croissant",
	  "sortDescending": "Tri décroissant",
	  "settings": "Paramètres de colonne",
	  "done": "Done",
	  "lock": "Bloquer",
	  "unlock": "Ouvrir"
	});
	}
	
	/* RecurrenceEditor messages */
	
	if (kendo.ui.RecurrenceEditor) {
	kendo.ui.RecurrenceEditor.prototype.options.messages =
	$.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages,{
	  "daily": {
	    "interval": "jour(s)",
	    "repeatEvery": "Répéter chaque:"
	  },
	  "end": {
	    "after": " Après",
	    "occurrence": "occurrence(s)",
	    "label": "Finir:",
	    "never": "Jamais",
	    "on": "Sur",
	    "mobileLabel": "Ends"
	  },
	  "frequencies": {
	    "daily": "Une fois par jour",
	    "monthly": "Une fois par mois",
	    "never": "Jamais",
	    "weekly": "Une fois par semaine",
	    "yearly": "Une fois par an"
	  },
	  "monthly": {
	    "day": "Jour",
	    "interval": "mois",
	    "repeatEvery": "Répéter chaque:",
	    "repeatOn": "Répéter l'opération sur:"
	  },
	  "offsetPositions": {
	    "first": "premier",
	    "fourth": "quatrième",
	    "last": "dernier",
	    "second": "second",
	    "third": "troisième"
	  },
	  "weekly": {
	    "repeatEvery": "Répéter chaque:",
	    "repeatOn": "Répéter l'opération sur:",
	    "interval": "semaine(s)"
	  },
	  "yearly": {
	    "of": "de",
	    "repeatEvery": "Répéter chaque:",
	    "repeatOn": "Répéter l'opération sur:",
	    "interval": "année(ans)"
	  },
	  "weekdays": {
	    "day": "jour",
	    "weekday": "jour de la semaine",
	    "weekend": "jour de week-end"
	  }
	});
	}
	
	/* Grid messages */
	
	if (kendo.ui.Grid) {
	kendo.ui.Grid.prototype.options.messages =
	$.extend(true, kendo.ui.Grid.prototype.options.messages,{
	  "commands": {
	    "create": "Insérer",
	    "destroy": "Effacer",
	    "canceledit": "Annuler",
	    "update": "Mettre à jour",
	    "edit": "Éditer",
	    "excel": "Export to Excel",
	    "pdf": "Export to PDF",
	    "select": "Sélectionner",
	    "cancel": "Annuler les modifications",
	    "save": "Enregistrer les modifications"
	  },
	  "editable": {
	    "confirmation": "Êtes-vous sûr de vouloir supprimer cet enregistrement?",
	    "cancelDelete": "Annuler",
	    "confirmDelete": "Effacer"
	  },
	  "noRecords": "Aucun enregistrement disponible."
	});
	}
	
	/* Pager messages */
	
	if (kendo.ui.Pager) {
	kendo.ui.Pager.prototype.options.messages =
	$.extend(true, kendo.ui.Pager.prototype.options.messages,{
	  "allPages": "All",
	  "page": "Page",
	  "display": "Afficher les items {0} - {1} de {2}",
	  "of": "de {0}",
	  "empty": "Aucun enregistrement à afficher.",
	  "refresh": "Actualiser",
	  "first": "Aller à la première page",
	  "itemsPerPage": "articles par page",
	  "last": "Aller à la dernière page",
	  "next": "Aller à la page suivante",
	  "previous": "Aller à la page précédente",
	  "morePages": "Plusieurs pages"
	});
	}
	
	/* FilterCell messages */
	
	if (kendo.ui.FilterCell) {
	kendo.ui.FilterCell.prototype.options.messages =
	$.extend(true, kendo.ui.FilterCell.prototype.options.messages,{
	  "filter": "Filtrer",
	  "clear": "Effacer filtre",
	  "isFalse": "est fausse",
	  "isTrue": "est vrai",
	  "operator": "Opérateur"
	});
	}
	
	/* FilterMenu messages */
	
	if (kendo.ui.FilterMenu) {
	kendo.ui.FilterMenu.prototype.options.messages =
	$.extend(true, kendo.ui.FilterMenu.prototype.options.messages,{
	  "filter": "Filtrer",
	  "and": "Et",
	  "clear": "Effacer filtre",
	  "info": "Afficher les lignes avec la valeur qui",
	  "selectValue": "-Sélectionner-",
	  "isFalse": "est fausse",
	  "isTrue": "est vrai",
	  "or": "Ou",
	  "cancel": "Annuler",
	  "operator": "Opérateur",
	  "value": "Valeur"
	});
	}
	
	/* FilterMultiCheck messages */
	
	if (kendo.ui.FilterMultiCheck) {
	kendo.ui.FilterMultiCheck.prototype.options.messages =
	$.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages,{
	  "checkAll": "Choisir toutes",
	  "clear": "Effacer filtre",
	  "filter": "Filtrer"
	});
	}
	
	/* Groupable messages */
	
	if (kendo.ui.Groupable) {
	kendo.ui.Groupable.prototype.options.messages =
	$.extend(true, kendo.ui.Groupable.prototype.options.messages,{
	  "empty": "Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."
	});
	}
	
	/* Editor messages */
	
	if (kendo.ui.Editor) {
	kendo.ui.Editor.prototype.options.messages =
	$.extend(true, kendo.ui.Editor.prototype.options.messages,{
	  "bold": "Gras",
	  "createLink": "Insérer un lien hypertexte",
	  "fontName": "Police",
	  "fontNameInherit": "(police héritée)",
	  "fontSize": "Taille de police",
	  "fontSizeInherit": "(taille héritée)",
	  "formatBlock": "Style du paragraphe",
	  "indent": "Augmenter le retrait",
	  "insertHtml": "Insérer HTML",
	  "insertImage": "Insérer image",
	  "insertOrderedList": "Liste numérotée",
	  "insertUnorderedList": "Liste à puces",
	  "italic": "Italique",
	  "justifyCenter": "Centrer",
	  "justifyFull": "Justifier",
	  "justifyLeft": "Aligner le texte à gauche",
	  "justifyRight": "Aligner le texte à droite",
	  "outdent": "Diminuer le retrait",
	  "strikethrough": "Barré",
	  "styles": "Styles",
	  "subscript": "Subscript",
	  "superscript": "Superscript",
	  "underline": "Souligné",
	  "unlink": "Supprimer le lien hypertexte",
	  "deleteFile": "Êtes-vous sûr de vouloir supprimer \"{0}\"?",
	  "directoryNotFound": "Un répertoire avec ce nom n'a pas été trouvé.",
	  "emptyFolder": "Vider le dossier",
	  "invalidFileType": "Le fichier sélectionné \"{0}\" n'est pas valide. Les types de fichiers supportés sont {1}.",
	  "orderBy": "Organiser par:",
	  "orderByName": "Nom",
	  "orderBySize": "Taille",
	  "overwriteFile": "Un fichier avec le nom \"{0}\" existe déjà dans le répertoire courant. Voulez-vous le remplacer?",
	  "uploadFile": "Télécharger",
	  "backColor": "Couleur de fond",
	  "foreColor": "Couleur",
	  "dialogButtonSeparator": "Ou",
	  "dialogCancel": "Fermer",
	  "dialogInsert": "Insérer",
	  "imageAltText": "Le texte de remplacement",
	  "imageWebAddress": "Adresse Web",
	  "imageWidth": "Largeur (px)",
	  "imageHeight": "Hauteur (px)",
	  "linkOpenInNewWindow": "Ouvrir dans une nouvelle fenêtre",
	  "linkText": "Text",
	  "linkToolTip": "Info-bulle",
	  "linkWebAddress": "Adresse Web",
	  "search": "Search",
	  "createTable": "Insérer un tableau",
	  "addColumnLeft": "Add column on the left",
	  "addColumnRight": "Add column on the right",
	  "addRowAbove": "Add row above",
	  "addRowBelow": "Add row below",
	  "deleteColumn": "Delete column",
	  "deleteRow": "Delete row",
	  "dropFilesHere": "drop files here to upload",
	  "formatting": "Format",
	  "viewHtml": "View HTML",
	  "dialogUpdate": "Update",
	  "insertFile": "Insert file"
	});
	}
	
	/* FileBrowser and ImageBrowser messages */
	
	var browserMessages = {
	  "uploadFile" : "Charger",
	  "orderBy" : "Trier par",
	  "orderByName" : "Nom",
	  "orderBySize" : "Taille",
	  "directoryNotFound" : "Aucun répértoire de ce nom.",
	  "emptyFolder" : "Répertoire vide",
	  "deleteFile" : 'Etes-vous sûr de vouloir supprimer "{0}"?',
	  "invalidFileType" : "Le fichier sélectionné \"{0}\" n'est pas valide. Les type fichiers supportés sont {1}.",
	  "overwriteFile" : "Un fichier du nom \"{0}\" existe déjà dans ce répertoire. Voulez-vous le remplacer?",
	  "dropFilesHere" : "glissez les fichiers ici pour les charger",
	  "search" : "Recherche"
	};
	
	if (kendo.ui.FileBrowser) {
	kendo.ui.FileBrowser.prototype.options.messages =
	$.extend(true, kendo.ui.FileBrowser.prototype.options.messages, browserMessages);
	}
	
	if (kendo.ui.ImageBrowser) {
	kendo.ui.ImageBrowser.prototype.options.messages =
	$.extend(true, kendo.ui.ImageBrowser.prototype.options.messages, browserMessages);
	}
	
	
	/* Upload messages */
	
	if (kendo.ui.Upload) {
	kendo.ui.Upload.prototype.options.localization =
	$.extend(true, kendo.ui.Upload.prototype.options.localization,{
	  "cancel": "Annuler",
	  "dropFilesHere": "déposer les fichiers à télécharger ici",
	  "remove": "Retirer",
	  "retry": "Réessayer",
	  "select": "Sélectionner...",
	  "statusFailed": "échoué",
	  "statusUploaded": "téléchargé",
	  "statusUploading": "téléchargement",
	  "uploadSelectedFiles": "Télécharger des fichiers",
	  "headerStatusUploaded": "Done",
	  "headerStatusUploading": "Uploading..."
	});
	}
	
	/* Scheduler messages */
	
	if (kendo.ui.Scheduler) {
	kendo.ui.Scheduler.prototype.options.messages =
	$.extend(true, kendo.ui.Scheduler.prototype.options.messages,{
	  "allDay": "toute la journée",
	  "cancel": "Annuler",
	  "editable": {
	    "confirmation": "Etes-vous sûr de vouloir supprimer cet élément?"
	  },
	  "date": "Date",
	  "destroy": "Effacer",
	  "editor": {
	    "allDayEvent": "Toute la journée",
	    "description": "Description",
	    "editorTitle": "Event",
	    "end": "Fin",
	    "endTimezone": "End timezone",
	    "repeat": "Répéter",
	    "separateTimezones": "Use separate start and end time zones",
	    "start": "Début",
	    "startTimezone": "Start timezone",
	    "timezone": " ",
	    "timezoneEditorButton": "Time zone",
	    "timezoneEditorTitle": "Timezones",
	    "title": "Titre",
	    "noTimezone": "No timezone"
	  },
	  "event": "Event",
	  "recurrenceMessages": {
	    "deleteRecurring": "Voulez-vous supprimer seulement cet événement ou toute la série?",
	    "deleteWindowOccurrence": "Suppression de l'élément courant",
	    "deleteWindowSeries": "Suppression de toute la série",
	    "deleteWindowTitle": "Suppression d'un élément récurrent",
	    "editRecurring": "Do you want to edit only this event occurrence or the whole series?",
	    "editWindowOccurrence": "Edit current occurrence",
	    "editWindowSeries": "Edit the series",
	    "editWindowTitle": "Edit Recurring Item"
	  },
	  "save": "Sauvegarder",
	  "time": "Time",
	  "today": "Aujourd'hui",
	  "views": {
	    "agenda": "Agenda",
	    "day": "Jour",
	    "month": "Mois",
	    "week": "Semaine",
	    "workWeek": "Work Week"
	  },
	  "deleteWindowTitle": "Suppression de l'élément",
	  "showFullDay": "Montrer toute la journée",
	  "showWorkDay": "Montrer les heures ouvrables"
	});
	}
	})(window.kendo.jQuery);
	
	
	return window.kendo;
	
	}, __webpack_require__(201));

/***/ },

/***/ 215:
/***/ function(module, exports) {

	module.exports = {
		"locale": "fr",
		"languages": [
			{
				"value": "en",
				"name": "Anglais",
				"icon": ""
			},
			{
				"value": "fr",
				"name": "Français",
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
				"value": "nova",
				"name": "Nova",
				"colors": [
					"#32364c",
					"#ff4350",
					"#dfe0e1"
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
			"description": "Nous sommes les créateurs de Kidoju",
			"keywords": "Kidoju - Une nouvelle façon d'enseigner et d'apprendre",
			"category": "Divers",
			"icon": "typewriter"
		},
		"header": {
			"navbar": {
				"toggle": "Changer la navigation",
				"search": {
					"text": "Rechercher",
					"placeholder": "Recherche..."
				}
			}
		},
		"footer": {
			"copyright": "Copyright &copy; 2014-2015 Memba Sarl",
			"language": {
				"label": "Langue:",
				"tooltip": "Changez votre langue."
			},
			"theme": {
				"label": "Thème:",
				"tooltip": "Changez le thème de votre page."
			}
		},
		"home": {},
		"error": {
			"icon": "error",
			"back": "Retour"
		},
		"groups": {
			"authors": {
				"icon": "users3",
				"heading": "Auteurs"
			},
			"calendar": {
				"icon": "calendar",
				"heading": "Calendrier"
			},
			"categories": {
				"icon": "tags",
				"heading": "Catégories"
			}
		},
		"search": {
			"title": {
				"icon": "magnifying_glass",
				"heading": "Résultats de recherche"
			}
		},
		"errors": {
			"http": {
				"400": {
					"status": 400,
					"title": "400 - Mauvaise Requête",
					"message": "Désolé, mais votre requête est mal formulée. L'URL est peut-être mal ortographiée."
				},
				"401": {
					"status": 401,
					"title": "401 - Non autorisé",
					"message": "Désolé, mais votre requête n'est pas autorisée."
				},
				"403": {
					"status": 403,
					"title": "403 - Forbidden",
					"message": "Désolé, mais votre requête est interdite."
				},
				"404": {
					"status": 404,
					"title": "404 - Introuvable",
					"message": "Désolé, mais la page demandée est introuvable. L'URL est peut-être mal ortographiée ou la page que vous recherchez n'est peut-être plus disponible."
				},
				"500": {
					"status": 500,
					"title": "500 - Erreur Inconnue",
					"message": "Il y a eu une erreur inconnue. Si nous arrivons à la reproduire, nous la corrigerons avec amour et attention."
				}
			},
			"mongoose": {
				"validation": {
					"status": 400,
					"message": "Database validation error"
				}
			},
			"params": {
				"invalidObjectId": {
					"status": 400,
					"message": "Invalid object identifier: an identifier is an hexadecimal string of 24 characters"
				},
				"invalidLanguage": {
					"status": 400,
					"message": "Invalid language: this language is not implemented"
				},
				"invalidProvider": {
					"status": 400,
					"message": "Invalid provider: use `facebook`, `google`, `live` or `twitter`"
				},
				"invalidMonth": {
					"status": 400,
					"message": "Invalid month: use a two-digit number between 01 and 12"
				},
				"invalidYear": {
					"status": 400,
					"message": "Invalid year: use a four-digit number between 2014 and the current year"
				}
			},
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
						"message": "Agent utilisateur inconnu: `%s`."
					}
				}
			}
		}
	};

/***/ }

});
//# sourceMappingURL=app.culture.fr.chunk.js.map