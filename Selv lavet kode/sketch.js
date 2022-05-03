let navnOgColaPlacering = 415;
let colaYPlacering = 80;

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
  new medarbejder('Mads', 3),
  new medarbejder('Niels', 5),
  new medarbejder('Gud', 5)
];





//setup kører en masse ting iggenem for at give os en base at starte på når vi starter programmet
function setup() {
  if (windowWidth <= 1000) {
    navnOgColaPlacering = 50
  } else { navnOgColaPlacering = width / 2 + 40 }

  createCanvas(windowWidth, windowHeight - 10);
  background(205)
  //herunder har jeg lavet 
  input = createInput();
  input.position(width / 2 + 100, 50);
  //herunder har jeg lavet mine dropdown menuer
  dropdown = createSelect();
  dropdown.position(0, 0)
  dropdown.changed(visplatform)
  vismedarbejderliste();
  //herunnder har jeg lavet min cola slider der lader dig vælge hvor meget cola dit nye medlem drikker om dagen.
  slider = createSlider(0, 10, 5);
  slider.position(width / 2 + 100, 80);
  slider.style('width', '80px');
  //herunder har jeg lavet opret knappen der kan ¨få oprettet din bruger og tilføjet til systemet.
  button = createButton('opret');
  button.position(width / 2 + 270, 80);
  visplatform();
  if (windowWidth <= 900) {
    navnOgColaPlacering = 50
    input.position(110, 270)
    button.position(260, 300)
    slider.position(110, 300);
    colaYPlacering = 300;

  } else {
    navnOgColaPlacering = width / 2 + 40;
    input.position(width / 2 + 100, 50)
    button.position(width / 2 + 270, 80)
    slider.position(width / 2 + 100, 80);
    colaYPlacering = 80;
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
  console.log('visplatform');
}

//visprofil viser medarbejderens profil på skærmen
function visprofil(person) {
  medarbejdere[person].profile();
  console.log(person)
}

//draw kører all commands iggenem en gang per frame, lige nu tegner den teksten og laver rektangler ovre i vores tilfæjelses område
function draw() {
  let val = slider.value();
  textSize(24)
  strokeWeight(0)
  text('navn:\ncola:', navnOgColaPlacering, colaYPlacering - 12)
  // visplatform();
  strokeWeight(1);
  rect(navnOgColaPlacering + 160, colaYPlacering, 30, 20)
  textSize(18)
  text(val, navnOgColaPlacering + 161, colaYPlacering + 2, 50);
  button.mousePressed(tilføjmedlem);

}

//tilføjmedlem skubber det nye medlem med ind i vores kode så vi kan tilføje medlemmer
function tilføjmedlem() {
  let colaerdrukket = slider.value();
  let navnindtastet = input.value();
  console.log('medlem tilføjet')
  medarbejdere.push(new medarbejder(str(navnindtastet), colaerdrukket))
  vismedarbejderliste();
  dropdown.value(navnindtastet)
  visplatform();
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
    button.position(260, 300)
    slider.position(110, 300);
    colaYPlacering = 300;

  } else {
    navnOgColaPlacering = width / 2 + 40;
    input.position(width / 2 + 100, 50)
    button.position(width / 2 + 270, 80)
    slider.position(width / 2 + 100, 80);
    colaYPlacering = 80;
  }

}

