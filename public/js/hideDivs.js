$(document).ready(function(){
        document.getElementById("locationButton").style.display = "none";
        document.getElementById("directionsButton").style.display = "none";
        document.getElementById("reviewsButton").style.display = "none";
});

function showLocation(){
    if(document.getElementById("location").style.display = "none"){
        document.getElementById("location").style.display = "block";
        document.getElementById("locationButton").style.display = "none";
        document.getElementById("locationButton2").style.display = "block";
    }
}

function hideLocation(){
    if(document.getElementById("location").style.display = "block"){
        document.getElementById("location").style.display = "none";
        document.getElementById("locationButton").style.display = "block";
        document.getElementById("locationButton2").style.display = "none";
    }
}

function showDirections(){
    if(document.getElementById("directions").style.display = "none"){
        document.getElementById("directions").style.display = "block";
        document.getElementById("directionsButton").style.display = "none";
        document.getElementById("directionsButton2").style.display = "block";
    }
}

function hideDirections(){
    if(document.getElementById("directions").style.display = "block"){
        document.getElementById("directions").style.display = "none";
        document.getElementById("directionsButton").style.display = "block";
        document.getElementById("directionsButton2").style.display = "none";
    }
}

function showReviews(){
    if(document.getElementById("reviews").style.display = "none"){
        document.getElementById("reviews").style.display = "block";
        document.getElementById("reviewsButton").style.display = "none";
        document.getElementById("reviewsButton2").style.display = "block";
    }
}

function hideReviews(){
    if(document.getElementById("reviews").style.display = "block"){
        document.getElementById("reviews").style.display = "none";
        document.getElementById("reviewsButton").style.display = "block";
        document.getElementById("reviewsButton2").style.display = "none";
    }
}
