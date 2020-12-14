// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const moo = require('moo');

    let lexer = moo.compile({
      WS:      /[ \t]+/,
      comment: /\/\/.*?$/,
      number:  /0|[1-9][0-9]*/,
      string:  /"(?:\\["\\]|[^\n"\\])*"/,
      lparen:  '(',
      rparen:  ')',
      lbrace:  '{',
      rbrace:  '}',
      lcorch:  '[',
      rcorch:  ']',
      comparaciones: [">", "<", ">=", "<=", "==","!="],
      operador: ["+","-","*","/","x","÷"],
      PalabrasReservadas: ['VAR','Decimal','Palabra','Letra'],
      keyword: ['if', 'else', 'else if'],
      boolean: ['true','false'],
      myNull: ['null'],
      identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
      fatarrow: "=>",
      assign: "=",
      endline: ";",
      coma: ",",
      NL: {match: /[\r\n]+/, lineBreaks: true},
    }); 
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (d) => {
            return [d[0]];
        }
                },
    {"name": "statements", "symbols": ["_", "statement", "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements"], "postprocess": 
        (d) => {
            return [d[1], ...d[4] ]
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["print"], "postprocess": id},
    {"name": "statement", "symbols": ["condicional_si"], "postprocess": id},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": id},
    {"name": "statement", "symbols": ["do_while"], "postprocess": id},
    {"name": "expr", "symbols": ["expresion_unaria"], "postprocess": id},
    {"name": "expr", "symbols": ["expresion_binaria"], "postprocess": id},
    {"name": "condicional_si", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}], "postprocess":  
        (d) => {
            return {
                    type: "condicional",
                    tipo_keyword: d[0],
                    condicion:d[4],
                    instrucciones:d[13]
                }
            }
        },
    {"name": "condicional_si", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}, {"literal":"else"}, {"literal":"{"}, "_", "statements", "_", {"literal":"}"}]},
    {"name": "while_loop", "symbols": [{"literal":"while"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}]},
    {"name": "do_while", "symbols": [{"literal":"do"}, "_", {"literal":"{"}, "_", (lexer.has("NL") ? {type: "NL"} : NL), "statements", (lexer.has("NL") ? {type: "NL"} : NL), "_", {"literal":"}"}, {"literal":"while"}, "_", {"literal":"("}, "_", "comparacion", "_", {"literal":")"}]},
    {"name": "comparacion$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "comparacion$subexpression$1", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "comparacion$subexpression$2", "symbols": ["expresion_unaria"]},
    {"name": "comparacion", "symbols": ["comparacion$subexpression$1", "_", (lexer.has("comparaciones") ? {type: "comparaciones"} : comparaciones), "_", "comparacion$subexpression$2"]},
    {"name": "expresion_unaria", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("boolean") ? {type: "boolean"} : boolean)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": [(lexer.has("myNull") ? {type: "myNull"} : myNull)], "postprocess": id},
    {"name": "expresion_unaria", "symbols": ["array"], "postprocess": id},
    {"name": "ecuacion", "symbols": ["value"], "postprocess": id},
    {"name": "ecuacion", "symbols": ["expresion_binaria"], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "value", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expresion_binaria", "symbols": ["value", "_", (lexer.has("operador") ? {type: "operador"} : operador), "_", "ecuacion"]},
    {"name": "array", "symbols": [{"literal":"["}, "_", "array_items", "_", {"literal":"]"}]},
    {"name": "array", "symbols": [{"literal":"["}, "_", {"literal":"]"}]},
    {"name": "array_items", "symbols": ["expresion_unaria"]},
    {"name": "array_items", "symbols": ["expresion_unaria", "_", {"literal":","}, "_", "array_items"]},
    {"name": "var_assign", "symbols": [{"literal":"var"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr", "_", {"literal":";"}], "postprocess":  
        (d) => {
            return {
                        type: "var_assign",
                        tipo_palabra: d[0],
                        var_name:d[2],
                        value:d[6]
                    }
                }
        },
    {"name": "print", "symbols": [{"literal":"print"}, {"literal":"("}, "_", "expr", "_", {"literal":")"}, "_", (lexer.has("endline") ? {type: "endline"} : endline)], "postprocess":  
        (d) => {
            return {
                        type: "print",
                        value:d[3]
                    }
                }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "n$ebnf$1", "symbols": []},
    {"name": "n$ebnf$1", "symbols": ["n$ebnf$1", (lexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n", "symbols": ["n$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
