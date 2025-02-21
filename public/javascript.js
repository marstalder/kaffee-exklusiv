
//Modal Newsletter
document.addEventListener('DOMContentLoaded', function() {
            var modal = document.getElementById('newsletter-modal');
            var closeButton = modal.querySelector('.close');
            var hasSeenModal = localStorage.getItem('hasSeenNewsletterModal');
    
            if (!hasSeenModal) {
                // Zeige den Modal nach 5 Sekunden an, wenn er noch nicht gesehen wurde
                setTimeout(function() {
                    modal.style.display = 'block';
                    // Setze den Local Storage Wert
                    localStorage.setItem('hasSeenNewsletterModal', 'true');
                }, 5000);
            }
    
            // Schließe den Modal, wenn auf das X geklickt wird
            closeButton.onclick = function() {
                modal.style.display = 'none';
            }
    
            // Schließe den Modal, wenn außerhalb des Modals geklickt wird
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        });

        /*Dropdown Funktionalität*/
        document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    const dropdownIcon = document.querySelector('.dropdown-icon');
    const hasDropdown = document.querySelector('.has-dropdown');
    
    function toggleDropdown() {
        dropdown.classList.toggle('show');
        dropdownIcon.textContent = dropdown.classList.contains('show') ? '▲' : '▼';
        dropdownToggle.setAttribute('aria-expanded', dropdown.classList.contains('show'));
    }

    function closeDropdown() {
        dropdown.classList.remove('show');
        dropdownIcon.textContent = '▼';
        dropdownToggle.setAttribute('aria-expanded', 'false');
    }

    // Toggle dropdown on click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDropdown();
    });

    // Close dropdown when moving mouse away
    hasDropdown.addEventListener('mouseleave', function() {
        closeDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
            closeDropdown();
        }
    });

    // Close dropdown with Esc key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dropdown.classList.contains('show')) {
            closeDropdown();
        }
    });

    // Handle keyboard navigation within the dropdown
    dropdown.addEventListener('keydown', function(e) {
        const focusableElements = dropdown.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });

    // If we're on the events page, make sure the dropdown stays open if it's supposed to be
    if (eventsLink && eventsLink.classList.contains('active')) {
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('dropdown') === 'open') {
            dropdownToggle.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('show');
            dropdownToggle.querySelector('.dropdown-icon').style.transform = 'rotate(180deg)';
        }
    }
});

// JavaScript für die Tab-Funktionalität auf der Food and Drinks Seite
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabList = document.querySelector('[role="tablist"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    function initTabs() {
        const activeTab = document.querySelector('[role="tab"]') || tabs[0];
        activateTab(activeTab, false);
    }

    tabList.addEventListener('click', changeTabOnClick);
    tabList.addEventListener('keydown', changeTabOnKeyPress);

    function changeTabOnClick(e) {
        const targetTab = e.target.closest('[role="tab"]');
        if (!targetTab) return;
        
        activateTab(targetTab);
    }

    function changeTabOnKeyPress(e) {
        const targetTab = e.target.closest('[role="tab"]');
        if (!targetTab) return;

        const tabsArray = Array.from(tabs);
        const index = tabsArray.indexOf(targetTab);

        let newTab;
        switch (e.key) {
            case 'ArrowLeft':
                newTab = tabsArray[index - 1] || tabsArray[tabsArray.length - 1];
                activateTab(newTab);
                break;
            case 'ArrowRight':
                newTab = tabsArray[index + 1] || tabsArray[0];
                activateTab(newTab);
                break;
            case 'Home':
                newTab = tabsArray[0];
                activateTab(newTab);
                break;
            case 'End':
                newTab = tabsArray[tabsArray.length - 1];
                activateTab(newTab);
                break;
            default:
                return;
        }
        e.preventDefault();
    }

    function activateTab(tab, setFocus = true) {
        // Deaktiviere alle Tabs
        tabs.forEach(t => {
            t.setAttribute('tabindex', '-1');
            t.removeAttribute('aria-selected');
        });

        // Verstecke alle Panels
        tabPanels.forEach(panel => {
            panel.hidden = true;
            panel.classList.remove('active');
        });

        // Aktiviere den ausgewählten Tab
        tab.setAttribute('tabindex', '0');
        // Den aktiven Tab für Browser als selected markieren, aber aria-selected weglassen
        tab.setAttribute('selected', '');
        
        if (setFocus) {
            tab.focus();
        }

        // Zeige das zugehörige Panel
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        panel.hidden = false;
        panel.classList.add('active');
    }

    initTabs();
});

// Akkordeon-Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = document.getElementById(this.getAttribute('aria-controls'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-hidden', isExpanded);
            // Schließe andere geöffnete Panels
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    const otherContent = document.getElementById(otherHeader.getAttribute('aria-controls'));
                    otherHeader.setAttribute('aria-expanded', 'false');
                    otherContent.setAttribute('aria-hidden', 'true');
                }
            });
        });
    });
});

//Reservierungsformulare
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('event-formular').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vielen Dank für Ihre Event-Anmeldung! Wir werden uns bald bei Ihnen melden.');
    });

    document.getElementById('vermietung-formular').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Vielen Dank für Ihre Vermietungsanfrage! Wir werden uns bald bei Ihnen melden, um die Details zu besprechen.');
    });
});

// Event-Formular Setup
document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-formular');
    if (eventForm) {
        const inputs = eventForm.querySelectorAll('input, select, textarea');
        const submitButton = eventForm.querySelector('.submit-button');
        const requiredFields = ['event', 'name', 'email', 'persons'];

        // Deaktiviere die Standard-Formularverarbeitung komplett
        eventForm.onsubmit = function(e) {
            e.preventDefault();
            return false;
        };

        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        // Nutze Click-Event des Submit-Buttons
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isValid = validateForm();
            
            if (isValid) {
                alert('Vielen Dank für Ihre Event-Anmeldung! Wir werden uns bald bei Ihnen melden.');
                eventForm.reset();
            } else {
                submitButton.focus();
            }
            
            return false;
        });

        function validateField(field) {
            const errorElement = document.getElementById(`${field.id}-error`);
            if (!errorElement) return true;

            let isValid = true;
            let errorMessage = '';

            if (requiredFields.includes(field.id) && !field.value.trim()) {
                isValid = false;
                errorMessage = 'Feld ist erforderlich.';
            } else if (field.type === 'email' && field.value.trim() !== '') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
                }
            }

            field.setAttribute('aria-invalid', !isValid);
            errorElement.textContent = errorMessage;
            
            return isValid;
        }

        function validateForm() {
            let isValid = true;
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    const fieldIsValid = validateField(field);
                    if (!fieldIsValid) {
                        isValid = false;
                    }
                }
            });

            return isValid;
        }
    }




    // Vermietungs-Formular Setup
    const vermietungForm = document.getElementById('vermietung-formular');
    if (vermietungForm) {
        // Füge ein div für die Fehlermeldung am Ende des Formulars hinzu
        const errorContainer = document.createElement('div');
        errorContainer.id = 'form-error-container-vermietung';
        errorContainer.setAttribute('role', 'alert');
        errorContainer.setAttribute('aria-live', 'polite');
        errorContainer.classList.add('error-container');
        vermietungForm.appendChild(errorContainer);

        const mietInputs = vermietungForm.querySelectorAll('input, select, textarea');
        mietInputs.forEach(input => {
            if (input.required) {
                input.setAttribute('aria-required', 'true');
            }
        });

        vermietungForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const errorContainer = this.querySelector('#form-error-container-vermietung');
            
            if (validateMietForm(mietInputs)) {
                errorContainer.textContent = '';
                alert('Vielen Dank für Ihre Vermietungsanfrage! Wir werden uns bald bei Ihnen melden.');
                vermietungForm.reset();
            } else {
                errorContainer.textContent = 'Bitte füllen Sie alle erforderlichen Felder korrekt aus.';
                errorContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    function validateMietForm(inputs) {
        let isValid = true;
        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                isValid = false;
                input.setAttribute('aria-invalid', 'true');
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                isValid = false;
                input.setAttribute('aria-invalid', 'true');
            } else {
                input.setAttribute('aria-invalid', 'false');
            }
        });
        return isValid;
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

// Funktion für den Sprachwechsler
document.addEventListener('DOMContentLoaded', function() {
    const languageButton = document.querySelector('.language-button');
    const languageDropdown = document.getElementById('language-dropdown');

    // Toggle Dropdown beim Klicken des Buttons
    languageButton.addEventListener('click', function() {
        const isExpanded = languageButton.getAttribute('aria-expanded') === 'true';
        languageButton.setAttribute('aria-expanded', !isExpanded);
    });

    // Schließe Dropdown wenn außerhalb geklickt wird
    document.addEventListener('click', function(event) {
        if (!languageButton.contains(event.target)) {
            languageButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Tastatur-Navigation
    languageButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            languageButton.click();
        }
    });
});

// Kalender
document.addEventListener('DOMContentLoaded', function() {
    const events = [
        { name: 'Jazz-Abend mit Trio Swing', date: '15. Mai 2024', capacity: 85 },
        { name: 'Lesung: "Kaffeehaus-Geschichten"', date: '22. Mai 2024', capacity: 45 },
        { name: 'Latte Art Workshop', date: '5. Juni 2024', capacity: 0 }
    ];

    const availabilityList = document.querySelector('.availability-list');

    events.forEach(event => {
        let availabilityClass, availabilityText;
        
        if (event.capacity >= 75) {
            availabilityClass = 'high';
            availabilityText = '';
        } else if (event.capacity >= 50) {
            availabilityClass = 'medium';
            availabilityText = '';
        } else if (event.capacity > 0) {
            availabilityClass = 'low';
            availabilityText = '';
        } else {
            availabilityClass = 'full';
            availabilityText = '';
        }

        const item = document.createElement('div');
        item.className = `availability-item ${availabilityClass}`;
        item.setAttribute('role', 'listitem');
        item.innerHTML = `
            <div>
                <strong>${event.name}</strong><br>
                <small>${event.date}</small>
            </div>
            <div>${availabilityText}</div>
        `;
        
        availabilityList.appendChild(item);
    });
});