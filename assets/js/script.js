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

function createCard(picture, brand, name, type, price) {

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
                <a href="#" class="btn peri text-light mt-1 mb-5">Ajouter au panier</a>
            </div>
        </div>
        `
}

function displayFragrancesByGender () {

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
                if(filteredData.Gender === 'Femme' || filteredData.Gender === 'Unisexe') {
                    homepageImg.style.display = 'none';
                }
                createCard(filteredData.Picture, filteredData.Brand, filteredData.Name, filteredData.Type, filteredData.Price);
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
