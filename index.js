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
        
        if (checkInputValue(inputValue)) {
            alert("This lead already exists!");
        } else if (inputValue.trim() !== "") { 
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

            if (checkInputValue(activeUrl)) {
                alert("This lead already exists!");
            } else {
                myLeads.push(activeUrl);
                localStorage.setItem("myLeads", JSON.stringify(myLeads));
                render(myLeads);
            }
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
    // CHECK INPUT VALUE FUNCTION
    // ####################################################################################

    // ####################################################################################
    // CHECK INPUT VALUE FUNCTION (Com normalização de barra final)
    // ####################################################################################
    function checkInputValue(value) {

        // Regex Validation for URL (basic check)
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        if (!urlPattern.test(value)) {
            alert("Please enter a valid URL.");
            return true; // Inválido
        }

        // Normalize the value to ensure consistent comparison
        // If the value ends with a slash, remove it for comparison
        let normalizedValue = value.endsWith('/') ? value.slice(0, -1) : value;

        // Normalize all leads in myLeads for comparison
        const normalizedLeads = myLeads.map(lead => lead.endsWith('/') ? lead.slice(0, -1) : lead);

        if (normalizedLeads.includes(normalizedValue)) {
            alert("This lead already exists!");
            return true; // Already exists
        }

        return false;
    }

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