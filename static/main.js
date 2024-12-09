document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('speakForm');
    const audio = document.getElementById('audio');
    const bubbleAnimation = document.getElementById('bubbleAnimation');
    const listeningMessage = document.getElementById('listeningMessage');
    const sentenceInput = document.getElementById('sentence');
    const inputModeRadios = document.querySelectorAll('input[name="inputMode"]');
    const stopButton = document.createElement('button');

    stopButton.innerText = 'Stop Listening';
    stopButton.style.display = 'none';
    stopButton.style.position = 'fixed';
    stopButton.style.top = '10px';
    stopButton.style.right = '10px';
    document.body.appendChild(stopButton);

    let listeningInterval;

    function moveListeningMessage() {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 50);
        listeningMessage.style.left = `${x}px`;
        listeningMessage.style.top = `${y}px`;
    }

    inputModeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'voice') {
                sentenceInput.removeAttribute('required');
                sentenceInput.disabled = true;
            } else {
                sentenceInput.setAttribute('required', true);
                sentenceInput.disabled = false;
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputMode = document.querySelector('input[name="inputMode"]:checked').value;
        const formData = new FormData();

        if (inputMode === 'text') {
            formData.append('sentence', sentenceInput.value);
            formData.append('inputMode', 'text');
            sentenceInput.value = '';
        } else if (inputMode === 'voice') {
            formData.append('inputMode', 'voice');
            listeningMessage.style.display = 'block';
            stopButton.style.display = 'block';
            listeningInterval = setInterval(moveListeningMessage, 500);
        }

        const response = await fetch('/speak', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            const answer = data.answer;
            alert(`Response: ${answer}`);
            bubbleAnimation.classList.add('active');
        } else {
            alert('Something went wrong. Please try again.');
        }

        listeningMessage.style.display = 'none';
        stopButton.style.display = 'none';
        clearInterval(listeningInterval);
    });

    stopButton.addEventListener('click', () => {
        listeningMessage.style.display = 'none';
        stopButton.style.display = 'none';
        clearInterval(listeningInterval);
    });
});
