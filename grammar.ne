@{%
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
%}

@lexer lexer

statements
    -> statement
        {%
            (d) => {
                return [d[0]];
            }
        %}
    | statements _ n statement
        {%
            (d) => {
                return [...d[0], d[2] ]
            }
        %}


statement
    -> var_assign {% id %}
    | print {% id %}
    | condicional_si {% id %}
    
    #| function_call {% id %}

condicional_si
   -> "if" _ "(" _ comparacion _ ")"  _  "{"  _ statements  _  "}"
        {% 
        (d) => {
            return {
                    type: "condicional",
                    tipo_keyword: d[0],
                    condicion:d[4],
                    instrucciones:d[13]
                }
            }
        %}
    | "if" _ "(" _ comparacion _ ")"  _  "{"  _ statements  _  "}" "else" "{" _ statements _ "}"

#instrucciones
 #   -> instrucciones var_assign
  #  |  instrucciones  print
   # | var_assign {%id%}
    #| print {%id%} 

comparacion
    -> (%number | %identifier ) %comparaciones (%number | %identifier)

#function_call 
 #   -> %identifier _ "(" _ (arguments _):? ")"
  #      {%
    #        (d) => {
     #           return {
  #                  type: "function_call",
     #               function_name: d[0],
      #              arguments: d[4] ? d[4][0] : []
      #          }
     #       }
    #    %} 

#arguments
 #   -> expr
  #      {%
   #         (d) => {
    #            return [d[0]];
     #       }
      #  %}
    #| arguments __ expr
     #   {%
      #      (d) => {
       #         return [...d[0], d[2] ]
        #    }
        #%}

var_assign 
    -> "VAR" __ %identifier _ "=" _ expr _ ";"
    {% 
    (d) => {
        return {
                    type: "var_assign",
                    tipo_palabra: d[0],
                    var_name:d[2],
                    value:d[6]
                }
            }
    %}

print
    -> "print" "(" _ expresiones_asignacion _ ")" _ %endline 
    {% 
    (d) => {
        return {
                    type: "print",
                    value:d[3]
                }
            }
    %}


expresiones_asignacion
    -> %string {% id %}
    | %number {% id %}
    | %boolean {% id %}

expr 
    -> %string {% id %}
    | %number {% id %}
    | %identifier {% id %}

_ -> %WS:*
n -> %NL:*
__ -> %WS:+