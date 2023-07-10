function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanavs(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(13);
    stroke(0);

    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, result){
    if(error){
        console.error(error);
    }

    if(result){
        console.log(result);
        document.getElementById("label").innerHTML = 'Label:' + result[0].label;
        document.getElementById("confidence").innerHTML = 'Confidence:' + Math.round(result[0].confidence*100) + '%';

        utterThis = new SpeechSynthesisUtterance(result[0].label);
        synth.speak(utterThis);
    }
}