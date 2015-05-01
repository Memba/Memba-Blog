/**
 * Created by jlchereau on 01/05/2015.
 */


function normalize (str) {
    return str
        .replace(/[\/]+/g, '/')
        .replace(/\/\?/g, '?')
        .replace(/\/\#/g, '#')
        .replace(/\:\//g, '://');
}


module.exports = {

    /**
     *
     * @see https://github.com/jfromaniello/url-join/blob/master/lib/url-join.js
     * @returns {*}
     */
    join: function() {
        var joined = [].slice.call(arguments, 0).join('/');
        return normalize(joined);
    }

};
