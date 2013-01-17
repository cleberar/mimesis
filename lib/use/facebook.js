/*
 * mimesis,
 * Utilizacao do Facebook
 * 
 * FIXME :: Prototipo total, ta muito ruim, e porpicia a falhas a forma
 *          de conversacao pelo Facebook
 *
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */

var browser = require("../devices/browser");


var Facebook = function() {

    var self = this;
    this.user = "";
    this.password = "";

    this.access = function() {

        // entrando no facebook
        browser.open("http://facebook.com.br", function(window) {

            //console.log(window.location);
            // loga no facebook
            self.login(window);
            // conversa por chat
            self.chat(window);
        });
    }


    this.login = function(window) {
        if (window.document.querySelector("#email") 
            && window.document.querySelector("#pass")) {
            window.document.querySelector("#email").value = self.user;
            window.document.querySelector("#pass").value = self.password;
            window.document.querySelector("#loginbutton").click();
        } else  {
            return false;
        }
    }

    this.chat = function(window) {

        console.log('conversar pelo chat')
        var elements = window.document.querySelectorAll(".numMessages"),
            numMessages,
            maxMessages,
            called,
            caller,
            chat,
            message;

        if (elements.length) {
            window.setInterval(function() { 
                numMessages = window.document.querySelectorAll(".numMessages");
                for (var key = 0, maxMessages = numMessages.length; key < maxMessages; key++) {
                    called = numMessages[key];
                    
                    console.log(called.innerHTML);

                    if (called.innerHTML > 0) {
                        console.log('Alguem me chamou ...');

                        chat = called.parentNode.parentNode.parentNode.parentNode;
                        message = chat.parentNode.parentNode.querySelector(".fbChatMessageGroup:last-child");
                        caller = message.querySelector('a:first-child').getAttribute("aria-label");
                        
                        var lastMessage = message.querySelector('div[data-jsid="message"]:last-child').innerHTML;
                        console.log(caller , ' disse ', lastMessage);

                        window.setTimeout(function() {
                            
                            var response = chat.querySelector(".uiTextareaAutogrow"); 
                            response.value = caller + " Bebesse foi ?";
                            response.focus();
                            browser.keyboardEvent(window.document, response, 13);
                        
                        }, 1000);
                    }
                }
            }, 1000);
        }
    }
}

module.exports = Facebook;