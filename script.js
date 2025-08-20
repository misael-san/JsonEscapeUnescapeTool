// --- DOM ELEMENT SELECTION ---
// Get references to the HTML elements we will interact with.
// It's a good practice to do this at the beginning of the script to have them readily available.
const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const escapeBtn = document.getElementById('escape-btn');
const unescapeBtn = document.getElementById('unescape-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn'); // New clear button

// --- FUNCTION DEFINITIONS ---

/**
 * Function to "escape" a string.
 * It takes the text from the input area, treats it as a single string,
 * and applies JSON.stringify(). This wraps the string in double quotes
 * and escapes internal characters like quotes, newlines, etc.
 * The result is a string that can be safely embedded as a value in another JSON.
 */
function handleEscape() {
    const rawString = jsonInput.value;
    if (!rawString) {
        jsonOutput.value = '';
        return;
    }
    try {
        const escapedString = JSON.stringify(rawString);
        jsonOutput.value = escapedString;
    } catch (error) {
        jsonOutput.value = `Error during escape: ${error.message}`;
    }
}

/**
 * Function to "unescape" a string.
 * It takes a string that has been previously escaped (a JSON string literal)
 * and uses JSON.parse() to return it to its original form.
 */
function handleUnescape() {
    const escapedString = jsonInput.value;
    if (!escapedString) {
        jsonOutput.value = '';
        return;
    }
    try {
        const unescapedString = JSON.parse(escapedString);
        jsonOutput.value = unescapedString;
    } catch (error) {
        jsonOutput.value = `ERROR: Invalid string to unescape. Please check the format.\n\nDetails: ${error.message}`;
    }
}

/**
 * Function to copy the content of the output area to the clipboard.
 * It uses the modern and secure `navigator.clipboard` API.
 */
function handleCopy() {
    const resultText = jsonOutput.value;
    if (!resultText) {
        return;
    }
    navigator.clipboard.writeText(resultText).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

/**
 * Function to clear the content of both the input and output textareas.
 */
function handleClear() {
    jsonInput.value = '';
    jsonOutput.value = '';
}


// --- EVENT LISTENER ASSIGNMENTS ---
// Assign the corresponding functions to the 'click' event of each button.
// This connects the JavaScript logic with user actions on the page.
escapeBtn.addEventListener('click', handleEscape);
unescapeBtn.addEventListener('click', handleUnescape);
copyBtn.addEventListener('click', handleCopy);
clearBtn.addEventListener('click', handleClear); // Event listener for the new clear button