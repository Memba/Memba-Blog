/**
 * Kendo UI v2023.3.1010 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
(function( window, undefined ) {
    kendo.cultures["sq-MK"] = {
        name: "sq-MK",
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
                name: "Macedonian Denar",
                abbr: "MKD",
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "den"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],
                    namesAbbr: ["Die","Hën","Mar","Mër","Enj","Pre","Sht"],
                    namesShort: ["die","hën","mar","mër","enj","pre","sht"]
                },
                months: {
                    names: ["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor"],
                    namesAbbr: ["jan","shk","mar","pri","maj","qer","korr","gush","sht","tet","nën","dhj"]
                },
                AM: ["p.d.","p.d.","P.D."],
                PM: ["m.d.","m.d.","M.D."],
                patterns: {
                    d: "d.M.yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    g: "d.M.yyyy HH:mm",
                    G: "d.M.yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    };
})();
