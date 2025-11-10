document.addEventListener('DOMContentLoaded', () => {
    const madLibBtn = document.getElementById('mad-lib-btn');
    const pluralNounInput = document.getElementById('plural-noun');
    const adjectiveInput = document.getElementById('adjective');
    const verbInput = document.getElementById('verb');
    const nounInput = document.getElementById('noun');
    const conjunctionInput = document.getElementById('conjunction');
    const resultOutput = document.getElementById('result');
    const madLibForm = document.getElementById('mad-lib-form');

    madLibForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = {
            pluralNoun: pluralNounInput.value,
            adjective: adjectiveInput.value,
            verb: verbInput.value,
            noun: nounInput.value,
            conjunction: conjunctionInput.value
        };

        fetch('/madlib', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            resultOutput.textContent = data; // Display the received Mad Lib story
        })
        .catch(error => console.error('Error:', error));
    });
});