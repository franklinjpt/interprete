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
      lcorch:  '[',
      rcorch:  ']',
      incrementos_decrementos: ["++", "--"],
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
%}

@lexer lexer

statements
    -> _ statement _
        {%
            (d) => {
                return [d[1]];
            }
        %}
    | _ statement _ %NL statements
        {%
            (d) => {
                return [d[1], ...d[4] ]
            }
        %}


statement
    -> var_assign _ ";" {% id %}
    | print _ ";" {% id %}
    | condicional_si {% id %}
    | while_loop {% id %}
    | do_while {% id %}
    | for_loop {% id %}
    | operadores_esp _ ";" {% id %}


expr 
    -> expresion_unaria {% id %}
    | expresion_binaria {% id %}   
    #| function_call {% id %}

condicional_si
   -> "if" _ "(" _ comparacion _ ")"  _  "{" _ %NL statements %NL _  "}"
        {% 
        (d) => {
            return {
                    type: "condicional_si",
                    tipo_keyword: d[0],
                    condicion:d[4],
                    instrucciones:d[11]
                }
            }
        %}
    | "if" _ "(" _ comparacion _ ")"  _  "{" _ %NL statements %NL _ "}" "else" "{" _ statements _ "}"
     {% 
        (d) => {
            return {
                    type: "condicional_sino",
                    tipo_keyword1: d[0],
                    condicion:d[4],
                    instrucciones1: d[11],
                    tipo_keyword2: d[15],
                    instrucciones2: d[18]
                }
            }
        %}

while_loop
    -> "while" _ "(" _ comparacion _ ")" _ "{" _ %NL statements  %NL _  "}" {%
        (d)=> { return{
            type: "while_loop",
            instrucciones: d[11],
            condicion1: d[4]
            } 
        }
    %}

do_while
    -> "do" _ "{" _ %NL statements  %NL _  "}" "while" _ "(" _ comparacion _ ")" {%
        (d)=> { return{
            type: "do_while",
            instrucciones: d[4],
            condicion1: d[12]
            } 
        }
    %}

for_loop
    -> "for" _ "(" _ var_assign _ ";" _ comparacion _ ";" _ operadores_esp _ ")" _ "{" _ %NL statements  %NL _  "}" {%
        (d)=> { return{
            type: "for_loop",
            condicion1: d[4],
            condicion2: d[8],
            condicion3: d[12],
            instrucciones: d[19]
        } 
        }
    %}

comparacion
    -> (%number | %identifier ) _ %comparaciones _ (expresion_unaria) {%
        (d)=> { return{
            type: "comparacion",
            valor1: d[0],
            valor2: d[4]
        }
        }
    %}


expresion_unaria
    -> %number {% id %}
    | %identifier {% id %}
    | %string {% id %}
    | %boolean {% id %}
    | %myNull {% id %}
    | array {% id %}
    
ecuacion
    -> value {% id %}
    | expresion_binaria {% id %}

value
    -> %number {% id %}
    | %identifier {% id %}

expresion_binaria
    -> value _ %operador _ ecuacion {% (d)=> {
        return {
            type: "expresion_binaria",
            valor1: d[0],
            operador: d[2],
            valor2: d[0]
        }
    } %}

array
    -> "[" _ array_items _ "]"  {% (data) => data[2] %}
    | "[" _ "]" {% () => [] %}


array_items
    -> expresion_unaria {% (data) => [data[0]] %}
    | expresion_unaria _ "," _ array_items {% (data) => [data[0], ...data[4]] %}


operadores_esp
    -> %identifier "++"
    | "++" %identifier 
    | %identifier "--" 
    | "--" %identifier

var_assign 
    -> "var" __ %identifier _ "=" _ expr
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
    -> "print" "(" _ expr _ ")" 
    {% 
    (d) => {
        return {
                    type: "print",
                    text: d[3]
                }
            }
    %}

_ -> %WS:*
n -> %NL:*
__ -> %WS:+