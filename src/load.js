// Note: the following is pure JavaScript (no api) to be executed by search engine bots
var LF = '\n', COLON = ':';
/**
 * Returns an object containing metadata properties defined as key: value\n pairs at the beginning of the markdown file
 * Important Note: the following code should remain consistent with the code in memba.markdown.js and util.js
 * See: https://github.com/Memba/Memba-Widgets/blob/master/src/js/memba.markdown.js
 * See also: https://github.com/Memba/grunt-blog/blob/master/tasks/lib/util.js
 * See also: https://github.com/Memba/Memba-Blog/blob/master/src/index.html
 * @method getMetaData
 * @param stream
 * @returns {string}
 */
function getMetaData(stream) {
    var buf = stream.trim().replace(/\r\n/gm, LF).replace(/\r/gm, LF),
        metaData = {},
        posLFLF = buf.indexOf(LF + LF);
    //key value pairs need to be separated from markdown by two line feeds \n\n
    if (posLFLF>0) {
        var hasMetaData = false,
            rawMetaData = buf.substr(0, posLFLF).trim(),
            lines = rawMetaData.split(LF).length,
        //key value pairs are in the form key: value\n
            regex = /^(?:\s*)(\w+)(?:\s*)\:(?:\s*)([^\r\n]+)(?:\s*)$/gm,//TODO: improve but also update memba.markdown.js
            matches = [];
        if(regex.test(rawMetaData)) {
            matches = rawMetaData.match(regex);
            hasMetaData = (matches.length === lines);
        }
        if(hasMetaData) {
            matches.forEach(function(match) {
                try {
                    var posCOL = match.indexOf(COLON);
                    metaData[match.substr(0,posCOL).trim()] = match.substr(posCOL+1).trim();
                } catch (err) { }
            });
        }
    }
    return metaData;
};

/**
 * Returns MarkDown only without carriage returns
 * Important Note: the following code should remain consistent with the code in memba.markdown.js and util.js
 * See: https://github.com/Memba/Memba-Widgets/blob/master/src/js/memba.markdown.js
 * See also: https://github.com/Memba/grunt-blog/blob/master/tasks/lib/util.js
 * See also: https://github.com/Memba/Memba-Blog/blob/master/src/index.html
 * @method getMarkDown
 * @param stream
 * @returns {string}
 */
function getMarkDown(stream) {
    var buf = stream.trim().replace(/\r\n/gm, LF).replace(/\r/gm, LF),
        posLFLF = buf.indexOf(LF + LF);
    //key value pairs need to be separated from markdown by two line feeds \n\n
    if (posLFLF>0) {
        return buf.substr(posLFLF + 2).trim();
    } else {
        return buf;
    }
};

/**
 * Function to execute when the page is read from a search engine bot
 */
(function() {
    //console.log('index.html: ' + window.location.search);
    if (window.location.search.length > 1) {
        var search = function() {
            var s = window.location.search.substr(1),
                p = s.split(/\&/), l = p.length, kv, r = {};
            if (l === 0) {return false;}
            while (l--) {
                kv = p[l].split(/\=/);
                r[kv[0]] = decodeURIComponent(kv[1] || '') || true;
            }
            return r;
        }();
        if (search && search.r) {
            var oReq = new XMLHttpRequest();
            oReq.onload = function() {
                var response = this.responseText,
                    metaData = getMetaData(response),
                    markDown = getMarkDown(response),
                    html = '',
                    head = document.getElementsByTagName('head')[0],
                    raw = document.getElementById('crawl');

                //page title
                if (head && metaData.title) {
                    var title = document.getElementsByTagName('title')[0];
                    if (!title) {
                        title = document.createElement('title');
                        head.appendChild(title);
                    }
                    title.innerText = metaData.title;
                    html += '<h1>' + metaData.title + '</h1>';
                }
                //page description (TODO and keywords?)
                if(head && metaData.description) {
                    var found = false, metas = document.getElementsByTagName('meta');
                    for (var i = 0; i < metas.length; i++){
                        if (metas[i].name.toLowerCase() === 'description') {
                            metas[i].content = metaData.description;
                        }
                    }
                }

                //canonical URL
                //var canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = '?????????????????';
                //head.appendChild(canonical);

                //set crawlable content after parsing for headings h1, h2 and h3
                if(raw) {
                    html += markDown
                        .replace(/^[\s]*#[\s]*([^\#\r\n]+)[\#\r\n]*/gm, '\n<h1>$1</h1>\n')
                        .replace(/^[\s]*##[\s]*([^\#\r\n]+)[\#\r\n]*/gm, '\n<h2>$1</h2>\n')
                        .replace(/^[\s]*###[\s]*([^\#\r\n]+)[\#\r\n]*/gm, '\n<h3>$1</h3>\n');
                    raw.style.display = 'block';
                    raw.innerHTML = html;
                }
            };
            //TODO: Read configuration for /blog/ and ./posts/ and extension
            oReq.open("get", search.r.replace('/blog/', './posts/') + '.md', true);
            oReq.send();
        }
    }
})();
