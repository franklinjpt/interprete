 const nearley = require("nearley");
 const grammar = require("../grammar.js");
 const formulario = document.querySelector('#formulario');
 const textArea = document.querySelector("textarea").value;

 console.log(textArea);

 eventListeners();
 function eventListeners(){
 
     formulario.addEventListener('submit', validarInformacion);
 
  }

  function validarInformacion(){
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    
      if(parser.results.length>1){
        console.log("Error: gramatica ambigua detectada");
      } else if (parser.results.length == 1) {
        console.log(`Gramatica correcta`);
      } else {
        console.log("Error: parser not found.");
     }

  }
