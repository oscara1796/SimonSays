
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');


class Juego{
  constructor(){
    this.inicializar();
    this.generarSecuencia();
    this.siguienteNivel();
  }

  inicializar(){
    btnEmpezar.classList.add('hide')
    this.nivel=10
    this.colores ={
      celeste,
      violeta,
      naranja,
      verde
    }
  }
  generarSecuencia(){
    //Se pueden crear arrays y se la pasa de para metro el numero de elementos
    // de esta forma con new arrays con el metodo fill se llena el array con 0
    //con Math floor se redondea un decimal
    //Math.random() solo genera un decimal entre el 0 y 1
    this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random()*4))
  }
  siguienteNivel(){
    this.iluminarSecuencia()
  }
  asignarAnumeroColor(num){
    switch (num) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }
  iluminarSecuencia(){
    for (let i = 0; i < this.nivel; i++) {
      const color = this.asignarAnumeroColor(this.secuencia[i])

      setTimeout(() => this.iluminarColor(color), 1000 * i)
    }
  }
  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() =>this.apagarColor(color),350)
  }
  apagarColor(color){
    this.colores[color].classList.remove('light')
  }
}

function empezarJuego(){
  window.juego = new Juego()
}
