
DineEasy – README
Assignment 2, COS10005 Web Development, Semester 1 2026
--------------------------------------------------------

STUDENT ID: 105710485
STUDENT NAME: Chun Weng Ngai
----------------------------------------------------------------

1. WEBSITE STRUCTURE
----------------------------------------------------------------

assignment2/
├── index.html          → Home page: introduces the platform, services,
│                          target users, and quick links to restaurants
├── restaurants.html    → Displays 6 restaurants with full details
├── recommend.html      → Preference form + JS recommendation engine
├── register.html       → Account registration form with JS validation
├── reservation.html    → Table reservation form with JS validation
├── css/
│   └── style.css       → Single external CSS file linked to all pages
├── js/
│   └── script.js       → Single external JS file linked to all pages
├── png
│   - dining room.jpg → Image for The Home Page in index.html
│   - pasta.jpg → Image for The Golden Spoon
│   - cendol.jpg → Image for The Melaya
│   - indian.jpg → Image for The Spice Heaven
│   - chinese cuisine.jpg → Image for The Emperor Dragon
│   - greek.jpg → Image for The Hellas Dining
|   - japanese.jpg → Image for Sakura Sushi
└── Readme.txt          → This file

2. GitHub Repository link
- https://github.com/techguy01111100111/Assignment-2- (Full file from GitHub)
- https://techguy01111100111.github.io/Assignment-2-/ (Directly to the website)

3. JAVASCRIPT VALIDATION LOGIC (Plain English)

3.1 REGISTRATION FORM (register.html) 

When the user clicks "Create Account", the validateRegisterForm()
function runs BEFORE the form is submitted. It checks each field:

  USERNAME:
  - Must not be empty.
  - Must be at least 5 characters long.
  - Can only contain letters (a-z, A-Z), numbers (0-9), or underscores (_).
  - Checked using a regular expression (regex): /^[a-zA-Z0-9_]{5,}$/

  EMAIL:
  - Must not be empty.
  - Must follow the format: something@something.something
  - Checked using regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  PHONE NUMBER:
  - Must not be empty.
  - Must contain only digits (no letters or symbols).
  - Must be between 8 and 15 digits long.
  - Checked using regex: /^\d{8,15}$/

  PASSWORD:
  - Must not be empty.
  - Must be at least 10 characters long.
  - Must contain at least one uppercase letter.
  - Must contain at least one lowercase letter.
  - Must contain at least one number.
  - Must contain at least one special character (like !, @, #).
  - Each rule is tested separately using regex tests.

  CONFIRM PASSWORD:
  - Must not be empty.
  - Must exactly match the password field.

  GENDER:
  - Cannot be empty, at least one must be selected. 
  - Checked by looping through all radio buttons with name="gender".

  COUNTRY:
  - A valid option must be selected from the dropdown.

  If any field fails, a red error message appears below it.
  The form is NOT submitted until all errors are fixed.


3.2 RESERVATION FORM (reservation.html) 

When the user clicks "Confirm Reservation", validateReservationForm()
runs before submission. It checks:

  First Name: 
  - Must not be empty.
  - Must only contain letters.

  Last Name: 
  - Must not be empty
  - Must only contain letters. 

  EMAIL:
  - Must not be empty and must be in valid email format.

  PHONE NUMBER:
  - Must not be empty.
  - Must contain at least 8-15 digits, only digits are allowed

  RESTAURANT SELECTION:
  - A restaurant must be chosen from the dropdown.

  RESERVATION DATE:
  - Must not be empty.
  - Must not be in the past (compared using JavaScript Date objects (selectedData < today))

  RESERVATION TIME:
  - Must not be empty.

  NUMBER OF PEOPLE:
  - Must not be empty.
  - Must be greater than 0.

  PAYMENT METHOD:
  - Must select either Voucher or Online Payment.
  - If Online Payment is selected:
    → Credit card number must not be empty.
    → Must contain only digits.
    → Must be exactly 16 digits (Visa/Mastercard) or 15 digits (Amex).
    → Voucher field will be hidden.
  - If Voucher is selected:
    → The voucher code field is shown but not validated
    → The credit card field is hidden and cleared.

  BILLING EMAIL:
  - Must not be empty.
  - Must be in valid email format.
  - Can be auto-filled by clicking "Same as email address" checkbox,
    which copies the main email field's value into this field.
  - But user must unclick on the "Same as email address" checkbox and re-click
    again if user has changed their email address on the top email address field 
    to match the same email address again. 

3.3 RECOMMENDATION LOGIC (recommend.html) 

The getRecommendation() function uses a scoring system:
- Each restaurant is compared to the user's selections.
- Dietary match = +2 points (most important).
- Budget match = +2 points.
- Dining purpose match = +1 point.
- The restaurant with the highest total score is recommended.
- The result is displayed below the form without reloading the page.
- The "Reserve This Restaurant" button passes the restaurant name to
  reservation.html via a URL parameter: ?restaurant=Name
- restaurant details will then prefill in reservations.html when user 
  click on "Reserve This Restaurant".

3.4 DYNAMIC FEATURES 

Deposit Update (updateDeposit()):
  When the user changes the restaurant dropdown on reservation.html,
  the deposit amount shown in the "Deposit Amount" field automatically
  updates to match that restaurant's predefined deposit.

Show/Hide Payment Fields (showPaymentFields()):
  When the user selects "Voucher", a voucher code input appears.
  When the user selects "Online Payment", a credit card input appears.
  The other field is hidden and cleared automatically.

Pre-fill Restaurant (prefillRestaurantFromURL()):
  If a user arrives at reservation.html via a "Reserve Now" button on
  another page, the URL contains the restaurant name as a parameter.
  JavaScript reads this and automatically selects the correct restaurant
  in the dropdown and updates the deposit amount.

Copy Email (copyEmail()):
  When the "Same as email address" checkbox is ticked, the billing
  email field is automatically filled with the main email address and
  locked to prevent editing.

Show Password/Hide Password(togglePasswordVisibility()):
  While user input password in reservation.html and wanted to get it check
  before proceeding, user can simply click on show password button next to it 
  and the password will be visible in plain text to user. At the same time While
  user is done checking on their password with plain text, user could simply click on 
  hide password and password will be mask.  


4. KNOWN ISSUES / LIMITATIONS


- Images used are placeholder filenames. Real images must be added
  to the /images/ folder for the site to display correctly.
- The recommendation engine uses simple scoring and may suggest
  a restaurant that is not a perfect match for all criteria.
- No back-end or database is used. The registration form submits to
  the Swinburne test server at:
  http://mercury.swin.edu.au/it000000/cos10005/regtest.php
- All card numbers used for testing are fake. No real payment
  processing is performed.
- bill.html was not created and implemented. 


5. REFERENCES

All images used on this website are either original or sourced from:
- Unsplash (https://unsplash.com) – free to use under Unsplash License
  - diningroom.jpg - Photo by set.sj on Unspalsh - https://unsplash.com/s/photos/restaurant-dining-room
  - pasta.jpg – Photo by Ryan "O" Neil on Unsplash -https://unsplash.com/s/photos/aglio-olio
  - cendol.jpg - Photo by Aiman Baser on Unsplash - https://unsplash.com/s/photos/cendol
  - japanese.jpg - Photo by Anthony Espinosa on Unsplash - https://unsplash.com/photos/sushi-on-brown-wooden-tray-InCMGusiAvA
  - indian.jpg - Photo by Shree Iyer on Unsplash - https://unsplash.com/photos/stainless-steel-fork-on-brown-ceramic-plate-T14gLyoywmk
  - chinese cuisine.jpg - Photo by Tommao Wong on Unsplash - https://unsplash.com/photos/two-dishes-of-asian-food-on-a-table-ijx5tcp2lIg
  - greek.jpg - Photo by Markus Winkler on Unsplash - https://unsplash.com/photos/grilled-meat-with-sliced-tomato-and-green-vegetable-on-white-ceramic-plate-WHtVB-RiW2I



All HTML, CSS, and JavaScript code is original work written by the student.

