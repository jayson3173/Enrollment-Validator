let employeeData = [];

// Function to handle CSV file upload
document.getElementById('csvFile').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        employeeData = results.data;
        console.log('CSV data loaded:', employeeData);
      },
      error: function (error) {
        console.error('Error parsing CSV:', error);
      }
    });
  }
});

// Function to check employee status
function checkEmployee() {
  const employeeID = document.getElementById('employeeID').value;
  const resultElement = document.getElementById('result');
  const tableBody = document.querySelector('#resultsTable tbody');
  const table = document.getElementById('resultsTable');

  if (!employeeID) {
    resultElement.textContent = 'Please enter an Employee ID.';
    resultElement.style.color = 'red';
    return;
  }

  if (employeeData.length === 0) {
    resultElement.textContent = 'Please upload a CSV file first.';
    resultElement.style.color = 'red';
    return;
  }

  const employee = employeeData.find(emp => emp['Portal ID'] == employeeID);

  if (employee) {
    resultElement.textContent = `Employee ${employeeID} found.`;
    resultElement.style.color = 'green';

    // Display the employee's details in the table
    tableBody.innerHTML = `
      <tr>
        <td>${employee['Portal ID']}</td>
        <td>${employee['Edited Name']}</td>
        <td>${employee['Location']}</td>
        <td>${employee['Region']}</td>
        <td>${employee['CE Completion']}</td>
        <td>${employee['CEB Completion']}</td>
        <td>${employee['PWM Completion']}</td>
      </tr>
    `;
    table.style.display = 'table';
  } else {
    resultElement.textContent = `Employee ${employeeID} not found.`;
    resultElement.style.color = 'red';
    table.style.display = 'none';
  }
}