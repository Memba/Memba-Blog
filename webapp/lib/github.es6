/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

// TODO: Consider replacing with https://octokit.github.io/rest.js

const request = require('request');
const config = require('../config/index.es6');
const { version } = require('../../package.json');

const github = 'https://api.github.com';
/*
var authentication = {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
};
*/
// Set a personal access token at https://github.com/settings/tokens
const headers = {
    Authorization: `token ${process.env.TOKEN}`,
    'user-agent': `Memba.Blog/${version}`,
};
const repo = config.get('github:repository');
const branch = config.get('github:branch');

module.exports = {
    /**
     * Get content from github
     * @see https://developer.github.com/v3/repos/contents/#get-contents
     * @param path
     * @param callback
     */
    getContent(path, callback) {
        const uri = `${github}/repos/${repo}/contents/${path}`;
        const qs = { ref: branch };
        request(
            {
                method: 'GET',
                uri,
                headers,
                /* auth: authentication, */ json: true,
                qs,
            },
            (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    callback(null, body); // json: true in request options ensures that body is parsed to return an object
                } else {
                    callback(
                        error ||
                            new Error(
                                `Getting Github content returned status ${
                                    response.statusCode
                                }${
                                    body && body.message
                                        ? `: ${body.message}`
                                        : ''
                                }`
                            )
                    );
                }
            }
        );
    },

    /**
     * Create content into github
     * @see https://developer.github.com/v3/repos/contents/#create-a-file
     * @param path
     * @param content
     * @param callback
     */
    createContent(path, content, callback) {
        const uri = `${github}/repos/${repo}/contents/${path}`;
        const data = {
            branch,
            content: Buffer.from(content).toString('base64'),
            message: 'System creation',
        };
        // Note content creation requires PUT instead of POST
        request(
            {
                method: 'PUT',
                uri,
                headers,
                /* auth: authentication, */ json: true,
                body: data,
            },
            (error, response, body) => {
                if (!error && response.statusCode === 201) {
                    callback(null, body);
                } else {
                    callback(
                        error ||
                            new Error(
                                `Creating Github content returned status ${
                                    response.statusCode
                                }${
                                    body && body.message
                                        ? `: ${body.message}`
                                        : ''
                                }`
                            )
                    );
                }
            }
        );
    },

    /**
     * Update content into github
     * @see https://developer.github.com/v3/repos/contents/#update-a-file
     * @param path
     * @param content
     * @param sha
     * @param callback
     */
    updateContent(path, content, sha, callback) {
        const uri = `${github}/repos/${repo}/contents/${path}`;
        const data = {
            branch,
            content: Buffer.from(content).toString('base64'),
            message: 'System update',
            sha,
        };
        request(
            {
                method: 'PUT',
                uri,
                headers,
                /* auth: authentication, */ json: true,
                body: data,
            },
            (error, response, body) => {
                if (
                    !error &&
                    (response.statusCode === 200 || response.statusCode === 201)
                ) {
                    // updating content returns 200, except when updating deleted content which return 201 (like creation)
                    callback(null, body);
                } else {
                    callback(
                        error ||
                            new Error(
                                `Updating Github content returned status ${
                                    response.statusCode
                                }${
                                    body && body.message
                                        ? `: ${body.message}`
                                        : ''
                                }`
                            )
                    );
                }
            }
        );
    },

    /**
     * Delete content from github
     * @see https://developer.github.com/v3/repos/contents/#delete-a-file
     * @param path
     * @param sha
     * @param callback
     */
    deleteContent(path, sha, callback) {
        const uri = `${github}/repos/${repo}/contents/${path}`;
        const data = {
            branch,
            message: 'System deletion',
            sha,
        };
        request(
            {
                method: 'DELETE',
                uri,
                headers,
                /* auth: authentication, */ json: true,
                body: data,
            },
            (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    callback(null, body);
                } else {
                    callback(
                        error ||
                            new Error(
                                `Deleting Github content returned status ${
                                    response.statusCode
                                }${
                                    body && body.message
                                        ? `: ${body.message}`
                                        : ''
                                }`
                            )
                    );
                }
            }
        );
    },

    /**
     * Gets commits (especially to find author and date)
     * @see https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
     * @param path
     * @param callback
     */
    getCommits(path, callback) {
        const uri = `${github}/repos/${repo}/commits`;
        const qs = { path, sha: branch };
        request(
            {
                method: 'GET',
                uri,
                headers,
                /* auth: authentication, */ json: true,
                qs,
            },
            (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    callback(null, body);
                } else {
                    callback(
                        error ||
                            new Error(
                                `Getting Github commits returned status ${
                                    response.statusCode
                                }${
                                    body && body.message
                                        ? `: ${body.message}`
                                        : ''
                                }`
                            )
                    );
                }
            }
        );
    },
};
