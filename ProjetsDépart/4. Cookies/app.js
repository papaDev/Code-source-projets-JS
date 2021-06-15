const affichage = document.querySelector('.affichage');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-txt');
let dejaFait = false;

const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
console.log(nextWeek);
let day = ('0' + nextWeek).slice(9,11);
console.log('Day : ' + day);
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
console.log('Month ' + month);
let year = today.getFullYear();
console.log('Year : ' + year);
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e) {
    console.log("Valeur de evenement du bouton : " + e);

    let nvObj = {};

    inputs.forEach(input => {
        let attrName = input.getAttribute('name');
        console.log("Valeur de attrName : " + attrName);
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        console.log("Valeur de attrValeur : " + attrValeur);
        nvObj[attrName] = attrValeur;
    })
    console.log("Valeur de nvObj : " + nvObj);

    let description = e.target.getAttribute('data-cookie');
    console.log("Valeur de description : " + description);

    if(description === "creer") {
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire);
        //creerCookie(nvObj);
    }
    else if(description === "toutAfficher") {
        listeCookies();
    }

}

function creerCookie(name, value, exp) {

    console.log("================= Fonction creerCookie ============");

    infoTxt.innerText = "";
    affichage.innerHTML = "";

    // Si le cookie à un même nom
    let cookies = document.cookie.split(';');
    console.log("valeur de cookies : " + cookies);
    
    cookies.forEach(cookie => {

        cookie = cookie.trim();
        console.log(cookie);
        let formatCookie = cookie.split('=');
        console.log(formatCookie);
        if(formatCookie[0] === encodeURIComponent(name)) {
            dejaFait = true;
        }
    })

    if(dejaFait) {
        infoTxt.innerText = "Un cookie possède déjà ce nom!";
        dejaFait = false;
        return;
    }

    // Si le cookie n'a pas de nom
    if(name.length === 0) {
        infoTxt.innerText = `Impossible de définir un cookie sans nom.`;
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `Cookie ${name} crée.`;
    affichage.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500);
    
}

function listeCookies() {

    console.log("============ Fonction listeCookies ============");

    let cookies = document.cookie.split(';');
    console.log("Valeur de cookies : " + cookies);

    if(cookies.join() ===  "") {
        infoTxt.innerText = 'Pas de cookies à afficher';
        return;
    }

    cookies.forEach(cookie => {

        cookie = cookie.trim();
        let formatCookie = cookie.split('=');
        console.log("Valeur de formatCookie : " + formatCookie);

        let item = document.createElement('li');

        infoTxt.innerText = 'cliquez sur un cookie dans la liste pour le supprimer.';
        item.innerText = `Nom : ${decodeURIComponent(formatCookie[0])}, Valeur : ${decodeURIComponent(formatCookie[1])}`;
        affichage.appendChild(item);

        // Suppression du cookie
        item.addEventListener('click',() => {

            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
            item.innerText = `Cookie ${formatCookie[0]} supprimé`;
            setTimeout(() => {
                item.remove();
            }, 1000);

        })

    })

}