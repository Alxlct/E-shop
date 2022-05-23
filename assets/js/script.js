let fragrances = document.getElementById('fragrances');
let dataArray = [];
fragrances.style.display = 'none'

fetch('assets/js/fragrances.json')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(element => {
            dataArray.push(element);
        })
    })

function enableToolTips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

function createCard(picture, brand, name, type, price, ref, notes) {

    fragrances.style.display = 'flex'

    fragrances.innerHTML += `
        <div class="card col-lg-4 text-center border-0">
            <div class="row justify-content-center">
                <div class="col-6">
                    <img src="assets/img/${picture}.webp" class="card-img-top img-fluid" alt="Aventus">
                </div>
            </div>

            <div class="card-body">
                <p class="card-title my-1 fs-4">${brand}</p>
                <h2 class="card-text my-0 fs-5">${name}</h2>
                <p class="card-text my-1">${type}</p>
                <p class="card-text mt-2 mb-1">${price}€</p>
                <div><button type="button" class="btn rose mb-1" data-bs-toggle="modal" data-bs-target="#description-${ref}">Description</button></div>
                <button type="button" id="REF${ref}"class="btn peri mt-1 mb-5" onclick="addParfumPanier('${picture},${ref},${name},${price},1')">Ajouter au panier</button>
            </div>
        </div>
        <div class="modal fade" id="description-${ref}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header justify-content-center">
              <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
            </div>
            <div class="modal-body">
              ${notes}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn rose" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
        `
    enableToolTips()
}


function displayFragrancesByGender() {

    const navLinks = document.querySelectorAll('.nav-link');
    const homepageImg = document.querySelector('#fdm');
    const logo = document.querySelector('#homePage')
    let gender;
    let filteredArrayDatas = []

    navLinks.forEach(navLink => {

        navLink.addEventListener('click', (e) => {
            fragrances.innerHTML = '';
            gender = e.target.innerText;
            filteredArrayDatas = dataArray.filter(data => data.Gender === gender);

            filteredArrayDatas.forEach(filteredData => {
                if (filteredData.Gender === 'Femme' || filteredData.Gender === 'Unisexe' || filteredData.Gender === 'Homme') {
                    homepageImg.style.display = 'none';
                }
                createCard(filteredData.Picture, filteredData.Brand, filteredData.Name, filteredData.Type, filteredData.Price, filteredData.Ref, filteredData.Notes);
            })
        })
    })

    logo.addEventListener('click', () => {
        fragrances.innerHTML = '';
        homepageImg.style.display = 'block';
        fragrances.style.display = 'none'
    })

}

displayFragrancesByGender();

// Tableau contenant les references presentes dans mon panier 
let panier = []
let total = 0


function pushPanier(ref) {
    panier.push(ref)
}


function addParfumPanier(detailsParfum) {
    let detailsParfumTableau = detailsParfum.split(',')
    let cartTablebody = document.getElementById('cart-tablebody')
    if (panier.indexOf(detailsParfumTableau[1]) < 0) {
        cartTablebody.innerHTML +=
            `
        <tr class="align-middle text-center">
        <td><img class="foto" src="assets/img/${detailsParfumTableau[0]}.webp" alt="${detailsParfumTableau[0]}"></td>
        <td>ref${detailsParfumTableau[1]}</td>
        <td>${detailsParfumTableau[2]}</td>
        <td id="pu${detailsParfumTableau[1]}">${detailsParfumTableau[3]}</td>
        <td id="qteId${detailsParfumTableau[1]}">${detailsParfumTableau[4]}</td>
        <td> <button class="peri" id="addQte${detailsParfumTableau[1]}" onclick="addQte('${detailsParfumTableau[1]}')">+</button><button id="button${detailsParfumTableau[1]}"  class="peri ms-1" onclick="lessQte('${detailsParfumTableau[1]}')">-</button></td>
        <td id="st${detailsParfumTableau[1]}"></td>
        </tr>
        `
        pushPanier(detailsParfumTableau[1])
        showSousTotal(detailsParfumTableau[1])
    } else {
        let qteId = document.getElementById(`qteId${detailsParfumTableau[1]}`)
        let oldValue = qteId.innerText
        let newValue = Number(oldValue) + 1
        qteId.innerHTML = newValue
        showSousTotal(detailsParfumTableau[1])

    }
}

function showSousTotal(ref) {
    let qteId = document.getElementById('qteId' + ref)
    let st = document.getElementById('st' + ref)
    let pu = document.getElementById('pu' + ref)
    let result = Number(qteId.innerText) * Number(pu.innerText)
    let tot = document.getElementById('total')
    st.innerHTML = result
    total += Number(pu.innerText)
    tot.innerHTML = total

}

function addQte(ref) {
    let qteId = document.getElementById('qteId' + ref)
    let st = document.getElementById('st' + ref)
    let pu = document.getElementById('pu' + ref)
    let tot = document.getElementById('total')
    qteId.innerHTML = Number(qteId.innerText) + 1
    let result = Number(qteId.innerText) * Number(pu.innerText)
    let button = document.getElementById('button' + ref)
    st.innerHTML = result
    total += Number(pu.innerText)
    tot.innerHTML = total
    button.disabled = false
}

function lessQte(ref) {
    let qteId = document.getElementById('qteId' + ref)
    let st = document.getElementById('st' + ref)
    let pu = document.getElementById('pu' + ref)
    let tot = document.getElementById('total')
    console.log(qteId.innerText)
    if(qteId.innerText > 0) {
        qteId.innerHTML = Number(qteId.innerText) - 1
        let result = Number(qteId.innerText) * Number(pu.innerText)
        let button = document.getElementById('button' + ref)
        st.innerHTML = result
        total -= Number(pu.innerText)
        tot.innerHTML = total
        button.disabled = false
    }
    

} 