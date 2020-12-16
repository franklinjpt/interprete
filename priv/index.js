 const nearley = require("nearley");
 const grammar = require("../grammar.js");
 const formulario = document.querySelector('#formulario');
 const textArea = document.querySelector("textarea").value;

 console.log(textArea);
 console.log("Hola papiiiii");

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
     

//     console.log(parser.results[0]);

    // const nearley = require("nearley");
    // const compile = require("nearley/lib/compile");
    // const generate = require("nearley/lib/generate");
    // const nearleyGrammar = require("nearley/lib/nearley-language-bootstrapped");
    
    // function compileGrammar(sourceCode) {
    //     // Parse the grammar source into an AST
    //     const grammarParser = new nearley.Parser(nearleyGrammar);
    //     grammarParser.feed(sourceCode);
    //     const grammarAst = grammarParser.results[0]; // TODO check for errors
    
    //     // Compile the AST into a set of rules
    //     const grammarInfoObject = compile(grammarAst, {});
    //     // Generate JavaScript code from the rules
    //     const grammarJs = generate(grammarInfoObject, "grammar");
    
    //     // Pretend this is a CommonJS environment to catch exports from the grammar.
    //     const module = { exports: {} };
    //     eval(grammarJs);
    
    //     return module.exports;
    // }
    
    // const grammar = compileGrammar("main -> foo | bar");
    
    // const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
