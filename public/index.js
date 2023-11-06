document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const form = document.getElementById("registrationForm");

    function validateName() {
        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        const nameValue = nameInput.value.trim();
        const namePattern = /^[A-Za-z ]+$/;
    
        if (nameValue === "") {
            nameError.textContent = "Name is required";
            nameInput.classList.add("error-input");
            return false;
        } else if (!namePattern.test(nameValue)) {
            nameError.textContent = "Invalid characters in name";
            nameInput.classList.add("error-input");
            return false;
        } else {
            nameError.textContent = "";
            nameInput.classList.remove("error-input");
            return true;
        }
    }
    

    // Function to validate email address
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
        return emailPattern.test(email);
    }

    // Function to validate Date of Birth (DOB)
    function validateDOB(dob) {
        const dobInput = document.getElementById("dob");
        const dobError = document.getElementById("dobError");
        const currentDate = new Date();
        const selectedDate = new Date(dob);

        if (selectedDate > currentDate) {
            dobError.textContent = "Invalid Date of Birth (future date)";
            dobInput.classList.add("error-input");
            return false;
        } else {
            dobError.textContent = ""; 
            dobInput.classList.remove("error-input");
            return true;
        }
    }

    // Add an event listener to the form for form submission
    form.addEventListener("submit", function (event) {
        if (!validateName()) {
            event.preventDefault();
            return;
        }

        // Get the email input and error elements
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailError");

        // Validate the email field before submitting the form
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Invalid email address";
            emailInput.classList.add("error-input");
            event.preventDefault(); 
        } else {
            emailError.textContent = ""; // Clear the error message
            emailInput.classList.remove("error-input");
        }

        // Validate the Date of Birth (DOB) field
            const dobInput = document.getElementById("dob");
            if (!validateDOB(dobInput.value)) {
                event.preventDefault();
                return;
            }
        
    });
});
