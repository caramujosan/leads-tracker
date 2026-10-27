
window.onload = function() {
    
    let saveLeads = [];
    let inputBtn = document.getElementById('input-btn');
    let inputEl = document.getElementById('input-el');

    inputBtn.addEventListener('click', function() {
            const inputValue = inputEl.value;
            saveLeads.push(inputValue); 

            console.log(saveLeads);
    });

}