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
        render(myLeads); // Render the leads from local storage when the page loads
    }


    // ####################################################################################
    // ADD LEADS FEATURE
    // ####################################################################################

    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        
        if (inputValue.trim() !== "") { 
            myLeads.push(inputValue);
            inputEl.value = ""; 
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    });


    // ####################################################################################
    // SAVE TAB FEATURE
    // ####################################################################################

    tabBtn.addEventListener('click', function() {
        // Use the Chrome Tabs API to get the current active tab's URL
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeUrl = tabs[0].url;
            myLeads.push(activeUrl);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        });
    });


    // ####################################################################################
    // DELETE LEADS FEATURE
    // ####################################################################################

    deleteBtn.addEventListener('click', function() {
        removeAllLeads();
    });
    
    function removeAllLeads() {
        myLeads = [];
        localStorage.clear();
        render(myLeads);
    };


    // ####################################################################################
    // RENDER TO HTML
    // ####################################################################################

    function render(leads) {
        let listItems = "";
        for (let i = 0; i < leads.length; i++) {
            listItems += `
                <li>
                    <a href="${leads[i]}" target="_blank">
                        ${leads[i]}
                    </a>
                </li>
            `;
        }
        ulEl.innerHTML = listItems; 
    };
}