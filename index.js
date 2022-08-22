const API_URL = "http://127.0.0.1:8000/api";
const x_ccloud_auth = "prueba";

const HTMLResponse = document.querySelector("#users");

// * Obtener usuarios, y pasarlos una tabla con su respectiva paginación
function renderUsers(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
      "x-ccloud-auth": x_ccloud_auth,
    },
  })
    .then((response) => response.json())
    .then((users) => {
      const table = document.createElement("table");
      table.className = "table table-bordered";
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      let tr = document.createElement("tr");
      Object.keys(users.data[0]).forEach((element) => {
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(`${element}`));
        th.className = "capitalize-first";
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      users.data.forEach((user) => {
        let tr = document.createElement("tr");
        for (const property in user) {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(`${user[property]}`));
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      });
      table.appendChild(thead);
      table.appendChild(tbody);
      HTMLResponse.appendChild(table);

      const pagination = document.querySelector("#pagination");

      let ul = document.createElement("ul");
      ul.className = "pagination justify-content-end";
      users.meta.links.forEach((element) => {
        console.log(element);
        let li = document.createElement("li");
        li.className = `page-item ${element.active}`;
        let a = document.createElement("a");
        a.className = `page-link`;
        a.dataset.url = element.url;
        a.innerHTML = element.label;
        li.appendChild(a);
        ul.appendChild(li);
      });
      pagination.appendChild(ul);
    });
}

renderUsers(`${API_URL}/users`);

document.addEventListener('click',function(e){
    if(e.target.className == 'page-link'){
        HTMLResponse.innerHTML = '';
        pagination.innerHTML = '';
        renderUsers(e.target.dataset.url);
    }
 });