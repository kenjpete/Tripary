//What platform the device is: returned when function CheckDevice is called in the document onReady 
var devicePlatform;

//Button Click Events
$("#btnTakePhoto").click(function () {
    if (devicePlatform == "iOS")
        iOSTakePicture();
    else
        androidTakePicture();
})
$("#btnGetPhoto").click(function () {
    GetPicture();
})

//Beginning of Camera Scripts ----------------------------------------------------------------------------------------------------
//iOS *****************************************************************
function iOSTakePicture() {
    navigator.camera.getPicture(OnDataSuccess, OnFailure, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 270,
        targetHeight: 270,
        saveToPhotoAlbum: true
    });
}
//Android *************************************************************
function androidTakePicture() {
    navigator.camera.getPicture(OnURISuccess, OnFailure, {
        quality: 50,
        //destinationType: Camera.DestinationType.DATA_URL,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 270,
        targetHeight: 270,
        saveToPhotoAlbum: true
    });
}
//Other camera functions
function GetPicture() {
    navigator.camera.getPicture(OnURISuccess, OnFailure, {
        quality: 50,
        destinationType: Camera.DestinationType.NATIVE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 270,
        targetHeight: 270
    });
}

//OnSuccess for navigator.camera.getPicture - Take Picture
function OnDataSuccess(imageData) { //used for iOS
    $("#DivPictureList").html("").show();
    $("#DivPictureList").html("<center><div id='DivPicContainer'><img src='data:image/jpeg;base64," + imageData + "' /></div></center>");
}
//OnSuccess for navigator.camera.getPicture - Get Picture from Library
function OnURISuccess(imageData) { //used for Android taking picture, and for both retrieving them
    $("#DivPictureList").html("").show();
    $("#DivPictureList").html("<center><div id='DivPicContainer'><img src='" + imageData + "' /></div></center>");
}
//OnFailure for navigator.camera.getPicture
function OnFailure(message) {
    $("#DivPictureList").html("").show();
    $("#DivPictureList").html("<center><span class='message'>" + message + "<span></center>").fadeOut(3000);
}
//End of Camera Scripts ----------------------------------------------------------------------------------------------------------

//Other functions
function CheckDevice() {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        return ("iOS");
    } else if (navigator.userAgent.match(/Android/)) {
        return ("Android");
    } else {
        return ("unknown");
    }
}