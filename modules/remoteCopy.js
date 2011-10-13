/**
 * @license mcdrop Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/mcdrop for details
 */

/*jslint strict: false, regexp: false */
/*global define: false, console: false */

define(function (require) {
    var path = require('path'),
        fs = require('fs'),
        spawn = require('child_process').spawn;

    function remoteCopy(name, password, host, localDir, remoteDir, callback) {
        //Build up args for the scp command. Grab all the top level files/directories
        //in localDir and pass, since just passing localDir creates a directory
        //named for the last part of localDir on the remote host, but instead,
        //we just want the contents of the localDir copied up.
        var args = ['-r'],
            scp;

        fs.readdirSync(localDir).forEach(function (name) {
            args.push(path.join(localDir, name));
        });

        //Add the final args
        args = args.concat([name + '@' + host + ':' + remoteDir]);

        scp = spawn('scp', args);

        scp.stdout.on('data', function (data) {
            console.log('stdout: ' + data);

            if (data.indexOf('assword:') !== -1) {
                //Password is needed, pass it.
                scp.stdin.write(password);
            } else {
                //Some sort of error
                callback({
                    error: data
                });

                //Stop the command
                scp.stdin.end();
            }
        });

        scp.stderr.on('data', function (data) {
            console.log('stderr: ' + data);

            callback({
                error: data
            });
        });

        scp.on('exit', function (code) {
            callback(undefined, code);
        });

    }

    return remoteCopy;

});
