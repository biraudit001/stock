<!DOCTYPE html>
<html>
<head>
  <title>Material Stock System</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    button { padding: 8px; margin: 5px; }
    input { padding: 6px; margin: 5px; }
    table { border-collapse: collapse; width: 100%; margin-top: 15px; }
    th, td { border: 1px solid black; padding: 8px; text-align: center; }
    th { background: #eee; }
    .box { display: none; }
  </style>
</head>
<body>

<h2>Material Stock Management</h2>

<!-- MENU -->
<button onclick="show('receive')">Material Receive</button>
<button onclick="show('issue')">Material Issue</button>
<button onclick="show('stock')">Stock Sheet</button>

<!-- RECEIVE -->
<div id="receive" class="box">
  <h3>Material Receive</h3>
  <input id="rName" placeholder="Material Name">
  <input id="rQty" type="number" placeholder="Quantity">
  <button onclick="receive()">Save</button>
</div>

<!-- ISSUE -->
<div id="issue" class="box">
  <h3>Material Issue</h3>
  <input id="iName" placeholder="Material Name">
  <input id="iQty" type="number" placeholder="Quantity">
  <button onclick="issue()">Save</button>
</div>

<!-- STOCK -->
<div id="stock" class="box">
  <h3>Stock Sheet</h3>
  <table>
    <thead>
      <tr>
        <th>Material</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody id="stockTable"></tbody>
  </table>
</div>

<script>
let stock = JSON.parse(localStorage.getItem("stock")) || {};

function save() {
  localStorage.setItem("stock", JSON.stringify(stock));
}

function show(id) {
  document.querySelectorAll('.box').forEach(b => b.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if(id === 'stock') renderStock();
}

function receive() {
  let m = rName.value;
  let q = Number(rQty.value);
  stock[m] = (stock[m] || 0) + q;
  save();
  alert("Material Received");
  rName.value = rQty.value = "";
}

function issue() {
  let m = iName.value;
  let q = Number(iQty.value);
  stock[m] = (stock[m] || 0) - q;
  save();
  alert("Material Issued");
  iName.value = iQty.value = "";
}

function renderStock() {
  stockTable.innerHTML = "";
  for (let m in stock) {
    stockTable.innerHTML += `
      <tr>
        <td>${m}</td>
        <td>${stock[m]}</td>
      </tr>
    `;
  }
}

show('receive');
</script>

</body>
</html>
