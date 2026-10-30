import { render } from './render.js';
import { checkInputValue } from './validate.js';  
    
window.onload = function() {

    let myLeads = [];
    const inputBtn = document.getElementById('input-btn');
    const tabBtn = document.getElementById('tab-btn'); // Novo botão
    const deleteBtn = document.getElementById('delete-btn');
    const inputEl = document.getElementById('input-el');
    const ulEl = document.getElementById('ul-el');


    const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

    if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage;
        render(myLeads, ulEl); // Render the leads from local storage when the page loads
    }


    // ####################################################################################
    // ADD LEADS FEATURE
    // ####################################################################################

    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        
        // Check if the input value is empty
        const validatedUrl = checkInputValue(inputValue, myLeads);
        
        if (!validatedUrl) {
            return; // If the input is invalid or already exists, exit the function
        }

        // If the input is valid and doesn't exist, add it to the leads
        myLeads.push(validatedUrl);
        inputEl.value = ""; 
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads, ulEl);
    });


    // ####################################################################################
    // SAVE TAB FEATURE
    // ####################################################################################

    tabBtn.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeUrl = tabs[0].url;

            const validatedUrl = checkInputValue(activeUrl);

            if (!validatedUrl) {
                return; // If the URL is invalid or exists, do not add it
            }

            myLeads.push(validatedUrl);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads, ulEl);
        });
    });

    // ####################################################################################
    // DELETE ALL LEADS and DELETE SINGLE LEAD FEATURES
    // ####################################################################################

    deleteBtn.addEventListener('dblclick', function() {
        myLeads = [];
        localStorage.clear();
        render(myLeads, ulEl);
    });

    ulEl.addEventListener('click', function(e) { 
        if (e.target.classList.contains('delete-single-btn')) {
            const index = e.target.getAttribute('data-index');
            
            // Remove the lead from the array using splice
            myLeads.splice(index, 1);
            
            // Update localStorage and re-render the list
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads, ulEl);
        }
    });


}