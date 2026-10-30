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
    // RENDER TO HTML
    // ####################################################################################

    function render(leads) {
            let listItems = "";
            for (let i = 0; i < leads.length; i++) {
                listItems += `
                    <li class="lead-item">
                        <a href="${leads[i]}" target="_blank">
                            ${leads[i]}
                        </a>
                        <button class="delete-single-btn" data-index="${i}" title="Delete this lead">×</button>
                    </li>
                `;
            }
            ulEl.innerHTML = listItems; 
    };


    // ####################################################################################
    // ADD LEADS FEATURE
    // ####################################################################################

    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        
        // Check if the input value is empty
        const validatedUrl = checkInputValue(inputValue);
        
        if (!validatedUrl) {
            return; // If the input is invalid or already exists, exit the function
        }

        // If the input is valid and doesn't exist, add it to the leads
        myLeads.push(validatedUrl);
        inputEl.value = ""; 
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
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
            render(myLeads);
        });
    });


    // ####################################################################################
    // DELETE ALL LEADS and DELETE SINGLE LEAD FEATURES
    // ####################################################################################

    deleteBtn.addEventListener('dblclick', function() {
        removeAllLeads();
    });
    
    function removeAllLeads() {
        myLeads = [];
        localStorage.clear();
        render(myLeads);
    };

    ulEl.addEventListener('click', function(e) {
        removeSingleLead(e);
    });

    function removeSingleLead(e) {
        if (e.target.classList.contains('delete-single-btn')) {
            const index = e.target.getAttribute('data-index');
            
            // Remove the lead from the array using splice
            myLeads.splice(index, 1);
            
            // Update localStorage and re-render the list
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        }
    }


    // ####################################################################################
    // CHECK INPUT VALUE FUNCTION
    // ####################################################################################

    function checkInputValue(value) {

        let urlToTest = value.trim(); // Remove leading and trailing whitespace

        // In case the user didn't include the protocol, prepend "https://" to the URL for validation
        if (!urlToTest.startsWith("http://") && !urlToTest.startsWith("https://")) {
            urlToTest = "https://" + urlToTest;
        }

        try {
            // Try to create a new URL object. If it fails, the URL is invalid.
            const parsedUrl = new URL(urlToTest);
            
            // Garantee that the hostname contains at least one dot, which is a basic check for a valid domain
            if (!parsedUrl.hostname.includes('.')) {
                alert("Please enter a valid URL.");
                return;
            }

        } catch (error) {
            alert("Please enter a valid URL.");
            return;
        }

        // Normalize the value and existing leads to ensure consistent comparison
        if (urlToTest.endsWith('/')) {
            urlToTest = urlToTest.slice(0, -1);
        };
    

        const normalizedLeads = myLeads.map(lead => lead.endsWith('/') ? lead.slice(0, -1) : lead);

        if (normalizedLeads.includes(urlToTest)) {
            alert("This lead already exists!");
            return;
        }

        return urlToTest;
    }

}