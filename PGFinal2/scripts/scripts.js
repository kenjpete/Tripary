// Nav menu buttons

//Home Button
$("#btnHome").click(function () {
    window.location.href = 'home.html';
});
//New Trip Button
$("#btnNewTrip").click(function () {
    window.location.href = 'newtrip.html';
});
//Photos Button
$("#btnPhotos").click(function () {
    window.location.href = 'photos.html';
});
//About Button
$("#btnAbout").click(function () {
    window.location.href = 'about.html';
});

//jQuery UI Datepicker
$(function () {
    $("#datepicker").datepicker();
});

var compassID;
var CompassDiv = document.getElementById("DivHeading");
var MagDiv = document.getElementById("DivMag");

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    compassID = navigator.compass.watchHeading(onSuccess, onError);
    devicePlatform = CheckDevice();
}

   