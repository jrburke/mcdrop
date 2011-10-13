/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false */
/*global define: false, require: false, console: false, location: true */


define(function (require) {
    //This code executes once DOM is ready.
    var doc = require('domReady!'),
        $ = require('jquery');

    // Fetch the config.
    $.ajax({
        url: '/api/getConfig',
        dataType: 'json',
        success: function (data) {
            var prop;

            for (prop in data) {
                if (data.hasOwnProperty(prop)) {
                    //Find the associated element and set the value.
                    $('[name="' + prop + '"]').val(data[prop]);
                }
            }
        }
    });

    function clearErrors() {
        $('.errorField').removeClass('errorField');
        $('.errorMessage').hide();
    }

    $('body')
        // Handle form submits.
        .delegate('#setupForm', 'submit', function (evt) {
            var node = evt.target,
                data = $(node).serialize();

            evt.stopPropagation();
            evt.preventDefault();

            //Clear old errors
            clearErrors();

            $.ajax({
                url: node.action,
                type: node.method,
                data: data,
                dataType: 'json',
                success: function (data) {
                    if (data && data.status === 'ok') {
                        location = '/';
                    } else if (data && data.status === 'error') {
                        $('[name="' + data.field + '"]').addClass('errorField');
                        $('.' + data.field + '-' + data.code).show();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    throw errorThrown;
                }
            });
        });
});
