export function render(leads, ulEl) {
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