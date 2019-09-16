
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const ULTIMO_NIVEL = 10;


class Juego{
  constructor(){
    this.inicializar= this.inicializar.bind(this)
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar(){
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel=1
    this.colores ={
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggleBtnEmpezar(){
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }

  }


  generarSecuencia(){
    //Se pueden crear arrays y se la pasa de para metro el numero de elementos
    // de esta forma con new arrays con el metodo fill se llena el array con 0
    //con Math floor se redondea un decimal
    //Math.random() solo genera un decimal entre el 0 y 1
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
  }
  siguienteNivel(){
    this.subNivel = 0
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
  asignarAcolorNumero(color){
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }
  iluminarSecuencia(){
    for (let i = 0; i < this.nivel; i++) {
      const color = this.asignarAnumeroColor(this.secuencia[i])

      setTimeout(() => this.iluminarColor(color,i), 1000 * i)
    }
  }
  iluminarColor(color,i){
    this.colores[color].classList.add('light')
    setTimeout(() =>this.apagarColor(color,i),350)
  }
  apagarColor(color,i){
    this.colores[color].classList.remove('light')
    if ((i+1) === this.nivel) {
        this.agregarEventosClick()
    }
  }
  agregarEventosClick(){
    // con el metodo bind enlacemos el this del evento y lo convertimos al this del juego u objeto
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }
  elegirColor(ev){

    // En un evento this es el objeto html al que se le escucha el evento
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.asignarAcolorNumero(nombreColor)
    this.iluminarColor(nombreColor)
      // console.log(numeroColor);
    if(numeroColor === this.secuencia[this.subNivel]){
      this.subNivel++
      console.log(this.subNivel);
      if (this.subNivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick();
        if (this.nivel === (ULTIMO_NIVEL+1)) {
          this.ganoElJuego()
        }else{
          swal(`Felicidades`,`Avanzas al nivel ${this.nivel}`)
            .then(()=>{
              setTimeout(this.siguienteNivel, 1500)
            })
          }

        }


    }else{
      this.perdioElJuego()
    }
}

    ganoElJuego(){
      swal("Ganaste el juego", "Felicidades!", "success")
            .then(this.inicializar)
    }
    perdioElJuego(){
      swal("GG Perdiste el juego", "Lo lamentamos =(", "error")
            .then(()=>{
              this.eliminarEventosClick()
              this.inicializar()
            })
    }
}

function empezarJuego(){
  window.juego = new Juego()
}
