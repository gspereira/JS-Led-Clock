//Define o desenho de cada número manualmente, para aumentar o tamanho
//os caracteres são duplicados.
var digits = {
  0: ['-', '|', '|', ' ', '|', '|', '-'],
  1: [' ', ' ', '|', ' ', ' ', '|', ' '],
  2: ['-', ' ', '|', '-', '|', ' ', '-'],
  3: ['-', ' ', '|', '-', ' ', '|', '-'],
  4: [' ', '|', '|', '-', ' ', '|', ' '],
  5: ['-', '|', ' ', '-', ' ', '|', '-'],
  6: ['-', '|', ' ', '-', '|', '|', '-'],
  7: ['-', ' ', '|', ' ', ' ', '|', ' '],
  8: ['-', '|', '|', '-', '|', '|', '-'],
  9: ['-', '|', '|', '-', ' ', '|', '-'],
  '-': [' ', ' ', ' ', '-', ' ', ' ', ' '],
};

// horizontalId é a posição que a função vai pegar de cada digito na array Digits
// Funcao horizontal vai imprimir uma linha de _ por vez, recebe qual linha ele vai usa no horizontalId, o numero completo para converter no numero, e usa tamanho para multiplicar a quantidade de caracteres.
function hor(horizontalId, numero, tamanho) {
  var texto="";
  // Imprime 1 digito (de acordo com a tamanho) para cada caractere na string numero
  for(var ni=0; ni < numero.length; ni++) {
    var digit = numero[ni];
    // Adciona o espaçamento entre os caracteres.
    texto += ' ';
    // Aumenta a quantidade de _ de acordo com a tamanho
    for(var i=0; i < tamanho; i++) {
      texto+=digits[digit][horizontalId];      
    }
   // Adiciona o espaçamento depois caracteres 
   texto += '  ';
 }
 texto += '\n';
 return texto;
}
// verticalId é a possição que a função vai pegar de cada digito na array Digits
// Funcao vertical vai imprimir uma linha de | por vez, recebe qual linha ele vai usa no verticalId, o numero completo para converter no numero, e usa tamanho para multiplicar a quantidade de linebreaks.
function ver(verticalId, numero, tamanho) {
  var texto="";
  // Aumenta o tamanho do display em linhas de acordo com a tamanho nesse for
  for(var i=0; i < tamanho; i++) {
    //Faz um digito(dois nessa funcao) para cada caractere da string
    for(var ni=0; ni < numero.length; ni++) {
      var digit = numero[ni];
      // Adciona a string o digito correto e o carectere da posiçao verticalId do numero
      texto += digits[digit][verticalId];
      // Aumenta o espaco entre | de acordo com a tamanho
      for(var j=0; j < tamanho; j++) {
        texto += ' ';
      }
      // Faz o proximo detalhe do digito 
      texto += digits[digit][verticalId+1];
      texto += ' ';
    }
    //Pula para proxima linha
    texto += '\n';
  }
  //Retorna a linha completa
  return texto;
}
// Prepara o texto para ser exibido no display
function formatarTexto(numero, tamanho) {
  return hor(0, numero, tamanho) +
  ver(1, numero, tamanho) +
  // Pula o 2 porque a funcao Vertical usa dois slots por caractere.
  hor(3, numero, tamanho) +
  ver(4, numero, tamanho) +
  // O mesmo para o 5
  hor(6, numero, tamanho) ;
}

// Código que é executado a todo momento para atualizar os dados exibidos
function refresh(event) {
  var display = document.getElementById('display');
  var timezone = document.getElementById('fusoHorario').value;
  var tam = document.getElementById('tamanho').value;
  if (timezone == 'local') {
    display.textContent = formatarTexto(getTimeLocal(), tam);
  } else {
    getTimeFuso(timezone, tam);
  }
  //clock();
  //var t = setTimeout(refresh, 1000);
}

// Retorna o horário local
function getTimeLocal() {
  var hora = new Date();
  var h = hora.getHours();
  var m = hora.getMinutes();
  var s = hora.getSeconds();
  return setHora(h,m,s);
}

//Faz uma requisição à API de qual o horário da região escolhida na view
function getTimeFuso(timezone, tam) {
  var request = new XMLHttpRequest()
  request.open('GET', 'http://worldtimeapi.org/api/timezone/'+timezone)
  request.onload = function () {
    response = JSON.parse(request.responseText);
    //O Date do Javascript não foi capaz de dar parse no padrão de data oferecido pela API
    //Foi necessário a remoção do UTC no final da string de data
    hora = response.datetime.replace(response.utc_offset, '');
    var hora = new Date(hora);
    var h = hora.getHours();
    var m = hora.getMinutes();
    var s = hora.getSeconds();
    var tempo = setHora(h,m,s);
    display.textContent = formatarTexto(tempo, tam);
  }
  request.send();
}

// Adiciona o 0 na frente dos números menores que 10
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

// Aqui define a hora dos inputs escondidos
function setHora(h, m, s) {
  document.getElementById('h').value = h;
  document.getElementById('m').value = m;
  document.getElementById('s').value = s;

  return checkTime(h) + '-' +  checkTime(m) + '-' + checkTime(s);
}

// Aqui pega a hora dos inputs escondidos no html
function getHora() {
  var h = document.getElementById('h').value;
  var m = document.getElementById('m').value;
  var s = document.getElementById('s').value;

  return {
    'h': checkTime(h),
    'm': checkTime(m),
    's': checkTime(s), 
  };
}

// Estou tentando fazer essa parte do código auto-iterar o valor
function clock() {
  var hora = getHora();

  hora['s']++;
  if(hora['s'] == 60){
    hora['s'] = 0;
    hora['m']++;
    if(hora['m'] == 60){
      hora['m'] = 0;
      hora['h']++;
      if(hora['h'] == 24){
        hora['h'] = 0;
      }
    }
  }
  var tam = document.getElementById('tamanho').value;
  display = document.getElementById('display');
  display.textContent = formatarTexto(setHora(hora['h'],hora['m'],hora['s']),tam);
  var clock = setTimeout(clock, 1000);
};

// Verifica se há alguma alteração na view
onload = function() {
  document.getElementById('fusoHorario').onchange = refresh;
  document.getElementById('tamanho').onchange = refresh;
  refresh();
  clock();
}