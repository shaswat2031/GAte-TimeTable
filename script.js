
        // Function to calculate and update the progress bar and summary
        function updateProgressBar() {
            const checkboxes = document.querySelectorAll('.checkbox input');
            const totalCheckboxes = checkboxes.length;
            const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

            // Calculate progress percentage
            const progressPercentage = Math.round((checkedCheckboxes / totalCheckboxes) * 100);

            // Update progress bar width
            document.getElementById('progress-bar').style.width = progressPercentage + '%';

            // Update progress summary text
            document.getElementById('progress-summary').textContent =
                `Completed: ${checkedCheckboxes}/${totalCheckboxes} (${progressPercentage}%)`;
        }

        // Function to save checkbox states to local storage
        function saveCheckboxStates() {
            const checkboxes = document.querySelectorAll('.checkbox input');
            const checkboxStates = {};
            checkboxes.forEach(checkbox => {
                checkboxStates[checkbox.id] = checkbox.checked; // Save id and state
            });
            // Store in localStorage
            localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));

            // Update progress bar after saving states
            updateProgressBar();
        }

        // Function to load checkbox states from local storage
        function loadCheckboxStates() {
            const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
            const checkboxes = document.querySelectorAll('.checkbox input');
            checkboxes.forEach(checkbox => {
                if (checkbox.id in checkboxStates) {
                    checkbox.checked = checkboxStates[checkbox.id];
                }
            });

            // Update progress bar after loading states
            updateProgressBar();
        }

        // Add event listeners to save state and update progress on change
        document.addEventListener('DOMContentLoaded', () => {
            loadCheckboxStates();
            const checkboxes = document.querySelectorAll('.checkbox input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', saveCheckboxStates);
            });
        });