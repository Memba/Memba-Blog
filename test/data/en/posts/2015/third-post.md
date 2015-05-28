---
category: Default
description: Never two without three or even four
icon: typewriter
keywords: Kidoju, teach, learn, knowledge, test, blog, article, documentation, ebook, video, webinar, slide
language: en
title: My third blog post
uuid: 0f5f7330-feef-11e4-bf80-355b7c649924
author: jlchereau
author_url: https://github.com/jlchereau
avatar_url: https://avatars.githubusercontent.com/u/2556751?v=3
creation_date: 2015-05-27T16:23:51Z
edit_url: https://github.com/Memba/Memba-Blog/blob/master/test/data/en/posts/2015/third-post.md
site_url: http://localhost:3000/en/posts/2015/05/third-post
---
## my third post

Try again and again

```js
function mongoQuery(data, query) {
    query = query || {};
    var results = data.filter(function(indexEntry) {
        var include = true;
        for (var prop in query) {
            if (query.hasOwnProperty(prop)) {
                var criterion = query[prop];
                if (criterion instanceof RegExp) {
                    include = include && criterion.test(indexEntry[prop]);
                } else if (utils.isObject(criterion)) {
                    for (var operator in criterion) {
                        if (criterion.hasOwnProperty(operator)) {
                            // @see http://docs.mongodb.org/manual/reference/operator/query/
                            switch(operator) {
                                case '$eq':
                                    include = include && (indexEntry[prop] === criterion[operator]);
                                    break;
                                case '$gt':
                                    include = include && (indexEntry[prop] > criterion[operator]);
                                    break;
                                case '$gte':
                                    include = include && (indexEntry[prop] >= criterion[operator]);
                                    break;
                                case '$lt':
                                    include = include && (indexEntry[prop] < criterion[operator]);
                                    break;
                                case '$lte':
                                    include = include && (indexEntry[prop] <= criterion[operator]);
                                    break;
                                case '$ne':
                                    include = include && (indexEntry[prop] !== criterion[operator]);
                                    break;
                                case '$regex':
                                    include = include && criterion[operator].test(indexEntry[prop]);
                                    break;
                            }
                        }
                    }
                } else {
                    include = include && (indexEntry[prop] === criterion);
                }
            }
        }
        return include;
    });
    return results;
}
```