song1 = "";
song2 = "";

song1_stat = "";
song2_stat = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
   canvas.position(400, 200);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function  modelLoaded()
{
    console.log("PoseNet is ready");
}

function draw()
{
   image(video,0,0,600,600);
   fill("red");
   stroke("red");
   song1_stat = song1.isPlaying();
   song2_stat = song2.isPlaying();

   if(scoreLeftWrist > 0.2)
   {
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    if(song1_stat = "false")
    {
        song1.play();
      document.getElementById("song").innerHTML = "Song: DJ song";
   }
}

if(scoreRightWrist > 0.2)
   {
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    if(song2_stat = "false")
    {
        song2.play();
      document.getElementById("song").innerHTML = "Song: Peter Pan";
   }
}
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;

        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
    }
}

