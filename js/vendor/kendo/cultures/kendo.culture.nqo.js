/** 
 * Kendo UI v2016.1.406 (http://www.telerik.com/kendo-ui)                                                                                                                                               
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
    kendo.cultures["nqo"] = {
        name: "nqo",
        numberFormat: {
            pattern: ["n-"],
            decimals: 3,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["%-n","%n"],
                decimals: 3,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "",
                abbr: "",
                pattern: ["n- $","$ n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "ߖߕ."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["ߞߊ߯ߙߌ","ߞߐ߬ߓߊ߬ߟߏ߲","ߞߐ߬ߟߏ߲","ߞߎߣߎ߲ߟߏ߲","ߓߌߟߏ߲","ߛߌ߬ߣߌ߲߬ߟߏ߲","ߞߍ߲ߘߍߟߏ߲"],
                    namesAbbr: ["ߞߊ߯ߙ","ߞߐ߬ߓ","ߞߐ߬ߟ","ߞߎߣ","ߓߌߟ","ߛߌ߬ߣ","ߞߍ߲ߘ"],
                    namesShort: ["ߞߊ","ߞߐ","ߞߟ","ߞߎ","ߓߌ","ߛߌ","ߞߍ"]
                },
                months: {
                    names: ["ߓߌ߲ߠߊߥߎߟߋ߲","ߞߏ߲ߞߏߜߍ","ߕߙߊߓߊ","ߞߏ߲ߞߏߘߌ߬ߓߌ","ߘߓߊ߬ߕߊ","ߥߊ߬ߛߌߥߊ߬ߙߊ","ߞߊ߬ߙߌߝߐ߭","ߘߓߊ߬ߓߌߟߊ","ߕߎߟߊߝߌ߲","ߞߏ߲ߓߌߕߌ߮","ߣߍߣߍߓߊ","ߞߏ߬ߟߌ߲߬ߞߏߟߌ߲"],
                    namesAbbr: ["ߓߌ߲ߠ","ߞߏ߲ߞ","ߕߙߊ","ߞߏ߲ߘ","ߘߓߕ","ߥߊ߬ߛ","ߞߊ߬ߙ","ߘߓߊ߬","ߕߎߟ","ߞߏ߲ߓ","ߣߍߣ","ߞߏ߬ߟ"]
                },
                AM: ["ߛ","ߛ","ߛ"],
                PM: ["ߥ","ߥ","ߥ"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    F: "dddd, MMMM dd, yyyy tt hh:mm:ss",
                    g: "dd/MM/yyyy tt hh:mm",
                    G: "dd/MM/yyyy tt hh:mm:ss",
                    m: "MMMM ߕߟߋ߬ dd",
                    M: "MMMM ߕߟߋ߬ dd",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
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