/*
 * mimesis,
 * Modulo de navegacao em sites
 *
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */
var app = require('appjs');

var Navigation = function() {

    var self = this;

    this.random = "http://www.randomwebsite.com/cgi-bin/random.pl";
    
    this.access = function() {
        
        try {

            self.window = app.createWindow( self.random );

            self.window.on( 'create', function() {
                console.log( "navegando na web ..." );
                // exibe a janela com a nevagacao
                //self.window.frame.show().center();
            });

            self.window.on( 'ready', function() {
                self.load( self.window.document );
            });

        } catch (e) {
        }
    }

    this.load = function( win ) {

        console.log( " acessando : ", win.location.host );

        var links = win.querySelectorAll( "a[href^='http://']" ),
                listSites = [],
                position = 0;

        for ( var i = 0, max = links.length; i < max; i++ ) {
            listSites.push( links[i].getAttribute( "href" ) );
        }

        position = Math.floor( Math.random() * max );

        //console.log(position, max, listSites[position]);
        if ( listSites.length > 0 && listSites[position] ) {
            win.location.href = listSites[position];
            return;
        }
        
        win.location.href  = "http://ocioso.com.br";
    }
}

module.exports = Navigation;