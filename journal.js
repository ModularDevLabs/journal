// Get the entry form element
const form = document.getElementById('entry-form');
// Get the entries list element
const entriesList = document.getElementById('entries');

// Helper function to create a new entry element
function createEntryElement(timestamp, message) {
  const listItem = document.createElement('li');
  const dateElement = document.createElement('time');
  dateElement.setAttribute('datetime', timestamp);
  dateElement.textContent = new Date(timestamp).toLocaleString();
  const messageElement = document.createElement('strong');
  messageElement.textContent = message;
  listItem.appendChild(dateElement);
  listItem.appendChild(messageElement);
  return listItem;
}

// Update the saveEntry function to use the createEntryElement
function saveEntry(timestamp, message) {
  const entry = createEntryElement(timestamp, message);
  entriesList.appendChild(entry);
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
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?:[\d]{1[:})(?:[\d]:))?.test(?:),
                          
