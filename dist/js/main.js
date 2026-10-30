import { render } from './render.js';
import { checkInputValue } from './validate.js';  
import { getLeadsFromStorage, saveLeadsToStorage, clearStorage } from './storage.js';
    
window.onload = function() {

    // Load leads from localStorage when the page loads
    let myLeads = getLeadsFromStorage();
    
    const inputBtn = document.getElementById('input-btn');
    const tabBtn = document.getElementById('tab-btn'); 
    const deleteBtn = document.getElementById('delete-btn');
    const inputEl = document.getElementById('input-el');
    const ulEl = document.getElementById('ul-el');

    // If there are leads in storage, render them on page load
    if (myLeads.length > 0) {
        render(myLeads, ulEl);
    }

    // ####################################################################################
    // ADD LEADS FEATURE
    // ####################################################################################

    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        const validatedUrl = checkInputValue(inputValue, myLeads);
        
        if (!validatedUrl) {
            return; 
        }

        myLeads.push(validatedUrl);
        
        // Save the updated leads to localStorage and re-render the list
        if (saveLeadsToStorage(myLeads)) {
            inputEl.value = ""; 
            render(myLeads, ulEl);
        } else {
            // If saving to storage fails, remove the last added lead to maintain consistency
            myLeads.pop();
        }
    });


    // ####################################################################################
    // SAVE TAB FEATURE
    // ####################################################################################

    tabBtn.addEventListener('click', function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeUrl = tabs[0].url;
            const validatedUrl = checkInputValue(activeUrl, myLeads);

            if (!validatedUrl) {
                return; 
            }

            myLeads.push(validatedUrl);
            
            if (saveLeadsToStorage(myLeads)) {
                render(myLeads, ulEl);
            } else {
                myLeads.pop();
            }
        });
    });


    // ####################################################################################
    // DELETE FEATURES
    // ####################################################################################

    deleteBtn.addEventListener('dblclick', function() {
        myLeads = [];
        clearStorage();
        render(myLeads, ulEl);
    });

    ulEl.addEventListener('click', function(e) { 
        if (e.target.classList.contains('delete-single-btn')) {
            const index = e.target.getAttribute('data-index');
            
            myLeads.splice(index, 1);
            
            if (saveLeadsToStorage(myLeads)) {
                render(myLeads, ulEl);
            }
        }
    });
}