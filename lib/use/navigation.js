/*
 * mimesis,
 * Modulo de navegacao em sites
 *
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */
var browser = require("../devices/browser");

var Navigation = function() {

    var self = this;

    self.random = "http://www.randomwebsite.com/cgi-bin/random.pl";

    this.access = function(data) {
        if (typeof data == 'object') {
            data.forEach(function(site) {
                self.load(site, self.access);
            });
        } else {
            self.load(data, self.access);
        }
    }

    this.load = function(url, callback) {

        if (url) {
            console.log(" carregando %s ... ", url);    
        } else {
            url = self.random;
        }
        
        browser.open(url, function(window) {

            var links = window.document.querySelectorAll("a[href^='http://']"),
                listSites = [],
                qtySites = (Math.random() * 4 | 1),
                position = 0,
                end = 0;

            for (var i = 0, max = links.length; i < max; i++) {
                listSites.push(links[i].getAttribute("href"));
            }

            position = Math.floor(Math.random() * max);
            end = position + qtySites;

            if (end > max) {
                end = max;
            }

            if (self.verbose) {
                console.log(
                    " Pos: ", position, ":", end,
                    " Tot: ", qtySites,
                    " Max: ", max
                );
            }

            callback(listSites.slice(position, end));

        });
    }
}

module.exports = Navigation;