(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{373:function(e,t,i){"use strict";i.r(t);i(380),i(381);var s=i(0),r=i.n(s);if(window.kendo&&window.kendo.ui){window.kendo.ex=window.kendo.ex||{};var o=window.kendo,a=o.ex,n=a.markeditor,l=a.mathinput,u=o.ui,p=u.AssetManager,d=u.BaseDialog,c=u.BasicList,m=u.CodeEditor,g=u.Explorer,h=u.ImageList,v=u.MarkEditor,f=u.MediaPlayer,y=u.MultiInput,b=u.MultiQuiz,k=u.Navigation,x=u.PlayBar,A=u.PropertyGrid,M=u.Quiz,E=u.Social,w=u.Stage,P=u.StyleEditor;if(p){var T=p.prototype.options;T.messages=r.a.extend(!0,T.messages,{toolbar:{upload:"Mettre en ligne",delete:"Supprimer",filter:"Collection: ",search:"Recherche"},tabs:{default:"Projet"},data:{defaultName:"Chargement...",defaultImage:""}})}if(d){var F=d.prototype.options;F.messages=r.a.extend(!0,F.messages,{title:{error:"Erreur",info:"Information",success:"Succès",warning:"Avertissement"},actions:{cancel:{action:"cancel",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",text:"Annuler"},close:{action:"close",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",primary:!0,text:"Fermer"},create:{action:"create",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/plus.svg",primary:!0,text:"Créer"},no:{action:"no",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/close.svg",text:"Non"},ok:{action:"ok",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg",primary:!0,text:"OK"},yes:{action:"yes",imageUrl:"https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg",primary:!0,text:"Oui"}}})}if(c){var S=c.prototype.options;S.messages=r.a.extend(!0,S.messages,{toolbar:{add:"Ajouter"},validation:{text:"Une valeur est requise."}})}if(m){var q=m.prototype.options;q.messages=r.a.extend(!0,q.messages,{formula:"Formule:",notApplicable:"N/A",solution:"Solution:",params:"Params:",value:"Valeur:",test:"Test",success:"Succès",failure:"Échec",omit:"Omission",error:"Erreur"})}if(g){var C=g.prototype.options;C.messages=r.a.extend(!0,C.messages,{empty:"Rien à afficher"})}if(h){var R=h.prototype.options;R.messages=r.a.extend(!0,R.messages,{toolbar:{add:"Ajouter"},validation:{text:"Un texte alternatif de 1 à 100 caractères est requis.",url:"Une url d’image est requise."}})}if(v){var I=v.prototype.options;I.messages=r.a.extend(!0,I.messages,{image:"Une image sans description",link:"Cliquez ici"})}if(n&&n.messages.dialogs&&(n.messages.dialogs=r.a.extend(!0,n.messages.dialogs,{cancel:'<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/close.svg" class="k-image">Annuler',okText:'<img alt="icon" src="https://cdn.kidoju.com/images/o_collection/svg/office/ok.svg" class="k-image">OK',headingsDialog:{title:"Titres",buttons:{h1:"Titre 1",h2:"Heading 2",h3:"Heading 3",h4:"Heading 4",h5:"Heading 5",h6:"Heading 6"}},linkDialog:{title:"Hyperlien",labels:{text:"Url"}},imageDialog:{title:"Image",labels:{url:"Url"}},latexDialog:{title:"Expression Mathématique",labels:{display:"Affichage",inline:"en ligne"}},previewDialog:{title:"Aperçu"}})),n&&n.messages.toolbar&&(n.messages.toolbar=r.a.extend(!0,n.messages.toolbar,{undo:"Annuler",redo:"Rétablir",headings:"Titres",headingsButtons:{h1:"Titre 1",h2:"Titre 2",h3:"Titre 3",h4:"Titre 4",h5:"Titre 5",h6:"Titre 6"},bold:"Gras",italic:"Italique",bulleted:"Liste à Puces",numbered:"Liste Numérotée",blockquote:"Bloc de Citation",hrule:"Ligne Horizontale",link:"Hyperlien",image:"Image",code:"Code",latex:"Expression Mathématique",preview:"Aperçu dans une Fenêtre"})),l&&l.messages.dialogs&&(l.messages.dialogs=r.a.extend(!0,l.messages.dialogs,{keypad:{title:"Clavier",buttons:{comma:",",stop:".",n0:"0",n1:"1",n2:"2",n3:"3",n4:"4",n5:"5",n6:"6",n7:"7",n8:"8",n9:"9",a:"a",b:"b",c:"c",i:"i",j:"j",k:"k",n:"n",p:"p",q:"q",x:"x",y:"y",z:"z",pi:"Pi",infty:"Infini",space:"Espace",subscript:"Indice"}},basic:{title:"Basique",buttons:{equal:"Égal",plus:"Plus",minus:"Moins",cdot:"Fois",times:"Fois",div:"Divisé par",pleft:"Parenthèse gauche (",pright:"Parenthèse droite )",frac:"Fraction",sqrt:"Racine carrée",pow2:"Puissance de 2",pow3:"Puissance de 3",sin:"Sinus",cos:"Cosinus",tan:"Tangente"}},greek:{title:"Grec",buttons:{alpha:"Alpha",beta:"Beta",gamma:"Gamma",delta:"Delta",epsilon:"Epsilon",zeta:"Zeta",eta:"Eta",theta:"Theta",iota:"Iota",kappa:"Kappa",lambda:"Lambda",mu:"Mu",nu:"Nu",xi:"Xi",omicron:"Omicron",pi:"Pi",rho:"Rho",sigma:"Sigma",tau:"Tau",upsilon:"Upsilon",phi:"Phi",chi:"Chi",psi:"Psi",omega:"Omega"}},operators:{title:"Operateurs",buttons:{equal:"Égal",plus:"Plus",minus:"Moins",cdot:"Fois",times:"Tois",div:"Divisé par",pleft:"Parenthèse gauche (",pright:"Parenthèse droite )",bleft:"Crochet gauche [",bright:"Crochet droit ]",cleft:"Accolade gauche {",cright:"Accolade droite }",vleft:"Ligne verticale gauche |",vright:"Ligne verticale droite |",lt:"Inférieur à",le:"Inférieur ou égal à",gt:"Supérieur à",ge:"Supérieur ou égal à",neq:"Non égal (différent)",approx:"Approximativement égal à",propto:"Proportionnel à",plusminus:"Plus-Moins",percent:"Pourcent",not:"Non (négation)",and:"Et",or:"Ou",circ:"Composition",nabla:"Nabla"}},expressions:{title:"Fonctions",buttons:{sqrt:"Racine carrée",cubert:"Racine cubique",nthroot:"Racine Nième",pow2:"Puissance de 2",pow3:"Puissance de 3",pow:"Puissance",log:"Logarithme",log10:"Logarithme base 10",ln:"Logarithm Népérien",sin:"Sinis",cos:"Cosinus",tan:"Tangente",arcsin:"Arc sinus",arccos:"Arc cosinus",arctan:"Arc tangente",deriv:"Dérivée",partial:"Dérivée partielle",int:"Intégrale",oint:"Intégrale curviligne sur un contour fermé",sum:"Somme",prod:"Produit",lim:"Limite"}},sets:{title:"Ensembles",buttons:{cset:"Complexes",pset:"Premiers",nset:"Naturels",qset:"Rationels",rset:"Réels",zset:"Entiers",emptyset:"Ensemble vide",forall:"Quel que soit",exists:"Il existe",nexists:"Il n’existe pas",in:"Appartient",nin:"N’appartient pas",subset:"Est inclus dans (sous-ensemble)",supset:"Inclut (sur-ensemble)",nsubset:"N’est pas inclus dans",nsupset:"N’inclut pas",intersection:"Intersection",union:"Union",to:"To",implies:"Implique",impliedby:"Implied by",nimplies:"Not implies",iff:"Equivalent to"}},matrices:{title:"Matrices",buttons:{vector:"Vecteur",widehat:"Chapeau (angle)",matrix:"Matrice",pmatrix:"Matrice avec parenthèses",bmatrix:"Matrice avec crochets",bbmatrix:"Matrice with accolades",vmatrix:"Matrice avec lignes verticales",vvmatrix:"Matrice à double ligne verticale",column:"Ajouter un colonne",row:"Ajouter une rangée"}},statistics:{title:"Statistiques",buttons:{factorial:"Factorielle",binomial:"Combinaison",overline:"Surlignage (moyenne)"}}})),l&&l.messages.toolbar&&(l.messages.toolbar=r.a.extend(!0,l.messages.toolbar,{field:{title:"Zone de saisie"},backspace:{title:"Retour arrière"},keypad:{title:"Clavier",buttons:{comma:",",stop:".",n0:"0",n1:"1",n2:"2",n3:"3",n4:"4",n5:"5",n6:"6",n7:"7",n8:"8",n9:"9",a:"a",b:"b",c:"c",i:"i",j:"j",k:"k",n:"n",p:"p",q:"q",x:"x",y:"y",z:"z",pi:"Pi",infty:"Infini",space:"Espace",subscript:"Indice"}},basic:{title:"Basique",buttons:{equal:"Égal",plus:"Plus",minus:"Moins",cdot:"Fois",times:"Fois",div:"Divisé par",pleft:"Parenthèse gauche (",pright:"Parenthèse droite )",frac:"Fraction",sqrt:"Racine carrée",pow2:"Puissance de 2",pow3:"Puissance de 3",sin:"Sinus",cos:"Cosinus",tan:"Tangente"}},greek:{title:"Grec",buttons:{alpha:"Alpha",beta:"Beta",gamma:"Gamma",delta:"Delta",epsilon:"Epsilon",zeta:"Zeta",eta:"Eta",theta:"Theta",iota:"Iota",kappa:"Kappa",lambda:"Lambda",mu:"Mu",nu:"Nu",xi:"Xi",omicron:"Omicron",pi:"Pi",rho:"Rho",sigma:"Sigma",tau:"Tau",upsilon:"Upsilon",phi:"Phi",chi:"Chi",psi:"Psi",omega:"Omega"}},operators:{title:"Operateurs",buttons:{equal:"Égal",plus:"Plus",minus:"Moins",cdot:"Fois",times:"Tois",div:"Divisé par",pleft:"Parenthèse gauche (",pright:"Parenthèse droite )",bleft:"Crochet gauche [",bright:"Crochet droit ]",cleft:"Accolade gauche {",cright:"Accolade droite }",vleft:"Ligne verticale gauche |",vright:"Ligne verticale droite |",lt:"Inférieur à",le:"Inférieur ou égal à",gt:"Supérieur à",ge:"Supérieur ou égal à",neq:"Non égal (différent)",approx:"Approximativement égal à",propto:"Proportionnel à",plusminus:"Plus-Moins",percent:"Pourcent",not:"Non (négation)",and:"Et",or:"Ou",circ:"Composition",nabla:"Nabla"}},expressions:{title:"Fonctions",buttons:{sqrt:"Racine carrée",cubert:"Racine cubique",nthroot:"Racine Nième",pow2:"Puissance de 2",pow3:"Puissance de 3",pow:"Puissance",log:"Logarithme",log10:"Logarithme base 10",ln:"Logarithm Népérien",sin:"Sinis",cos:"Cosinus",tan:"Tangente",arcsin:"Arc sinus",arccos:"Arc cosinus",arctan:"Arc tangente",deriv:"Dérivée",partial:"Dérivée partielle",int:"Intégrale",oint:"Intégrale curviligne sur un contour fermé",sum:"Somme",prod:"Produit",lim:"Limite"}},sets:{title:"Ensembles",buttons:{cset:"Complexes",pset:"Premiers",nset:"Naturels",qset:"Rationels",rset:"Réels",zset:"Entiers",emptyset:"Ensemble vide",forall:"Quel que soit",exists:"Il existe",nexists:"Il n’existe pas",in:"Appartient",nin:"N’appartient pas",subset:"Est inclus dans (sous-ensemble)",supset:"Inclut (sur-ensemble)",nsubset:"N’est pas inclus dans",nsupset:"N’inclut pas",intersection:"Intersection",union:"Union",to:"To",implies:"Implique",impliedby:"Implied by",nimplies:"Not implies",iff:"Equivalent to"}},matrices:{title:"Matrices",buttons:{vector:"Vecteur",widehat:"Chapeau (angle)",matrix:"Matrice",pmatrix:"Matrice avec parenthèses",bmatrix:"Matrice avec crochets",bbmatrix:"Matrice with accolades",vmatrix:"Matrice avec lignes verticales",vvmatrix:"Matrice à double ligne verticale",column:"Ajouter un colonne",row:"Ajouter une rangée"}},statistics:{title:"Statistiques",buttons:{factorial:"Factorielle",binomial:"Combinaison",overline:"Surlignage (moyenne)"}}})),f){var N=f.prototype.options;N.messages=r.a.extend(!0,N.messages,{play:"Jouer/Pauser",mute:"Avec/Sans son",full:"Plein écran",notSupported:"Fichier non supporté"})}if(y){var L=y.prototype.options;L.messages=r.a.extend(!0,L.messages,{clear:"Effacer",delete:"Supprimer"})}if(b){var j=b.prototype.options;j.messages=r.a.extend(!0,j.messages,{placeholder:"Sélectionner..."})}if(k){var z=k.prototype.options;z.messages=r.a.extend(!0,z.messages,{empty:"Rien à afficher"})}if(x){var D=x.prototype.options;D.messages=r.a.extend(!0,D.messages,{empty:"Rien à afficher",page:"Page",of:"de {0}",first:"Aller à la première page",previous:"Aller à la page précédente",next:"Aller à la prochaine page",last:"Aller à la dernière page",refresh:"Rafraichîr",morePages:"Plus de pages"})}if(A){var U=A.prototype.options;U.messages=r.a.extend(!0,U.messages,{property:"Propriété",value:"Valeur"})}if(M){var B=M.prototype.options;B.messages=r.a.extend(!0,B.messages,{optionLabel:"Sélectionner..."})}if(E){var H=E.prototype.options;H.messages=r.a.extend(!0,H.messages,{classroom:"Partager sur Google Classroom",facebook:"Partager sur Facebook",google:"Partager sur Google+",linkedin:"Partager sur LinkedIn",pinterest:"Partager sur Pinterest",twitter:"Partager sur Twitter"})}if(w){var O=w.prototype.options;O.messages=r.a.extend(!0,O.messages,{contextMenu:{delete:"Supprimer",duplicate:"Dupliquer"},noPage:"Veuillez ajouter ou sélectionner une page"})}if(P){var V=P.prototype.options;V.messages=r.a.extend(!0,V.messages,{columns:{name:"Nom",value:"Valeur"},toolbar:{create:"Nouveau",destroy:"Effacer"},validation:{name:"Nom de style manquant",value:"Valeur manquante"}})}}window.kendo.culture("fr-FR");var G=i(382);t.default=G},380:function(e,t,i){var s,r,o;r=[i(21)],void 0===(o="function"==typeof(s=function(){kendo.cultures["fr-FR"]={name:"fr-FR",numberFormat:{pattern:["-n"],decimals:2,",":" ",".":",",groupSize:[3],percent:{pattern:["-n %","n %"],decimals:2,",":" ",".":",",groupSize:[3],symbol:"%"},currency:{name:"Euro",abbr:"EUR",pattern:["-n $","n $"],decimals:2,",":" ",".":",",groupSize:[3],symbol:"€"}},calendars:{standard:{days:{names:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],namesAbbr:["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],namesShort:["di","lu","ma","me","je","ve","sa"]},months:{names:["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],namesAbbr:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."]},AM:[""],PM:[""],patterns:{d:"dd/MM/yyyy",D:"dddd d MMMM yyyy",F:"dddd d MMMM yyyy HH:mm:ss",g:"dd/MM/yyyy HH:mm",G:"dd/MM/yyyy HH:mm:ss",m:"d MMMM",M:"d MMMM",s:"yyyy'-'MM'-'dd'T'HH':'mm':'ss",t:"HH:mm",T:"HH:mm:ss",u:"yyyy'-'MM'-'dd HH':'mm':'ss'Z'",y:"MMMM yyyy",Y:"MMMM yyyy"},"/":"/",":":":",firstDay:1}}}})?s.apply(t,r):s)||(e.exports=o)},381:function(e,t,i){var s,r,o;r=[i(21)],void 0===(o="function"==typeof(s=function(){!function(e,t){kendo.ui.FilterCell&&(kendo.ui.FilterCell.prototype.options.operators=e.extend(!0,kendo.ui.FilterCell.prototype.options.operators,{date:{eq:"Est égal à",gte:"Est postérieur ou égal à",gt:"Est postérieur",lte:"Est antérieur ou égal à",lt:"Est antérieur",neq:"N’est pas égal à",isnull:"Est nulle",isnotnull:"N’est pas nulle"},number:{eq:"Est égal à",gte:"Est supérieur ou égal à",gt:"Est supérieur à",lte:"Est inférieur ou égal à",lt:"Est inférieur à",neq:"N’est pas égal à",isnull:"Est nulle",isnotnull:"N’est pas nulle"},string:{endswith:"Se termine par",eq:"Est égal à",neq:"N’est pas égal à",startswith:"Commence par",contains:"Contient",doesnotcontain:"Ne contient pas",isnull:"Est nulle",isnotnull:"N’est pas nulle",isempty:"Est vide",isnotempty:"N’est pas vide",isnullorempty:"A une valeur",isnotnullorempty:"N'a pas de valeur"},enums:{eq:"Est égal à",neq:"N’est pas égal à",isnull:"Est nulle",isnotnull:"N’est pas nulle"}})),kendo.ui.FilterMenu&&(kendo.ui.FilterMenu.prototype.options.operators=e.extend(!0,kendo.ui.FilterMenu.prototype.options.operators,{date:{eq:"Est égal à",gte:"Est postérieur ou égal à",gt:"Est postérieur",lte:"Est antérieur ou égal à",lt:"Est antérieur",neq:"N’est pas égal à",isnull:"Est nulle",isnotnull:"N’est pas nulle"},number:{eq:"Est égal à",gte:"Est supérieur ou égal à",gt:"Est supérieur à",lte:"Est inférieur ou égal à",lt:"Est inférieur à",neq:"N’est pas égal à",isnull:"Est nulle",isnotnull:"N’est pas nulle"},string:{endswith:"Se termine par",eq:"Est égal à",neq:"N’est pas égal à",startswith:"Commence par",contains:"Contient",doesnotcontain:"Ne contient pas",isnull:"Est nulle",isnotnull:"N’est pas nulle",isempty:"Est vide",isnotempty:"N’est pas vide",isnullorempty:"A une valeur",isnotnullorempty:"N'a pas de valeur"},enums:{eq:"Est égal à",neq:"N’est pas égal à",isnull:"Est nulle",isnotnull:"N’est pas nulle"}})),kendo.ui.ColumnMenu&&(kendo.ui.ColumnMenu.prototype.options.messages=e.extend(!0,kendo.ui.ColumnMenu.prototype.options.messages,{columns:"Colonnes",sortAscending:"Tri croissant",sortDescending:"Tri décroissant",settings:"Paramètres de colonne",done:"Fini",lock:"Bloquer",unlock:"Ouvrir"})),kendo.ui.RecurrenceEditor&&(kendo.ui.RecurrenceEditor.prototype.options.messages=e.extend(!0,kendo.ui.RecurrenceEditor.prototype.options.messages,{daily:{interval:"jour(s)",repeatEvery:"Répéter chaque:"},end:{after:" Après",occurrence:"occurrence(s)",label:"Finir:",never:"Jamais",on:"Sur",mobileLabel:"Ends"},frequencies:{daily:"Une fois par jour",monthly:"Une fois par mois",never:"Jamais",weekly:"Une fois par semaine",yearly:"Une fois par an"},monthly:{day:"Jour",interval:"mois",repeatEvery:"Répéter chaque:",repeatOn:"Répéter l'opération sur:"},offsetPositions:{first:"premier",fourth:"quatrième",last:"dernier",second:"second",third:"troisième"},weekly:{repeatEvery:"Répéter chaque:",repeatOn:"Répéter l'opération sur:",interval:"semaine(s)"},yearly:{of:"de",repeatEvery:"Répéter chaque:",repeatOn:"Répéter l'opération sur:",interval:"année(ans)"},weekdays:{day:"jour",weekday:"jour de la semaine",weekend:"jour de week-end"}})),kendo.ui.Grid&&(kendo.ui.Grid.prototype.options.messages=e.extend(!0,kendo.ui.Grid.prototype.options.messages,{commands:{create:"Insérer",destroy:"Effacer",canceledit:"Annuler",update:"Mettre à jour",edit:"Éditer",excel:"Export vers Excel",pdf:"Export en PDF",select:"Sélectionner",cancel:"Annuler les modifications",save:"Enregistrer les modifications"},editable:{confirmation:"Êtes-vous sûr de vouloir supprimer cet enregistrement?",cancelDelete:"Annuler",confirmDelete:"Effacer"},noRecords:"Aucun enregistrement disponible."})),kendo.ui.TreeList&&(kendo.ui.TreeList.prototype.options.messages=e.extend(!0,kendo.ui.TreeList.prototype.options.messages,{noRows:"Aucun enregistrement à afficher",loading:"Chargement...",requestFailed:"La requête a échoué.",retry:"Réessayer",commands:{edit:"Modifier",update:"Mettre à jour",canceledit:"Annuler",create:"Créer",createchild:"Créer un élément enfant",destroy:"Supprimer",excel:"Export Excel",pdf:"Export PDF"}})),kendo.ui.Pager&&(kendo.ui.Pager.prototype.options.messages=e.extend(!0,kendo.ui.Pager.prototype.options.messages,{allPages:"Tous",page:"Page",display:"Afficher les items {0} - {1} de {2}",of:"de {0}",empty:"Aucun enregistrement à afficher.",refresh:"Actualiser",first:"Aller à la première page",itemsPerPage:"articles par page",last:"Aller à la dernière page",next:"Aller à la page suivante",previous:"Aller à la page précédente",morePages:"Plusieurs pages"})),kendo.ui.TreeListPager&&(kendo.ui.TreeListPager.prototype.options.messages=e.extend(!0,kendo.ui.TreeListPager.prototype.options.messages,{allPages:"Tous",page:"Page",display:"Afficher les items {0} - {1} de {2}",of:"de {0}",empty:"Aucun enregistrement à afficher.",refresh:"Actualiser",first:"Aller à la première page",itemsPerPage:"articles par page",last:"Aller à la dernière page",next:"Aller à la page suivante",previous:"Aller à la page précédente",morePages:"Plusieurs pages"})),kendo.ui.FilterCell&&(kendo.ui.FilterCell.prototype.options.messages=e.extend(!0,kendo.ui.FilterCell.prototype.options.messages,{filter:"Filtrer",clear:"Effacer filtre",isFalse:"est fausse",isTrue:"est vrai",operator:"Opérateur"})),kendo.ui.FilterMenu&&(kendo.ui.FilterMenu.prototype.options.messages=e.extend(!0,kendo.ui.FilterMenu.prototype.options.messages,{filter:"Filtrer",and:"Et",clear:"Effacer filtre",info:"Afficher les lignes avec la valeur qui",title:"Afficher les lignes avec la valeur qui",selectValue:"-Sélectionner-",isFalse:"est fausse",isTrue:"est vrai",or:"Ou",cancel:"Annuler",operator:"Opérateur",value:"Valeur"})),kendo.ui.FilterMultiCheck&&(kendo.ui.FilterMultiCheck.prototype.options.messages=e.extend(!0,kendo.ui.FilterMultiCheck.prototype.options.messages,{checkAll:"Choisir toutes",clear:"Effacer filtre",filter:"Filtrer",search:"Recherche"})),kendo.ui.Groupable&&(kendo.ui.Groupable.prototype.options.messages=e.extend(!0,kendo.ui.Groupable.prototype.options.messages,{empty:"Faites glisser un en-tête de colonne et déposer ici pour grouper par cette colonne."})),kendo.ui.Editor&&(kendo.ui.Editor.prototype.options.messages=e.extend(!0,kendo.ui.Editor.prototype.options.messages,{bold:"Gras",createLink:"Insérer un lien hypertexte",fontName:"Police",fontNameInherit:"(police héritée)",fontSize:"Taille de police",fontSizeInherit:"(taille héritée)",formatBlock:"Style du paragraphe",indent:"Augmenter le retrait",insertHtml:"Insérer HTML",insertImage:"Insérer image",insertOrderedList:"Liste numérotée",insertUnorderedList:"Liste à puces",italic:"Italique",justifyCenter:"Centrer",justifyFull:"Justifier",justifyLeft:"Aligner le texte à gauche",justifyRight:"Aligner le texte à droite",outdent:"Diminuer le retrait",strikethrough:"Barré",styles:"Styles",subscript:"Subscript",superscript:"Superscript",underline:"Souligné",unlink:"Supprimer le lien hypertexte",deleteFile:'Êtes-vous sûr de vouloir supprimer "{0}"?',directoryNotFound:"Un répertoire avec ce nom n'a pas été trouvé.",emptyFolder:"Vider le dossier",invalidFileType:'Le fichier sélectionné "{0}" n\'est pas valide. Les types de fichiers supportés sont {1}.',orderBy:"Organiser par:",orderByName:"Nom",orderBySize:"Taille",overwriteFile:'Un fichier avec le nom "{0}" existe déjà dans le répertoire courant. Voulez-vous le remplacer?',uploadFile:"Télécharger",backColor:"Couleur de fond",foreColor:"Couleur",dialogButtonSeparator:"Ou",dialogCancel:"Fermer",dialogInsert:"Insérer",imageAltText:"Le texte de remplacement",imageWebAddress:"Adresse Web",imageWidth:"Largeur (px)",imageHeight:"Hauteur (px)",linkOpenInNewWindow:"Ouvrir dans une nouvelle fenêtre",linkText:"Text",linkToolTip:"Info-bulle",linkWebAddress:"Adresse Web",search:"Search",createTable:"Insérer un tableau",addColumnLeft:"Ajouter colonne à gauche",addColumnRight:"Ajouter colonne à droite",addRowAbove:"Ajouter ligne au-dessus",addRowBelow:"Ajouter ligne au-dessous",deleteColumn:"Supprimer la colonne",deleteRow:"Supprimer la ligne",dropFilesHere:"drop files here to upload",formatting:"Format",viewHtml:"View HTML",dialogUpdate:"Update",insertFile:"Insérer un Fichier",dialogOk:"OK",tableWizard:"Assistant de tableau",tableTab:"Table",cellTab:"Cellule",accessibilityTab:"Accessibilité",caption:"Sous-titre",summary:"Sommaire",width:"Largeur",height:"Hauteur",cellSpacing:"Espacement des cellules",cellPadding:"Rembourrage des cellules",cellMargin:"Marge des cellules",alignment:"Alignement",background:"Fond",cssClass:"CSS Classe",id:"Id",border:"Bordure",borderStyle:"Style de bordure",collapseBorders:"Rétracter bordures",wrapText:"Renvoi à la ligne",associateCellsWithHeaders:"Cellules associées aux entêtes",alignLeft:"Aligner à gauche",alignCenter:"Aligner le centre",alignRight:"Aligner à droite",alignLeftTop:"Aligner à gauche et haut",alignCenterTop:"Aligner le centre et haut",alignRightTop:"Aligner à droite et haut",alignLeftMiddle:"Aligner à gauche et milieu",alignCenterMiddle:"Aligner le centre et milieu",alignRightMiddle:"Aligner à droite et milieu",alignLeftBottom:"Aligner à gauche et bas",alignCenterBottom:"Aligner le centre et bas",alignRightBottom:"Aligner à droite et bas",alignRemove:"Retirer alignement",columns:"Colonnes",rows:"Lignes",selectAllCells:"Sélectionner toutes les cellules"}));var i={uploadFile:"Charger",orderBy:"Trier par",orderByName:"Nom",orderBySize:"Taille",directoryNotFound:"Aucun répértoire de ce nom.",emptyFolder:"Répertoire vide",deleteFile:'Etes-vous sûr de vouloir supprimer "{0}"?',invalidFileType:'Le fichier sélectionné "{0}" n\'est pas valide. Les type fichiers supportés sont {1}.',overwriteFile:'Un fichier du nom "{0}" existe déjà dans ce répertoire. Voulez-vous le remplacer?',dropFilesHere:"glissez les fichiers ici pour les charger",search:"Recherche"};kendo.ui.FileBrowser&&(kendo.ui.FileBrowser.prototype.options.messages=e.extend(!0,kendo.ui.FileBrowser.prototype.options.messages,i)),kendo.ui.ImageBrowser&&(kendo.ui.ImageBrowser.prototype.options.messages=e.extend(!0,kendo.ui.ImageBrowser.prototype.options.messages,i)),kendo.ui.Upload&&(kendo.ui.Upload.prototype.options.localization=e.extend(!0,kendo.ui.Upload.prototype.options.localization,{cancel:"Annuler",dropFilesHere:"déposer les fichiers à télécharger ici",remove:"Retirer",retry:"Réessayer",select:"Sélectionner...",statusFailed:"échoué",statusUploaded:"téléchargé",statusUploading:"téléchargement",uploadSelectedFiles:"Télécharger des fichiers",headerStatusUploaded:"Done",headerStatusUploading:"Uploading..."})),kendo.ui.Scheduler&&(kendo.ui.Scheduler.prototype.options.messages=e.extend(!0,kendo.ui.Scheduler.prototype.options.messages,{allDay:"toute la journée",cancel:"Annuler",editable:{confirmation:"Etes-vous sûr de vouloir supprimer cet élément?"},date:"Date",destroy:"Effacer",editor:{allDayEvent:"Toute la journée",description:"Description",editorTitle:"Evènement",end:"Fin",endTimezone:"End timezone",repeat:"Répéter",separateTimezones:"Use separate start and end time zones",start:"Début",startTimezone:"Start timezone",timezone:" ",timezoneEditorButton:"Fuseau horaire",timezoneEditorTitle:"Fuseaux horaires",title:"Titre",noTimezone:"Pas de fuseau horaire"},event:"Evènement",recurrenceMessages:{deleteRecurring:"Voulez-vous supprimer seulement cet évènement ou toute la série?",deleteWindowOccurrence:"Suppression de l'élément courant",deleteWindowSeries:"Suppression de toute la série",deleteWindowTitle:"Suppression d'un élément récurrent",editRecurring:"Voulez-vous modifier seulement cet évènement ou toute la série?",editWindowOccurrence:"Modifier l'occurrence courante",editWindowSeries:"Modifier la série",editWindowTitle:"Modification de l'élément courant"},save:"Sauvegarder",time:"Time",today:"Aujourd'hui",views:{agenda:"Agenda",day:"Jour",month:"Mois",week:"Semaine",workWeek:"Semaine de travail",timeline:"Chronologie"},deleteWindowTitle:"Suppression de l'élément",showFullDay:"Montrer toute la journée",showWorkDay:"Montrer les heures ouvrables"})),kendo.ui.Validator&&(kendo.ui.Validator.prototype.options.messages=e.extend(!0,kendo.ui.Validator.prototype.options.messages,{required:"{0} est requis",pattern:"{0} n'est pas valide",min:"{0} doit être plus grand ou égal à {1}",max:"{0} doit être plus petit ou égal à {1}",step:"{0} n'est pas valide",email:"{0} n'est pas un courriel valide",url:"{0} n'est pas une adresse web valide",date:"{0} n'est pas une date valide",dateCompare:"La date de fin doit être postérieure à la date de début"})),kendo.ui.Dialog&&(kendo.ui.Dialog.prototype.options.messages=e.extend(!0,kendo.ui.Dialog.prototype.options.localization,{close:"Fermer"})),kendo.ui.Alert&&(kendo.ui.Alert.prototype.options.messages=e.extend(!0,kendo.ui.Alert.prototype.options.localization,{okText:"OK"})),kendo.ui.Confirm&&(kendo.ui.Confirm.prototype.options.messages=e.extend(!0,kendo.ui.Confirm.prototype.options.localization,{okText:"OK",cancel:"Annuler"})),kendo.ui.Prompt&&(kendo.ui.Prompt.prototype.options.messages=e.extend(!0,kendo.ui.Prompt.prototype.options.localization,{okText:"OK",cancel:"Annuler"})),kendo.ui.ListBox&&(kendo.ui.ListBox.prototype.options.messages=e.extend(!0,kendo.ui.ListBox.prototype.options.messages,{tools:{remove:"Supprimer",moveUp:"Déplacer vers le haut",moveDown:"Déplacer vers le bas",transferTo:"Transférer à",transferFrom:"Transférer de",transferAllTo:"Transférer tout à",transferAllFrom:"Transférer tout de"}}))}(window.kendo.jQuery)})?s.apply(t,r):s)||(e.exports=o)},382:function(e){e.exports={locale:"fr",languages:[{value:"en",name:"Anglais",icon:""},{value:"fr",name:"Français",icon:""}],themes:[{value:"black",name:"Black",colors:[]},{value:"bootstrap",name:"Bootstrap",colors:[]},{value:"flat",name:"Flat",colors:[]},{value:"highcontrast",name:"High Contrast",colors:[]},{value:"indigo",name:"Indigo",colors:[]},{value:"nordic",name:"Nordic",colors:[]},{value:"turquoise",name:"Turquoise",colors:[]},{value:"urban",name:"Urban",colors:[]},{value:"vintage",name:"Vintage",colors:[]}],meta:{author:"Memba Sarl",title:"Memba",description:"Nous sommes les créateurs de Kidoju",keywords:"Kidoju - Une nouvelle façon d'enseigner et d'apprendre",category:"Divers",icon:"typewriter"},header:{navbar:{toggle:"Changer la navigation",search:{text:"Rechercher",placeholder:"Recherche..."}}},footer:{copyright:"Version %s - Copyright &copy; 2013-2019 Memba Sarl.",language:{label:"Langue:"},theme:{label:"Thème:"}},home:{},error:{icon:"error",back:"Retour"},groups:{authors:{icon:"users3",heading:"Auteurs"},calendar:{icon:"calendar",heading:"Calendrier"},categories:{icon:"tags",heading:"Catégories"}},search:{title:{icon:"magnifying_glass",heading:"Résultats de recherche"}},errors:{http:{400:{status:400,title:"400 - Mauvaise Requête",message:"Désolé, mais votre requête est mal formulée. L'URL est peut-être mal ortographiée."},401:{status:401,title:"401 - Non autorisé",message:"Désolé, mais votre requête n'est pas autorisée."},403:{status:403,title:"403 - Forbidden",message:"Désolé, mais votre requête est interdite."},404:{status:404,title:"404 - Introuvable",message:"Désolé, mais la page demandée est introuvable. L'URL est peut-être mal ortographiée ou la page que vous recherchez n'est peut-être plus disponible."},500:{status:500,title:"500 - Erreur Inconnue",message:"Il y a eu une erreur inconnue. Si nous arrivons à la reproduire, nous la corrigerons avec amour et attention."},1000:{status:500,title:"1000 - Désactivez le mode privé ou mettez à jour votre navigateur",message:"This web site utilise les fonctionnalités des navigateurs récents, notamment (mais pas seulement) l’audio et la vidéo, les blobs, les canvas, les transformations css, les api de fichiers, le stockage local et de session, les graphiques vectoriels (SVG) et les « web workers »."}},mongoose:{validation:{status:400,title:"400 - Mauvaise Requête",message:"Erreur de validation de base de données."}},params:{invalidFileId:{status:404,title:"404 - Introuvable",message:"Identifiant de fichier erroné: veuillez utiliser un nom de 3 à 50 et une extension de 2 à 7 caractères alphanumeriques"},invalidLanguage:{status:404,title:"404 - Introuvable",message:"Langue erronée: cette langue n'est pas définie."},invalidMonth:{status:404,title:"404 - Introuvable",message:"Mois erroné: veuillez utiliser un nombre à quatre chiffres compris entre 01 et 12."},invalidObjectId:{status:404,title:"404 - Introuvable",message:"Identifiant d'objet erroné: un identifiant est une chaîne de 24 caractères hexadécimaux."},invalidProvider:{status:404,title:"404 - Introuvable",message:"Service erroné: utlisez `facebook`, `google`, `live` ou `twitter`"},invalidYear:{status:404,title:"404 - Introuvable",message:"Année erronée: veuillez utiliser un nombre à quatre chiffres compris entre 2014 et l'année en cours."}},routes:{hookRoute:{badAgent:{status:400,title:"400 - Mauvaise Requête",message:"Agent utilisateur inconnu: `%s`."}}}}}}}]);