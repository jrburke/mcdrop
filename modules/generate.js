/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false, regexp: false */
/*global define: false */

define(function (require) {
    var file = require('./file'),
        path = require('path'),
        jig = require('./blade/jig');

    /**
     * Generates the web files by merging the content data with the templates.
     */
    function generate(dir) {
        var dataFile, data, templateFile, template, webFile;

        //Copy all the miscellaneous files to to web directory.
        file.copyDir(path.join(dir, 'templates'), path.join(dir, 'web'), /\/[^_][^\/]+$/, true);

        //Generate the index.html file
        dataFile = path.join(dir, 'content', 'index.json');
        if (file.exists(dataFile)) {
            data = JSON.parse(file.readFile(dataFile));
        } else {
            data = {};
        }

        template = file.readFile(path.join(dir, 'templates', '_index.html'));
        file.saveFile(path.join(dir, 'web', 'index.html'), jig(template, data));

        //Generate each post


        //Update feed
    }

    return generate;
});