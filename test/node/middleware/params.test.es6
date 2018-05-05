/**
 * Copyright (c) 2013-2018 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');

let CONSTANTS;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    CONSTANTS = require('../../../webapp/lib/constants.es6');
} catch (exception) {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    CONSTANTS = require('../../../api/lib/constants.es6');
}

let params;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    params = require('../../../webapp/middleware/params.es6');
} catch (exception) {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    params = require('../../../api/middleware/params.es6');
}

let mongoose;
try {
    // eslint-disable-next-line global-require, import/no-unresolved, node/no-missing-require
    mongoose = require('mongoose');
} catch (exception) {
    mongoose = {
        Types: {
            ObjectId() {
                const ret =
                    ((0.1 + 0.9 * Math.random()) * 1e20)
                        .toString(16)
                        .substr(0, 12) +
                    ((0.1 + 0.9 * Math.random()) * 1e20)
                        .toString(16)
                        .substr(0, 12);
                expect(ret).to.match(CONSTANTS.RX_MONGODB_ID);
                return ret;
            }
        }
    };
}

function nextOK(err) {
    expect(err).to.be.undefined;
}

function nextErr(err) {
    expect(err).to.be.an.instanceof(Error);
}

describe('middleware/params', () => {
    describe('validateFileId', () => {
        it('A name made of 3 to 50 alphanumeric characters and an extension made of 2 to 7 alphanumeric characters is a valid file id', () => {
            params.validateFileId(
                undefined,
                undefined,
                nextOK,
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX.abcd'
            );
            params.validateFileId(
                undefined,
                undefined,
                nextOK,
                '12345678901234567890123456789012345678901234567890.1234567'
            );
        });

        it('The following are not valid file ids', () => {
            params.validateFileId(undefined, undefined, nextErr, 'a.bcde');
            params.validateFileId(undefined, undefined, nextErr, 'abcdefg.h');
            params.validateFileId(
                undefined,
                undefined,
                nextErr,
                '######.?????'
            );
            params.validateFileId(
                undefined,
                undefined,
                nextErr,
                'dummy.longextension'
            );
        });
    });

    describe('validateLanguage', () => {
        it('`en` and `fr` are valid languages', () => {
            params.validateLanguage(undefined, undefined, nextOK, 'en');
            params.validateLanguage(undefined, undefined, nextOK, 'fr');
        });

        it('`zz` and `dummy` are not a valid language', () => {
            params.validateLanguage(undefined, undefined, nextErr, 'zz');
            params.validateLanguage(undefined, undefined, nextErr, 'dummy');
        });
    });

    describe('validateMonth', () => {
        it('a two-digit month between 01 and 12 is a valid month', () => {
            params.validateMonth(undefined, undefined, nextOK, '01');
            params.validateMonth(undefined, undefined, nextOK, '02');
            params.validateMonth(undefined, undefined, nextOK, '03');
            params.validateMonth(undefined, undefined, nextOK, '04');
            params.validateMonth(undefined, undefined, nextOK, '05');
            params.validateMonth(undefined, undefined, nextOK, '06');
            params.validateMonth(undefined, undefined, nextOK, '07');
            params.validateMonth(undefined, undefined, nextOK, '08');
            params.validateMonth(undefined, undefined, nextOK, '09');
            params.validateMonth(undefined, undefined, nextOK, '10');
            params.validateMonth(undefined, undefined, nextOK, '11');
            params.validateMonth(undefined, undefined, nextOK, '12');
        });

        it('`00`, `13`, `99` and `dummy` are not valid months', () => {
            params.validateMonth(undefined, undefined, nextErr, '00');
            params.validateMonth(undefined, undefined, nextErr, '13');
            params.validateMonth(undefined, undefined, nextErr, '99');
            params.validateMonth(undefined, undefined, nextErr, 'dummy');
        });
    });

    describe('validateObjectId', () => {
        it('a mongoose ObjectId is a valid object id', () => {
            params.validateObjectId(
                undefined,
                undefined,
                nextOK,
                mongoose.Types.ObjectId().toString()
            );
        });

        it('`dummy` is not a valid objectId', () => {
            params.validateObjectId(undefined, undefined, nextErr, 'dummy');
        });
    });

    describe('validateProvider', () => {
        it('`facebook`, `google`, `live` and `twitter` are valid providers', () => {
            params.validateProvider(undefined, undefined, nextOK, 'facebook');
            params.validateProvider(undefined, undefined, nextOK, 'google');
            params.validateProvider(undefined, undefined, nextOK, 'live');
            params.validateProvider(undefined, undefined, nextOK, 'twitter');
        });

        it('validation is case sensitive and `dummy` is not a valid provider', () => {
            params.validateProvider(undefined, undefined, nextErr, 'Facebook');
            params.validateProvider(undefined, undefined, nextErr, 'GOOGLE');
            params.validateProvider(undefined, undefined, nextErr, 'livE');
            params.validateProvider(undefined, undefined, nextErr, 'twiTTer');
            params.validateProvider(undefined, undefined, nextErr, 'dummy');
        });
    });

    describe('validateYear', () => {
        it('a four-digit year between 2014 and now is a valid year', () => {
            params.validateYear(undefined, undefined, nextOK, '2014');
            params.validateYear(undefined, undefined, nextOK, '2015');
        });

        it('`2013`, `2020` and `dummy` are not valid years', () => {
            params.validateYear(undefined, undefined, nextErr, '2013');
            params.validateYear(undefined, undefined, nextErr, '2020');
            params.validateYear(undefined, undefined, nextErr, 'dummy');
        });
    });
});
