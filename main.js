leftwristx=0
leftwristy=0
rightwristx=0
rightwristy=0
leftwristscore=0
rightwristscore=0


function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO)
    video.hide()
     poseNet=ml5.poseNet(video,modelloaded)
     poseNet.on('pose',gotresult)
}

function draw(){
    image(video,0,0,500,500)
    fill("red")
    stroke("red")
    if (leftwristscore>0.2) {
        circle(leftwristx-100,leftwristy,15)
        LWy=Number(leftwristy)
        nodecimal=floor(LWy)
        volume= nodecimal/500
        song.setVolume(volume)
        document.getElementById("volume").innerHTML="volume="+volume
    }

    if(rightwristscore>0.2){
        circle(rightwristx-50,rightwristy,15)
        if(rightwristy>=0&&rightwristy<=100){
        document.getElementById("speed").innerHTML= "speed=0.5x"
        song.rate(0.5)
        }
        else if(rightwristy>100&&rightwristy<=200){
            document.getElementById("speed").innerHTML= "speed=1x"
            song.rate(1)
            }
            else if(rightwristy>200&&rightwristy<=300){
                document.getElementById("speed").innerHTML= "speed=1.5x"
                song.rate(1.5)
                }
              else if(rightwristy>300&&rightwristy<=400){
                 document.getElementById("speed").innerHTML= "speed=2x"
                 song.rate(2)
                 }
                 else if(rightwristy>400){
                    document.getElementById("speed").innerHTML= "speed=2.5x"
                    song.rate(2.5)
                    }

    }
}

song =""
function preload() {
   song= loadSound("music.mp3") 
}

function play() {
    song.play()
    song.rate(1)
    song.setVolume(1)
}

 function stop(){
     song.stop()
 }

function modelloaded(){
    console.log("model has been loaded")
}

function gotresult(result) {
    if (result.length>0) {
        console.log(result)
        rightwristx=result[0].pose.rightWrist.x
        rightwristy=result[0].pose.rightWrist.y
        console.log("RWx="+rightwristx)
        console.log("RWY="+rightwristy)
        rightwristscore=result[0].pose.keypoints[10].score
        console.log("RWS="+rightwristscore)
        leftwristx=result[0].pose.leftWrist.x
        leftwristy=result[0].pose.leftWrist.y
        console.log("LWX="+leftwristx)
        console.log("LWY="+leftwristy)
         leftwristscore=result[0].pose.keypoints[9].score   
         console.log("LWS="+leftwristscore) 

    }
}

