(function(){

    console.log('this is getting somewhere too');

    window.AudioContext = window.AudioContext ||
                          window.webkitAudioContext;
    navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    var context = new AudioContext();
    var analyser = context.createAnalyser();

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);



    function draw() {
        drawVisual = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);

        console.log(dataArray);
    }


    navigator.getUserMedia({audio: true}, function(stream) {
        var microphone = context.createMediaStreamSource(stream);

        microphone.connect(analyser);
        analyser.connect(context.destination);

        draw()

    }, function(e) {
        console.error(e);
    });

})()
