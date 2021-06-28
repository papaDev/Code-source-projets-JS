const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verrouillage = false;

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte);
})

function retourneCarte() {

    console.log("========== Function Retourne Carte ==========");
    console.log(">>>> Valeur de Verrouillage : " + verrouillage);

    if(verrouillage) return;

    this.childNodes[1].classList.toggle('active');

    console.log(">>>> Valeur de Carte Retournee : " + carteRetournee);

    if(!carteRetournee){
        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    //console.log(premiereCate, secondeCarte);

    correspondance();
    
}

function correspondance(){

    console.log("========== Function Correspondance ==========");
    console.log(">>>> Valeur de la comparaison : ", premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr'));

    if(premiereCarte.getAttribute('data-attr') === secondeCarte.getAttribute('data-attr')) {
        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);
    } else {
        verrouillage = true;
        setTimeout(() => {
            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');
            verrouillage = false;
        }, 1500)
    }
}

function aleatoire(){

    console.log("========== Function Aleatoire ==========");
    
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        console.log(">>>> Valeur de Random Pos : " + randomPos);
        card.style.order = randomPos;
    })

}

aleatoire();