let base = document.querySelector('.base');
const premiereCase = document.getElementById('premiere-case');
const boxs = document.querySelectorAll('.case');
const destroy = document.querySelector('.destroy');
const allCases = [];
const choix = [];
let photoEnCours;

for(i = 0; i < boxs.length; i++) {
    allCases.push(boxs[i]);
}
allCases.push(destroy);

console.log("Initiliasation valeur de allCases : " + allCases);

let indexPhoto = 1;

base.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;

function nvBase() {

    console.log("========== Fonction nvBase ==========");

    const newBase = document.createElement('div');
    newBase.setAttribute('class', 'base');
    newBase.setAttribute('draggable', 'true');
    indexPhoto++;
    newBase.style.backgroundImage = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;  
    photoEnCours = `url(https://loremflickr.com/320/240?random=${indexPhoto})`;
    premiereCase.appendChild(newBase);
    base = newBase;

}

for(const vide of allCases) {

    console.log("========== Boucle for de parcours du tableau allCases ==========");

    vide.addEventListener('dragover', dragOver);
    vide.addEventListener('dragenter', dragEnter);
    vide.addEventListener('drop', dragDrop);

}

function dragOver(e) {
    e.preventDefault();
    console.log("========== Function dragOver ==========");
}

function dragEnter(e) {
    e.preventDefault();
    console.log("========== Function dragEnter ==========");
}

function dragDrop() {

    console.log("========== Function dragDrop ==========");

    if(this.id === "premiere-case") {
        console.log("this.id et égal à destroy égale à premiere-case");
        return;
    }

    // destroy
    if(this.id === "destroy") {
        console.log("this.id et égal à destroy égala à destroy");
        base.remove();
        nvBase();
        return;
    }

    // Verouillage

    this.removeEventListener('drop', dragDrop);
    this.removeEventListener('dragenter', dragEnter);
    this.removeEventListener('dragover', dragOver);

    this.appendChild(base);
    this.childNodes[0].setAttribute('draggable', false);
    nvBase();

    choix.push(photoEnCours);
    if(choix.length === 3){
        setTimeout(() => {
            alert('Sélection terminée !');
        }, 200)
    }

}