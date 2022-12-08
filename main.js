//https://teachablemachine.withgoogle.com/models/47sdNxgUH/model.json
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera'); 
function take_snapshot(){
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_URI+'"/>';
    })
}
console.log('ml5.version', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/47sdNxgUH/model.json", modelLoaded);
function modelLoaded(){
    console.log('modelLoaded')
}
function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult)
}
function gotResult(error, Results){
    if(error){
        console.error(error)
    }
    else{
        console.log(Results);
        document.getElementById("Result_object").innerHTML = Results[0].label;
        gesture = Results[0].label;
        toSpeak = "";
        if(gesture == "Thumbs-up"){
            toSpeak = "This is Thumbs-up"
            document.getElementById("Result_gesture").innerHTML = "&#128077"
        }
        else if(gesture== "Doki Doki"){
            toSpeak = "This is Doki Doki"
            document.getElementById("Result_gesture").innerHTML = "&#128076"
        }
        
        else if(gesture== "Peace Sign"){
            toSpeak = "This is Peace sign"
            document.getElementById("Result_gesture").innerHTML = "&#9996"
        }
        speak();

    }
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

}