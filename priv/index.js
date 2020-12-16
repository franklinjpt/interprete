const nearley = require("nearley");
const grammar = require("../grammar.js");
//const fs = require("mz/fs");


//async function main(){
  //  const filename = process.argv[2];
    //if(!filename){
      //return;
   // }

    //const code = (await fs.readFile(filename)).toString();
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    

    parser.feed(`si(12<10){
      print("hola mundo");
    }`);

    console.log(parser.results[0]);

    
    //if(parser.results.length>1){
//         console.log("Error: ambigous grammar detected", parser.results);
//     //} else if (parser.results.length == 1) {
//         const ast = parser.results[0];
//         const outputFilename = filename.replace(".small", ".ast");
//         await fs.writeFile(outputFilename, JSON.stringify(ast, null, " "));
//         console.log(`Wrote ${outputFilename}`);
//     } else {
//         console.log("Error: parser not found.", parser.results);
//     }
// }

// main().catch(err=>console.log(err.stack));