//idag skal jeg arbejde med følgende:
//fikse bug med dropdown menu når man redigere
//vise data for den nuværende bruger når man trykker rediger
//få uploadet data til local storage
//få tilføjet rugbrød spist ved middags bordet og andre informatioiner

let rugbrødspist = 5;
let navnOgColaPlacering = 415;
let colaYPlacering = 80;
let redigermode = false;
let opretmode = false;
let sletmode = false;
let aktivemode = '';



//class medarbejder definerer hvad en medarbejder er i dette program og tegner selve profillen for medarbejderen
class medarbejder {
  constructor(navn, colaforbrug) {
    this.navn = navn;
    this.cola = colaforbrug;


  }

  //profile er den funktion vi kan kalde når vu gerne ville have en medarbejder vist
  profile() {
    textSize(24)
    text(str('Navn: ' + this.navn), 50, 50)
    text(this.navn + ' drikker ca ' + this.cola + ' colaer om dagen', 50, 100)

  }


}

//medarbejdere er en array der har alle vores medarbejderes data og også der de ny tilføjede medarbedjere bliver skubbet ind af funktionen tilføjmedlem
let medarbejdere = [
  //Her kan vi tilføje flere medarbejdere
  // formatet til at tilføje er som følger: new medarbejder('Navn', antal colaer drukket på en dag);
];


//setup kører en masse ting iggenem for at give os en base at starte på når vi starter programmet
function setup() {
  console.log('data hentet')
  if (windowWidth <= 1000) {
    navnOgColaPlacering = 50
  } else { navnOgColaPlacering = width / 2 + 40 }

  createCanvas(windowWidth - 10, windowHeight - 10);
  background(205)
  //herunder har jeg lavet mine dropdown menuer
  dropdown = createSelect();
  dropdown.position(0, 0)
  dropdown.changed(visplatform)
  //herunder har jeg lavet mit tekstfelt
  input = createInput();
  input.position(width / 2 + 100, 50);
  //herunnder har jeg lavet min cola slider der lader dig vælge hvor meget cola dit nye medlem drikker om dagen.
  colaslider = createSlider(0, 10, 5);
  colaslider.position(width / 2 + 100, 80);
  colaslider.style('width', '80px');
  colaoutput = createInput();
  colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
  colaoutput.style('width', '20px');
  //herunder har jeg lavet opret knappen der kan ¨få oprettet din bruger og tilføjet til systemet.
  bekræft = createButton('bekræft');
  bekræft.position(width / 2 + 270, 80);

  //herunder har jeg lavet vores rediger knap den kan give dig adgang til at rette på oplysninger om den valgte bruger.
  rediger = createButton('rediger');
  rediger.position(input.x, input.y - rediger.height - 1)

  opret = createButton('opret');
  opret.position(rediger.x + rediger.width + 2, rediger.y)

  slet = createButton('slet');
  slet.position(opret.x + opret.width + 2, opret.y)

  rugbrødslider = createSlider(0, 10, 5);
  rugbrødslider.position(colaslider.x, colaslider.y + 30);
  rugbrødslider.style('width', '80px');
  rugbrødsoutput = createInput()
  rugbrødsoutput.position(rugbrødslider.x + rugbrødslider.width + 10, rugbrødslider.y)
  rugbrødsoutput.style('width', '20px');

  gemknap = createButton('Gem')
  gemknap.position(slet.x + slet.width + 2, slet.y)



  vismedarbejderliste();
  visplatform();
  if (windowWidth <= 900) {
    navnOgColaPlacering = 50
    input.position(110, 270)
    bekræft.position(260, 300)
    colaslider.position(110, 300);
    colaYPlacering = 300;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbrødslider.position(colaslider.x, colaslider.y + 30);
    rugbrødsoutput.position(rugbrødslider.x + rugbrødslider.width + 10, rugbrødslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
    gemknap.position(slet.x + slet.width + 2, slet.y)
  } else {
    navnOgColaPlacering = width / 2 + 40;
    input.position(width / 2 + 100, 50)
    bekræft.position(width / 2 + 270, 80)
    colaslider.position(width / 2 + 100, 80);
    colaYPlacering = 80;
    rugbrødslider.position(colaslider.x, colaslider.y + 30);
    rugbrødsoutput.position(rugbrødslider.x + rugbrødslider.width + 10, rugbrødslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
    gemknap.position(slet.x + slet.width + 2, slet.y)
  }

}

//visplatform kører alle medlemer iggenem og tjekker hvilken en der skal vises
function visplatform() {
  for (let i = 0; i < medarbejdere.length; i++) {
    if (medarbejdere[i].navn === dropdown.value()) {
      background(205);
      visprofil(i);
    }
  }
  gemlokalt()
  console.log('visplatform');
}

//visprofil viser medarbejderens profil på skærmen
function visprofil(person) {
  medarbejdere[person].profile();
}


//draw krer all commands iggenem en gang per frame, lige nu tegner den teksten og laver rektangler ovre i vores tilføjelses område
function draw() {
  let colaval = colaslider.value();
  let rugbrødval = rugbrødslider.value();
  textSize(24)
  strokeWeight(0)
  text('navn:\ncola:\nrugbrød:', navnOgColaPlacering - 30, colaYPlacering - 12)
  // visplatform();
  strokeWeight(1);
  text(str(aktivemode), rediger.x - 100, rediger.y - rediger.height / 2);
  bekræft.mousePressed(tilføjmedlem);
  opret.mousePressed(startopretmode);
  slet.mousePressed(startsletmode);
  rediger.mousePressed(startredigeringsmode);
  rugbrødsoutput.value(str(rugbrødval))
  colaoutput.value(str(colaval))
  gemknap.mousePressed(gemlokalt)
}

//tilføjmedlem skubber det nye medlem med ind i vores kode så vi kan tilføje medlemmer
function tilføjmedlem() {
  let colaerdrukket = colaslider.value();
  let navnindtastet = input.value();
  if (opretmode) {
    console.log('medlem tilføjet')
    medarbejdere.push(new medarbejder(str(navnindtastet), colaerdrukket))
    vismedarbejderliste();
    dropdown.value(navnindtastet)
    visplatform();
    opretmode = false;
    input.value('')
    let col = color(255);
    opret.style('background-color', col, 'stroke', noStroke);

  }
  if (redigermode) {
    for (let i = 0; i < medarbejdere.length; i++) {
      if (medarbejdere[i].navn === dropdown.value()) {
        console.log('medlem redigeret')
        medarbejdere[i].navn = navnindtastet
        medarbejdere[i].cola = colaerdrukket
        dropdown.remove()
        dropdown.selected(i);
        dropdown = createSelect();
        dropdown.selected(i);
        dropdown.position(0, 0);
        dropdown.changed(visplatform);
        background(205);
        vismedarbejderliste();
        visplatform();
        background(205);
        visprofil(i);
      }
    }
  }
  if (sletmode) {
    for (let i = 0; i < medarbejdere.length; i++) {
      if (medarbejdere[i].navn === dropdown.value()) {
        medarbejdere.splice(i, 1)
        dropdown.remove()
        dropdown = createSelect();
        dropdown.position(0, 0)
        dropdown.changed(visplatform)
        vismedarbejderliste();
        console.log('bruger slettet')
        visplatform();
      }
    }
  }
}

//vismedarbejderliste kører all vores medarbejdere iggenem og tilføjer dem til vores dropdown menu så vi kan vælge deres profiler
function vismedarbejderliste() {
  for (let i = 0; i < medarbejdere.length; i++) {
    dropdown.option(medarbejdere[i].navn)
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 1);
  background(205);
  visplatform();
  if (windowWidth <= 900) {
    navnOgColaPlacering = 50
    input.position(110, 270)
    bekræft.position(260, 300)
    colaslider.position(110, 300);
    colaYPlacering = 300;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbrødslider.position(colaslider.x, colaslider.y + 30);
    rugbrødsoutput.position(rugbrødslider.x + rugbrødslider.width + 10, rugbrødslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
    gemknap.position(slet.x + slet.width + 2, slet.y)
  } else {
    navnOgColaPlacering = width / 2 + 40;
    input.position(width / 2 + 100, 50)
    bekræft.position(width / 2 + 270, 80)
    colaslider.position(width / 2 + 100, 80);
    colaYPlacering = 80;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbrødslider.position(colaslider.x, colaslider.y + 30);
    rugbrødsoutput.position(rugbrødslider.x + rugbrødslider.width + 10, rugbrødslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
    gemknap.position(slet.x + slet.width + 2, slet.y)
  }
}


function startopretmode() {
  let col = color(215);
  opretmode = true
  sletmode = false
  console.log('opret mode er true')
  redigermode = false;
  background(205)
  aktivemode = 'Du kan nu oprette medlemmer'
  visplatform();
}


function startsletmode() {
  sletmode = true;
  redigermode = false;
  opretmode = false;
  background(205);
  aktivemode = 'Du kan nu slette det valgte medlem ved at trykke bekræft'
  visplatform();
}


function startredigeringsmode() {
  redigermode = true
  console.log('redigerings mode er aktivt')
  opretmode = false;
  sletmode = false
  for (let i = 0; i < medarbejdere.length; i++) {
    if (medarbejdere[i].navn === dropdown.value()) {
      input.value(medarbejdere[i].navn)
      colaslider.value(medarbejdere[i].cola)
    }
  }
  background(205)
  aktivemode = 'Du kan nu redigere medlemmer'
  visplatform();
}


function gemlokalt() {
 
    localStorage.setItem('Medarbejder', JSON.stringify( medarbejdere));
  
  console.log('medarbejdere er gemt lokalt')
}


// function hentlokaldata() {
//   const hentdata = localStorage.getItem('Medarbejder Database');
//   console.log('data hentet')
// }


// function opretkategori(kategorinavn){
//ll

// }


