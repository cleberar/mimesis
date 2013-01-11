/*
 * mimesis
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */

// importa modulo de navegacao
var Navigation = require("./navigation");

exports.loading = function(verbose) {

	this.verbose = verbose;
	console.log('Procurando um Site maneiro ....');
	//var navigation = new Navigation(verbose);
	//navigation.access();
  	
  	// instanciando a classe do comando recebido,
                // e estendendo a classe BruNode
    require("./Navigation").call(this);



    this.access();

  	return 'loading';
};
