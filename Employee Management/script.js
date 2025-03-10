// Employee Base Class
class Employee {
    constructor(name, hoursWorked, role, type) {
        this.name = name;
        this.hoursWorked = hoursWorked;
        this.role = role;
        this.type = type;
        this.hourlyRate = this.getHourlyRate();
    }

    getHourlyRate() {
        const hourlyRates = {
            "Manager": 500,
            "Developer": 400,
            "Designer": 350,
            "Tester": 300,
            "Employee": 250,
            "Staff": 200,
            "Intern": 100
        };
        return this.type === "part-time" ? hourlyRates[this.role] - 10 : hourlyRates[this.role];
    }

    calculateSalary() {
        return this.hoursWorked * this.hourlyRate;
    }
}

// Select Elements
const nameInput = document.getElementById("nameInput");
const hoursInput = document.getElementById("hoursInput");
const employeeType = document.getElementById("employeeType");
const roleInput = document.createElement("select"); // Adding role selection
const addEmployeeButton = document.getElementById("addEmployee");
const employeeList = document.getElementById("employeeList");
const sortButton = document.getElementById("sortEmployees");
const downloadButton = document.getElementById("downloadCSV");
const undoDeleteButton = document.createElement("button"); // Undo Delete Button

// Employee Role Selection
const roles = ["Manager", "Developer", "Designer", "Tester", "Employee", "Staff", "Intern"];
roleInput.id = "roleInput";
roleInput.innerHTML = roles.map(role => `<option value="${role}">${role}</option>`).join("");

// Insert Role Selection Before Add Button
document.querySelector(".input-group").insertBefore(roleInput, addEmployeeButton);

// Add Undo Delete Button
undoDeleteButton.textContent = "Undo Last Delete";
undoDeleteButton.id = "undoDelete";
undoDeleteButton.style.marginTop = "10px";
document.querySelector(".container").appendChild(undoDeleteButton);
undoDeleteButton.style.display = "none"; // Initially hidden

let lastDeletedEmployee = null;

// Load Employees on Page Load
document.addEventListener("DOMContentLoaded", loadEmployees);

// Add Employee
addEmployeeButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const hoursWorked = parseFloat(hoursInput.value);
    const type = employeeType.value;
    const role = roleInput.value;

    if (!name || isNaN(hoursWorked) || hoursWorked <= 0) {
        alert("Please enter valid details.");
        return;
    }

    let employee = new Employee(name, hoursWorked, role, type);

    addEmployeeToList(employee);
    saveEmployeeToLocalStorage(employee);
    nameInput.value = "";
    hoursInput.value = "";
});

// Function to Add Employee to UI
function addEmployeeToList(employee) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${employee.name} - ${employee.role} - ${employee.hoursWorked} hrs (Rs.${employee.calculateSalary()})
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    // Edit Employee Hours
    li.querySelector(".edit-btn").addEventListener("click", () => {
        const newHours = prompt(`Enter new hours for ${employee.name}:`, employee.hoursWorked);
        if (newHours !== null && !isNaN(newHours) && newHours > 0) {
            employee.hoursWorked = parseFloat(newHours);
            updateEmployeeInLocalStorage(employee);
            refreshEmployeeList();
        }
    });

    // Delete Employee
    li.querySelector(".delete-btn").addEventListener("click", () => {
        lastDeletedEmployee = employee;
        removeEmployeeFromLocalStorage(employee.name);
        li.remove();
        undoDeleteButton.style.display = "block";
    });

    employeeList.appendChild(li);
}

// Undo Last Delete
undoDeleteButton.addEventListener("click", () => {
    if (lastDeletedEmployee) {
        addEmployeeToList(lastDeletedEmployee);
        saveEmployeeToLocalStorage(lastDeletedEmployee);
        lastDeletedEmployee = null;
        undoDeleteButton.style.display = "none";
    }
});

// Save Employee to Local Storage
function saveEmployeeToLocalStorage(employee) {
    let employees = getEmployeesFromLocalStorage();
    employees.push({
        name: employee.name,
        hoursWorked: employee.hoursWorked,
        role: employee.role,
        type: employee.type
    });
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Get Employees from Local Storage
function getEmployeesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("employees")) || [];
}

// Update Employee Hours in Local Storage
function updateEmployeeInLocalStorage(updatedEmployee) {
    let employees = getEmployeesFromLocalStorage();
    employees = employees.map(emp => 
        emp.name === updatedEmployee.name ? { ...emp, hoursWorked: updatedEmployee.hoursWorked } : emp
    );
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Remove Employee from Local Storage
function removeEmployeeFromLocalStorage(name) {
    let employees = getEmployeesFromLocalStorage().filter(emp => emp.name !== name);
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Load Employees
function loadEmployees() {
    getEmployeesFromLocalStorage().forEach(empData => {
        let employee = new Employee(empData.name, empData.hoursWorked, empData.role, empData.type);
        addEmployeeToList(employee);
    });
}

// Sort Employees by Salary

sortButton.addEventListener("click", () => {
    let employees = getEmployeesFromLocalStorage();

    // Recreate Employee objects to ensure hourlyRate is properly set
    employees = employees.map(emp => new Employee(emp.name, emp.hoursWorked, emp.role, emp.type));

    // Define role hierarchy
    const roleHierarchy = {
        "Manager": 1,
        "Developer": 2,
        "Designer": 3,
        "Tester": 4,
        "Employee": 5,
        "Staff": 6,
        "Intern": 7
    };

    // Sort by role first, then by salary
    employees.sort((a, b) => {
        // Compare by role position first
        if (roleHierarchy[a.role] !== roleHierarchy[b.role]) {
            return roleHierarchy[a.role] - roleHierarchy[b.role];
        }
        // If roles are the same, sort by salary in descending order
        return b.calculateSalary() - a.calculateSalary();
    });

    // Save the sorted employees back to local storage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Refresh the employee list
    refreshEmployeeList();
});


// Download CSV
downloadButton.addEventListener("click", () => {
    let employees = getEmployeesFromLocalStorage();
    let csvContent = "data:text/csv;charset=utf-8,Name,Role,Hours Worked,Type,Salary\n" + 
        employees.map(e => `${e.name},${e.role},${e.hoursWorked},${e.type},${e.hoursWorked * (new Employee(e.name, e.hoursWorked, e.role, e.type).getHourlyRate())}`).join("\n");
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Employees.csv");
    document.body.appendChild(link);
    link.click();
});

// Refresh Employee List
function refreshEmployeeList() {
    employeeList.innerHTML = "";
    loadEmployees();
}
