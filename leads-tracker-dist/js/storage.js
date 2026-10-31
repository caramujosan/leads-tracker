const STORAGE_KEY = "myLeads";

/**
 * Loads the leads from localStorage with error handling.
 * @returns {Array} Array of leads or empty array if there's an error.
 */
export function getLeadsFromStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        
        // If there's no data in localStorage, return an empty array
        if (!data) return [];

        const parsedData = JSON.parse(data);

        // Garantee that the parsed data is an array before returning it
        if (Array.isArray(parsedData)) {
            return parsedData;
        }

        console.warn("localStorage data is not an array. Resetting storage.");
        return [];
    } catch (error) {
        console.error("Failed to parse leads from localStorage:", error);
        // In case of an error (e.g., corrupted data), clear the storage to prevent further issues
        localStorage.removeItem(STORAGE_KEY);
        return [];
    }
}

/**
 * Saves the leads array to localStorage with error handling.
 * @param {Array} leads 
 * @returns {boolean} True if saved successfully, false otherwise.
 */
export function saveLeadsToStorage(leads) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
        return true;
    } catch (error) {
        // QuotaExceededError is thrown when the storage limit is reached
        if (error.name === "QuotaExceededError" || error.code === 22) {
            alert("Storage limit reached! Please delete some leads to free up space.");
        } else {
            console.error("Failed to save leads to localStorage:", error);
            alert("An error occurred while saving your lead.");
        }
        return false;
    }
};

/**
 * Clears the leads from localStorage with error handling.
 */
export function clearStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Failed to clear localStorage:", error);
    }
};