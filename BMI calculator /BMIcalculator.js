document.addEventListener("DOMContentLoaded", () => {
    const calculateButton = document.getElementById("calculate");
    const resultsDiv = document.getElementById("results");

    calculateButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Get user inputs
        const weightInput = document.getElementById("weight-input").value;
        const heightInput = document.getElementById("height-input").value;

        // Validate inputs
        if (!weightInput || !heightInput || isNaN(weightInput) || isNaN(heightInput)) {
            resultsDiv.textContent = "Please enter valid numeric values for both weight and height.";
            resultsDiv.style.color = "red";
            return;
        }

        const weight = parseFloat(weightInput);
        const height = parseFloat(heightInput) / 100; // Convert height from cm to meters

        if (weight <= 0 || height <= 0) {
            resultsDiv.textContent = "Weight and height must be greater than zero.";
            resultsDiv.style.color = "red";
            return;
        }

        // Calculate BMI
        const bmi = weight / (height * height);
        const roundedBmi = bmi.toFixed(2);

        // Determine BMI category
        let category = "";
        if (bmi < 18.6) {
            category = "Underweight";
        } else if (bmi >= 18.6 && bmi <= 24.9) {
            category = "Normal weight";
        } else {
            category = "Overweight";
        }

        // Display results
        resultsDiv.textContent = `Your BMI is ${roundedBmi} (${category}).`;
        resultsDiv.style.color = "#007bff";
    });
});
