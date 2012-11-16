/**
 * Classe inicial do lado Cliente
 *
 */
var MimesisClient = function() {

    var self = this;

    // lista de clientes que serao conectados ao server
    this.listClient = [];

    // conecta ao WebSocket do lado Server
    this.socket = new WebSocket("ws://localhost:8081");

    // conectado
    this.socket.onopen = function() {

        // renderiza a painel principal da aplicacao
        self.render();

        // fica escutando alguma mensagem recebida do lado Servidor
        this.onmessage = function(msg) {

            // converte o dado recebido em JSON
            message = JSON.parse(msg.data);

            // envia o comando ao watch que respondera
            //  a quem solicitou a requisicao
            self.watch(message);
        }
    }

    // ocorreu um erro na conexao
    this.socket.onerror = function(err) {
        self.error(err);
    }

    // conexao foi fechada
    this.socket.onclose = function() {
        // XXX TODO ::  Tratar quando a conexao server for fechada
        console.log("fechou a aconexao", socket, socket.readyState);
    }
}


MimesisClient.prototype = {

    /**
     * Metodo para renderizar o painel principal
     * @return {void}
     */
    render : function() {

        // XXX FIXME :: Metodo de navegacao esta estatico como o principal
        //              a ser renderizado, apos adicionaremos outros metodos
        new Navigation({
            el     : $("#main"),
            socket : this
        });
    },

    /**
     * Metodo para gerenciamento de erros do lado cliente
     * 
     * @return void
     */
    error: function() {
        console.log.apply(console, arg);
    },

    /**
     * Metodo para criar um UUID
     *
     * @return {String} Retorna identificador unico
     */
    guuid : function() {

        var s4 = function() {
           return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return s4() + s4() + "-" +
               s4() + "-" +
               s4() + "-" +
               s4() + "-" +
               s4()+s4()+s4();
    },



    /**
     * Envia um comando ao server
     * Como o comunicacao entre o cliente e servidor sera assincrona
     * devemos gerenciar os callbacks de cada chamada sender.
     *
     * @param  {string}     action        acao aplicada no server
     * @param  {object}     data          JSON com os dados enviados ao server
     * @param  {function()} callbackWatch Callback executado na resposta
     * @return void
     */
    sender : function(action, data, callbackWatch) {

        // criamos um identificador unico para este comando
        var uuid =  this.guuid();

        // envia o comando ao server
        this.socket.send(action + ' ' + uuid + "\n" + JSON.stringify(data));

        // adiciona o callback a lista de clientes
        this.listClient[uuid] = callbackWatch;
    },

    /**
     * Cria um watch escudando eventos do server enviado
     * ao callback correspondente a que solicitou
     *
     * @param  {object} JSON com os dados recebidos
     * @return void
     */
    watch : function(data) {
        
        // se existir um cliente instanciado para este uuid
        // executa o callback do cliente
        if (this.listClient[data.uuid]) {
            this.listClient[data.uuid](data.data);
        }
    }
}