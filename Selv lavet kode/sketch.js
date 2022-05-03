let ots;
class medarbejder {
  constructor(navn, colaforbrug) {
    this.navn = navn;
    this.cola = colaforbrug;


  }

  profile() {
    textSize(24)
    text(str('Navn: ' + this.navn), 50, 50)
    text(this.navn + ' drikker ca ' + this.cola + ' colaer om dagen', 50, 100)

  }


}
let medarbejdere = [
  //Her kan vi tilføje flere medarbejdere
  // formatet til at tilføje er som følger: new medarbejder('Navn', antal colaer drukket på en dag);
  new medarbejder('Mads', 3),
  new medarbejder('Niels', 5),
  new medarbejder('Gud', 5)
];






function setup() {

  createCanvas(windowWidth - 10, windowHeight - 10);
  background(205)
  //herunder har jeg lavet 
  input = createInput();
  input.position(width / 2 + 100, 50);
  //herunder har jeg lavet mine dropdown menuer
  dropdown = createSelect();
  dropdown.position(0, 0)
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


function visplatform() {
  for (let i = 0; i < medarbejdere.length; i++) {
    if (medarbejdere[i].navn === dropdown.value()) {
      visprofil(i);

    }

  }

}

function visprofil(person) {
  medarbejdere[person].profile();
  console.log(person)
}

function draw() {
  let val = slider.value();
  background(205)
  strokeWeight(4)
  line(width / 2, 0, width / 2, height);
  text('navn:\ncola:', width / 2 + 40, 68)
  visplatform();
  strokeWeight(1);
  rect(width / 2 + 200, 80, 50, 20)
  textSize(18)
  text(val, width / 2 + 201, 82, 50);
  button.mousePressed(tilføjmedlem);
}

function tilføjmedlem() {
  console.log('medlem tilføjet')
  medarbejdere.push(new medarbejder(input.value(), slider.value()))
  vismedarbejderliste();
  visprofil(0);
  visplatform();
}


function vismedarbejderliste() {
  for (let i = 0; i < medarbejdere.length; i++) {
    dropdown.option(medarbejdere[i].navn)
  }
}