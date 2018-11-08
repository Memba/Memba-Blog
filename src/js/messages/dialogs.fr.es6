/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// https://github.com/benmosher/eslint-plugin-import/issues/1097
// eslint-disable-next-line import/extensions, import/no-unresolved
import $ from 'jquery';

if (window.kidoju && window.kidoju.dialogs) {
    window.kidoju.dialogs.messages = $.extend(
        true,
        {},
        window.kidoju.dialogs.messages,
        {
            /* kidoju.dialogs.chargrid */
            chargrid: {
                layout:
                    '<h3>Concevez la grille</h3><p>Chaque caractère saisi dans la grille est verrouillé et ne peut être modifié  en mode d’exécution.</p><p>Utilisez le caractère `{0}` pour désigner les cellules vides.</p>',
                solution:
                    '<h3>Saisissez la solution</h3><p>Utilisez les caractères autorisés de la liste blanche, i.e. `{0}`.</p>'
            },

            /* kidoju.dialogs.finder */
            finder: {
                language: 'Langue',
                me: 'Mes projets',
                published: 'Publié le {0:dd-MMM-yyyy} par {1}',
                search: 'Recherche'
            },

            /* kidoju.dialogs.newsummary */
            newsummary: {},

            /* kidoju.dialogs.publish */
            publish: {},

            /* kidoju.dialogs.quizwizard */
            quizwizard: {
                add: 'Ajouter',
                message:
                    'Veuillez saisir une question et remplir la grille avec les choix multiples.',
                option: 'Option',
                question: 'Question',
                solution: 'Solution',
                text: 'Option 1',
                validation: {
                    grid:
                        'Au moins une option et une solution cochée sont requises. Les options ne peuvent pas non plus être laissées vides.',
                    question: 'Une question est requise.'
                }
            },

            /* kidoju.dialogs.signin */
            signin: {},

            /* kidoju.dialogs.textboxwizard */
            textboxwizard: {
                message:
                    'Veuillez saisir une question et des solutions (une par ligne) à comparer aux réponses',
                question: 'Question',
                solution: 'Solution',
                validation: {
                    question: 'Une question est requise.',
                    solution: 'Une solution est requise.'
                }
            }
        }
    );
}
