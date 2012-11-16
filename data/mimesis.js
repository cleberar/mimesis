/**
 * Classe Principal de execucao do Mimesis
 * Executa o Chomium atraves do AppJS, inciando
 * a conexao server para realizacao do WebSocket
 */


// instancia a classe principal
var Mimesis =  require(__dirname + "/server/mimesis");
var Mimesis = new Mimesis();

require('appjs')

    // caminho dos arquivos
    .serveFilesFrom(__dirname + "/client")

    // cria a janela do browser 
    .createWindow({
        name            : "Mimesis",
        top             : "-0",
        width           : 900,
        height          : 600,
        disableSecurity : true,
        autoResize      : false,
        resizable       : true,
        disableSecurity : true,
        showChrome      : true,
        icons           : __dirname + '/client/icons'
    })

    // ao carregar a janela, inicia a aplicacaos
    .on('ready', function() {

        this.frame.top = 0;
        Mimesis.window = this;

        // log para debug
        Mimesis.log('Cliente Iniciado');

        // cria a janela do Browser, centralizada
        this.frame.show().center();

        // exibe a console de debug
        //this.frame.openDevTools();
    });
