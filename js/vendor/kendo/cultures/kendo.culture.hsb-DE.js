/** 
 * Kendo UI v2018.1.117 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2018 Telerik AD. All rights reserved.                                                                                                                                                      
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
    kendo.cultures["hsb-DE"] = {
        name: "hsb-DE",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n %","n %"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Euro",
                abbr: "EUR",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "€"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["njedźela","póndźela","wutora","srjeda","štwórtk","pjatk","sobota"],
                    namesAbbr: ["nje","pón","wut","srj","štw","pja","sob"],
                    namesShort: ["nj","pó","wu","sr","št","pj","so"]
                },
                months: {
                    names: ["januar","februar","měrc","apryl","meja","junij","julij","awgust","september","oktober","nowember","december"],
                    namesAbbr: ["jan","feb","měr","apr","mej","jun","jul","awg","sep","okt","now","dec"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "d.M.yyyy",
                    D: "dddd, d. MMMM yyyy",
                    F: "dddd, d. MMMM yyyy H:mm:ss",
                    g: "d.M.yyyy H:mm 'hodź'.",
                    G: "d.M.yyyy H:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm 'hodź'.",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
}));