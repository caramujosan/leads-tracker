export function checkInputValue(value, myLeads) {

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