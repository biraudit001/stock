<button onclick="show('receive')">Material Receive</button>
<button onclick="show('issue')">Material Issue</button>
<button onclick="show('stock')">Stock Sheet</button>
<!-- RECEIVE -->
<div id="receive" class="box">
  <h3>Material Receive</h3>
  Material: <input id="rName">
  Qty: <input id="rQty" type="number">
  <button onclick="addReceive()">Add</button>

  <table border="1">
    <tr><th>Date</th><th>Material</th><th>Qty</th><th>Action</th></tr>
    <tbody id="receiveTable"></tbody>
  </table>
</div>

<!-- ISSUE -->
<div id="issue" class="box" style="display:none">
  <h3>Material Issue</h3>
  Material: <input id="iName">
  Qty: <input id="iQty" type="number">
  <button onclick="addIssue()">Add</button>

  <table border="1">
    <tr><th>Date</th><th>Material</th><th>Qty</th><th>Action</th></tr>
    <tbody id="issueTable"></tbody>
  </table>
</div>

<!-- STOCK -->
<div id="stock" class="box" style="display:none">
  <h3>Stock Sheet</h3>
  <table border="1">
    <tr>
      <th>Material</th>
      <th>Received</th>
      <th>Issued</th>
      <th>Balance</th>
    </tr>
    <tbody id="stockTable"></tbody>
  </table>
</div>
<style>
.box { margin-top:20px; }
button { margin:5px; }
</style>
<script>
let receives = JSON.parse(localStorage.getItem("receives")) || [];
let issues = JSON.parse(localStorage.getItem("issues")) || [];

function save(){
  localStorage.setItem("receives",JSON.stringify(receives));
  localStorage.setItem("issues",JSON.stringify(issues));
}

function show(id){
  document.querySelectorAll('.box').forEach(b=>b.style.display='none');
  document.getElementById(id).style.display='block';
  if(id==='receive') renderReceive();
  if(id==='issue') renderIssue();
  if(id==='stock') renderStock();
}

function today(){ return new Date().toLocaleDateString(); }

function addReceive(){
  receives.push({date:today(),name:rName.value,qty:+rQty.value});
  save(); rName.value=rQty.value="";
  renderReceive();
}

function addIssue(){
  issues.push({date:today(),name:iName.value,qty:+iQty.value});
  save(); iName.value=iQty.value="";
  renderIssue();
}

function renderReceive(){
  receiveTable.innerHTML="";
  receives.forEach((r,i)=>{
    receiveTable.innerHTML+=`
    <tr><td>${r.date}</td><td>${r.name}</td><td>${r.qty}</td>
    <td><button onclick="receives.splice(${i},1);save();renderReceive()">Del</button></td></tr>`;
  });
}

function renderIssue(){
  issueTable.innerHTML="";
  issues.forEach((r,i)=>{
    issueTable.innerHTML+=`
    <tr><td>${r.date}</td><td>${r.name}</td><td>${r.qty}</td>
    <td><button onclick="issues.splice(${i},1);save();renderIssue()">Del</button></td></tr>`;
  });
}

function renderStock(){
  let s={};
  receives.forEach(r=>{
    s[r.name]=s[r.name]||{in:0,out:0};
    s[r.name].in+=r.qty;
  });
  issues.forEach(r=>{
    s[r.name]=s[r.name]||{in:0,out:0};
    s[r.name].out+=r.qty;
  });
  stockTable.innerHTML="";
  for(let m in s){
    stockTable.innerHTML+=`
    <tr><td>${m}</td><td>${s[m].in}</td>
    <td>${s[m].out}</td><td>${s[m].in-s[m].out}</td></tr>`;
  }
}

show('receive');
</script>
