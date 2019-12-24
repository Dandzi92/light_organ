window.onload = function () {

    const loader = document.getElementById("loader");
    const audio = document.getElementById("audio");

    loader.onchange = function () {
        const track = this.files;
        audio.src = URL.createObjectURL(track[0]);
        audio.load();
        audio.play();
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();

        const canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d");

        source.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 1024;

        const lengthBuffer = analyser.frequencyBinCount;

        const arrData = new Uint8Array(lengthBuffer);

        const blockWidth = 50;
        const blockHeight = 50;

        function drawColorMusic() {

            requestAnimationFrame(drawColorMusic);
            analyser.getByteFrequencyData(arrData);

            for (let i = 1; i <= 16; i++) {
                for (let j = 1; j <= 9; j++) {
                    const value = arrData[i * j];
                    let percent = '50%';
                    ctx.fillStyle = `hsl(${value},100%,${percent})`;
                    ctx.fillRect(i * blockWidth, j * blockHeight, blockWidth, blockHeight);
                }
            }
        }
        audio.play();
        drawColorMusic();
    };
};





