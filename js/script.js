const ENCODE_RULES = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat',
};

const DECODE_RULES = Object.fromEntries(
    Object.entries(ENCODE_RULES).map(([k, v]) => [v, k])
);

function showModal(message) {
    const modal = document.getElementById('modalAlert');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';

    document.getElementById('closeModalButton').onclick = function() {
        modal.style.display = 'none';
    };
}

function hasUpperCaseOrAccent(text) {
    return /[A-ZÁÉÍÓÚÜÑáéíóúüñ]/.test(text);
}

function encryptText() {
    const text = document.getElementById('entrada-texto').value;
    if (!text.trim()) {
        showModal('El mensaje está en blanco. Por favor, ingrese un mensaje a encriptar.');
        return;
    }
    if (hasUpperCaseOrAccent(text)) {
        showModal('Por favor, ingrese solo letras minúsculas y sin acentos.');
        return;
    }
    const encryptedText = text.split('').map(char => ENCODE_RULES[char] || char).join('');
    updateOutputSection(encryptedText);
}

function decryptText() {
    const text = document.getElementById('entrada-texto').value;
    if (!text.trim()) {
        showModal('El mensaje está en blanco. Por favor, ingrese un mensaje a desencriptar.');
        return;
    }
    if (hasUpperCaseOrAccent(text)) {
        showModal('Por favor, ingrese solo letras minúsculas y sin acentos.');
        return;
    }
    let decryptedText = text;
    for (const [encoded, original] of Object.entries(DECODE_RULES)) {
        decryptedText = decryptedText.split(encoded).join(original);
    }
    updateOutputSection(decryptedText);
}

function copyText() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
}

function updateOutputSection(text) {
    const outputTextElement = document.getElementById('outputText');
    const copyButton = document.getElementById('copyButton');
    const outputImage = document.getElementById('outputImage');
    const outputMessageContainer = document.querySelector('.ouput_menssage');

    outputTextElement.value = text;
    outputImage.classList.remove('active');
    outputMessageContainer.classList.add('active');
    outputTextElement.style.display = 'block';
    copyButton.style.display = 'block';
}