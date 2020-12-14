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
      comparaciones: [">", "<", ">=", "<=", "==","!="],
      PalabrasReservadas: ['VAR','Decimal','Palabra','Letra'],
      keyword: ['if', 'else', 'else if'],
      boolean: ['true','false'],
      identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
      fatarrow: "=>",
      assign: "=",
      endline: ";",
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
    {"name": "comparacion$subexpression$1", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "comparacion$subexpression$1", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "comparacion$subexpression$2", "symbols": [(lexer.has("number") ? {type: "number"} : number)]},
    {"name": "comparacion$subexpression$2", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "comparacion$subexpression$2", "symbols": [(lexer.has("boolean") ? {type: "boolean"} : boolean)]},
    {"name": "comparacion", "symbols": ["comparacion$subexpression$1", (lexer.has("comparaciones") ? {type: "comparaciones"} : comparaciones), "comparacion$subexpression$2"]},
    {"name": "var_assign", "symbols": [{"literal":"VAR"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expr", "_", {"literal":";"}], "postprocess":  
        (d) => {
            return {
                        type: "var_assign",
                        tipo_palabra: d[0],
                        var_name:d[2],
                        value:d[6]
                    }
                }
        },
    {"name": "print", "symbols": [{"literal":"print"}, {"literal":"("}, "_", "expresiones_asignacion", "_", {"literal":")"}, "_", (lexer.has("endline") ? {type: "endline"} : endline)], "postprocess":  
        (d) => {
            return {
                        type: "print",
                        value:d[3]
                    }
                }
        },
    {"name": "expresiones_asignacion", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expresiones_asignacion", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expresiones_asignacion", "symbols": [(lexer.has("boolean") ? {type: "boolean"} : boolean)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
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
