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

/* ===== RECEIVE ===== */
function addReceive() {
  receives.push({date: today(), name: rName.value, qty: Number(rQty.value)});
  save();
  rName.value = rQty.value = "";
  renderReceive();
}

function editReceive(i) {
  let r = receives[i];
  let qty = prompt("Edit Quantity", r.qty);
  if(qty !== null) {
    r.qty = Number(qty);
    save();
    renderReceive();
  }
}

function deleteReceive(i) {
  if(confirm("Delete this receive entry?")) {
    receives.splice(i,1);
    save();
    renderReceive();
  }
}

function renderReceive() {
  receiveTable.innerHTML = "";
  receives.forEach((r,i)=>{
    receiveTable.innerHTML += `
      <tr>
        <td>${r.date}</td>
        <td>${r.name}</td>
        <td>${r.qty}</td>
        <td>
          <button onclick="editReceive(${i})">Edit</button>
          <button onclick="deleteReceive(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

/* ===== ISSUE ===== */
function addIssue() {
  issues.push({date: today(), name: iName.value, qty: Number(iQty.value)});
  save();
  iName.value = iQty.value = "";
  renderIssue();
}

function editIssue(i) {
  let it = issues[i];
  let qty = prompt("Edit Quantity", it.qty);
  if(qty !== null) {
    it.qty = Number(qty);
    save();
    renderIssue();
  }
}

function deleteIssue(i) {
  if(confirm("Delete this issue entry?")) {
    issues.splice(i,1);
    save();
    renderIssue();
  }
}

function renderIssue() {
  issueTable.innerHTML = "";
  issues.forEach((it,i)=>{
    issueTable.innerHTML += `
      <tr>
        <td>${it.date}</td>
        <td>${it.name}</td>
        <td>${it.qty}</td>
        <td>
          <button onclick="editIssue(${i})">Edit</button>
          <button onclick="deleteIssue(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

/* ===== STOCK ===== */
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
