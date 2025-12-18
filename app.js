document.addEventListener('DOMContentLoaded', function() {
    // Calculate and display age
    const dobInput = document.getElementById('dob');
    const ageDisplay = document.getElementById('ageDisplay');

    dobInput.addEventListener('change', function() {
        const dob = new Date(this.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (isNaN(age)) {
            ageDisplay.innerHTML = '';
        } else {
            ageDisplay.innerHTML = `<strong>Age:</strong> ${age} years`;
        }
    });

    // Calculate length of stay
    const hospDateInput = document.getElementById('hospitalization');
    const dischargeDateInput = document.getElementById('dischargeDate');
    const stayInput = document.getElementById('hospitalizationLength');

    function updateLengthOfStay() {
        const hospDate = hospDateInput.value;
        const discDate = dischargeDateInput.value;
        
        if (hospDate && discDate) {
            const admission = new Date(hospDate);
            const discharge = new Date(discDate);
            const diffTime = Math.abs(discharge - admission);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            stayInput.value = diffDays;
        }
    }

    hospDateInput.addEventListener('change', updateLengthOfStay);
    dischargeDateInput.addEventListener('change', updateLengthOfStay);

    // Form submission
    const acsForm = document.getElementById('acsForm');
    const alertDiv = document.getElementById('alert');

    acsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const requiredFields = ['mrNumber', 'patientName', 'dob', 'gender', 'hospitalization'];
        let isValid = true;
        
        for (const field of requiredFields) {
            if (!document.getElementById(field).value) {
                isValid = false;
                break;
            }
        }
        
        const acsTypeSelected = document.querySelector('input[name="acsType"]:checked');
        
        if (!isValid) {
            alertDiv.className = 'alert alert-error show';
            alertDiv.textContent = '⚠️ Please fill in all required fields (marked with *)';
            return;
        }
        
        if (!acsTypeSelected) {
            alertDiv.className = 'alert alert-error show';
            alertDiv.textContent = '⚠️ Please select ACS Type';
            return;
        }
        
        // Success
        alertDiv.className = 'alert alert-success show';
        alertDiv.textContent = '✓ Registry entry saved successfully!';
        window.scrollTo({top: 0, behavior: 'smooth'});
        
        console.log('Form Data:', Object.fromEntries(new FormData(this)));
    });

    // Reset alert on interaction
    acsForm.addEventListener('change', function() {
        if (alertDiv.classList.contains('show') && !alertDiv.classList.contains('alert-success')) {
            alertDiv.classList.remove('show');
        }
    });
});
