    /* ================================================================
    EasyDine - Main JavaScript File (script.js)
    Written following the lab style:
    - Functions are defined first
    - All event listeners are assigned inside init()
    - window.onload = init runs everything after page loads

    This file handles:
    1. Registration form validation
    2. Reservation form validation
    3. Restaurant recommendation logic
    4. Dynamic deposit update on reservation page
    5. Show/hide payment fields (voucher vs credit card)
    6. Pre-filling restaurant from URL parameter
    7. Copy email to billing email field
    ================================================================ */


    /* ================================================================
    SECTION 1 - HELPER FUNCTIONS & SHOW PASSWORD BUTTON 
    These are small reusable functions used by the validation functions.
    ================================================================ */

    /* showError()
    Shows a red error message below a field and adds a red border.
    inputId  = the id of the input field
    errorId  = the id of the error <span> element
    message  = the error text to display */
    function showError(inputId, errorId, message) {
        var inputEl = document.getElementById(inputId);
        var errorEl = document.getElementById(errorId);

        if (errorEl) {
            errorEl.textContent = message;				/* write the error message into the span */
        }
        if (inputEl) {
            inputEl.classList.add("input-error");		/* add red border CSS class to the input */
        }
    }

    /* clearError()
    Removes the red error message and red border from a field.
    Called at the start of validation to reset previous errors. */
    function clearError(inputId, errorId) {
        var inputEl = document.getElementById(inputId);
        var errorEl = document.getElementById(errorId);

        if (errorEl) {
            errorEl.textContent = "";					/* clear the error message text */
        }
        if (inputEl) {
            inputEl.classList.remove("input-error");	/* remove the red border CSS class */
        }
    }

    function togglePasswordVisibility(inputId, buttonId){
        var input = document.getElementById(inputId);
        var button = document.getElementById(buttonId);

        if (input.type == "password") {
            input.type = "text";
            button.textContent = "Hide Password";
    }   else {
        input.type = "password";
        button.textContent = "Show Password";
        }
    }



    /* SECTION 2 - REGISTRATION FORM VALIDATION
    Called when the register form is submitted.
    Returns true to allow submission, false to block it. */ 

    function validateRegisterForm() {

        /* get the values from each form field */
        var username = document.getElementById("username").value.trim();
        var email = document.getElementById("email").value.trim();
        var phone = document.getElementById("phone").value.trim();
        var password = document.getElementById("password").value.trim();
        var confirmPassword = document.getElementById("confirmPassword").value.trim();
        var country = document.getElementById("country").value;

        /* reset all previous errors before validating again */
        clearError("username", "usernameError");
        clearError("email", "emailError");
        clearError("phone", "phoneError");
        clearError("password", "passwordError");
        clearError("confirmPassword", "confirmPasswordError");
        clearError("country", "countryError");

        var errMsg = "";				/* stores all error messages */
        var result = true;				/* assumes no errors to start */

        /* ---- Rule 1: Username cannot be empty ---- */
        if (username == "") {
            errMsg += "Username cannot be empty.\n";
            showError("username", "usernameError", "Username is required.");
            result = false;
        /* ---- Rule 2: Username must be at least 5 characters ---- */
        } else if (username.length < 5) {
            errMsg += "Username must be at least 5 characters.\n";
            showError("username", "usernameError", "Username must be at least 5 characters long.");
            result = false;
        /* ---- Rule 3: Username can only contain letters, numbers, underscores ---- */
        /* The regex /^[a-zA-Z0-9_]+$/ means: only letters, numbers, or underscore, nothing else */
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            errMsg += "Username can only contain letters, numbers, and underscores.\n";
            showError("username", "usernameError", "Username can only contain letters, numbers, and underscores.");
            result = false;
        }

        /* ---- Rule 4: Email cannot be empty ---- */
        if (email == "") {
            errMsg += "Email cannot be empty.\n";
            showError("email", "emailError", "Email address is required.");
            result = false;
        /* ---- Rule 5: Email must be in valid format (something@something.something) ---- */
        /* The regex checks for: characters @ characters . characters */
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errMsg += "Email must be in valid format.\n";
            showError("email", "emailError", "Please enter a valid email address.");
            result = false;
        }

        /* ---- Rule 6: Phone cannot be empty ---- */
        if (phone == "") {
            errMsg += "Phone number cannot be empty.\n";
            showError("phone", "phoneError", "Phone number is required.");
            result = false;
        /* ---- Rule 7: Phone must be digits only, between 8 and 15 digits ---- */
        /* The regex /^\d{8,15}$/ means: only digits, minimum 8, maximum 15 */
        } else if (!/^\d{8,15}$/.test(phone)) {
            errMsg += "Phone number must be digits only, 8 to 15 digits.\n";
            showError("phone", "phoneError", "Phone number must be digits only, between 8 and 15 digits.");
            result = false;
        }

        /* ---- Rule 8: Password cannot be empty ---- */
        if (password == "") {
            errMsg += "Password cannot be empty.\n";
            showError("password", "passwordError", "Password is required.");
            result = false;
        /* ---- Rule 9: Password must be at least 8 characters ---- */
        } else if (password.length < 8) {
            errMsg += "Password must be at least 8 characters.\n";
            showError("password", "passwordError", "Password must be at least 8 characters long.");
            result = false;
        /* ---- Rule 10: Password must contain at least one uppercase letter ---- */
        /* password.toLowerCase() == password means there are NO uppercase letters at all */
        } else if (password.toLowerCase() == password) {
            errMsg += "Password must contain at least one uppercase letter.\n";
            showError("password", "passwordError", "Password must include at least one uppercase letter.");
            result = false;
        /* ---- Rule 11: Password must contain at least one lowercase letter ---- */
        /* password.toUpperCase() == password means there are NO lowercase letters at all */
        } else if (password.toUpperCase() == password) {
            errMsg += "Password must contain at least one lowercase letter.\n";
            showError("password", "passwordError", "Password must include at least one lowercase letter.");
            result = false;
        /* ---- Rule 12: Password must contain at least one number ---- */
        /* /[0-9]/ checks if there is at least one digit anywhere in the password */
        } else if (!/[0-9]/.test(password)) {
            errMsg += "Password must contain at least one number.\n";
            showError("password", "passwordError", "Password must include at least one number.");
            result = false;
        /* ---- Rule 13: Password must contain at least one special character ---- */
        } else if (!/[!@#$%^&*()_+\-=\[\]{}|;':",.<>?/`~\\]/.test(password)) {
            errMsg += "Password must contain at least one special character.\n";
            showError("password", "passwordError", "Password must include at least one special character (e.g. !, @, #).");
            result = false;
        }

        /* ---- Rule 14: Confirm password cannot be empty ---- */
        if (confirmPassword == "") {
            errMsg += "Please confirm your password.\n";
            showError("confirmPassword", "confirmPasswordError", "Please confirm your password.");
            result = false;
        /* ---- Rule 15: Confirm password must match the password ---- */
        } else if (confirmPassword != password) {
            errMsg += "Passwords do not match.\n";
            showError("confirmPassword", "confirmPasswordError", "Passwords do not match.");
            result = false;
        }

        /* ---- Rule 16: Gender must be selected ---- */
        /* Get all radio buttons with name="gender", then loop through to check if any is checked */
        var genderRadios = document.querySelectorAll("input[name='gender']");
        var genderSelected = false;

        for (var i = 0; i < genderRadios.length; i++) {
            if (genderRadios[i].checked) {
                genderSelected = true;
                break;			/* stop looping as soon as one is found checked */
            }
        }

        if (!genderSelected) {
            errMsg += "Please select a gender.\n";
            document.getElementById("genderError").textContent = "Please select a gender.";
            result = false;
        } else {
            document.getElementById("genderError").textContent = "";
        }

        /* ---- Rule 17: Country must be selected ---- */
        if (country == "") {
            errMsg += "Please select your country or region.\n";
            showError("country", "countryError", "Please select your country or region.");
            result = false;
        }

        /* if there are any errors, show the alert with all errors combined */
        if (errMsg != "") {
            alert(errMsg);
        }

        return result;		/* true = submit the form, false = block the form */
    }


    /* ================================================================
    SECTION 3 - RESERVATION FORM VALIDATION
    Called when the reservation form is submitted.
    Returns true to allow submission, false to block it.
    ================================================================ */

    function validateReservationForm() {

        /* get the values from each form field */
        var fname = document.getElementById("fname").value.trim();
        var lname = document.getElementById("lname").value.trim();
        var resPhone = document.getElementById("resPhone").value.trim();
        var resEmail = document.getElementById("resEmail").value.trim();
        var restaurant = document.getElementById("restaurantSelect").value;
        var resDate = document.getElementById("resDate").value;
        var resTime = document.getElementById("resTime").value;
        var numPeople = document.getElementById("numPeople").value;
        var billingEmail = document.getElementById("billingEmail").value.trim();

        /* reset all previous errors before validating again */
        clearError("fname", "fnameError");
        clearError("lname", "lnameError");
        clearError("resPhone", "resPhoneError");
        clearError("resEmail", "resEmailError");
        clearError("restaurantSelect", "restaurantError");
        clearError("resDate", "resDateError");
        clearError("resTime", "resTimeError");
        clearError("numPeople", "numPeopleError");
        clearError("creditCard", "creditCardError");
        clearError("billingEmail", "billingEmailError");

        var errMsg = "";			/* stores all error messages */
        var result = true;			/* assumes no errors to start */

        /* Error handling */
        /* ---- Rule 1: First name cannot be empty ---- */
        if (fname == "") {
            errMsg += "First name cannot be empty.\n";
            showError("fname", "fnameError", "First name is required.");
            result = false;
        /* First name only can contain letters. */
        } else if (!/^[a-zA-Z ]+$/.test(fname)){
            errMsg += "First name cannot contain any special characters or numbers. /n";
            showError("fname", "fnameError", "First name can only contain letters.")
            result = false;
        }

        /* ---- Rule 2: Last name cannot be empty ---- */
        if (lname == "") {
            errMsg += "Last name cannot be empty.\n";
            showError("lname", "lnameError", "Last name is required.");
            result = false;
        /* Last name only can contain letters. */
        } else if (!/^[a-zA-Z ]+$/.test(lname)){
            errMsg += "Last name cannot contain any special characters or numbers. /n";
            showError ("lname", "lnameError","Last name can only contain letters.");
            result = false;
        }

        /* ---- Rule 3: Phone cannot be empty ---- */
        if (resPhone == "") {
            errMsg += "Phone number cannot be empty.\n";
            showError("resPhone", "resPhoneError", "Phone number is required.");
            result = false;
        } else if(!/^\d{8,15}$/.test(resPhone)){
            /* ---- Rule 4: Phone must be digits only, between 8 and 15 digits ---- */ 
            /* !/^\d{8,15}$/ means : only digits, minimum 8, maximum 15 */
                errMsg += "Phone number must be between 8 and 15 digits.\n";
                showError("resPhone", "resPhoneError", "Phone number must be between 8 and 15 digits.");
                result = false;
            
        }

        /* ---- Rule 5: Email cannot be empty ---- */
        if (resEmail == "") {
            errMsg += "Email address cannot be empty.\n";
            showError("resEmail", "resEmailError", "Email address is required.");
            result = false;
        /* ---- Rule 6: Email must be in valid format ---- */
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resEmail)) {
            errMsg += "Email must be in valid format.\n";
            showError("resEmail", "resEmailError", "Please enter a valid email address.");
            result = false;
        }

        /* ---- Rule 7: Restaurant must be selected ---- */
        if (restaurant == "") {
            errMsg += "Please select a restaurant.\n";
            showError("restaurantSelect", "restaurantError", "Please select a restaurant.");
            result = false;
        }

        /* ---- Rule 8: Reservation date cannot be empty ---- */
        if (resDate == "") {
            errMsg += "Please select a reservation date.\n";
            showError("resDate", "resDateError", "Please select a reservation date.");
            result = false;
        } else {
            /* compare selected date to today to check if it is in the past */
            /* new Date(resDate) creates a date object from the selected date string */
            var selectedDate = new Date(resDate);
            var today = new Date();
            today.setHours(0, 0, 0, 0);	/* reset time to midnight so only dates are compared */

            /* ---- Rule 9: Reservation date cannot be in the past ---- */
            if (selectedDate < today) {
                errMsg += "Reservation date cannot be in the past.\n";
                showError("resDate", "resDateError", "Reservation date cannot be in the past.");
                result = false;
            }
        }

        /* ---- Rule 10: Reservation time cannot be empty ---- */
        if (resTime == "") {
            errMsg += "Please select a reservation time.\n";
            showError("resTime", "resTimeError", "Please select a reservation time.");
            result = false;
        }

        /* ---- Rule 11: Number of people cannot be empty ---- */
        if (numPeople == "") {
            errMsg += "Number of people is required.\n";
            showError("numPeople", "numPeopleError", "Number of people is required.");
            result = false;
        /* ---- Rule 12: Number of people must be greater than 0 ---- */
        /* parseInt() converts the string value to a whole number for comparison */
        } else if (parseInt(numPeople) <= 0) {
            errMsg += "Number of people must be greater than 0.\n";
            showError("numPeople", "numPeopleError", "Number of people must be greater than 0.");
            result = false;
        }

        /* ---- Rule 13: Deposit payment method must be selected ---- */
        /* loop through all radio buttons with name="depositMethod" to find the selected one */
        var depositMethod = "";
        var depositRadios = document.querySelectorAll("input[name='depositMethod']");

        for (var i = 0; i < depositRadios.length; i++) {
            if (depositRadios[i].checked) {
                depositMethod = depositRadios[i].value;
                break;
            }
        }

        if (depositMethod == "") {
            errMsg += "Please select a payment method.\n";
            document.getElementById("depositMethodError").textContent = "Please select a payment method.";
            result = false;
        } else {
            document.getElementById("depositMethodError").textContent = "";

            /* ---- Rule 14: If online payment, credit card must be valid ---- */
            if (depositMethod == "online") {
                var cardNumber = document.getElementById("creditCard").value.trim();
                /* remove spaces before checking */
                var cardDigits = cardNumber.replace(/\s/g, "");

                if (cardNumber == "") {
                    errMsg += "Credit card number is required for online payment.\n";
                    showError("creditCard", "creditCardError", "Credit card number is required.");
                    result = false;
                /* check that card contains only digits */
                } else if (!/^\d+$/.test(cardDigits)) {
                    errMsg += "Credit card number must contain digits only.\n";
                    showError("creditCard", "creditCardError", "Credit card number must contain digits only.");
                    result = false;
                /* Visa/Mastercard = 16 digits, Amex = 15 digits */
                } else if (cardDigits.length != 16 && cardDigits.length != 15) {
                    errMsg += "Card must be 16 digits (Visa/MC) or 15 digits (Amex).\n";
                    showError("creditCard", "creditCardError", "Card must be 16 digits (Visa/MC) or 15 digits (Amex).");
                    result = false;
                }
            }
            /* Note: voucher code does not need validation */
        }

        /* ---- Rule 15: Billing email cannot be empty ---- */
        if (billingEmail == "") {
            errMsg += "Billing email address is required.\n";
            showError("billingEmail", "billingEmailError", "Billing email address is required.");
            result = false;
        /* ---- Rule 16: Billing email must be in valid format ---- */
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail)) {
            errMsg += "Billing email must be in valid format.\n";
            showError("billingEmail", "billingEmailError", "Please enter a valid billing email address.");
            result = false;
        }

        /* if there are any errors, alert the user */
        if (errMsg != "") {
            alert(errMsg);
        }

        return result;		/* true = submit the form, false = block the form */
    }


    /* ================================================================
    SECTION 4 - DYNAMIC DEPOSIT UPDATE
    Called when the restaurant dropdown changes on reservation page.
    Reads the data-deposit attribute and updates the deposit field.
    ================================================================ */

    function updateDeposit() {
        var selectEl = document.getElementById("restaurantSelect");

        /* selectedIndex is the position number of the currently chosen option */
        /* options[selectedIndex] gives us the actual chosen <option> element */
        var selectedOption = selectEl.options[selectEl.selectedIndex];

        /* getAttribute("data-deposit") reads our custom data-deposit="20" attribute */
        var depositAmount = selectedOption.getAttribute("data-deposit");

        var depositField = document.getElementById("depositAmount");

        if (depositAmount && depositAmount != "0") {
            depositField.value = "$" + depositAmount;		/* show the dollar amount */
        } else if (depositAmount == "0") {
            depositField.value = "No deposit required";		/* special case for $0 deposit */
        } else {
            depositField.value = "Please select a restaurant";
        }
    }


    /* ================================================================
    SECTION 5 - SHOW/HIDE PAYMENT FIELDS
    Called when the user selects Voucher or Online Payment.
    Shows the relevant input field and hides the other.
    ================================================================ */

    function showPaymentFields() {
        /* find which radio button is currently selected */
        var depositRadios = document.querySelectorAll("input[name='depositMethod']");
        var selectedMethod = "";

        for (var i = 0; i < depositRadios.length; i++) {
            if (depositRadios[i].checked) {
                selectedMethod = depositRadios[i].value;
                break;
            }
        }

        var voucherGroup = document.getElementById("voucherGroup");
        var creditCardGroup = document.getElementById("creditCardGroup");

        if (selectedMethod == "voucher") {
            voucherGroup.style.display = "block";		/* show voucher field */
            creditCardGroup.style.display = "none";		/* hide credit card field */
            /* clear the credit card field so old data is not submitted */
            document.getElementById("creditCard").value = "";
            clearError("creditCard", "creditCardError");

        } else if (selectedMethod == "online") {
            voucherGroup.style.display = "none";		/* hide voucher field */
            creditCardGroup.style.display = "block";	/* show credit card field */
            /* clear the voucher field so old data is not submitted */
            document.getElementById("voucherCode").value = "";
        }
    }


    /* ================================================================
    SECTION 6 - COPY EMAIL TO BILLING EMAIL
    Called when the "same as email" checkbox is ticked or unticked.
    Copies the reservation email into the billing email field.
    ================================================================ */

    function copyEmail() {
        var checkbox = document.getElementById("sameEmail");
        var mainEmail = document.getElementById("resEmail");
        var billingEmail = document.getElementById("billingEmail");

        if (checkbox.checked) {
            billingEmail.value = mainEmail.value;	/* copy the email value across */
            billingEmail.readOnly = true;			/* lock the field so user cannot edit it */
        } else {
            billingEmail.value = "";				/* clear the field */
            billingEmail.readOnly = false;			/* unlock the field for editing */
        }
    }


    /* ================================================================
    SECTION 7 - PRE-FILL RESTAURANT FROM URL
    Reads the URL parameter "?restaurant=Name" and pre-selects
    that restaurant in the dropdown when the page loads.
    Example URL: reservations.html?restaurant=The+Golden+Spoon
    ================================================================ */

    function prefillRestaurantFromURL() {
        var selectEl = document.getElementById("restaurantSelect");

        /* if there is no dropdown on this page, stop the function */
        if (!selectEl) {
            return;
        }

        /* window.location.search gives the part of the URL after the "?" */
        /* URLSearchParams parses it into a usable object */
        var params = new URLSearchParams(window.location.search);
        var restaurantName = params.get("restaurant");	/* get the value of "restaurant" from the URL */

        if (restaurantName) {
            /* loop through all options in the dropdown to find the matching one */
            for (var i = 0; i < selectEl.options.length; i++) {
                if (selectEl.options[i].value == restaurantName) {
                    selectEl.selectedIndex = i;		/* select the matching option */
                    updateDeposit();				/* update the deposit field to match */
                    break;
                }
            }
        }
    }


    /* ================================================================
    SECTION 8 - RESTAURANT RECOMMENDATION LOGIC
    Called when the user clicks "Get Recommendations" on recommend.html.
    Uses a scoring system to find the best matching restaurant.
    ================================================================ */

    function getRecommendation() {
        var dietary = document.getElementById("dietary").value;
        var budget = document.getElementById("budget").value;
        var purpose = document.getElementById("purpose").value;

        /* check all three dropdowns are selected before continuing */
        if (dietary == "" || budget == "" || purpose == "") {
            alert("Please fill in all three preference fields before getting a recommendation.");
            return;
        }

        /* restaurant data array
        Each restaurant is an object with these properties:
        - name: the restaurant name
        - dietary: array of dietary options it suits
        - budget: array of budget ranges it suits
        - purpose: array of dining purposes it suits
        - cuisine: the cuisine type
        - deposit: deposit amount
        - description: short description */
        var restaurants = [
            {
                name: "The Golden Spoon",
                dietary: ["vegetarian", "none"],
                budget: ["medium", "high"],
                purpose: ["date", "business", "casual"],
                cuisine: "Italian",
                deposit: "$20",
                description: "Fine Italian dining with authentic pasta and risotto in an elegant setting."
            },
            {
                name: "The Melaya",
                dietary: ["halal", "none"],
                budget: ["low", "medium"],
                purpose: ["family", "casual"],
                cuisine: "Malaysian",
                deposit: "No deposit required",
                description: "Authentic Malaysian flavours with Halal options perfect for family gatherings."
            },
            {
                name: "The Spice Heaven",
                dietary: ["vegetarian", "none"],
                budget: ["medium", "high"],
                purpose: ["family", "casual", "date"],
                cuisine: "Indian",
                deposit: "$30",
                description: "Bold Indian spices and rich curries in a vibrant and welcoming atmosphere."
            },
            {
                name: "The Emperor Dragon",
                dietary: ["none"],
                budget: ["medium", "high"],
                purpose: ["business", "date", "casual"],
                cuisine: "Chinese",
                deposit: "$30",
                description: "Prestigious Chinese dining from dim sum to Peking duck for all occasions."
            },
            {
                name: "The Hellas Dining",
                dietary: ["vegetarian", "none"],
                budget: ["medium"],
                purpose: ["family", "casual", "date"],
                cuisine: "Greek",
                deposit: "$25",
                description: "Traditional Greek dishes with fresh ingredients, from souvlaki to baklava."
            },
            {
                name: "Sakura Sushi",
                dietary: ["vegetarian", "none"],
                budget: ["medium", "high"],
                purpose: ["date", "business", "casual"],
                cuisine: "Japanese",
                deposit: "$20",
                description: "Premium sushi and Japanese cuisine crafted with precision and artistry."
            }
        ];

        /* SCORING LOGIC
        Loop through each restaurant and give it points based on how well it matches.
        - dietary match = 2 points (most important)
        - budget match  = 2 points
        - purpose match = 1 point
        The restaurant with the highest score is recommended. */
        var bestMatch = null;
        var bestScore = -1;

        for (var i = 0; i < restaurants.length; i++) {
            var r = restaurants[i];
            var score = 0;

            /* indexOf() returns -1 if the value is NOT in the array */
            /* so != -1 means "found in the array" = it is a match */
            if (r.dietary.indexOf(dietary) != -1) {
                score += 2;
            }
            if (r.budget.indexOf(budget) != -1) {
                score += 2;
            }
            if (r.purpose.indexOf(purpose) != -1) {
                score += 1;
            }

            /* if this restaurant scores better than the current best, replace it */
            if (score > bestScore) {
                bestScore = score;
                bestMatch = r;
            }
        }

        /* display the recommended restaurant result */
        var resultDiv = document.getElementById("recommendResult");
        var resultCard = document.getElementById("resultCard");
        var reserveBtn = document.getElementById("reserveBtn");

        if (bestMatch != null) {
            /* build the HTML content for the result card using string concatenation */
            resultCard.innerHTML =
                "<div class='restaurant-info'>" +
                "<h2>" + bestMatch.name + "</h2>" +
                "<p class='cuisine'>🍴 " + bestMatch.cuisine + "</p>" +
                "<p>" + bestMatch.description + "</p>" +
                "<p class='deposit'>💳 Deposit: <strong>" + bestMatch.deposit + "</strong></p>" +
                "</div>";

            /* update the Reserve Now button to pass the restaurant name to the reservation page */
            /* encodeURIComponent() makes the name safe to use in a URL (handles spaces etc.) */
            reserveBtn.href = "reservations.html?restaurant=" + encodeURIComponent(bestMatch.name);

            /* show the result area (it was hidden with style="display:none" in the HTML) */
            resultDiv.style.display = "block";

            /* smoothly scroll down so the user can see the result */
            resultDiv.scrollIntoView({ behavior: "smooth" });

        } else {
            alert("Sorry, no matching restaurant was found. Please try different preferences.");
        }
    }


    /* ================================================================
    SECTION 9 - INIT FUNCTION
    This function links all the event handlers to their HTML elements.
    Following the lab style: assign events here, not inline in HTML
    (where possible).

    Note: some events (onchange, onclick on buttons) are still set
    inline in HTML for simplicity, which is acceptable for this level.
    ================================================================ */

    function init() {

        /* --- Registration page setup --- */
        var registerForm = document.getElementById("registerForm");
        if (registerForm) {
            /* link the validateRegisterForm function to the form's submit event */
            registerForm.onsubmit = validateRegisterForm;
        }

        /* --- Reservation page setup --- */
        var reservationForm = document.getElementById("reservationForm");
        if (reservationForm) {
            /* link the validateReservationForm function to the form's submit event */
            reservationForm.onsubmit = validateReservationForm;
        }

        /* --- Pre-fill restaurant from URL on reservation page --- */
        /* this runs on every page but only does something if restaurantSelect exists */
        prefillRestaurantFromURL();

        /* --- Link the sameEmail checkbox to copyEmail function --- */
        var sameEmailCheckbox = document.getElementById("sameEmail");
        if (sameEmailCheckbox) {
            sameEmailCheckbox.onchange = copyEmail;
        }

        /* --- Link the restaurant dropdown to updateDeposit function --- */
        var restaurantDropdown = document.getElementById("restaurantSelect");
        if (restaurantDropdown) {
            restaurantDropdown.onchange = updateDeposit;
        }

        /* --- Link the deposit method radio buttons to showPaymentFields --- */
        var depositRadios = document.querySelectorAll("input[name='depositMethod']");
        for (var i = 0; i < depositRadios.length; i++) {
            depositRadios[i].onchange = showPaymentFields;
        }
    }


    /* ================================================================
    window.onload = init
    Tells the browser: once the entire page has finished loading,
    run the init function.

    Note: we write   window.onload = init;
    NOT              window.onload = init();
    Because init   = pass the function to run later
            init()  = run the function right now immediately
    ================================================================ */
    window.onload = init;