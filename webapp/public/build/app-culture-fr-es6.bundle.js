/*! Copyright ©2013-2019 Memba® Sarl. All rights reserved. - Version 0.3.8 dated 01-Aug-2019 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-culture-fr-es6"],{

/***/ "./src/js/cultures/app.culture.fr.es6":
/*!********************************************!*\
  !*** ./src/js/cultures/app.culture.fr.es6 ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webapp_locales_fr_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../webapp/locales/fr.json */ "./webapp/locales/fr.json");
var _webapp_locales_fr_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../../webapp/locales/fr.json */ "./webapp/locales/fr.json", 1);
/* harmony import */ var _vendor_kendo_cultures_kendo_culture_fr_FR__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vendor/kendo/cultures/kendo.culture.fr-FR */ "./src/js/vendor/kendo/cultures/kendo.culture.fr-FR.js");
/* harmony import */ var _vendor_kendo_cultures_kendo_culture_fr_FR__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vendor_kendo_cultures_kendo_culture_fr_FR__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _vendor_kendo_messages_kendo_messages_fr_FR__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../vendor/kendo/messages/kendo.messages.fr-FR */ "./src/js/vendor/kendo/messages/kendo.messages.fr-FR.js");
/* harmony import */ var _vendor_kendo_messages_kendo_messages_fr_FR__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_vendor_kendo_messages_kendo_messages_fr_FR__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _widgets_fr_es6__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widgets.fr.es6 */ "./src/js/cultures/widgets.fr.es6");
/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/**
 * Application resources
 */

/**
 * Kendo UI resources
 */




window.kendo.culture('fr-FR');
/**
 * Default export
 */

/* harmony default export */ __webpack_exports__["default"] = ({
  webapp: _webapp_locales_fr_json__WEBPACK_IMPORTED_MODULE_0__
});

/***/ }),

/***/ "./src/js/cultures/widgets.fr.es6":
/*!****************************************!*\
  !*** ./src/js/cultures/widgets.fr.es6 ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */
// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved


if (window.kendo && window.kendo.ui) {
  window.kendo.ex = window.kendo.ex || {};
  var _window$kendo = window.kendo,
      _window$kendo$ex = _window$kendo.ex,
      markeditor = _window$kendo$ex.markeditor,
      mathinput = _window$kendo$ex.mathinput,
      _window$kendo$ui = _window$kendo.ui,
      AssetManager = _window$kendo$ui.AssetManager,
      BaseDialog = _window$kendo$ui.BaseDialog,
      BasicList = _window$kendo$ui.BasicList,
      CodeEditor = _window$kendo$ui.CodeEditor,
      Explorer = _window$kendo$ui.Explorer,
      ImageList = _window$kendo$ui.ImageList,
      MarkEditor = _window$kendo$ui.MarkEditor,
      MediaPlayer = _window$kendo$ui.MediaPlayer,
      MultiInput = _window$kendo$ui.MultiInput,
      MultiQuiz = _window$kendo$ui.MultiQuiz,
      Navigation = _window$kendo$ui.Navigation,
      PlayBar = _window$kendo$ui.PlayBar,
      PropertyGrid = _window$kendo$ui.PropertyGrid,
      Quiz = _window$kendo$ui.Quiz,
      Social = _window$kendo$ui.Social,
      Stage = _window$kendo$ui.Stage,
      StyleEditor = _window$kendo$ui.StyleEditor;
  /* widgets.assetmanager */

  if (AssetManager) {
    var options = AssetManager.prototype.options;
    options.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, options.messages, {
      toolbar: {
        upload: 'Mettre en ligne',
        // comme sur Youtube.fr
        delete: 'Supprimer',
        filter: 'Collection: ',
        search: 'Recherche'
      },
      tabs: {
        default: 'Projet'
      },
      data: {
        defaultName: 'Chargement...',
        defaultImage: '' // TODO

      }
    });
  }
  /* widgets.basedialog */


  if (BaseDialog) {
    var _options = BaseDialog.prototype.options;
    _options.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options.messages, {
      title: {
        error: 'Erreur',
        info: 'Information',
        success: 'Succès',
        warning: 'Avertissement'
      },
      actions: {
        cancel: {
          action: 'cancel',
          imageUrl: 'https://cdn.kidoju.com/images/o_collection/svg/office/close.svg',
          text: 'Annuler'
        },
        close: {
          action: 'close',
          imageUrl: 'https://cdn.kidoju.com/images/o_collection/svg/office/close.svg',
          primary: true,
          text: 'Fermer'
        },
        create: {
          action: 'create',
          imageUrl: 'https://cdn.kidoju.com/images/o_collection/svg/office/plus.svg',
          primary: true,
          text: 'Créer'
        },
        no: {
          action: 'no',
          imageUrl: 'https://cdn.kidoju.com/images/o_collection/svg/office/close.svg',
          text: 'Non'
        },
        ok: {
          action: 'ok',
          imageUrl: 'https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg',
          primary: true,
          text: 'OK'
        },
        yes: {
          action: 'yes',
          imageUrl: 'https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg',
          primary: true,
          text: 'Oui'
        }
      }
    });
  }
  /* widgets.basiclist */


  if (BasicList) {
    var _options2 = BasicList.prototype.options;
    _options2.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options2.messages, {
      toolbar: {
        add: 'Ajouter'
      },
      validation: {
        text: 'Une valeur est requise.'
      }
    });
  }
  /* widgets.codeeditor */


  if (CodeEditor) {
    var _options3 = CodeEditor.prototype.options;
    _options3.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options3.messages, {
      formula: 'Formule:',
      notApplicable: 'N/A',
      solution: 'Solution:',
      params: 'Params:',
      value: 'Valeur:',
      test: 'Test',
      success: 'Succès',
      failure: 'Échec',
      omit: 'Omission',
      error: 'Erreur'
    });
  }
  /* widgets.explorer */


  if (Explorer) {
    var _options4 = Explorer.prototype.options;
    _options4.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options4.messages, {
      empty: 'Rien à afficher'
    });
  }
  /* widgets.imagelist */


  if (ImageList) {
    var _options5 = ImageList.prototype.options;
    _options5.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options5.messages, {
      toolbar: {
        add: 'Ajouter'
      },
      validation: {
        text: 'Un texte alternatif de 1 à 100 caractères est requis.',
        url: 'Une url d’image est requise.'
      }
    });
  }
  /* widgets.markeditor */


  if (MarkEditor) {
    var _options6 = MarkEditor.prototype.options;
    _options6.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options6.messages, {
      image: 'Une image sans description',
      link: 'Cliquez ici'
    });
  }

  if (markeditor && markeditor.messages.dialogs) {
    markeditor.messages.dialogs = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, markeditor.messages.dialogs, {
      cancel: '<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/close.svg" class="k-image">Annuler',
      okText: '<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg" class="k-image">OK',
      headingsDialog: {
        title: 'Titres',
        buttons: {
          h1: 'Titre 1',
          h2: 'Heading 2',
          h3: 'Heading 3',
          h4: 'Heading 4',
          h5: 'Heading 5',
          h6: 'Heading 6'
        }
      },
      linkDialog: {
        title: 'Hyperlien',
        labels: {
          text: 'Url'
        }
      },
      imageDialog: {
        title: 'Image',
        labels: {
          url: 'Url'
        }
      },
      latexDialog: {
        title: 'Expression Mathématique',
        labels: {
          display: 'Affichage',
          inline: 'en ligne'
        }
      },
      previewDialog: {
        title: 'Aperçu'
      }
    });
  }

  if (markeditor && markeditor.messages.toolbar) {
    markeditor.messages.toolbar = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, markeditor.messages.toolbar, {
      undo: 'Annuler',
      redo: 'Rétablir',
      headings: 'Titres',
      headingsButtons: {
        h1: 'Titre 1',
        h2: 'Titre 2',
        h3: 'Titre 3',
        h4: 'Titre 4',
        h5: 'Titre 5',
        h6: 'Titre 6'
      },
      bold: 'Gras',
      italic: 'Italique',
      bulleted: 'Liste à Puces',
      numbered: 'Liste Numérotée',
      blockquote: 'Bloc de Citation',
      hrule: 'Ligne Horizontale',
      link: 'Hyperlien',
      image: 'Image',
      code: 'Code',
      latex: 'Expression Mathématique',
      preview: 'Aperçu dans une Fenêtre'
    });
  }
  /* widgets.mathinput */


  if (mathinput && mathinput.messages.dialogs) {
    mathinput.messages.dialogs = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, mathinput.messages.dialogs, {
      keypad: {
        title: 'Clavier',
        buttons: {
          comma: ',',
          stop: '.',
          n0: '0',
          n1: '1',
          n2: '2',
          n3: '3',
          n4: '4',
          n5: '5',
          n6: '6',
          n7: '7',
          n8: '8',
          n9: '9',
          a: 'a',
          b: 'b',
          c: 'c',
          i: 'i',
          j: 'j',
          k: 'k',
          n: 'n',
          p: 'p',
          q: 'q',
          x: 'x',
          y: 'y',
          z: 'z',
          pi: 'Pi',
          infty: 'Infini',
          space: 'Espace',
          subscript: 'Indice'
        }
      },
      basic: {
        title: 'Basique',
        buttons: {
          equal: 'Égal',
          plus: 'Plus',
          minus: 'Moins',
          cdot: 'Fois',
          times: 'Fois',
          div: 'Divisé par',
          pleft: 'Parenthèse gauche (',
          pright: 'Parenthèse droite )',
          frac: 'Fraction',
          sqrt: 'Racine carrée',
          pow2: 'Puissance de 2',
          pow3: 'Puissance de 3',
          sin: 'Sinus',
          cos: 'Cosinus',
          tan: 'Tangente'
        }
      },
      greek: {
        title: 'Grec',
        buttons: {
          alpha: 'Alpha',
          beta: 'Beta',
          gamma: 'Gamma',
          delta: 'Delta',
          epsilon: 'Epsilon',
          // varepsilon
          zeta: 'Zeta',
          eta: 'Eta',
          theta: 'Theta',
          // vartheta
          iota: 'Iota',
          kappa: 'Kappa',
          // varkappa
          lambda: 'Lambda',
          mu: 'Mu',
          nu: 'Nu',
          xi: 'Xi',
          omicron: 'Omicron',
          pi: 'Pi',
          // varpi
          rho: 'Rho',
          // varrho
          sigma: 'Sigma',
          // varsigma
          tau: 'Tau',
          upsilon: 'Upsilon',
          phi: 'Phi',
          // varphi
          chi: 'Chi',
          psi: 'Psi',
          omega: 'Omega'
        }
      },
      operators: {
        title: 'Operateurs',
        buttons: {
          equal: 'Égal',
          plus: 'Plus',
          minus: 'Moins',
          cdot: 'Fois',
          times: 'Tois',
          div: 'Divisé par',
          pleft: 'Parenthèse gauche (',
          pright: 'Parenthèse droite )',
          bleft: 'Crochet gauche [',
          bright: 'Crochet droit ]',
          cleft: 'Accolade gauche {',
          cright: 'Accolade droite }',
          vleft: 'Ligne verticale gauche |',
          vright: 'Ligne verticale droite |',
          lt: 'Inférieur à',
          le: 'Inférieur ou égal à',
          gt: 'Supérieur à',
          ge: 'Supérieur ou égal à',
          neq: 'Non égal (différent)',
          approx: 'Approximativement égal à',
          propto: 'Proportionnel à',
          plusminus: 'Plus-Moins',
          percent: 'Pourcent',
          not: 'Non (négation)',
          and: 'Et',
          or: 'Ou',
          circ: 'Composition',
          nabla: 'Nabla'
        }
      },
      expressions: {
        title: 'Fonctions',
        buttons: {
          sqrt: 'Racine carrée',
          cubert: 'Racine cubique',
          nthroot: 'Racine Nième',
          pow2: 'Puissance de 2',
          pow3: 'Puissance de 3',
          pow: 'Puissance',
          log: 'Logarithme',
          log10: 'Logarithme base 10',
          ln: 'Logarithm Népérien',
          sin: 'Sinis',
          cos: 'Cosinus',
          tan: 'Tangente',
          arcsin: 'Arc sinus',
          arccos: 'Arc cosinus',
          arctan: 'Arc tangente',
          deriv: 'Dérivée',
          partial: 'Dérivée partielle',
          int: 'Intégrale',
          oint: 'Intégrale curviligne sur un contour fermé',
          sum: 'Somme',
          prod: 'Produit',
          lim: 'Limite'
        }
      },
      sets: {
        title: 'Ensembles',
        buttons: {
          cset: 'Complexes',
          pset: 'Premiers',
          nset: 'Naturels',
          qset: 'Rationels',
          rset: 'Réels',
          zset: 'Entiers',
          emptyset: 'Ensemble vide',
          forall: 'Quel que soit',
          exists: 'Il existe',
          nexists: 'Il n’existe pas',
          in: 'Appartient',
          nin: 'N’appartient pas',
          subset: 'Est inclus dans (sous-ensemble)',
          supset: 'Inclut (sur-ensemble)',
          nsubset: 'N’est pas inclus dans',
          nsupset: 'N’inclut pas',
          intersection: 'Intersection',
          union: 'Union',
          to: 'To',
          implies: 'Implique',
          impliedby: 'Implied by',
          nimplies: 'Not implies',
          iff: 'Equivalent to'
        }
      },
      matrices: {
        title: 'Matrices',
        buttons: {
          vector: 'Vecteur',
          widehat: 'Chapeau (angle)',
          matrix: 'Matrice',
          pmatrix: 'Matrice avec parenthèses',
          bmatrix: 'Matrice avec crochets',
          bbmatrix: 'Matrice with accolades',
          vmatrix: 'Matrice avec lignes verticales',
          vvmatrix: 'Matrice à double ligne verticale',
          column: 'Ajouter un colonne',
          row: 'Ajouter une rangée'
        }
      },
      statistics: {
        title: 'Statistiques',
        buttons: {
          factorial: 'Factorielle',
          binomial: 'Combinaison',
          overline: 'Surlignage (moyenne)'
        }
        /*
        units: {
            title: 'Units',
            buttons: {}
        },
        chemistry: {
            title: 'Chemistry',
            buttons: {}
        }
        */

      }
    });
  }

  if (mathinput && mathinput.messages.toolbar) {
    mathinput.messages.toolbar = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, mathinput.messages.toolbar, {
      field: {
        title: 'Zone de saisie'
      },
      backspace: {
        title: 'Retour arrière'
      },
      keypad: {
        title: 'Clavier',
        buttons: {
          comma: ',',
          stop: '.',
          n0: '0',
          n1: '1',
          n2: '2',
          n3: '3',
          n4: '4',
          n5: '5',
          n6: '6',
          n7: '7',
          n8: '8',
          n9: '9',
          a: 'a',
          b: 'b',
          c: 'c',
          i: 'i',
          j: 'j',
          k: 'k',
          n: 'n',
          p: 'p',
          q: 'q',
          x: 'x',
          y: 'y',
          z: 'z',
          pi: 'Pi',
          infty: 'Infini',
          space: 'Espace',
          subscript: 'Indice'
        }
      },
      basic: {
        title: 'Basique',
        buttons: {
          equal: 'Égal',
          plus: 'Plus',
          minus: 'Moins',
          cdot: 'Fois',
          times: 'Fois',
          div: 'Divisé par',
          pleft: 'Parenthèse gauche (',
          pright: 'Parenthèse droite )',
          frac: 'Fraction',
          sqrt: 'Racine carrée',
          pow2: 'Puissance de 2',
          pow3: 'Puissance de 3',
          sin: 'Sinus',
          cos: 'Cosinus',
          tan: 'Tangente'
        }
      },
      greek: {
        title: 'Grec',
        buttons: {
          alpha: 'Alpha',
          beta: 'Beta',
          gamma: 'Gamma',
          delta: 'Delta',
          epsilon: 'Epsilon',
          // varepsilon
          zeta: 'Zeta',
          eta: 'Eta',
          theta: 'Theta',
          // vartheta
          iota: 'Iota',
          kappa: 'Kappa',
          // varkappa
          lambda: 'Lambda',
          mu: 'Mu',
          nu: 'Nu',
          xi: 'Xi',
          omicron: 'Omicron',
          pi: 'Pi',
          // varpi
          rho: 'Rho',
          // varrho
          sigma: 'Sigma',
          // varsigma
          tau: 'Tau',
          upsilon: 'Upsilon',
          phi: 'Phi',
          // varphi
          chi: 'Chi',
          psi: 'Psi',
          omega: 'Omega'
        }
      },
      operators: {
        title: 'Operateurs',
        buttons: {
          equal: 'Égal',
          plus: 'Plus',
          minus: 'Moins',
          cdot: 'Fois',
          times: 'Tois',
          div: 'Divisé par',
          pleft: 'Parenthèse gauche (',
          pright: 'Parenthèse droite )',
          bleft: 'Crochet gauche [',
          bright: 'Crochet droit ]',
          cleft: 'Accolade gauche {',
          cright: 'Accolade droite }',
          vleft: 'Ligne verticale gauche |',
          vright: 'Ligne verticale droite |',
          lt: 'Inférieur à',
          le: 'Inférieur ou égal à',
          gt: 'Supérieur à',
          ge: 'Supérieur ou égal à',
          neq: 'Non égal (différent)',
          approx: 'Approximativement égal à',
          propto: 'Proportionnel à',
          plusminus: 'Plus-Moins',
          percent: 'Pourcent',
          not: 'Non (négation)',
          and: 'Et',
          or: 'Ou',
          circ: 'Composition',
          nabla: 'Nabla'
        }
      },
      expressions: {
        title: 'Fonctions',
        buttons: {
          sqrt: 'Racine carrée',
          cubert: 'Racine cubique',
          nthroot: 'Racine Nième',
          pow2: 'Puissance de 2',
          pow3: 'Puissance de 3',
          pow: 'Puissance',
          log: 'Logarithme',
          log10: 'Logarithme base 10',
          ln: 'Logarithm Népérien',
          sin: 'Sinis',
          cos: 'Cosinus',
          tan: 'Tangente',
          arcsin: 'Arc sinus',
          arccos: 'Arc cosinus',
          arctan: 'Arc tangente',
          deriv: 'Dérivée',
          partial: 'Dérivée partielle',
          int: 'Intégrale',
          oint: 'Intégrale curviligne sur un contour fermé',
          sum: 'Somme',
          prod: 'Produit',
          lim: 'Limite'
        }
      },
      sets: {
        title: 'Ensembles',
        buttons: {
          cset: 'Complexes',
          pset: 'Premiers',
          nset: 'Naturels',
          qset: 'Rationels',
          rset: 'Réels',
          zset: 'Entiers',
          emptyset: 'Ensemble vide',
          forall: 'Quel que soit',
          exists: 'Il existe',
          nexists: 'Il n’existe pas',
          in: 'Appartient',
          nin: 'N’appartient pas',
          subset: 'Est inclus dans (sous-ensemble)',
          supset: 'Inclut (sur-ensemble)',
          nsubset: 'N’est pas inclus dans',
          nsupset: 'N’inclut pas',
          intersection: 'Intersection',
          union: 'Union',
          to: 'To',
          implies: 'Implique',
          impliedby: 'Implied by',
          nimplies: 'Not implies',
          iff: 'Equivalent to'
        }
      },
      matrices: {
        title: 'Matrices',
        buttons: {
          vector: 'Vecteur',
          widehat: 'Chapeau (angle)',
          matrix: 'Matrice',
          pmatrix: 'Matrice avec parenthèses',
          bmatrix: 'Matrice avec crochets',
          bbmatrix: 'Matrice with accolades',
          vmatrix: 'Matrice avec lignes verticales',
          vvmatrix: 'Matrice à double ligne verticale',
          column: 'Ajouter un colonne',
          row: 'Ajouter une rangée'
        }
      },
      statistics: {
        title: 'Statistiques',
        buttons: {
          factorial: 'Factorielle',
          binomial: 'Combinaison',
          overline: 'Surlignage (moyenne)'
        }
        /*
        units: {
            title: 'Units',
            buttons: {}
        },
        chemistry: {
            title: 'Chemistry',
            buttons: {}
        }
        */

      }
    });
  }
  /* widgets.mediaplayer */


  if (MediaPlayer) {
    var _options7 = MediaPlayer.prototype.options;
    _options7.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options7.messages, {
      play: 'Jouer/Pauser',
      mute: 'Avec/Sans son',
      full: 'Plein écran',
      notSupported: 'Fichier non supporté'
    });
  }
  /* widgets.multiinput */


  if (MultiInput) {
    var _options8 = MultiInput.prototype.options;
    _options8.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options8.messages, {
      clear: 'Effacer',
      delete: 'Supprimer'
    });
  }
  /* widgets.multiquiz */


  if (MultiQuiz) {
    var _options9 = MultiQuiz.prototype.options;
    _options9.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options9.messages, {
      placeholder: 'Sélectionner...'
    });
  }
  /* widgets.navigation */


  if (Navigation) {
    var _options10 = Navigation.prototype.options;
    _options10.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options10.messages, {
      empty: 'Rien à afficher'
    });
  }
  /* widgets.playbar */


  if (PlayBar) {
    var _options11 = PlayBar.prototype.options;
    _options11.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options11.messages, {
      empty: 'Rien à afficher',
      page: 'Page',
      of: 'de {0}',
      first: 'Aller à la première page',
      previous: 'Aller à la page précédente',
      next: 'Aller à la prochaine page',
      last: 'Aller à la dernière page',
      refresh: 'Rafraichîr',
      morePages: 'Plus de pages'
    });
  }
  /* widgets.propertygrid */


  if (PropertyGrid) {
    var _options12 = PropertyGrid.prototype.options;
    _options12.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options12.messages, {
      property: 'Propriété',
      value: 'Valeur'
    });
  }
  /* widgets.quiz */


  if (Quiz) {
    var _options13 = Quiz.prototype.options;
    _options13.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options13.messages, {
      optionLabel: 'Sélectionner...'
    });
  }
  /* widgets.social */


  if (Social) {
    var _options14 = Social.prototype.options;
    _options14.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options14.messages, {
      classroom: 'Partager sur Google Classroom',
      facebook: 'Partager sur Facebook',
      google: 'Partager sur Google+',
      linkedin: 'Partager sur LinkedIn',
      pinterest: 'Partager sur Pinterest',
      twitter: 'Partager sur Twitter'
    });
  }
  /* widgets.stage */


  if (Stage) {
    var _options15 = Stage.prototype.options;
    _options15.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options15.messages, {
      contextMenu: {
        delete: 'Supprimer',
        duplicate: 'Dupliquer'
      },
      noPage: 'Veuillez ajouter ou sélectionner une page'
    });
  }
  /* widgets.styleeditor */


  if (StyleEditor) {
    var _options16 = StyleEditor.prototype.options;
    _options16.messages = jquery__WEBPACK_IMPORTED_MODULE_0___default.a.extend(true, _options16.messages, {
      columns: {
        name: 'Nom',
        value: 'Valeur'
      },
      toolbar: {
        create: 'Nouveau',
        destroy: 'Effacer'
      },
      validation: {
        name: 'Nom de style manquant',
        value: 'Valeur manquante'
      }
    });
  }
}

/***/ }),

/***/ "./src/js/vendor/kendo/cultures/kendo.culture.fr-FR.js":
/*!*************************************************************!*\
  !*** ./src/js/vendor/kendo/cultures/kendo.culture.fr-FR.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** 
 * Kendo UI v2019.2.619 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! kendo.core */ "./src/js/vendor/kendo/kendo.core.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(function(){
(function( window, undefined ) {
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
}));

/***/ }),

/***/ "./src/js/vendor/kendo/messages/kendo.messages.fr-FR.js":
/*!**************************************************************!*\
  !*** ./src/js/vendor/kendo/messages/kendo.messages.fr-FR.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** 
 * Kendo UI v2019.2.619 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! kendo.core */ "./src/js/vendor/kendo/kendo.core.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(function(){
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
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "number": {
    "eq": "Est égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "string": {
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle",
    "isempty": "Est vide",
    "isnotempty": "N’est pas vide",
    "isnullorempty": "A une valeur",
    "isnotnullorempty": "N'a pas de valeur"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
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
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "number": {
    "eq": "Est égal à",
    "gte": "Est supérieur ou égal à",
    "gt": "Est supérieur à",
    "lte": "Est inférieur ou égal à",
    "lt": "Est inférieur à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
  },
  "string": {
    "endswith": "Se termine par",
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "startswith": "Commence par",
    "contains": "Contient",
    "doesnotcontain": "Ne contient pas",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle",
    "isempty": "Est vide",
    "isnotempty": "N’est pas vide",
    "isnullorempty": "A une valeur",
    "isnotnullorempty": "N'a pas de valeur"
  },
  "enums": {
    "eq": "Est égal à",
    "neq": "N’est pas égal à",
    "isnull": "Est nulle",
    "isnotnull": "N’est pas nulle"
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
  "done": "Fini",
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
    "excel": "Export vers Excel",
    "pdf": "Export en PDF",
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
  /* TreeList messages */

if (kendo.ui.TreeList) {
kendo.ui.TreeList.prototype.options.messages =
$.extend(true, kendo.ui.TreeList.prototype.options.messages,{
  "noRows": "Aucun enregistrement à afficher",
  "loading": "Chargement...",
  "requestFailed": "La requête a échoué.",
  "retry": "Réessayer",
  "commands": {
      "edit": "Modifier",
      "update": "Mettre à jour",
      "canceledit": "Annuler",
      "create": "Créer",
      "createchild": "Créer un élément enfant",
      "destroy": "Supprimer",
      "excel": "Export Excel",
      "pdf": "Export PDF"
  }
});
}

/* Pager messages */

if (kendo.ui.Pager) {
kendo.ui.Pager.prototype.options.messages =
$.extend(true, kendo.ui.Pager.prototype.options.messages,{
  "allPages": "Tous",
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

/* TreeListPager messages */

if (kendo.ui.TreeListPager) {
kendo.ui.TreeListPager.prototype.options.messages =
$.extend(true, kendo.ui.TreeListPager.prototype.options.messages,{
  "allPages": "Tous",
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
  "title": "Afficher les lignes avec la valeur qui",
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
  "filter": "Filtrer",
  "search": "Recherche"
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
  "addColumnLeft": "Ajouter colonne à gauche",
  "addColumnRight": "Ajouter colonne à droite",
  "addRowAbove": "Ajouter ligne au-dessus",
  "addRowBelow": "Ajouter ligne au-dessous",
  "deleteColumn": "Supprimer la colonne",
  "deleteRow": "Supprimer la ligne",
  "dropFilesHere": "drop files here to upload",
  "formatting": "Format",
  "viewHtml": "View HTML",
  "dialogUpdate": "Update",
  "insertFile": "Insérer un Fichier",
  "dialogOk": "OK",
  "tableWizard": "Assistant de tableau",
  "tableTab": "Table",
  "cellTab": "Cellule",
  "accessibilityTab": "Accessibilité",
  "caption": "Sous-titre",
  "summary": "Sommaire",
  "width": "Largeur",
  "height": "Hauteur",
  "cellSpacing": "Espacement des cellules",
  "cellPadding": "Rembourrage des cellules",
  "cellMargin": "Marge des cellules",
  "alignment": "Alignement",
  "background": "Fond",
  "cssClass": "CSS Classe",
  "id": "Id",
  "border": "Bordure",
  "borderStyle": "Style de bordure",
  "collapseBorders": "Rétracter bordures",
  "wrapText": "Renvoi à la ligne",
  "associateCellsWithHeaders": "Cellules associées aux entêtes",
  "alignLeft": "Aligner à gauche",
  "alignCenter": "Aligner le centre",
  "alignRight": "Aligner à droite",
  "alignLeftTop": "Aligner à gauche et haut",
  "alignCenterTop": "Aligner le centre et haut",
  "alignRightTop": "Aligner à droite et haut",
  "alignLeftMiddle": "Aligner à gauche et milieu",
  "alignCenterMiddle": "Aligner le centre et milieu",
  "alignRightMiddle": "Aligner à droite et milieu",
  "alignLeftBottom": "Aligner à gauche et bas",
  "alignCenterBottom": "Aligner le centre et bas",
  "alignRightBottom": "Aligner à droite et bas",
  "alignRemove": "Retirer alignement",
  "columns": "Colonnes",
  "rows": "Lignes",
  "selectAllCells": "Sélectionner toutes les cellules"
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
    "editorTitle": "Evènement",
    "end": "Fin",
    "endTimezone": "End timezone",
    "repeat": "Répéter",
    "separateTimezones": "Use separate start and end time zones",
    "start": "Début",
    "startTimezone": "Start timezone",
    "timezone": " ",
    "timezoneEditorButton": "Fuseau horaire",
    "timezoneEditorTitle": "Fuseaux horaires",
    "title": "Titre",
    "noTimezone": "Pas de fuseau horaire"
  },
  "event": "Evènement",
  "recurrenceMessages": {
    "deleteRecurring": "Voulez-vous supprimer seulement cet évènement ou toute la série?",
    "deleteWindowOccurrence": "Suppression de l'élément courant",
    "deleteWindowSeries": "Suppression de toute la série",
    "deleteWindowTitle": "Suppression d'un élément récurrent",
    "editRecurring": "Voulez-vous modifier seulement cet évènement ou toute la série?",
    "editWindowOccurrence": "Modifier l'occurrence courante",
    "editWindowSeries": "Modifier la série",
    "editWindowTitle": "Modification de l'élément courant"
  },
  "save": "Sauvegarder",
  "time": "Time",
  "today": "Aujourd'hui",
  "views": {
    "agenda": "Agenda",
    "day": "Jour",
    "month": "Mois",
    "week": "Semaine",
    "workWeek": "Semaine de travail",
    "timeline": "Chronologie"
  },
  "deleteWindowTitle": "Suppression de l'élément",
  "showFullDay": "Montrer toute la journée",
  "showWorkDay": "Montrer les heures ouvrables"
});
}


/* Validator messages */

if (kendo.ui.Validator) {
kendo.ui.Validator.prototype.options.messages =
$.extend(true, kendo.ui.Validator.prototype.options.messages,{
  "required": "{0} est requis",
  "pattern": "{0} n'est pas valide",
  "min": "{0} doit être plus grand ou égal à {1}",
  "max": "{0} doit être plus petit ou égal à {1}",
  "step": "{0} n'est pas valide",
  "email": "{0} n'est pas un courriel valide",
  "url": "{0} n'est pas une adresse web valide",
  "date": "{0} n'est pas une date valide",
  "dateCompare": "La date de fin doit être postérieure à la date de début"
});
}

/* Dialog */

if (kendo.ui.Dialog) {
kendo.ui.Dialog.prototype.options.messages =
$.extend(true, kendo.ui.Dialog.prototype.options.localization, {
  "close": "Fermer"
});
}

/* Alert */

if (kendo.ui.Alert) {
kendo.ui.Alert.prototype.options.messages =
$.extend(true, kendo.ui.Alert.prototype.options.localization, {
  "okText": "OK"
});
}

/* Confirm */

if (kendo.ui.Confirm) {
kendo.ui.Confirm.prototype.options.messages =
$.extend(true, kendo.ui.Confirm.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annuler"
});
}

/* Prompt */
if (kendo.ui.Prompt) {
kendo.ui.Prompt.prototype.options.messages =
$.extend(true, kendo.ui.Prompt.prototype.options.localization, {
  "okText": "OK",
  "cancel": "Annuler"
});
}

/* ListBox messaages */

if (kendo.ui.ListBox) {
kendo.ui.ListBox.prototype.options.messages =
$.extend(true, kendo.ui.ListBox.prototype.options.messages,{
  "tools": {
    "remove": "Supprimer",
    "moveUp": "Déplacer vers le haut",
    "moveDown": "Déplacer vers le bas",
    "transferTo": "Transférer à",
    "transferFrom": "Transférer de",
    "transferAllTo": "Transférer tout à",
    "transferAllFrom": "Transférer tout de"
  }
});
}

})(window.kendo.jQuery);
}));

/***/ }),

/***/ "./webapp/locales/fr.json":
/*!********************************!*\
  !*** ./webapp/locales/fr.json ***!
  \********************************/
/*! exports provided: locale, languages, themes, meta, header, footer, home, error, groups, search, errors, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"locale\":\"fr\",\"languages\":[{\"value\":\"en\",\"name\":\"Anglais\",\"icon\":\"\"},{\"value\":\"fr\",\"name\":\"Français\",\"icon\":\"\"}],\"themes\":[{\"value\":\"black\",\"name\":\"Black\",\"colors\":[]},{\"value\":\"bootstrap\",\"name\":\"Bootstrap\",\"colors\":[]},{\"value\":\"flat\",\"name\":\"Flat\",\"colors\":[]},{\"value\":\"highcontrast\",\"name\":\"High Contrast\",\"colors\":[]},{\"value\":\"indigo\",\"name\":\"Indigo\",\"colors\":[]},{\"value\":\"nordic\",\"name\":\"Nordic\",\"colors\":[]},{\"value\":\"memba\",\"name\":\"Memba\",\"colors\":[]},{\"value\":\"turquoise\",\"name\":\"Turquoise\",\"colors\":[]},{\"value\":\"urban\",\"name\":\"Urban\",\"colors\":[]},{\"value\":\"vintage\",\"name\":\"Vintage\",\"colors\":[]}],\"meta\":{\"author\":\"Memba Sarl\",\"title\":\"Memba\",\"description\":\"Nous sommes les créateurs de Kidoju\",\"keywords\":\"Kidoju - Une nouvelle façon d'enseigner et d'apprendre\",\"category\":\"Divers\",\"icon\":\"typewriter\"},\"header\":{\"navbar\":{\"toggle\":\"Changer la navigation\",\"search\":{\"text\":\"Rechercher\",\"placeholder\":\"Recherche...\"}}},\"footer\":{\"copyright\":\"Version %s - Copyright &copy; 2013-2019 Memba Sarl.\",\"language\":{\"label\":\"Langue:\"},\"theme\":{\"label\":\"Thème:\"}},\"home\":{},\"error\":{\"icon\":\"error\",\"back\":\"Retour\"},\"groups\":{\"authors\":{\"icon\":\"users3\",\"heading\":\"Auteurs\"},\"calendar\":{\"icon\":\"calendar\",\"heading\":\"Calendrier\"},\"categories\":{\"icon\":\"tags\",\"heading\":\"Catégories\"}},\"search\":{\"title\":{\"icon\":\"magnifying_glass\",\"heading\":\"Résultats de recherche\"},\"message\":\"Pas de résultat.\"},\"errors\":{\"http\":{\"400\":{\"status\":400,\"title\":\"400 - Mauvaise Requête\",\"message\":\"Désolé, mais votre requête est mal formulée. L'URL est peut-être mal ortographiée.\"},\"401\":{\"status\":401,\"title\":\"401 - Non autorisé\",\"message\":\"Désolé, mais votre requête n'est pas autorisée.\"},\"403\":{\"status\":403,\"title\":\"403 - Forbidden\",\"message\":\"Désolé, mais votre requête est interdite.\"},\"404\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Désolé, mais la page demandée est introuvable. L'URL est peut-être mal ortographiée ou la page que vous recherchez n'est peut-être plus disponible.\"},\"500\":{\"status\":500,\"title\":\"500 - Erreur Inconnue\",\"message\":\"Il y a eu une erreur inconnue. Si nous arrivons à la reproduire, nous la corrigerons avec amour et attention.\"},\"1000\":{\"status\":500,\"title\":\"1000 - Désactivez le mode privé ou mettez à jour votre navigateur\",\"message\":\"This web site utilise les fonctionnalités des navigateurs récents, notamment (mais pas seulement) l’audio et la vidéo, les blobs, les canvas, les transformations css, les api de fichiers, le stockage local et de session, les graphiques vectoriels (SVG) et les « web workers ».\"}},\"mongoose\":{\"validation\":{\"status\":400,\"title\":\"400 - Mauvaise Requête\",\"message\":\"Erreur de validation de base de données.\"}},\"params\":{\"invalidFileId\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Identifiant de fichier erroné: veuillez utiliser un nom de 3 à 50 et une extension de 2 à 7 caractères alphanumeriques\"},\"invalidLanguage\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Langue erronée: cette langue n'est pas définie.\"},\"invalidMonth\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Mois erroné: veuillez utiliser un nombre à quatre chiffres compris entre 01 et 12.\"},\"invalidObjectId\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Identifiant d'objet erroné: un identifiant est une chaîne de 24 caractères hexadécimaux.\"},\"invalidProvider\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Service erroné: utlisez `facebook`, `google`, `live` ou `twitter`\"},\"invalidYear\":{\"status\":404,\"title\":\"404 - Introuvable\",\"message\":\"Année erronée: veuillez utiliser un nombre à quatre chiffres compris entre 2014 et l'année en cours.\"}},\"routes\":{\"hookRoute\":{\"badAgent\":{\"status\":400,\"title\":\"400 - Mauvaise Requête\",\"message\":\"Agent utilisateur inconnu: `%s`.\"}}}}}");

/***/ })

}]);