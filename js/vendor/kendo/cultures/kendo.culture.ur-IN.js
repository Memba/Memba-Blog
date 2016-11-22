/** 
 * Kendo UI v2016.3.1118 (http://www.telerik.com/kendo-ui)                                                                                                                                              
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
    kendo.cultures["ur-IN"] = {
        name: "ur-IN",
        numberFormat: {
            pattern: ["-n"],
            decimals: 0,
            ",": ",",
            ".": ".",
            groupSize: [3,2],
            percent: {
                pattern: ["-n%","%n"],
                decimals: 0,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "٪"
            },
            currency: {
                name: "Indian Rupee",
                abbr: "INR",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3,2],
                symbol: "₹"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"],
                    namesAbbr: ["اتوار","پیر","منگل","بدھ","جمعرات","جمعہ","ہفتہ"],
                    namesShort: ["ا","پ","م","ب","ج","ج","ہ"]
                },
                months: {
                    names: ["جنوری","فروری","مارچ","اپریل"," مئی","جون"," جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"],
                    namesAbbr: ["جنوری","فروری","مارچ","اپریل"," مئی","جون"," جولائی","اگست","ستمبر","اکتوبر","نومبر","دسمبر"]
                },
                AM: ["دن","دن","دن"],
                PM: ["رات","رات","رات"],
                patterns: {
                    d: "d/M/yy",
                    D: "dddd, d MMMM, yyyy",
                    F: "dddd, d MMMM, yyyy h:mm:ss tt",
                    g: "d/M/yy h:mm tt",
                    G: "d/M/yy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
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