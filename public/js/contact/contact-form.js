/* ====================================================== */
/*        CONTACT FORM / FORMULAIRE DE CONTACT            */
/* ====================================================== */

export function initializeContactForm()
{
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("contact-form-status");

    if (contactForm === null || formStatus === null)
    {
        return;
    }

    const requiredFields = contactForm.querySelectorAll("[required]");
    const emailPattern = /^[^\s@]+@[^.\s@]+(?:\.[^.\s@]+)*\.[a-zA-Z]{2,}$/;

    // Clear previous message / Effacer le message precedent
    function clearStatus()
    {
        formStatus.hidden = true;
        formStatus.textContent = "";
        formStatus.classList.remove("is-error", "is-success");
    }

    // Show a message / Afficher un message
    function showStatus(message, statusClass)
    {
        formStatus.textContent = message;
        formStatus.classList.remove("is-error", "is-success");
        formStatus.classList.add(statusClass);
        formStatus.hidden = false;
    }

    /* ====================================================== */
    /*         FIELD VALIDATION / VALIDATION DES CHAMPS       */
    /* ====================================================== */

    // Reset validation / Reinitialiser la validation
    for (const field of requiredFields)
    {
        field.addEventListener("input", function()
        {
            field.setCustomValidity("");
            clearStatus();
        });
    }

    // Check required fields / Verifier les champs obligatoires
    function validateField(field)
    {
        field.value = field.value.trim();
        field.setCustomValidity("");

        if (field.value === "")
        {
            field.setCustomValidity("Veuillez remplir ce champ.");
            return false;
        }

        // Check email domain / Verifier le domaine de l'adresse e-mail
        if (field.type === "email" && !emailPattern.test(field.value))
        {
            field.setCustomValidity("Adresse e-mail invalide. Ajoutez un domaine valide comme .fr, .com ou .net.");
            return false;
        }

        return field.checkValidity();
    }

    /* ====================================================== */
    /*          FORM SUBMISSION / ENVOI DU FORMULAIRE         */
    /* ====================================================== */

    // Validate form / Valider le formulaire
    contactForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        let firstInvalidField = null;

        for (const field of requiredFields)
        {
            const fieldIsValid = validateField(field);

            if (!fieldIsValid && firstInvalidField === null)
            {
                firstInvalidField = field;
            }
        }

        if (firstInvalidField !== null)
        {
            showStatus(firstInvalidField.validationMessage, "is-error");

            firstInvalidField.focus();
            firstInvalidField.reportValidity();
            return;
        }

        // Demo confirmation / Confirmation de demonstration
        showStatus("Formulaire Vérifié et transmit.", "is-success");

        formStatus.focus();
    });
}