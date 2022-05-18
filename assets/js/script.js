let fragrances =document.getElementById ('fragrances')

fetch('assets/js/fragrances.json')
.then(response => response.json())
.then(data => {
    data.results.forEach(element => {
        fragrances.innerHTML +=`
        <div class="card col-lg-4 text-center border-0">
        <div class="row justify-content-center">
            <div class="col-6">
                <img src="assets/img/${element.Picture}.webp" class="card-img-top img-fluid" alt="Aventus">
            </div>
        </div>

        <div class="card-body">
            <p class="card-title my-1 fs-4">${element.Brand}</p>
            <h2 class="card-text my-0 fs-5">${element.Name}</h2>
            <p class="card-text my-1">${element.Type}</p>
            <p class="card-text mt-2 mb-1">${element.Price}€</p>
            <a href="#" class="btn peri text-light mt-1 mb-5">Ajouter au panier</a>
        </div>
    </div>
        `
    })
})