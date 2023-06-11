let na, af, ar, cg, sr, line, wsUri = "ws:", loc = window.location;

const naUri = "ws://192.168.169.11:1881/ws/state";
const afUri = "ws://192.168.169.12:1881/ws/state";
const arUri = "ws://192.168.169.1:1881/ws/state";
const cgUri = "ws://192.168.169.14:1881/ws/state";
const srUri = "ws://192.168.169.1:1881/ws/sock";

//onload="wsConnect(); afConnect()" onunload="wsDisconnect();"
window.onload = function () {
	naConnect();
	afConnect();
	arConnect();
	cgConnect();
	srConnect();
	document.getElementById("naUpdate").disabled = true;
	document.getElementById("afUpdate").disabled = true;
	document.getElementById("arUpdate").disabled = true;
	document.getElementById("cgUpdate").disabled = true;
	document.getElementById("shutdown").disabled = true;
	document.getElementById("reboot").disabled = true;
}

window.onunload = function () {
	naDisconnect();
	afDisconnect();
	arDisconnect();
	cgDisconnect();
	srDisconnect();
}

//port 1
function naConnect() {
	na = new WebSocket(naUri);

	na.onmessage = function (msg) {
		line = "";
		let data = msg.data;
		switchNaData(data);

	}

	na.onopen = function () {
		// query mpu conf to update radio button
		naData("Connected!");
		na.send("query mpu");
		document.getElementById("naUpdate").disabled = false;
	}

	na.onclose = function () {
		// in case of lost connection tries to reconnect every 3 secs
		setTimeout(naConnect, 5000);
	}
}

function naData(data) {
	document.getElementById('naMessages').innerHTML = data;
}
function switchNaData(data) {
	switch (data) {
		case "2001":
			document.getElementById("naBridge1").checked = true;
			break;
		case "2002":
			document.getElementById("naBridge2").checked = true;
			break;
		case "2011":
			document.getElementById("naSingle").checked = true;
			break;
		case "ready":
			document.getElementById("naUpdate").disabled = false;
			naData("Ready!");
			break;
		default:
			naData("Please Wait!");
	}
}



function naDisconnect() {
	na.close(1000, "Work complete");
}

document.getElementById("naUpdate").onclick = function () {
	this.disabled = true;
	naData("Please Wait!");
	let selected = document.querySelector("input[type=radio][name=naconf]:checked");
	na.send(selected.value);
}

// port 2
function afConnect() {
	af = new WebSocket(afUri);

	af.onmessage = function (msg) {
		let data = msg.data;
		switchAfData(data);
	}

	af.onopen = function () {
		afData("Connected!");
		af.send("query mpu");
		document.getElementById("afUpdate").disabled = false;
	}

	af.onclose = function () {
		setTimeout(afConnect, 5000);
	}
}

function afData(data) {
	document.getElementById('afMessages').innerHTML = data;
}
function switchAfData(data) {
	switch (data) {
		case "2001":
			document.getElementById("afBridge1").checked = true;
			break;
		case "2002":
			document.getElementById("afBridge2").checked = true;
			break;
		case "2012":
			document.getElementById("afSingle").checked = true;
			break;
		case "ready":
			afData("Ready!");
			document.getElementById("afUpdate").disabled = false;
			break;
		default:
			afData("Please Wait!");
	}
}



function afDisconnect() {
	af.close(1000, "Work complete");
}

document.getElementById("afUpdate").onclick = function () {
	this.disabled = true;
	afData("Please Wait!");
	let selected = document.querySelector("input[type=radio][name=afconf]:checked");
	af.send(selected.value);
}

// port 3
function arConnect() {
	ar = new WebSocket(arUri);

	ar.onmessage = function (msg) {
		let data = msg.data;
		switchArData(data);
	}

	ar.onopen = function () {
		arData("Connected!");
		ar.send("query mpu");
		document.getElementById("arUpdate").disabled = false;
	}

	ar.onclose = function () {
		setTimeout(arConnect, 5000);
	}
}

function arData(data) {
	document.getElementById('arMessages').innerHTML = data;
}
function switchArData(data) {
	switch (data) {
		case "2001":
			document.getElementById("arBridge1").checked = true;
			break;
		case "2002":
			document.getElementById("arBridge2").checked = true;
			break;
		case "2013":
			document.getElementById("arSingle").checked = true;
			break;
		case "ready":
			arData("Ready!");
			document.getElementById("arUpdate").disabled = false;
			break;
		default:
			arData("Please Wait!");
	}
}



function arDisconnect() {
	ar.close(1000, "Work complete");
}

document.getElementById("arUpdate").onclick = function () {
	this.disabled = true;
	arData("Please Wait!");
	let selected = document.querySelector("input[type=radio][name=arconf]:checked");
	ar.send(selected.value);
}

// port 4
function cgConnect() {
	cg = new WebSocket(cgUri);

	cg.onmessage = function (msg) {
		let data = msg.data;
		switchCgData(data);
	}

	cg.onopen = function () {
		cgData("Connected!");
		cg.send("query mpu");
		document.getElementById("cgUpdate").disabled = false;
	}

	cg.onclose = function () {
		setTimeout(cgConnect, 5000);
	}
}

function cgData(data) {
	document.getElementById('cgMessages').innerHTML = data;
}
function switchCgData(data) {
	switch (data) {
		case "2001":
			document.getElementById("cgBridge1").checked = true;
			break;
		case "2002":
			document.getElementById("cgBridge2").checked = true;
			break;
		case "2014":
			document.getElementById("cgSingle").checked = true;
			break;
		case "ready":
			cgData("Ready!");
			document.getElementById("cgUpdate").disabled = false;
			break;
		default:
			cgData("Please Wait!");
	}
}



function cgDisconnect() {
	cg.close(1000, "Work complete");
}

document.getElementById("cgUpdate").onclick = function () {
	this.disabled = true;
	cgData("Please Wait!");
	let selected = document.querySelector("input[type=radio][name=cgconf]:checked");
	cg.send(selected.value);
}

//Shutdown Reboot
function srConnect() {
	sr = new WebSocket(srUri);

	sr.onmessage = function (msg) {
		let data = msg.data;
		switchSrData(data);
	}

	sr.onopen = function () {
		sr.send("is up");
		srData("");
		document.getElementById("shutdown").disabled = false;
		document.getElementById("reboot").disabled = false;
	}

	sr.onclose = function () {
		setTimeout(srConnect, 5000);
	}
}
function switchSrData(data) {
	switch (data) {
		case "down":
			naData("Down!");
			afData("Down!");
			arData("Down!");
			cgData("Down!");
			srData("Down!");
			break;
		case "false":
			document.getElementById("shutdown").disabled = true;
			document.getElementById("reboot").disabled = true;
			srData("Down!");
			break;
		default:
	}
}
function srData(data) {
	document.getElementById('srMessages').innerHTML = data;
}
function srDisconnect() {
	sr.close(1000, "Work complete");
}

document.getElementById("shutdown").onclick = function () {
	let txt;
	let r = confirm("Shutdown!!!");
	if (r == true) {
		sr.send("shutdown");
		naUpdate.disabled = true;
		afUpdate.disabled = true;
		arUpdate.disabled = true;
		cgUpdate.disabled = true;
		naData("");
		afData("");
		arData("");
		cgData("");
		srData("Please Wait!");
		document.getElementById("shutdown").disabled = true;
		document.getElementById("reboot").disabled = true
	} else {
		return false;
	}
}

document.getElementById("reboot").onclick = function () {
	let txt;
	let r = confirm("Reboot!!!");
	if (r == true) {
		sr.send("reboot");
		naUpdate.disabled = true;
		afUpdate.disabled = true;
		arUpdate.disabled = true;
		cgUpdate.disabled = true;
		naData("");
		afData("");
		arData("");
		cgData("");
		srData("Please Wait!");
		document.getElementById("shutdown").disabled = true;
		document.getElementById("reboot").disabled = true
	} else {
		return false;
	}
}