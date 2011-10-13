/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false */
/*global define: false */

define(function (require) {
    var path = require('path'),
        fs = require('fs'),
        file = require('../file'),
        generate = require('../generate'),
        remoteCopy = require('../remoteCopy');

    function setup(data, load, config, request, response) {
        var dir = data.localDir;

        //Verify parent directory for local directory exists.
        if (!path.existsSync(path.dirname(dir))) {
            load({
                status: 'error',
                field: 'localDir',
                code: 'nonexistentParent'
            });
            return;
        }

        //Create the local directory
        try {
            if (!path.existsSync(dir)) {
                fs.mkdirSync(dir, 0777);
            }
        } catch (e) {
            load({
                status: 'error',
                field: 'localDir',
                code: 'cannotCreate',
                error: e.toString()
            });
            return;
        }

        //Now fill the local directory with the template files,
        //and generate the first pass at the web files.
        try {
            file.copyDir('./scaffold', dir, null, true);
            generate(dir);
            remoteCopy(data.name, data.password, data.remoteServer, path.join(dir, 'web'), data.remoteDir,
                function (err, status) {
                    if (err) {
                        load({
                            status: 'error',
                            field: 'all',
                            code: 'cannotRemote',
                            error: err.error
                        });
                        return;
                    }

                    //Save the data to the config file.
                    if (data && data.password) {
                        config.data = data;
                        config.save();
                    }

                    load({
                        status: 'ok'
                    });
                }
            );
        } catch (e2) {
            load({
                status: 'error',
                field: 'localDir',
                code: 'cannotCopyScaffold',
                error: e2.toString()
            });
            return;
        }
    }

    return setup;
});
