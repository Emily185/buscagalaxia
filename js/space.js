document.addEventListener("DOMContentLoaded", function () {
  let inputBuscar = document.getElementById("inputBuscar");
  let btnBuscar = document.getElementById("btnBuscar");
  let contenedor = document.getElementById("contenedor");

  btnBuscar.addEventListener("click", function () {
    let planeta = inputBuscar.value.trim();
    if (!planeta) {
      alert("ingresa un termino de busqueda.");
      return;
    }

    let url = "https://images-api.nasa.gov/search?q=" + planeta;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        contenedor.innerHTML = ""; //limpiar resultados anteriores

        if (data.collection.items.length === 0) {
          contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
          return;
        }

        data.collection.items.forEach(function (item) {
          let title = item.data[0].title;
          let description = item.data[0].description;
          let date_created = item.data[0].date_created;
          let imageUrl = "Imagen no disponible"; // mensaje si no hay imagen

          if (item.links && item.links.length > 0) {
            imageUrl = item.links[0].href;
          }

          contenedor.innerHTML += `
              <div class="card mb-4">
                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description}</p>
                  <p class="card-text"><p>${new Date(
                    date_created
                  ).toLocaleDateString()}<p></p>
                </div>
              </div>
            `;
        });
      })
      .catch(function (error) {
        console.error("Error al realizar la solicitud:", error);
        alert("Hubo un problema al obtener los datos.");
      });
  });
});
