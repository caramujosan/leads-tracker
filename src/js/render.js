export function render(leads, ulEl) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class="lead-item">
                <div class="lead-info">
                    <a href="${leads[i].url}" target="_blank" class="lead-title">
                        ${leads[i].title}
                    </a>
                    <span class="lead-url">${leads[i].url}</span>
                </div>
                <button class="delete-single-btn" data-url="${leads[i].url}" title="Delete this lead">×</button>
            </li>
        `;
    }
    ulEl.innerHTML = listItems; 
}