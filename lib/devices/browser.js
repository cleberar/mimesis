/*
 * mimesis,
 * Esta classe representa o browser, unico dispositivo de integracao com o mimesis
 *
 * https://github.com/cleberar/mimesis
 *
 * Copyright (c) 2013 Cleber Rodrigues
 * Licensed under the MIT license.
 */

module.exports.keyboardEvent = function(document, el, keyCode) {
    
    var eventObj = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");
  
    if(eventObj.initEvent){
      eventObj.initEvent("keydown", true, true);
    }
  
    eventObj.keyCode = keyCode;
    eventObj.which = keyCode;
    
    el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
}