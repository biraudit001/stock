<!DOCTYPE html>
<html>
<head>
  <title>Material Stock System</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    button { padding: 8px; margin: 5px; }
    input { padding: 6px; margin: 5px; }
    table { border-collapse: collapse; width: 100%; margin-top: 10px; }
    th, td { border: 1px solid black; padding: 6px; text-align: center; }
    th { background: #eee; }
    .box { display: none; }
  </style>
</head>
<body>

<h2>Material Stock Management</h2>

<button onclick="show('receive')">Material Receive</button>
<button onclick="show('issue')">Material Issue</button>
<button onclick="show('stock')">Stock Sheet</button>

<!-- RECEIVE -->
<div id="receive" class="box">
  <h3>Material Receive</h3>
  <input id="rName" placeholder="Material Name">
  <input id="rQty" type="number" placeholder="Quantity">
  <button onclick="addReceive()">Save</button>

  <table>
    <tr><th>Date</th><th>Material</th><th>Qty</th></tr>
    <tbody id="receiveTable"></tbody>
  </table>
</div>

<!-- ISSUE -->
<div id="issue" class="box">
  <h3>Material Issue</h3>
  <input id="iName" placeholder="Material Name">
  <input id="iQty" type="number" placeholder="Quantity">
  <button onclick="addIssue()">Save</button>

  <table>
    <tr><th>Date</th><th>Material</th><th>Qty</th></tr>
    <tbody id="issueTable"></tbody>
  </table>
</div>

<!-- STOCK -->
<div id="stock" class="box">
  <h3>Stock Sheet</h3>
  <table>
    <tr>
      <th>Material</th>
      <th>Total Received</th>
      <th>Total Issued</th>
      <th>Balance</th>
    </tr>
    <tbody id="stockTable"></tbody>
  </table>
</div>

<script>
let receives = JSON.parse(localStorage.getItem("receives")) || [];
let issues = JSON.parse(localStorage.getItem("issues")) || [];

function save() {
  localStorage.setItem("receives", JSON.stringify(receives));
  localStorage.setItem("issues", JSON.stringify(issues));
}

function today() {
  return new Date().toLocaleDateString();
}

function show(id) {
  document.querySelectorAll('.box').forEach(b => b.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if(id==="receive") renderReceive();
  if(id==="issue") renderIssue();
  if(id==="stock") renderStock();
}

function addReceive() {
  receives.push({date: today(), name: rName.value, qty: Number(rQty.value)});
  save();
  rName.value = rQty.value = "";
  renderReceive();
}

function addIssue() {
  issues.push({date: today(), name: iName.value, qty: Number(iQty.value)});
  save();
  iName.value = iQty.value = "";
  renderIssue();
}

function renderReceive() {
  receiveTable.innerHTML = "";
  receives.forEach(r=>{
    receiveTable.innerHTML += `<tr><td>${r.date}</td><td>${r.name}</td><td>${r.qty}</td></tr>`;
  });
}

function renderIssue() {
  issueTable.innerHTML = "";
  issues.forEach(i=>{
    issueTable.innerHTML += `<tr><td>${i.date}</td><td>${i.name}</td><td>${i.qty}</td></tr>`;
  });
}

function renderStock() {
  let stock = {};
  receives.forEach(r=>{
    stock[r.name] = stock[r.name] || {in:0,out:0};
    stock[r.name].in += r.qty;
  });
  issues.forEach(i=>{
    stock[i.name] = stock[i.name] || {in:0,out:0};
    stock[i.name].out += i.qty;
  });

  stockTable.innerHTML = "";
  for(let m in stock){
    stockTable.innerHTML += `
      <tr>
        <td>${m}</td>
        <td>${stock[m].in}</td>
        <td>${stock[m].out}</td>
        <td>${stock[m].in - stock[m].out}</td>
      </tr>`;
  }
}

show("receive");
</script>

</body>
</html>
