/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false */
/*global define: false */

define(function (require) {
    var fs = require('fs'),
        path = require('path'),
        exclusions;

    exclusions = {
        name: true,
        password: true
    };

    function configLoader(filePath) {
        filePath = filePath || './mcdrop.config';

        var text = (path.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '').trim(),
            data = text ? JSON.parse(text) : {},
            config;

        config = {
            data: data,
            getSafeData: function () {
                var obj = {},
                    prop;

                for (prop in config.data) {
                    if (config.data.hasOwnProperty(prop) && !exclusions[prop]) {
                        obj[prop] = config.data[prop];
                    }
                }

                return obj;
            },
            save: function () {
                //Save all the data values, except for name/password.
                fs.writeFileSync(filePath, JSON.stringify(config.getSafeData(), null, '    '), 'utf8');
            }
        };

        return config;
    }

    return configLoader;
});
