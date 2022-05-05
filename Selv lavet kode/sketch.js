//idag skal jeg arbejde med foelgende:
//Jeg skal have hjemme siden op på nettet. Done
//Jeg skal fikse bug med at man ikke kan have flere brugere med same navn. Done
//jeg skal have rugbroed integreret i min redigerings menu så den bliver skiftet til den rigtige værdi nå man vælger en bruger at redigere. done
//Jeg skal skjule elementer når de ike skal bruger for at gøre det mere brugervenligt. Done

let rugbroedspist = 5;
let navnOgColaPlacering = 415;
let colaYPlacering = 80;
let redigermode = false;
let opretmode = false;
let sletmode = false;
let aktivemode = '';
let gem = []
let data = 0;



//class medarbejder definerer hvad en medarbejder er i dette program og tegner selve profillen for medarbejderen
class medarbejder {
  constructor(navn, colaforbrug, rugbroedforbrug) {
    this.navn = navn;
    this.cola = colaforbrug;
    this.rugbroed = rugbroedforbrug;


  }

  //profile er den funktion vi kan kalde når vu gerne ville have en medarbejder vist
  profile() {
    textSize(24)
    text(str('Navn: ' + this.navn), 50, 50)
    text(this.navn + ' drikker ca ' + this.cola + ' colaer om dagen', 50, 100);
    text(this.navn + ' spiser ca ' + this.rugbroed + ' skiver rugbroed om dagen', 50, 120);

  }


}

//medarbejdere er en array der har alle vores medarbejderes data og også der de ny tilfoejede medarbedjere bliver skubbet ind af funktionen tilfoejmedlem
let medarbejdere = [
  //Her kan vi tilfoeje flere medarbejdere
  // formatet til at tilfoeje er som foelger: new medarbejder('Navn', antal colaer drukket på en dag,antal rugbroed spist på en dag);
];


//setup koerer en masse ting iggenem for at give os en base at starte på når vi starter programmet
function setup() {
  if (localStorage.length > 1) {
    pushmedarbejdere();
  }
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
  //herunder har jeg lavet opret knappen der kan ¨få oprettet din bruger og tilfoejet til systemet.
  bekræft = createButton('bekræft');
  bekræft.position(input.x + input.width + 2, input.y)

  //herunder har jeg lavet vores rediger knap den kan give dig adgang til at rette på oplysninger om den valgte bruger.
  rediger = createButton('rediger');
  rediger.position(input.x, input.y - rediger.height - 1)

  opret = createButton('opret');
  opret.position(rediger.x + rediger.width + 2, rediger.y)

  slet = createButton('slet');
  slet.position(opret.x + opret.width + 2, opret.y)

  rugbroedslider = createSlider(0, 10, 20);
  rugbroedslider.position(colaslider.x, colaslider.y + 30);
  rugbroedslider.style('width', '80px');
  rugbroedsoutput = createInput()
  rugbroedsoutput.position(rugbroedslider.x + rugbroedslider.width + 10, rugbroedslider.y)
  rugbroedsoutput.style('width', '20px');

  profilbillede = createButton('tag billede');
  profilbillede.position(rugbroedsoutput.x+50, rugbroedsoutput.y + rugbroedsoutput.height + 10);
  video = createCapture(VIDEO)
  video.size(220, 240);
 


  opretmedarbejderliste();
  visplatform();
  if (windowWidth <= 900) {
    navnOgColaPlacering = 50
    input.position(130, 270)
    bekræft.position(input.x + input.width + 2, input.y)
    colaslider.position(input.x, 300);
    colaYPlacering = 300;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbroedslider.position(colaslider.x, colaslider.y + 30);
    rugbroedsoutput.position(rugbroedslider.x + rugbroedslider.width + 10, rugbroedslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
  } else {
    navnOgColaPlacering = width / 2 + 40;
    input.position(width / 2 + 130, 50)
    bekræft.position(input.x + input.width + 2, input.y)
    colaslider.position(input.x, 80);
    colaYPlacering = 80;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbroedslider.position(colaslider.x, colaslider.y + 30);
    rugbroedsoutput.position(rugbroedslider.x + rugbroedslider.width + 10, rugbroedslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
  }

}

//visplatform koerer alle medlemer iggenem og tjekker hvilken en der skal vises
function visplatform() {
  console.log(dropdown.value())
  for (let i = 0; i < medarbejdere.length; i++) {
    if (medarbejdere[i].navn === dropdown.value()) {
      background(205);
      visprofil(i);
    }
  }
  console.log('visplatform');
}

//visprofil viser medarbejderens profil på skærmen
function visprofil(person) {
  medarbejdere[person].profile();
}


//draw koerer all commands iggenem en gang per frame, lige nu tegner den teksten og laver rektangler ovre i vores tilfoejelses område
function draw() {
  let colaval = colaslider.value();
  let rugbroedval = rugbroedslider.value();
image( video,navnOgColaPlacering-29,profilbillede.y)
  // if (sletmode || opretmode || redigermode) {
  //   textSize(24)
  //   strokeWeight(0)
  //   text('navn:\ncola:\nrugbroed:', navnOgColaPlacering - 30, colaYPlacering - 12)
  //   // visplatform();
  //   strokeWeight(1);
  // }
  if (aktivemode == '') {
    rugbroedslider.hide()
    rugbroedsoutput.hide()
    input.hide();
    colaslider.hide();
    colaoutput.hide();
    bekræft.hide();
    rediger.show();
    opret.show();
    slet.show();
  } else {

    text(str(aktivemode), navnOgColaPlacering - 30, rediger.y);
    textSize(24)
    strokeWeight(0)
    text('navn:\ncola:\nrugbroed:', navnOgColaPlacering - 30, colaYPlacering - 12)
    rugbroedslider.show()
    rugbroedsoutput.show()
    input.show();
    colaslider.show();
    colaoutput.show();
    bekræft.show()
    rediger.hide();
    opret.hide();
    slet.hide();
  }
  if (aktivemode == 'Du kan nu slette det valgte medlem ved at trykke bekræft') {
    background(205);
    visplatform();
    text(str(aktivemode), navnOgColaPlacering - 30, rediger.y);
    textSize(24)
    rugbroedslider.hide()
    rugbroedsoutput.hide()
    input.hide();
    colaslider.hide();
    colaoutput.hide();
    bekræft.show()
    rediger.hide();
    opret.hide();
    slet.hide();
  }
  bekræft.mousePressed(tilfoejmedlem);
  opret.mousePressed(startopretmode);
  slet.mousePressed(startsletmode);
  rediger.mousePressed(startredigeringsmode);
  rugbroedsoutput.value(str(rugbroedval))
  colaoutput.value(str(colaval))
  dropdown.changed(visplatform);
  profilbillede.mousePressed(tagbillede)
}

//tilfoejmedlem skubber det nye medlem med ind i vores kode så vi kan tilfoeje medlemmer
function tilfoejmedlem() {
  let colaerdrukket = colaslider.value();
  let navnindtastet = input.value();
  let rugbroedspist = rugbroedslider.value();
  if (opretmode) {
    for (i = 0; i < medarbejdere.length; i++) {
      if (medarbejdere[i].navn == navnindtastet) {
        opretmode = false;
        alert(str(navnindtastet) + ' er allerede oprettet brug venligst efternavn eller andet for at specificere');
        background(205);
        visplatform();
      }

    }
    if (opretmode) {
      console.log('medlem tilfoejet')
      medarbejdere.push(new medarbejder(str(navnindtastet), colaerdrukket, rugbroedspist))
      opretmedarbejderliste();
      background(205);
      visplatform();
      gemlokalt()
      input.value('')
    }
  }

  if (redigermode) {
    for (let i = 0; i < medarbejdere.length; i++) {
      if (medarbejdere[i].navn === dropdown.value()) {
        console.log('medlem redigeret')
        medarbejdere[i].navn = navnindtastet
        medarbejdere[i].cola = colaerdrukket
        medarbejdere[i].rugbroed = rugbroedspist
        dropdown.remove()
        dropdown = createSelect();
        dropdown.position(0, 0);
        dropdown.changed(visplatform);
        opretmedarbejderliste();
        background(205);
        gemlokalt()
        dropdown.value(navnindtastet);
        visplatform();
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
        opretmedarbejderliste();
        console.log('bruger slettet')
        background(205);

        visplatform();
        gemlokalt()
      }
    }
  }
  aktivemode = '';
  sletmode = false;
  opretmode = false;
  redigermode = false;
}

//opretmedarbejderliste koerer all vores medarbejdere iggenem og tilfoejer dem til vores dropdown menu så vi kan vælge deres profiler
function opretmedarbejderliste() {
  for (let i = 0; i < medarbejdere.length; i++) {
    dropdown.option(medarbejdere[i].navn, medarbejdere[i].navn)
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 1);
  background(205);
  visplatform();
  if (windowWidth <= 900) {
    navnOgColaPlacering = 50
    input.position(130, 270)
    bekræft.position(input.x + input.width + 2, input.y)
    colaslider.position(input.x, 300);
    colaYPlacering = 300;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbroedslider.position(colaslider.x, colaslider.y + 30);
    rugbroedsoutput.position(rugbroedslider.x + rugbroedslider.width + 10, rugbroedslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
  } else {
    navnOgColaPlacering = width / 2 + 40;
    input.position(width / 2 + 130, 50)
    bekræft.position(input.x + input.width + 2, input.y)
    colaslider.position(input.x, 80);
    colaYPlacering = 80;
    rediger.position(input.x, input.y - rediger.height - 1)
    opret.position(rediger.x + rediger.width + 2, rediger.y)
    slet.position(opret.x + opret.width + 2, opret.y)
    rugbroedslider.position(colaslider.x, colaslider.y + 30);
    rugbroedsoutput.position(rugbroedslider.x + rugbroedslider.width + 10, rugbroedslider.y)
    colaoutput.position(colaslider.x + colaslider.width + 10, colaslider.y,)
  }
}


function startopretmode() {
  let col = color(215);
  opretmode = true
  sletmode = false
  console.log('opret mode er true')
  redigermode = false;
  background(205)
  aktivemode = 'Du kan nu oprette et medlemm'
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
      rugbroedslider.value(medarbejdere[i].rugbroed)
    }
  }
  background(205)
  aktivemode = 'Du kan nu redigere et medlemm'
  visplatform();
}


function gemlokalt() {

  localStorage.setItem('medarbejdere', JSON.stringify(medarbejdere));

  console.log('medarbejdere er gemt lokalt')
}

function pushmedarbejdere() {
  gem = JSON.parse(localStorage.getItem('medarbejdere'));
  for (i = 0; i < gem.length; i++) {
    medarbejdere.push(new medarbejder(str(gem[i].navn), gem[i].cola, gem[i].rugbroed))
  }
}

function tagbillede() {
  image(video, 0, 0);
  //draw the image being captured on webcam onto the canvas at the position (0, 0) of the canvas
  console.log('billede taget')
}