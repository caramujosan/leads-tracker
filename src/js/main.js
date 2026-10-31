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
    const searchEl = document.getElementById('search-el');

    // If there are leads in storage, render them on page load
    if (myLeads.length > 0) {
        render(myLeads, ulEl);
    }


    // ####################################################################################
    // SEARCH FEATURE
    // ####################################################################################
    searchEl.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        const filteredLeads = myLeads.filter(lead => 
            lead.url.toLowerCase().includes(searchTerm) || 
            lead.title.toLowerCase().includes(searchTerm)
        );
        
        render(filteredLeads, ulEl);
    });


    // ####################################################################################
    // ADD LEADS FEATURE
    // ####################################################################################

    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        const validatedUrl = checkInputValue(inputValue, myLeads);
        
        if (!validatedUrl) {
            return; 
        }

        const newLead = {
            url: validatedUrl,
            title: validatedUrl
        };

        myLeads.push(newLead);
        
        // Save the updated leads to localStorage and re-render the list
        if (saveLeadsToStorage(myLeads)) {
            inputEl.value = ""; 
            searchEl.value = "";
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
            const tabTitle = tabs[0].title || activeUrl;
            const validatedUrl = checkInputValue(activeUrl, myLeads);

            if (!validatedUrl) {
                return; 
            }

            const newLead = {
                url: validatedUrl,
                title: tabTitle
            };

            myLeads.push(newLead);
            
            if (saveLeadsToStorage(myLeads)) {
                searchEl.value = "";
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
        searchEl.value = "";
        render(myLeads, ulEl);
    });

    ulEl.addEventListener('click', function(e) { 
        if (e.target.classList.contains('delete-single-btn')) {
            const urlToDelete = e.target.getAttribute('data-url');

            const index = myLeads.findIndex(lead => lead.url === urlToDelete);
            
            if (index > -1) {
                myLeads.splice(index, 1);
                
                if (saveLeadsToStorage(myLeads)) {
                    const searchTerm = searchEl.value.toLowerCase().trim();
                    const filteredLeads = myLeads.filter(lead => 
                        lead.url.toLowerCase().includes(searchTerm) || 
                        lead.title.toLowerCase().includes(searchTerm)
                    );
                    render(filteredLeads, ulEl);
                }
            }
        }
    });
};
