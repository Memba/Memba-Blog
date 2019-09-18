/** 
 * Kendo UI v2019.3.917 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2019 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
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
    kendo.cultures["fa-IR"] = {
        name: "fa-IR",
        numberFormat: {
            pattern: ["n-"],
            decimals: 2,
            ",": ",",
            ".": "/",
            groupSize: [3],
            percent: {
                pattern: ["n- %","n %"],
                decimals: 2,
                ",": ",",
                ".": "/",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Iranian Rial",
                abbr: "IRR",
                pattern: ["n-$","n$"],
                decimals: 2,
                ",": ",",
                ".": "/",
                groupSize: [3],
                symbol: "ريال"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
                    namesAbbr: ["يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],
                    namesShort: ["ی","د","س","چ","پ","ج","ش"]
                },
                months: {
                    names: ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"],
                    namesAbbr: ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"]
                },
                AM: ["ق.ظ","ق.ظ","ق.ظ"],
                PM: ["ب.ظ","ب.ظ","ب.ظ"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy hh:mm:ss tt",
                    g: "dd/MM/yyyy hh:mm tt",
                    G: "dd/MM/yyyy hh:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM, yyyy",
                    Y: "MMMM, yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 6
            }
        }
    }
})(this);
}));