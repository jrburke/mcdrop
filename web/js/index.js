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


    var $profile = $('#profile')
    var $posts   = $('#posts')

    $profile.hide()

    $('#nav li.posts').click(function() {
            $(this).parent().addClass('view_posts');
            $(this).parent().removeClass('view_profile');
            $posts.fadeIn(200);

            // temporarily give position absolute to overlap tabs, then remove once transition is finished
            $profile
                    .css({ 'position' : 'absolute', 'top' : 96 })
                    .fadeOut(200, function() {
                            $(this).css({ 'position' : '', 'top' : '' });
                    });
    });

    $('#nav li.profile').click(function() {
            $(this).parent().addClass('view_profile');
            $(this).parent().removeClass('view_posts');
            $profile.fadeIn(200);

            // temporarily give position absolute to overlap tabs, then remove once transition is finished
            $posts
                    .css({ 'position' : 'absolute', 'top' : 96 })
                    .fadeOut(200, function() {
                            $(this).css({ 'position' : '', 'top' : '' });
                    });
    });

});
