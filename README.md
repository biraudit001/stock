<!DOCTYPE html>
<html>
<head>
<title>Material Stock System</title>
<style>
body { font-family: Arial; padding: 20px; }
button,input { padding: 7px; margin: 5px; }
table { border-collapse: collapse; width: 100%; margin-top: 10px; }
th,td { border: 1px solid #000; padding: 6px; text-align: center; }
th { background:#eee; }
.section { display:none; }
</style>
</head>

<body>

<h2>Material Stock Management</h2>

<button onclick="show('receive')">Material Receive</button>
<button onclick="show('issue')">Material Issue</button>
<button onclick="show('stock')">Stock Sheet</button>

<!-- RECEIVE -->
<div id="receive" class="section">
<h3>Material Receive</h3>
<input id="rDate" type="date">
<input id="rMat" placeholder="Material Name">
<input id="rQty" type="number" placeholder="Qty">
<button onclick="addReceive()">Save</button>

<table>
<tr><th>Date</th><th>Material</th><th>Qty</th></tr>
<tbody id="receiveTable"></tbody>
</table>
</div>

<!-- ISSUE -->
<div id="issue" class="section">
<h3>Material Issue</h3>
<input id="iDate" type="date">
<input id="iMat" placeholder="Material Name">
<input id="iQty" type="number" placeholder="Qty">
<button onclick="addIssue()">Save</button>

<table>
<tr><th>Date</th><th>Material</th><th>Qty</th></tr>
<tbody id="issueTable"></tbody>
</table>
</div>

<!-- STOCK -->
<div
