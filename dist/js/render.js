export function render(leads, ulEl) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class="lead-item">
                <a href="${leads[i]}" target="_blank">
                    ${leads[i]}
                </a>
                <p class="lead-title">${Document.title}</p>
                <button class="delete-single-btn" data-lead="${leads[i]}" title="Delete this lead">×</button>
            </li>
        `;
    }
    ulEl.innerHTML = listItems; 
}