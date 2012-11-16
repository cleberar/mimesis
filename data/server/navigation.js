/**
 * [htmlParser description]
 * @type {[type]}
 */

var htmlParser = require('html-parser');
var http = require('http');
var urlR = require('url');

var Navigation = function() {

    var self = this;

    self.uuid = null;

    /**
     * Inicializador da Classe
     *
     * @param data {object} JSON com dados recebidos
     * @return void
     */
    this.initialize = function(uuid, data) {

        self.uuid = uuid;

        this.log("Start NavigationClass", self.uuid, data);
        
        this.accessingSite(data.url);
    };

   
    this.accessingSite = function(url) {

        self.log(" acessando : ", url);

        // realizando o parse da Url para obtermos host, path
        var urlParse = urlR.parse(url);

        var options = {
            host    : (urlParse.host || urlParse.path),
            path    : (urlParse.host ? urlParse.path : "/"),
            headers : {
                'user-agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64) ' +
                               'AppleWebKit/537.1 (KHTML, like Gecko) ' +
                               'Chrome/22.0.1207.1 Safari/537.1'
            }
        };

        // realiza a requisicao de acesso ao site
        var req = http.request(options, function (req) {
            self.readingSite(req, options, url)
        });

        req.on('error', function(e) {
            console.log('req problem with request: ' + e.message);
        });
        req.end();
    };

    this.readingSite = function(req, urlParse, url) {
        
        // encode
        req.setEncoding('utf8');
        
        var html = "";
        // enquanto for lendo o Site adiciona o conteudo na var html
        req.on('data', function (chunk) {
            html += chunk;
        });

        // terminamos o acesso e leitura ao site acessado
        req.on('end', function(a) {
            
            if ((req.statusCode == 301 || req.statusCode == 302)
                && (/^\http/.test(req.headers.location))) {
                    console.log(   "redireciona ",req.statusCode, req.headers)
                    console.log((/^\http/.test(req.headers.location)));
                    self.accessingSite(req.headers.location);
                    return;
            }

                // XXX FIXME :: Devemos tratar os erros de Status
                self.send({
                        "uuid" : self.uuid, 
                        "data" : {
                            "status" : req.statusCode, 
                            "url"    : url,
                            "count"  : 0,
                            "host"   : urlParse.host,
                            "html"   : html
                        }
                });

                var listSites = [];

                // parseando o html recebido para obter novos sites,
                //  para continuar a navegacao
                htmlParser.parse(html, {
                    attribute: function(name, value) {
                        try {
                            if (name == 'href' && (/^\http/.test(value))) {
                                listSites.push(value);
                            }
                        } catch(e) {}
                    }
                });


                var position = Math.floor(Math.random() * listSites.length);
                var Qtysites = (Math.random() * 3 | 0) + 1;
                var timer = 1000 * Qtysites;
                var start, end;
                if ((Math.random() * 2 | 0 ) == 1) {
                    start = position;
                    end = position + Qtysites
                } else {
                    start =  position - Qtysites;
                    end = position;
                }

                setTimeout(function() {

                listSites.slice(start, end).forEach(function(urlSite) {
                    setTimeout(self.accessingSite(urlSite), timer * 2);
                });
                }, timer * 4);
        });
        
    }
}
module.exports = Navigation;