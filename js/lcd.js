var character =
{
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

function space(tam) {
  var s = ' ';
  return s;
}

function r(rid, number, tam) {
  var s = "";
  for(var ni=0; ni < number.length; ni++) {
    var digit = number[ni];

    s += ' ';
    for(var i=0; i < tam; i++) {
      s+=character [digit][rid];  		
    }
    s += '  ';
  }
  s += '\n';

  return s;
}

function c(cid, number, tam) {
  var s = "";
  for(var i = 0; i < tam; i++) {
    for(var ni=0; ni < number.length; ni++) {
      var digit = number[ni];

      s+=character [digit][cid];
      for(var j=0; j < tam; j++) {
        s+=' ';
      }
      s+=character [digit][cid+1];

      s += space(tam);
    }
    s += '\n';
  }
  return s;
}

function preencherDisplay(num, tam) {
  return r(0, num, tam) +
    c(1, num, tam) +
    r(3, num, tam) +
    c(4, num, tam) +
    r(6, num, tam) ;
}

function refresh(event) {
  var display = document.getElementById('display');
  var tam = document.getElementById('tamanho').value;
  display.textContent = preencherDisplay(getTime(), tam);
  var t = setTimeout(refresh, 500);
}

function refresh2(event) {
  refresh();
  return true;
}

onload = function() {
  document.getElementById('txt').focus();
  document.getElementById('txt').onchange = refresh;
  document.getElementById('txt').onkeyup = refresh2;
  document.getElementById('tamanho').onchange = refresh;
  refresh();
}

function getTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  return h + '-' +  m + '-' + s;
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}