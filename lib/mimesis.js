/*
 * mimesis
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */

// importa modulo de navegacao
var Navigation = require("./use/navigation");
var Facebook = require("./use/facebook");

exports.loading = function(verbose) {

   this.verbose = verbose;
	   console.log('to acordando ....');

    //var face = new Facebook();
    //face.access();

    var nav = new Navigation();
    nav.access();

  	return 'loading';
};
