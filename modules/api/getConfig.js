/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false */
/*global define: false */

define(function (require) {
    function getConfig(data, load, config, request, response) {
        load(config.getSafeData());
    }

    return getConfig;
});
