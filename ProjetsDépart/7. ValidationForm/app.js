const inpUtilisateur = document.querySelector('.form-groupe:nth-child(1) input');
const inpMail = document.querySelector('.form-groupe:nth-child(2) input');
const inpMdp = document.querySelector('.form-groupe:nth-child(3) input');
const inpConfirme = document.querySelector('.form-groupe:nth-child(4) input');
const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');

inpUtilisateur.addEventListener('input', (e) => {

    console.log("inpUtilisateur : " + e.target.value.length);

    if(e.target.value.length >= 3) {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.svg";
        allSpan[0].style.display = "none";
    }
    else {
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.svg";
        allSpan[0].style.display = "inline";   
    }

})

inpMail.addEventListener('input', (e) => {

    console.log("========== inpMail ==========");
    const regexEmail = /\S+@\S+\.\S+/;
    console.log(">>>> " + e.target.value.search(regexEmail));

    if(e.target.value.search(regexEmail) === 0) {
        
        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/check.svg";
        allSpan[1].style.display = "none";

    } else if(e.target.value.search(regexEmail) === -1) {

        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.svg";
        allSpan[1].style.display = "inline";

    }

})

// Validation création de MDP

let valeurInp;
const specialCar = /[^a-zA-Z0-9]/;
const alphabet = /[a-z]/i;
const chiffres = /[0-9]/;

let objValidation = {
    symbole : 0,
    lettre : 0,
    chiffre : 0
}

inpMdp.addEventListener('input', (e) => {

    console.log("========== inpMdp ==========");

    valeurInp = e.target.value;
    console.log(">> valeur e.inputType : " + e.inputType);
    console.log(">> valeurInp : " + valeurInp);
    console.log(">> valeur specialCar : " + valeurInp.search(specialCar));
    

    if(valeurInp.search(specialCar) !== -1){
        objValidation.symbole = 1;
    } 
    if(valeurInp.search(alphabet) !== -1){
        objValidation.lettre = 1;
    }
    if(valeurInp.search(chiffres) !== -1){
        objValidation.chiffre = 1;
    }

    if(e.inputType = 'deleteContentBackward'){
        if(valeurInp.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if(valeurInp.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if(valeurInp.search(chiffres) === -1){
            objValidation.chiffre = 0;
        }
    }

    console.log(">> objValidation : " + objValidation.symbole + " " + objValidation.lettre + " " + objValidation.chiffre);

    let testAll = 0;
    for(const property in objValidation){
        if(objValidation[property] > 0){
            testAll++;
        }
    }
    if(testAll < 3){
        allSpan[2].style.display = "inline";
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.svg";
    } else {
        allSpan[2].style.display = "none";
        allImg[2].src = "ressources/check.svg";
    }

    // force mdp
    if(valeurInp.length <= 6 && valeurInp.length > 0){
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }
    else if(valeurInp.length > 6 && valeurInp.length <=9) {
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'none';
    }
    else if(valeurInp.length > 9) {
        allLigne[0].style.display = 'block';
        allLigne[1].style.display = 'block';
        allLigne[2].style.display = 'block';
    }
    else if(valeurInp.length === 0) {
        allLigne[0].style.display = 'none';
        allLigne[1].style.display = 'none';
        allLigne[2].style.display = 'none';
    }

})

// confirmation

inpConfirme.addEventListener('input', (e) => {

    if(e.target.value.length === 0){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources.error.svg";
    }
    else if(e.target.value === valeurInp){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.svg";
    } else {
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.svg";
    }

})
