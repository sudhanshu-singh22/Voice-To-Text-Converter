document.getElementById('click_to_convert').addEventListener('click', function(){
    const converterText = document.getElementById('converter_text');
    const recordingStatus = document.createElement('p');
    recordingStatus.textContent = '';
    this.parentNode.insertBefore(recordingStatus, this.nextSibling); 
    let recognition = null;
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.interimResults = true;

        recognition.addEventListener('result', function(e) {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');

            converterText.value = transcript; 
        });

        recognition.addEventListener('start', function() {
            recordingStatus.textContent = 'Recording...'; 
        });

        recognition.addEventListener('end', function() {
            recordingStatus.textContent = ''; 
        });

        this.addEventListener('click', function() {
            if (!recognition.isRecording) {
                recognition.start();
            } else {
                recognition.stop();
            }
        });
    } else {
        alert('Speech recognition not supported in your browser. Please use a different browser.');
    }
});
