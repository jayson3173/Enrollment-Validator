let employeeData = [];

// Load CSV file automatically
function loadCSV() {
  fetch('data.csv')
    .then(response => response.text())
    .then(data => {
      Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          employeeData = results.data;
          console.log('CSV data loaded:', employeeData); // Log the loaded data
        },
        error: function (error) {
          console.error('Error parsing CSV:', error);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching CSV:', error);
    });
}

// Function to validate enrollment
function validateEnrollment() {
  const portalIDsInput = document.getElementById('portalIDs').value;
  const resultElement = document.getElementById('result');
  const tableBody = document.querySelector('#resultsTable tbody');
  const table = document.getElementById('resultsTable');

  if (!portalIDsInput) {
    resultElement.textContent = 'Please enter at least one Portal ID.';
    resultElement.style.color = 'red';
    table.style.display = 'none';
    return;
  }

  // Split input by commas, spaces, or new lines
  const portalIDs = portalIDsInput.split(/[\s,]+/).filter(id => id.trim() !== '');
  console.log('Input Portal IDs:', portalIDs); // Log the input Portal IDs

  if (portalIDs.length === 0) {
    resultElement.textContent = 'No valid Portal IDs found.';
    resultElement.style.color = 'red';
    table.style.display = 'none';
    return;
  }

  // Clear previous results
  tableBody.innerHTML = '';

  // Find matching employees
  const matchedEmployees = employeeData.filter(emp => portalIDs.includes(emp['Portal ID'].toString()));
  console.log('Matched Employees:', matchedEmployees); // Log the matched employees

  if (matchedEmployees.length > 0) {
    resultElement.textContent = `Found ${matchedEmployees.length} matching records.`;
    resultElement.style.color = 'green';

    // Display results in the table
    matchedEmployees.forEach(emp => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${emp['Portal ID']}</td>
        <td>${emp['Edited Name']}</td>
        <td>${emp['Location']}</td>
        <td>${emp['Region']}</td>
        <td>${emp['CE Completion']}</td>
        <td>${emp['CEB Completion']}</td>
        <td>${emp['PWM Completion']}</td>
      `;
      tableBody.appendChild(row);
    });

    table.style.display = 'table';
  } else {
    resultElement.textContent = 'No matching records found.';
    resultElement.style.color = 'red';
    table.style.display = 'none';
  }
}

// Load CSV when the page loads
window.onload = loadCSV;