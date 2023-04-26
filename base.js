const video = document.getElementById('video');
const alarm = document.getElementById('alarm');
const THRESHOLD = 50;

navigator.mediaDevices.getUserMedia({ video: true })
	.then(stream => {
		video.srcObject = stream;
		video.play();
		
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.width = video.width;
		canvas.height = video.height;
		
		setInterval(() => {
			context.drawImage(video, 0, 0, canvas.width, canvas.height);
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			const pixels = imageData.data;
			let sum = 0;
			for (let i = 0; i < pixels.length; i += 4) {
				sum += (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
			}
			const average = sum / (pixels.length / 4);
			if (average < THRESHOLD) {
				alarm.play();
			}
		}, 1000);
	})
	.catch(error => {
		console.log('Error accessing camera:', error);
	});
