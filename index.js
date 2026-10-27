
window.onload = function() {
    
    let myLeads = [];
    const inputBtn = document.getElementById('input-btn');
    const inputEl = document.getElementById('input-el');
    const ulEl = document.getElementById('ul-el');

    // Render the leads in the unordered list
    function renderLeads() {
        // Clean the unordered list before rendering
        ulEl.innerHTML = "";

        // Loop through the leads and create list items for each
        for (let i = 0; i < myLeads.length; i++) {
            const li = document.createElement('li');
            li.textContent = myLeads[i];
            ulEl.appendChild(li);
        }
    }

    // Add event listener to the button to save input value
    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        
        if (inputValue.trim() !== "") { // Check if the input is not empty
            myLeads.push(inputValue); 
            inputEl.value = ""; // Clean the input after clicking
            renderLeads();      // Update the list in the UI
        }
    });

}