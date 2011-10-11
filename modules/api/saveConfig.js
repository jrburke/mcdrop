/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false */
/*global require: false, module: false */

function saveConfig(data, load, config, request, response) {

    if (data && data.localDir) {
        config.data = data;
        config.save();
    }

    load({
        status: 'ok'
    });
}

module.exports = saveConfig;
