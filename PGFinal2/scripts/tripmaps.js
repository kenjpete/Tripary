//Google Maps Scripts
var map, geocoder, addressMarker, addressMarkers;

function tripPoint(id, lat, lng, address, tdate, comments) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.address = address;
    this.tdate = tdate;
    this.comments = comments;
    var marker;
    var infowindow;
}

var currentTripPoint = null;

$("#BtnNew").click(function () {
    $("#SpanAddress").html("");
    $("#SpanPoint").html("");
    $("#PointInformation").hide();
    $("#DivShowEntry").hide();
    $("#DivEnterInfo").show();
    SetUpMap();
    $("#TBAddress").val("");
});

$("#BtnList").click(function () {
    $("#TBAddress").val("");
    $("#DivEnterInfo").hide();
    $("#DivShowEntry").show();
    SetUpMap();
    DisplayList();
});
$("#SpanFindAddress").click(function () {
    FindByAddress();
});
$("#SpanFindMe").click(function () {
    FindByLocation();
});
$("#BtnClear").click(function () {
    ClearStorage();
});
function SetUpMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('DivMap'), {
        center: { lat: 43, lng: -76 },
        zoom: 6,
        disableDefaultUI: true,
        zoomControl: true
    });
}
function FindByAddress() {
    if ($("#TBAddress").val().length > 0) {
        geocoder.geocode({ address: $("#TBAddress").val() }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                PlotPoint(results[0].geometry.location, results[0].formatted_address);
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}
function FindByLocation() {
    navigator.geolocation.getCurrentPosition(FindByLocationSuccess, FindByLocationError);
}

function FindByLocationSuccess(position) {
    var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
    geocoder.geocode({ 'location': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK)
            PlotPoint(results[0].geometry.location, results[0].formatted_address);
    });
}
function FindByLocationError(error) {
    alert('Find your location was not successful for the following reason: ' + error.message);
}

function PlotPoint(location, address) {
    map.setCenter(location);
    addressMarker = new google.maps.Marker({
        map: map,
        position: location
    });
    map.setZoom(15);
    var infowindow = new google.maps.InfoWindow;
    infowindow.setContent(address);
    google.maps.event.addListener(addressMarker, 'click', function () {
        infowindow.open(map, addressMarker);
    });
    currentTripPoint = new tripPoint("", location.lat(), location.lng(), address, "", "");
    $("#TBAddress").val(address);
}
function GetPoint(id) {
    var point = JSON.parse(localStorage.getItem(id));
    $("#PointInformation").show();
    $("#SpanDate").html("<strong>Date:</strong><br />" + point.tdate);
    $("#SpanAddress").html("<strong>Address:</strong><br />" + point.address);
    $("#SpanPoint").html("<strong>Latitude:</strong> " + point.lat + "<br /><strong>Longitude:</strong> " + point.lng);
    $("#SpanComments").html("<strong>Comments:</strong> " + point.comments);
    map.setCenter({ lat: point.lat, lng: point.lng });
    map.setZoom(15);
}
function PlotPoints(items) {
    var addressMarkers = new Array();
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < items.length; i++) {
        addressMarkers.push(items[i]);
        addressMarkers[i].marker = new google.maps.Marker({
            map: map,
            position: { lat: addressMarkers[i].lat, lng: addressMarkers[i].lng }
        });
        bounds.extend(addressMarkers[i].marker.getPosition());
    }
    map.fitBounds(bounds);
}
function SavePoint() {

    var TBAddress = document.getElementById('TBAddress');
    var datepicker = document.getElementById('datepicker');
    var comments = document.getElementById('journal');

    if (TBAddress.value == '' || datepicker.value == '' || comments.value == '') {
        alert("Please complete all form fields");
        return false;
    }

    if (currentTripPoint != null) {
        try {
            currentTripPoint.id = localStorage.length + 1;
        }
        catch (ex) {
            currentTripPoint.id = 1;
        }
        currentTripPoint.comments = $("#journal").val();
        currentTripPoint.tdate = $("#datepicker").val();
        localStorage.setItem(currentTripPoint.id, JSON.stringify(currentTripPoint));
        $("#TBAddress").val("");
        $("#journal").val("");
        $("#datepicker").val("");
        currentTripPoint = null;
        SetUpMap();
    }
    alert("Entry Saved Successfully!");
    return false;
    
}

function ClearStorage() {
    $("#SpanAddress").html("");
    $("#SpanPoint").html("");
    $("#PointInformation").hide();
    localStorage.clear();
    SetUpMap();
    DisplayList();
}

function DisplayList() {
    var html = "";
    var pointsToPlot = new Array();
    try {
        if (localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var item = JSON.parse(localStorage.getItem(key));
                pointsToPlot.push(item);
                html += "<div id='" + item.id + "' class='divListItem' onclick='GetPoint(\"" + item.id + "\");'>" + item.address + "</div>";
            }
            PlotPoints(pointsToPlot);
        } else {
            html += "<h3>There are no locations saved.</h3>";
        }
    } catch (ex) {
        html += "<h3>Some error occurred with record retrieval.</h3>";
    }
    $("#DivList").html(html);
}

$(document).ready(function () {
    SetUpMap();
});