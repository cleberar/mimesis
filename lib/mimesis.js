/*
 * mimesis
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */

// importa modulo de navegacao
var Navigation = require("./use/navigation");

exports.loading = function(verbose) {

   this.verbose = verbose;
   console.log('iniciando ....');

   var nav = new Navigation();
    try {
    	nav.access();
	} catch (e) {
    	nav.access();
	}

  	return 'loading';
};
