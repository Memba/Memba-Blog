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
    kendo.cultures["vai-Vaii"] = {
        name: "vai-Vaii",
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
                name: "",
                abbr: "",
                pattern: ["-$n","$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "$"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ꕞꕌꔵ","ꗳꗡꘉ","ꕚꕞꕚ","ꕉꕞꕒ","ꕉꔤꕆꕢ","ꕉꔤꕀꕮ","ꔻꔬꔳ"],
                    namesAbbr: ["ꕞꕌꔵ","ꗳꗡꘉ","ꕚꕞꕚ","ꕉꕞꕒ","ꕉꔤꕆꕢ","ꕉꔤꕀꕮ","ꔻꔬꔳ"],
                    namesShort: ["ꕞꕌꔵ","ꗳꗡꘉ","ꕚꕞꕚ","ꕉꕞꕒ","ꕉꔤꕆꕢ","ꕉꔤꕀꕮ","ꔻꔬꔳ"]
                },
                months: {
                    names: ["ꖨꕪꖃ ꔞꕮ","ꕒꕡꖝꖕ","ꕾꖺ","ꖢꖕ","ꖑꕱ","6","7","ꗛꔕ","ꕢꕌ","ꕭꖃ","ꔞꘋꕔꕿ ꕸꖃꗏ","ꖨꕪꕱ ꗏꕮ"],
                    namesAbbr: ["ꖨꕪꖃ ꔞꕮ","ꕒꕡꖝꖕ","ꕾꖺ","ꖢꖕ","ꖑꕱ","6","7","ꗛꔕ","ꕢꕌ","ꕭꖃ","ꔞꘋꕔꕿ ꕸꖃꗏ","ꖨꕪꕱ ꗏꕮ"]
                },
                AM: ["AM","am","AM"],
                PM: ["PM","pm","PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    g: "dd/MM/yyyy h:mm tt",
                    G: "dd/MM/yyyy h:mm:ss tt",
                    m: "MMMM d",
                    M: "MMMM d",
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