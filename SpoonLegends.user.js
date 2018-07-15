// ==UserScript==
// @name         SpoonLegends
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Javascript auto clickers for leveling and raids, auto gift claim, and an auto selection script for quicker item selling.
// @author       SP00NR
// @include https://streamlegends.com/t/*/popout
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


// Vars and what not

	var timeBasicLeveling;
    var timeBasicRaiding;
    var NumLoops = 0;



// Move game to the top left corner! X,Y coordinates should be universal now!

    var xFixCords = document.getElementsByClassName("StreamRpgPopoutController");
    xFixCords[0] .style.alignItems = "flex-start";
    xFixCords[0] .style.justifyContent = "flex-start";


// Add buttons. WIP
    var xAddOptions = document.getElementsByClassName("sleg-popout-content");
    xAddOptions[0].insertAdjacentHTML("afterend", '<div class="options-container" style="background-color:#131d2f; height: 568px; padding: 10px 10px 10px 10px;"><BR><center>Seconds per loop &nbsp;<INPUT type="number" name="xloopSec" min="10" max="30" maxlength="2" style="color:#000;" value="14"></center><BR><button class="player-api-btn srpg-button" onclick="zBasicLeveling()">Regular AutoClicker</button><br><button class="player-api-btn srpg-button" onclick="zBasicRaiding()">Raid AutoClicker</button><br><button class="player-api-btn srpg-button" style="background-color:rgba(241,23,23,.5); border:1px solid #F24E4E;" onclick="zStopBasicTimers()">Stop AutoClickers</button><HR style="border:0; margin:1; width:100%; height:2px; background:rgb(0, 166, 209);"><BR><BR><BR><button class="player-api-btn srpg-button" onclick="zClaimGiftFunction()">Claim Gift</button><BR><BR><BR><BR><BR><BR><BR><BR><button class="player-api-btn srpg-button" style="background-color:rgba(0, 166, 209, 0.5); border:1px solid #00cbff;" onclick="SellClickFunction()">Grid AutoSelection</button></div>');

// Add Status DIV
    var xAddStatus = document.getElementsByClassName("sleg-game");
    xAddStatus[0].insertAdjacentHTML("afterend", '<div id="status" style="background-color:#076186; text-align: center;">Script Loaded!</div>');

//Resize if pop-out
    if (window.innerHeight < 640) {
        window.resizeTo(516, 642);
    }

//Displays X,Y Coords. Uncomment if needed.
//window.onclick = function(e) { var evt = window.event || e; document.getElementById("status").innerHTML= "Mouse pos: " + evt.clientX + "," + evt.clientY + " of " + window.innerWidth + " by " + window.innerHeight; }


window.zBasicLevelingFunction = function () {

	var d = new Date();
	var t = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    NumLoops++;
    document.title= "Loop #" + NumLoops + " at " + t;

    var click3 = (document.querySelector('[name="xloopSec"]').value * 1000) - 1200;
    var click4 = (document.querySelector('[name="xloopSec"]').value * 1000) - 1000;
    var click5 = (document.querySelector('[name="xloopSec"]').value * 1000) - 900;

	document.elementFromPoint(65,157).click();
    document.getElementById("status").innerHTML = "Clicking first location";
	setTimeout(function(){ document.elementFromPoint(243,452).click(); document.getElementById("status").innerHTML = "Starting Fight";}, 500); //initiate first fight
	setTimeout(function(){ document.elementFromPoint(296,361).click(); document.getElementById("status").innerHTML = "Collect Loot";}, click3); //12800
	setTimeout(function(){ document.elementFromPoint(296,89).click(); document.getElementById("status").innerHTML = "Onwards - After Collect Loot";}, click4); //13000
	setTimeout(function(){ document.elementFromPoint(293,347).click(); document.getElementById("status").innerHTML = "Onwards - No Loot";}, click5); //13100
}


window.zBasicRaidingFunction = function () {

var d = new Date();
	var t = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	NumLoops++;
	document.title= "Loop #" + NumLoops + " at " + t;

    var click3 = (document.querySelector('[name="xloopSec"]').value * 1000) - 1500;
    var click4 = (document.querySelector('[name="xloopSec"]').value * 1000) - 1200;
    var click5 = (document.querySelector('[name="xloopSec"]').value * 1000) - 500;

    document.elementFromPoint(68,160).click();
	document.getElementById("status").innerHTML = "Clicking first location";
    //setTimeout(function(){ document.elementFromPoint(299, 92 ).click(); document.getElementById("status").innerHTML = "Back Map";}, 50); //Back Map
    //setTimeout(function(){ document.elementFromPoint(68,160).click(); document.getElementById("status").innerHTML = "First Adventure";}, 100); //First 1
    setTimeout(function(){ document.elementFromPoint(68,160).click(); document.getElementById("status").innerHTML = "RE: Clicking first location";}, 150); //RE: Clicking first location/Raidmap
    setTimeout(function(){ document.elementFromPoint(68,160).click(); document.getElementById("status").innerHTML = "RE: Clicking first location";}, 200); //RE: Clicking first location/Raidmap
	setTimeout(function(){ document.elementFromPoint(243,452).click(); document.getElementById("status").innerHTML = "Starting Fight";}, 500); //initiate first fight
	setTimeout(function(){ document.elementFromPoint(239,362).click(); document.getElementById("status").innerHTML = "Victory";}, click3);
	setTimeout(function(){ document.elementFromPoint(286,98).click(); document.getElementById("status").innerHTML = "Onwards - After Collect Loot";}, click4);
	setTimeout(function(){ document.elementFromPoint(291,236).click(); document.getElementById("status").innerHTML = "Back to Map";}, click5);
}


window.zClaimGiftFunction = function () {
	document.getElementById('srpg-nav-tab-GUILD').click(); //Guild
	setTimeout(function(){ document.elementFromPoint(306,139).click();}, 250); //Gift Shop
	setTimeout(function(){ document.elementFromPoint(263, 261).click();}, 500); //Claim
	setTimeout(function(){ document.getElementById('srpg-nav-tab-FIGHT').click();}, 1000); //Back to fight
    document.getElementById("status").innerHTML = "Gift Claimed if Available";
}


window.zBasicLeveling = function () {
    var xLoopSecs = document.querySelector('[name="xloopSec"]').value;
    document.title= "Starting Loop " + xLoopSecs + " seconds";
	document.getElementById("status").innerHTML = "Starting: Adventure AutoClicker";
	timeBasicLeveling = setInterval(zBasicLevelingFunction, xLoopSecs * 1000);
}


window.zBasicRaiding = function () {
    var xLoopSecs = document.querySelector('[name="xloopSec"]').value;
    document.title= "Starting Loop " + xLoopSecs + " seconds";
	document.getElementById("status").innerHTML = "Starting: Raid AutoClicker";
	timeBasicRaiding = setInterval(zBasicRaidingFunction, xLoopSecs * 1000);
}


window.zStopBasicTimers = function () {
	document.getElementById("status").innerHTML = "Stopping Main Timers";
	clearInterval(timeBasicLeveling);
	clearInterval(timeBasicRaiding);
    document.title= "Stopping Loop";
    NumLoops = 0;
}




//Just a little fun!
window.zLittleFun = function () {
    //document.getElementsByClassName("logo-mask")[0].style.transform="rotate(180deg)";
    document.getElementsByClassName("logo-mask")[0].innerHTML= '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAeCAYAAABdalL1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGcWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOC0wNy0xMlQwMjoyODo0My0wNTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTgtMDctMTJUMDM6MzQ6MzQtMDU6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMDctMTJUMDM6MzQ6MzQtMDU6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzI1M2Q3YTAtYzBmZC1hZTQ3LTg3NzItOGU0OWZlY2VkNWI4IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YmFlOWZhOWMtOTJhZS03MTQ4LTlhNDctODg2OTNlNDVjMTBmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6ZmRkOTY1YmYtNzcyNy1jZTQyLWIyMGQtYTA0OWY3NmFlZTZjIj4gPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8cmRmOkJhZz4gPHJkZjpsaSBwaG90b3Nob3A6TGF5ZXJOYW1lPSJTUE9PTiIgcGhvdG9zaG9wOkxheWVyVGV4dD0iU1BPT04iLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmZkZDk2NWJmLTc3MjctY2U0Mi1iMjBkLWEwNDlmNzZhZWU2YyIgc3RFdnQ6d2hlbj0iMjAxOC0wNy0xMlQwMjoyODo0My0wNTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzI1M2Q3YTAtYzBmZC1hZTQ3LTg3NzItOGU0OWZlY2VkNWI4IiBzdEV2dDp3aGVuPSIyMDE4LTA3LTEyVDAzOjM0OjM0LTA1OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PutmozoAAAnASURBVGje7Zp7cFTVHcd9jCGk5r3Z7OZBtmNIcTpFoJ2qGZn6KKJiLcUBrUNxLFON0w4FqRVbx2EUK1WoMoplELWtEwYwgcgrCRUIlIeGBqOE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">';
    document.getElementById('srpg-nav-tab-RANK').style.transform="rotate(180deg)";
}
window.onload = window.zLittleFun();
window.onload = window.zClaimGiftFunction();



window.SellClickFunction = function () {
    setTimeout(function(){ document.elementFromPoint(32,60).click();}, 10);
    setTimeout(function(){ document.elementFromPoint(93,60).click();}, 30);
    setTimeout(function(){ document.elementFromPoint(153,60).click();}, 50);
    setTimeout(function(){ document.elementFromPoint(223,60).click();}, 70);
    setTimeout(function(){ document.elementFromPoint(286,60).click();}, 90);

    setTimeout(function(){ document.elementFromPoint(32,119).click();}, 110);
    setTimeout(function(){ document.elementFromPoint(93,119).click();}, 130);
    setTimeout(function(){ document.elementFromPoint(153,119).click();}, 150);
    setTimeout(function(){ document.elementFromPoint(223,119).click();}, 170);
    setTimeout(function(){ document.elementFromPoint(286,119).click();}, 190);

    setTimeout(function(){ document.elementFromPoint(32,182).click();}, 210);
    setTimeout(function(){ document.elementFromPoint(93,182).click();}, 230);
    setTimeout(function(){ document.elementFromPoint(153,182).click();}, 250);
    setTimeout(function(){ document.elementFromPoint(223,182).click();}, 270);
    setTimeout(function(){ document.elementFromPoint(286,182).click();}, 290);

    setTimeout(function(){ document.elementFromPoint(32,246).click();}, 310);
    setTimeout(function(){ document.elementFromPoint(93,246).click();}, 330);
    setTimeout(function(){ document.elementFromPoint(153,246).click();}, 350);
    setTimeout(function(){ document.elementFromPoint(223,246).click();}, 370);
    setTimeout(function(){ document.elementFromPoint(286,246).click();}, 390);

    setTimeout(function(){ document.elementFromPoint(32,310).click();}, 410);
    setTimeout(function(){ document.elementFromPoint(93,310).click();}, 430);
    setTimeout(function(){ document.elementFromPoint(153,310).click();}, 450);
    setTimeout(function(){ document.elementFromPoint(223,310).click();}, 470);
    setTimeout(function(){ document.elementFromPoint(286,310).click();}, 490);

    setTimeout(function(){ document.elementFromPoint(32,376).click();}, 510);
    setTimeout(function(){ document.elementFromPoint(93,376).click();}, 530);
    setTimeout(function(){ document.elementFromPoint(153,376).click();}, 550);
    setTimeout(function(){ document.elementFromPoint(223,376).click();}, 570);
    setTimeout(function(){ document.elementFromPoint(286,376).click();}, 590);

    setTimeout(function(){ document.elementFromPoint(32,439).click();}, 610);
    setTimeout(function(){ document.elementFromPoint(93,439).click();}, 630);
    setTimeout(function(){ document.elementFromPoint(153,439).click();}, 650);
    setTimeout(function(){ document.elementFromPoint(223,439).click();}, 670);
    setTimeout(function(){ document.elementFromPoint(286,439).click();}, 690);
    document.getElementById("status").innerHTML = "Item Grid AutoSelection!";
};


})();
