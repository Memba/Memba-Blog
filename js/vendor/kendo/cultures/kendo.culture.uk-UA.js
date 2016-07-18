/** 
 * Kendo UI v2016.2.714 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2016 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/

(function(f){
    if (typeof define === 'function' && define.amd) {
        define(["kendo.core"], f);
    } else {
        f();
    }
}(function(){
(function( window, undefined ) {
    kendo.cultures["uk-UA"] = {
        name: "uk-UA",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Ukrainian Hryvnia",
                abbr: "UAH",
                pattern: ["-n$","n$"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "₴"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["неділя","понеділок","вівторок","середа","четвер","п\u0027ятниця","субота"],
                    namesAbbr: ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],
                    namesShort: ["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]
                },
                months: {
                    names: ["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень"],
                    namesAbbr: ["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру"]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy' р.'",
                    F: "d MMMM yyyy' р.' H:mm:ss",
                    g: "dd.MM.yyyy H:mm",
                    G: "dd.MM.yyyy H:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy' р.'",
                    Y: "MMMM yyyy' р.'"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
}));