/**
 * Copyright (c) 2013-2015 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* jshint node: true, mocha: true, expr: true */

'use strict';

var expect = require('chai').expect;
var github = require('../../../webapp/lib/github');
var NAME = 'Memba Robot';

describe('lib/github', function () {

    var content = {
        path: 'temp/' + ((1 + Math.random()) * 1e10).toString(36).slice(-5) + '.md',
        markdown: '# This is a dummy sample\n\nwith dummy content',
        update: '# This is a dummy sample\n\nwith an update'
    };

    it('it should create content', function (done) {
        github.createContent(content.path, content.markdown, function (error, response) {
            expect(error).to.be.null;
            expect(response).to.have.deep.property('commit.committer.name', NAME);
            // expect(response).to.have.deep.property('commit.committer.email').that.match(new RegExp('^' + process.env.USERNAME + '@'));
            expect(response).to.have.deep.property('commit.message', 'System creation');
            expect(response).to.have.deep.property('content.path', content.path);
            expect(response).to.have.deep.property('content.html_url');
            expect(response).to.have.deep.property('content.sha');
            content.sha = response.content.sha;
            done();
        });
    });

    it('it should get commits', function (done) {
        github.getCommits(content.path, function (error, response) {
            expect(error).to.be.null;
            expect(response).to.be.instanceof(Array);
            done();
        });
    });

    it('it should get content', function (done) {
        github.getContent(content.path, function (error, response) {
            expect(error).to.be.null;
            expect(response).to.have.property('path', content.path);
            expect(response).to.have.property('html_url');
            expect(response).to.have.property('sha', content.sha);
            done();
        });
    });

    it('it should update content', function (done) {
        expect(content.sha).not.to.be.undefined;
        github.updateContent(content.path, content.update, content.sha, function (error, response) {
            expect(error).to.be.null;
            expect(response).to.have.deep.property('commit.committer.name', NAME);
            // expect(response).to.have.deep.property('commit.committer.email').that.match(new RegExp('^' + process.env.USERNAME + '@'));
            expect(response).to.have.deep.property('commit.message', 'System update');
            expect(response).to.have.deep.property('content.path', content.path);
            expect(response).to.have.deep.property('content.html_url');
            expect(response).to.have.deep.property('content.sha');
            // content.sha changes which each update
            content.sha = response.content.sha;
            done();
        });
    });

    it('it should get commits', function (done) {
        github.getCommits(content.path, function (error, response) {
            expect(error).to.be.null;
            expect(response).to.be.instanceof(Array);
            done();
        });
    });

    it('it should delete content', function (done) {
        expect(content.sha).not.to.be.undefined;
        github.deleteContent(content.path, content.sha, function (error, response) {
            expect(error).to.be.null;
            expect(response).to.have.deep.property('commit.committer.name', NAME);
            // expect(response).to.have.deep.property('commit.committer.email').that.match(new RegExp('^' + process.env.USERNAME + '@'));
            expect(response).to.have.deep.property('commit.message', 'System deletion');
            expect(response).to.have.property('content', null);
            done();
        });
    });

    it('it should fail getting deleted content', function (done) {
        github.getContent(content.path, function (error, response) {
            expect(response).to.be.undefined;
            expect(error).to.be.instanceof(Error);
            done();
        });
    });

    // Note: Updating deleted contents works as restoring

});
