import { api } from './api.js';

const totalCharacters = document.getElementById("totalCharacters");
const searchBarInput = document.getElementById("searchBarInput");
const searchBarButton = document.getElementById("searchBarButton");
searchBarButton.addEventListener("click", searchCharacter);
searchBarInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchBarButton").click();
    }
});
const searchBarCancel = document.getElementById("searchBarCancel");
searchBarCancel.addEventListener("click", searchCancelCharacter);
const searchBarInfo = document.getElementById("searchBarInfo");
const charactersContainer = document.getElementById("charactersContainer");
const charactersShowMore = document.getElementById("charactersShowMore");

let isButtonCreated = false;
let actualPage = 0;

function fetchData(paginationNumber) {
    fetch(api.urlCharacterPagination + paginationNumber)
    .then(response => response.json()).then(data => {

        totalCharacters.innerText = data.info.count;

        for (let i = 0; i < data.results.length; i++) {

            // TRADUCIR STRING Y AÑADIR CLASE EXTRA (STATUS)
            let statusExtraClassName = "";
            let statusTranslateString = "";
            if (data.results[i].status === "Alive") {
                statusExtraClassName = "sectionCharacters__parameterText--alive"
                statusTranslateString = "Vivo";
            } else if (data.results[i].status === "Dead") {
                statusExtraClassName = "sectionCharacters__parameterText--dead"
                statusTranslateString = "Muerto";
            } else {
                statusExtraClassName = "sectionCharacters__parameterText--unknown"
                statusTranslateString = "Desconocido";
            }

            // TRADUCIR STRING (GENDER)
            let genderTranslateString = "";
            if (data.results[i].gender === "Female") {
                genderTranslateString = "Mujer";
            } else if (data.results[i].gender === "Male") {
                genderTranslateString = "Hombre";
            } else if (data.results[i].gender === "Genderless") {
                genderTranslateString = "Sin género";
            } else {
                genderTranslateString = "Desconocido";
            }

            // ARTICLE PARA CADA PERSONAJE
            const characterArticle = document.createElement("article");
            characterArticle.className = "sectionCharacters__box";
            characterArticle.innerHTML = `
                <img class="sectionCharacters__profilepic" src="${data.results[i].image}" alt="${data.results[i].name}">
                <h3 class="sectionCharacters__name">${data.results[i].name}</h3>
                <div class="sectionCharacters__parameter">
                    <div class="sectionCharacters__parameterTitle">Estado</div>
                    <div class="sectionCharacters__parameterText ${statusExtraClassName}">${statusTranslateString}</div>
                </div>
                <div class="sectionCharacters__parameter">
                    <div class="sectionCharacters__parameterTitle">Especie</div>
                    <div class="sectionCharacters__parameterText">${data.results[i].species}</div>
                </div>
                <div class="sectionCharacters__parameter">
                    <div class="sectionCharacters__parameterTitle">Género</div>
                    <div class="sectionCharacters__parameterText">${genderTranslateString}</div>
                </div>
            `
            charactersContainer.appendChild(characterArticle);

        }

        if (isButtonCreated == false) {
            const showMoreButton = document.createElement("button");
            showMoreButton.className = "sectionCharacters__button";
            showMoreButton.id = 'showMoreButton';
            showMoreButton.innerHTML = '<i class="ri-add-fill"></i> Cargar más'
            charactersShowMore.appendChild(showMoreButton);
            isButtonCreated = true;
        }

        if (isButtonCreated == true) {
            document.getElementById('showMoreButton').onclick = function () {
                actualPage++;
                if (actualPage < data.info.pages) {
                    fetchData(actualPage + 1);
                } else {
                    document.getElementById('showMoreButton').disabled = true;
                }
            }
        }

        let opacityFull = {
            opacity: 0,
            duration: 1000
        };
        
        ScrollReveal().reveal('.sectionCharacters__box', opacityFull);
        
    }).catch((error) => {
        console.log(error);
        totalCharacters.innerText = '¡Error!';
        charactersContainer.innerText = '¡No se encontro ningún personaje!';
    })
}

fetchData(1);

function removeElementsByClass(className){
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeElementById(idName) {
    let element = document.getElementById(idName);
    element.remove();
}

function searchCharacter() {

    const theCharacter = searchBarInput.value;

    if (theCharacter === "") {
        alert("¡Escribe algo!");
    } else {
        // REINICIAR
        removeElementsByClass("sectionCharacters__box");
        if (isButtonCreated) {
            removeElementById("showMoreButton");
        }
        searchBarInfo.innerText = "";
        isButtonCreated = false;
        actualPage = 0;
        // BUSCAR
        fetchData2(theCharacter);
        searchBarCancel.style.display = "block";
    }

}

function searchCancelCharacter() {
    removeElementsByClass("sectionCharacters__box");
    searchBarInfo.innerText = "";
    searchBarInput.value = "";
    searchBarCancel.style.display = "none";
    fetchData(1);
}










function fetchData2(characterName) {
    fetch(api.urlCharacterSearch + characterName)
    .then(response => response.json()).then(data => {

        searchBarInfo.innerText = `¡Se encontraron ${data.info.count} resultados!`;

        for (let i = 0; i < data.results.length; i++) {

            // TRADUCIR STRING Y AÑADIR CLASE EXTRA (STATUS)
            let statusExtraClassName = "";
            let statusTranslateString = "";
            if (data.results[i].status === "Alive") {
                statusExtraClassName = "sectionCharacters__parameterText--alive"
                statusTranslateString = "Vivo";
            } else if (data.results[i].status === "Dead") {
                statusExtraClassName = "sectionCharacters__parameterText--dead"
                statusTranslateString = "Muerto";
            } else {
                statusExtraClassName = "sectionCharacters__parameterText--unknown"
                statusTranslateString = "Desconocido";
            }

            // TRADUCIR STRING (GENDER)
            let genderTranslateString = "";
            if (data.results[i].gender === "Female") {
                genderTranslateString = "Mujer";
            } else if (data.results[i].gender === "Male") {
                genderTranslateString = "Hombre";
            } else if (data.results[i].gender === "Genderless") {
                genderTranslateString = "Sin género";
            } else {
                genderTranslateString = "Desconocido";
            }

            // ARTICLE PARA CADA PERSONAJE
            const characterArticle = document.createElement("article");
            characterArticle.className = "sectionCharacters__box";
            characterArticle.innerHTML = `
                <img class="sectionCharacters__profilepic" src="${data.results[i].image}" alt="${data.results[i].name}">
                <h3 class="sectionCharacters__name">${data.results[i].name}</h3>
                <div class="sectionCharacters__parameter">
                    <div class="sectionCharacters__parameterTitle">Estado</div>
                    <div class="sectionCharacters__parameterText ${statusExtraClassName}">${statusTranslateString}</div>
                </div>
                <div class="sectionCharacters__parameter">
                    <div class="sectionCharacters__parameterTitle">Especie</div>
                    <div class="sectionCharacters__parameterText">${data.results[i].species}</div>
                </div>
                <div class="sectionCharacters__parameter">
                    <div class="sectionCharacters__parameterTitle">Género</div>
                    <div class="sectionCharacters__parameterText">${genderTranslateString}</div>
                </div>
            `
            charactersContainer.appendChild(characterArticle);

            let opacityFull = {
                opacity: 0,
                duration: 1000
            };
            
            ScrollReveal().reveal('.sectionCharacters__box', opacityFull);

        }
        
    }).catch((error) => {
        console.log(error);
        searchBarInfo.innerText = '¡No se encontro ningún personaje!';
    })
}