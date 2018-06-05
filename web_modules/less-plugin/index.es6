/**
 * A less plugin to reduce the size of theme chunks
 * @see https://github.com/jlchereau/Kidoju-Webapp/issues/147
 * @see https://github.com/less/less.js/issues/2867
 * @param less
 * @constructor
 */
class CleanProcessor {
    /**
     * Constructor
     * @constructor
     * @param less
     */
    constructor(less) {
        this.less = less;
    }

    /**
     * Process
     * @param css
     * @param extra
     * @returns {*}
     */
    // eslint-disable-next-line class-methods-use-this
    process(css /* , extra */) {
        // Replace comments /*! with /* so that less can suppress them
        return css.replace(/\/\*!/g, '/*');
    }
}

module.exports = {
    install(less, pluginManager) {
        pluginManager.addPreProcessor(new CleanProcessor(less));
    }
};
