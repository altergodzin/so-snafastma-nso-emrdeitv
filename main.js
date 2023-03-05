prev1 = "";
prev2 = "";

Webcam.set({
    width: 350,
    height: 300,
    imageFormat: 'png',
    pngQuality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function tirarSelfie() {
    Webcam.snap(function (data_uri) {
        document.getElementById("resultado").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tkjFhdfgR/model.json", modelLoaded);

function modelLoaded() {
    
    console.log("model loaded")

};

function speak() {
    
    var synth = window.speechSynthesis;
    speakdata1= "a primeira previsão é " + prev1 ;
    speakdata2= "a segunda previsão é " + prev2 ;
    var utterThis = new SpeechSynthesisUtterance( speakdata1 + speakdata2);
    synth.speak(utterThis);
}

function checar() {

    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
    
}

function gotResult(error,results) {

    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("resultadoEmoção").innerHTML = results[0].label;
        document.getElementById("resultadoEmoção2").innerHTML = results[1].label;
        prev1 = results[0].label;
        prev2 = results[1].label;
        speak();

        if (results[0].label == "joia") {
            document.getElementById("attEmogi").innerHTML = "&#128077;";
        }
        if (results[0].label == "DBoassa") {
            document.getElementById("attEmogi").innerHTML = "&#128406;";
        }
        if (results[0].label == "Na paz") {
            document.getElementById("attEmogi").innerHTML = "&#129305;";
        }
        if (results[1].label == "joia") {
            document.getElementById("attEmogi2").innerHTML = "&#128077;";
        }
        if (results[1].label == "DBoassa") {
            document.getElementById("attEmogi2").innerHTML = "&#128406;";
        }
        if (results[1].label == "Na paz") {
            document.getElementById("attEmogi2").innerHTML = "&#129305;";
        }
    }
    
}