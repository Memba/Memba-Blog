/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

module.exports = {
    PROVIDERS: ['facebook', 'google', 'live', 'twitter'], // /^(facebook|google|live|twitter)$/
    RX_FILE_ID: /^[\w]{3,50}\.[a-z0-9]{2,7}$/i,
    RX_LEVEL: /^(DEBUG|INFO|WARN|ERROR|CRIT)$/i,
    RX_MONGODB_ID: /^[a-f0-9]{24}$/
};
