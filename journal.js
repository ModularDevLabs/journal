// Get the entry form element
const form = document.getElementById('entry-form');
// Get the entries list element
const entriesList = document.getElementById('entries');

function saveEntry(timestamp, message) {
  // Create a new list item element for the entry
  const listItem = document.createElement('li');
  // Create the date element
  const dateElement = document.createElement('time');
  dateElement.setAttribute('datetime', timestamp);
  dateElement.textContent = new Date(timestamp).toLocaleString();
  // Create the message element
  const messageElement = document.createElement('strong');
  messageElement.textContent = message;
  // Append the elements to the list item
  listItem.appendChild(dateElement);
  listItem.appendChild(messageElement);
  // Append the list item to the entries list
  entriesList.appendChild(listItem);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get the current timestamp and message
  const timestamp = document.getElementById('timestamp').value;
  const message = document.getElementById('message').value;
  // Save the entry to local storage
  localStorage.setItem(`entry_${timestamp}`, message);
  // Clear the form inputs
  document.getElementById('timestamp').value = '';
  document.getElementById('message').value = '';
  // Add the entry to the list
  saveEntry(timestamp, message);
});

// Load existing entries from local storage
const storedEntries = Object.keys(localStorage).forEach((key) => {
  const entryTimestamp = key.substring(7);
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?: [\d]{1,2][:][\d]{1,2})?$/.test(entryTimestamp)) {
    const entryMessage = localStorage.getItem(key);
    if (entryMessage) {
      saveEntry(entryTimestamp, entryMessage);
    }
  }
});
