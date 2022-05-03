


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
  createCanvas(windowWidth, windowHeight-10);
  console.log(windowHeight)
  console.log(windowWidth)
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
  strokeWeight(4)
  text('navn:\ncola:', width / 2 + 40, 68)
  // visplatform();
  strokeWeight(1);
  rect(width / 2 + 200, 80, 30, 20)
  textSize(18)
  text(val, width / 2 + 201, 82, 50);
  button.mousePressed(tilføjmedlem);
 
}

//tilføjmedlem skubber det nye medlem med ind i vores kode så vi kan tilføje medlemmer
function tilføjmedlem() {
  let colaerdrukket = slider.value();
  let navnindtastet = input.value();
  console.log('medlem tilføjet')
  medarbejdere.push(new medarbejder(str(navnindtastet),colaerdrukket) )
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
