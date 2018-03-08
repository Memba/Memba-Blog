'use strict';

/**
 * A less plugin to reduce the size of theme chunks
 * @see https://github.com/jlchereau/Kidoju-Webapp/issues/147
 * @see https://github.com/less/less.js/issues/2867
 * @param less
 * @constructor
 */
var CleanProcessor = function (less) {
    this.less = less;
};
CleanProcessor.prototype.process = function (css, extra) {
    // Replace comments /*! with /* so that less can suppress them
    return css.replace(/\/\*!/g, '/*');
};

module.exports = {
    install: function(less, pluginManager) {
        pluginManager.addPreProcessor(new CleanProcessor(less));
    }
};
