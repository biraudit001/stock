let stock = JSON.parse(localStorage.getItem("stock")) || [];

function saveStock() {
  localStorage.setItem("stock", JSON.stringify(stock));
}

function receiveMaterial() {
  let name = document.getElementById("r_name").value;
  let qty = Number(document.getElementById("r_qty").value);

  stock.push({
    date: new Date().toLocaleDateString(),
    material: name,
    receive: qty,
    issue: 0
  });

  saveStock();
  showStock();
}

function issueMaterial() {
  let name = document.getElementById("i_name").value;
  let qty = Number(document.getElementById("i_qty").value);

  stock.push({
    date: new Date().toLocaleDateString(),
    material: name,
    receive: 0,
    issue: qty
  });

  saveStock();
  showStock();
}

function showStock() {
  let table = document.getElementById("stockTable");
  table.innerHTML = "";

  let balance = {};

  stock.forEach(item => {
    if (!balance[item.material]) balance[item.material] = 0;
    balance[item.material] += item.receive - item.issue;

    table.innerHTML += `
      <tr>
        <td>${item.date}</td>
        <td>${item.material}</td>
        <td>${item.receive}</td>
        <td>${item.issue}</td>
        <td>${balance[item.material]}</td>
      </tr>
    `;
  });
}

showStock();
