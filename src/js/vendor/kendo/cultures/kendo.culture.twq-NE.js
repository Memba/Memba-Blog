/** 
 * Kendo UI v2021.1.330 (http://www.telerik.com/kendo-ui)                                                                                                                                               
 * Copyright 2021 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.                                                                                      
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
    kendo.cultures["twq-NE"] = {
        name: "twq-NE",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "West African CFA Franc",
                abbr: "XOF",
                pattern: ["-n$","n$"],
                decimals: 0,
                ",": " ",
                ".": ".",
                groupSize: [3],
                symbol: "CFA"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Alhadi","Atinni","Atalaata","Alarba","Alhamiisa","Alzuma","Asibti"],
                    namesAbbr: ["Alh","Ati","Ata","Ala","Alm","Alz","Asi"],
                    namesShort: ["Alh","Ati","Ata","Ala","Alm","Alz","Asi"]
                },
                months: {
                    names: ["Žanwiye","Feewiriye","Marsi","Awiril","Me","Žuweŋ","Žuyye","Ut","Sektanbur","Oktoobur","Noowanbur","Deesanbur"],
                    namesAbbr: ["Žan","Fee","Mar","Awi","Me","Žuw","Žuy","Ut","Sek","Okt","Noo","Dee"]
                },
                AM: ["Subbaahi","subbaahi","SUBBAAHI"],
                PM: ["Zaarikay b","zaarikay b","ZAARIKAY B"],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd d MMMM yyyy",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    g: "d/M/yyyy HH:mm",
                    G: "d/M/yyyy HH:mm:ss",
                    m: "MMMM d",
                    M: "MMMM d",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "yyyy MMMM",
                    Y: "yyyy MMMM"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
}));