/*
 * mimesis,
 * Boostrap da Aplicacao
 *
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */

var util = require('util');
var verbose = false;

// obtendo agrumentos passados por linha de comando
var args = process.argv.slice(2);
args.forEach(function (argument) {
	if (argument == "--verbose") {
		verbose = true;
	}
});

// gerenciamento de entrada de dados
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
	console.log('Digite quit para sair, ou pressione CRTL + C');
    // se foi digitado quit, para o processo
    if (text === 'quit\n' || text === 'quit\r\n') {
    	console.log('\nhasta la vista baby');
    	process.exit();
  	}
});

console.log('Para parar pressione (Enter) e digite quit para sair,  ou pressione CRTL + C');
console.log("\n\n");

var mimesis = require('./mimesis.js');
mimesis.loading(verbose);