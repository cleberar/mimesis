/**
 * Classe Principal do projeto 
 *
 */
var Mimesis = function() {

    var self = this;

    self.ws = false;

    // inicia o Servidor WebSocket
    var WebSocketServer = require('ws').Server;
    var wss = new WebSocketServer({port: 8081});

    self.log('Aguardando conexao porta 8081');

    // aguardamos uma conexao do Cliente
    wss.on('connection', function (ws) {

        self.log('Conectando com sucesso');

        // instancia na classe  de conexao 
        self.ws = ws;

        // aguardando eventos do cliente
        self.log('Escutando eventos');
        self.ws.on('message', function(message) {

            // controle de Erros das Acoes executadas
            try {

                self.log('Recebemos: ', message);

                // realiza o parse do comando recebido
                // o comando e os dados serao separados por JSON
                var messageParse = message.split("\n", 2);

                // obtemos o comando e os dados
                var command = messageParse[0];

                // vamos separar a acao que devemos executar com o UUID da
                // da conexao criada entre o cliente e o server
                var commandLine = command.split(" ", 2);

                // validamos o comando, pois o mesmmo deve conter 
                // a acao e o UUID da conexao
                if (commandLine.length != 2) {
                    self.error('command invalid');
                }

                var action = commandLine[0];

                // instanciando a classe do comando recebido,
                // e estendendo a classe BruNode
                require("./" + action.toLowerCase()).call(self);
                
                // inicializa a classe estendida
                self.initialize((commandLine[1] || null), JSON.parse(messageParse[1] || '{}'));

            } catch (e) {
                // gera um erro na console e envia
                // codigo de erro para o cliente
                self.error(e);
           }
        });
    });
}

/**
 * Metodos Classe Mimesis
 * @type {Object}
 */
Mimesis.prototype  = {

    /**
     * Metodo para envio de Erros ao client
     * @return {void}
     */
    error: function() {

        var now = new Date();
        var arg = ['[ERROR]', now.toJSON()];

        for (var i in arguments) { arg.push(arguments[i]); }
        console.log.apply(console, arg);

        if (this.send) {
            arg.shift();
            arg.shift();
            this.send({code: 0, data: arg.join(" ")});
        }
    },
    log: function(text, type) {
        
        if (!text) {
            console.log("\n");
            return;
        }
        var now = new Date();
        type = type || 'DEBUG';
        var arg = ['[DEBUG]', now.toJSON()];
        for (var i in arguments) { arg.push(arguments[i]); }
        console.log.apply(console,arg);
    },

    send: function(json) {
       // this.log('Enviei comando : ', JSON.stringify(json))
        this.ws.send(JSON.stringify(json));
    }
}

module.exports = Mimesis;