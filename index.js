window.onload = function() {
    
    let myLeads = [];
    const inputBtn = document.getElementById('input-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const inputEl = document.getElementById('input-el');
    const ulEl = document.getElementById('ul-el');
    let listItems = "";


    // ####################################################################################
    // ADD LEADS FEATURE
    // ####################################################################################

    // Add event listener to the button to save input value
    inputBtn.addEventListener('click', function() {
        const inputValue = inputEl.value;
        
        if (inputValue.trim() !== "") { // Check if the input is not empty

            myLeads.push(inputValue);

            inputEl.value = ""; // Clean the input after clicking
            
            addToListItem();

            localStorage.setItem("myLeads", JSON.stringify(myLeads));
        }
        
        renderLeads();  
    });


    function addToListItem() {
        const lastIndex = myLeads.length - 1;
        listItems += `
            <li>
                <a href=${myLeads[lastIndex]} target="_blank">
                    ${myLeads[lastIndex]}
                </a>
            </li>
        `;
    };


    // ####################################################################################
    // DELETE LEADS FEATURE
    // ####################################################################################

    deleteBtn.addEventListener('click', function() {
        removeAllLeads();
        renderLeads();
    });

    
    function removeAllLeads() {
        myLeads = [];
        listItems = "";
        localStorage.clear();
    };


    // ####################################################################################
    // RENDER TO HTML
    // ####################################################################################

    function renderLeads() {
        ulEl.innerHTML = listItems; 
    };
}