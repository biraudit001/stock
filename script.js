let stock = JSON.parse(localStorage.getItem("stock")) || [];

function saveStock() {
  localStorage.setItem("stock", JSON.stringify(stock));
}

function receiveMaterial() {
  const name = document.getElementById("r_name").value;
  const qty = Number(document.getElementById("r_qty").value);

  if (!name || qty <= 0) return alert("Enter valid data");

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
  const name = document.getElementById("i_name").value;
  const qty = Number(document.getElementById("i_qty").value);

  if (!name || qty <= 0) return alert("Enter valid data");

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
  const table = document.getElementById("stockTable");
  table.innerHTML = "";

  let balance = {};

  stock.forEach(item => {
    if (!balance[item.material]) balance[item.material] = 0;
    balance[item.material] += item.receive - item.issue;

    const row = `
      <tr>
        <td>${item.date}</td>
        <td>${item.material}</td>
        <td>${item.receive}</td>
        <td>${item.issue}</td>
        <td>${balance[item.material]}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

showStock();
