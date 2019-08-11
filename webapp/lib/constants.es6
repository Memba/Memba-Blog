/**
 * Copyright (c) 2013-2019 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/**
 * Constants
 */
module.exports = {
    ACCESS: {
        PRIVATE: 0,
        PUBLIC: 1
    },
    ACTIVITY_TYPES: {
        COMMENT: 'Comment',
        CREATION: 'Creation',
        PUBLICATION: 'Publication',
        RATING: 'Rating',
        REPORT: 'Report',
        SCORE: 'Score',
        VIEW: 'View'
    },
    BEARER: 'Bearer ',
    CACHE_CONTROL: {
        HTML: 'public, max-age=604800', // 7 days
        JSON: 'private, max-age=43200' // 12 hours
    },
    COLORS: {
        DEBUG: '#91A3B0', // grey
        INFO: '#0073CF', // blue
        WARN: '#FFB347', // orange
        ERROR: '#DB7093', // pale red (pink)
        CRIT: '#C80815', // bright red
        SUCCESS: '#0CA80C' // green
    },
    CONTENT_TYPE: {
        HTML: 'text/html; charset=utf-8',
        TEXT: 'text/plain; charset=utf-8',
        XML: 'application/xml; charset=utf-8'
    },
    LANGUAGES: ['en', 'fr'],
    LICENSES: {
        CC0: 0,
        BY: 1,
        'BY-NC-ND': 13
    },
    PROVIDERS: ['facebook', 'google', 'live', 'twitter'], // See RX_OAUTH_PROVIDER
    REASONS: {
        SPAM: 0,
        OFFENSIVE: 1,
        IP_RIGHTS: 2
    },
    ROLES: {
        STUDENT: 0,
        TEACHER: 1,
        ADMINISTRATOR: 5 // <-- only for organizations
    },
    RX_APP_SCHEME: /^[a-z]{2,3}\.[a-z0-9]{3,10}\.[a-z0-9]{3,10}$/,
    // @see http://www.regular-expressions.info/email.html
    RX_EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
    RX_FAVOURITE_PATH: /^\/[a-z]{2}[a-z0-9#!%&_=/+\-?]*$/i,
    RX_FILE_ID: /^[\w]{3,50}\.[a-z0-9]{2,7}$/i,
    RX_ICON: /^[a-z0-9_]{3,30}$/i,
    // https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch08s16.html
    RX_IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    // https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch08s17.html which does not match ::1 or ::ffff:101:102:103:104
    // http://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses also at http://www.regextester.com/25
    RX_IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    RX_KEYWORD: /^[^\s<>{}][^<>{}]{0,23}[^\s<>{}]$/,
    RX_LANGUAGE: /^[a-z]{2}$/,
    RX_LEVEL: /^(debug|info|warn|error|crit|success)$/i,
    RX_MONGODB_ID: /^[a-f0-9]{24}$/,
    RX_MONGODB_KEY: /^_(i|[a-z]*I)d$/,
    // RX_OAUTH_STATE: /^\d{5,15}-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    RX_OAUTH_STATE: /^[a-f0-9]{32}-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    RX_OAUTH_PROVIDER: /^(facebook|google|live|twitter)$/,
    RX_OAUTH_TOKEN: /^oauth_token=[^&]+&oauth_token_secret=[^&]+/,
    RX_SHA512: /^[a-f0-9]{128}$/i,
    RX_STYLE: /^([\w-]+[\s]*:[\s]*[#%().\w\s-]+;[\s]*)*([\w-]+[\s]*:[\s]*[#%().\w\s-]+;?)$/,
    RX_TITLE: /^[^\s<>{}][^<>{}]{0,58}[^\s<>{}]$/,
    RX_TOOL: /^[a-z0-9_]{3,30}$/i,
    // http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
    // http://msdn.microsoft.com/en-us/library/ff650303.aspx#paght000001_commonregularexpressions
    RX_URL: /^http(s?):\/\/[0-9a-z]([-.\w]*[0-9a-z])*(:(0-9)*)*(\/?)(.*)?$/i,
    RX_USER_AGENT: /^[-a-zA-Z0-9,]+\/\d/,
    STATES: {
        DRAFT: 0,
        // APPROVAL
        PUBLISHED: 5
    },
    VERSION_TYPES: {
        TEST: 'Test'
        // Note: we could consider Test1, Test2, etc. to care for future upgrades
        // In the near future, we might also consider flashcards, tracks, ...
    }
};
