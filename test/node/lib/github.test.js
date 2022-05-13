/**
 * Copyright (c) 2013-2021 Memba Sarl. All rights reserved.
 * Sources at https://github.com/Memba
 */

/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const github = require('../../../webapp/lib/github.es6');

// const NAME = 'Memba Robot';

describe('lib/github', () => {
    // this.retries(2);

    const content = {
        path: `temp/${((1 + Math.random()) * 1e10).toString(36).slice(-5)}.md`,
        markdown: '# This is a dummy sample\n\nwith dummy content',
        update: '# This is a dummy sample\n\nwith an update',
    };

    it('it should create content', (done) => {
        github.createContent(
            content.path,
            content.markdown,
            (error, response) => {
                expect(error).to.be.null;
                expect(response).to.have.nested.property(
                    'commit.committer.name'
                ); // , NAME);
                // expect(response).to.have.nested.property('commit.committer.email').that.match(new RegExp('^' + process.env.USERNAME + '@'));
                expect(response).to.have.nested.property(
                    'commit.message',
                    'System creation'
                );
                expect(response).to.have.nested.property(
                    'content.path',
                    content.path
                );
                expect(response).to.have.nested.property('content.html_url');
                expect(response).to.have.nested.property('content.sha');
                content.sha = response.content.sha;
                done();
            }
        );
    });

    it('it should get commits', (done) => {
        github.getCommits(content.path, (error, response) => {
            expect(error).to.be.null;
            expect(response).to.be.instanceof(Array);
            done();
        });
    });

    it('it should get content', (done) => {
        github.getContent(content.path, (error, response) => {
            expect(error).to.be.null;
            expect(response).to.have.property('path', content.path);
            expect(response).to.have.property('html_url');
            expect(response).to.have.property('sha', content.sha);
            done();
        });
    });

    it('it should update content', (done) => {
        expect(content.sha).not.to.be.undefined;
        github.updateContent(
            content.path,
            content.update,
            content.sha,
            (error, response) => {
                expect(error).to.be.null;
                expect(response).to.have.nested.property(
                    'commit.committer.name'
                ); // , NAME);
                // expect(response).to.have.nested.property('commit.committer.email').that.match(new RegExp('^' + process.env.USERNAME + '@'));
                expect(response).to.have.nested.property(
                    'commit.message',
                    'System update'
                );
                expect(response).to.have.nested.property(
                    'content.path',
                    content.path
                );
                expect(response).to.have.nested.property('content.html_url');
                expect(response).to.have.nested.property('content.sha');
                // content.sha changes which each update
                content.sha = response.content.sha;
                done();
            }
        );
    });

    it('it should get commits', (done) => {
        github.getCommits(content.path, (error, response) => {
            expect(error).to.be.null;
            expect(response).to.be.instanceof(Array);
            done();
        });
    });

    it('it should delete content', (done) => {
        expect(content.sha).not.to.be.undefined;
        github.deleteContent(content.path, content.sha, (error, response) => {
            expect(error).to.be.null;
            expect(response).to.have.nested.property('commit.committer.name'); // , NAME);
            // expect(response).to.have.nested.property('commit.committer.email').that.match(new RegExp('^' + process.env.USERNAME + '@'));
            expect(response).to.have.nested.property(
                'commit.message',
                'System deletion'
            );
            expect(response).to.have.property('content', null);
            done();
        });
    });

    it('it should fail getting deleted content', (done) => {
        github.getContent(content.path, (error, response) => {
            expect(response).to.be.undefined;
            expect(error).to.be.instanceof(Error);
            done();
        });
    });

    // Note: Updating deleted contents works as restoring
});
