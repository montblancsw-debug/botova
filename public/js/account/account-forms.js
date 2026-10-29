/* ====================================================== */
/*            ACCOUNT FORMS / FORMULAIRES COMPTE          */
/* ====================================================== */

export function initializeAccountForms()
{
    const accountForm = document.querySelector("[data-account-form]");

    if (accountForm === null)
    {
        return;
    }

    const emailField = accountForm.querySelector('input[name="email"]');
    const passwordField = accountForm.querySelector('input[name="password"]');
    const formStatus = accountForm.querySelector("[data-account-status]");
    const emailPattern = /^[^\s@]+@[^.\s@]+(?:\.[^.\s@]+)*\.[a-zA-Z]{2,}$/;

    if (emailField === null || passwordField === null || formStatus === null)
    {
        return;
    }

    /* ====================================================== */
    /*              FORM MESSAGES / MESSAGES FORMULAIRE       */
    /* ====================================================== */

    function clearStatus()
    {
        formStatus.hidden = true;
        formStatus.textContent = "";
        formStatus.classList.remove("is-error", "is-success");
    }

    function showStatus(message, statusClass)
    {
        formStatus.textContent = message;
        formStatus.classList.remove("is-error", "is-success");
        formStatus.classList.add(statusClass);
        formStatus.hidden = false;
    }

    /* ====================================================== */
    /*             FIELD CHECKS / CONTROLE DES CHAMPS         */
    /* ====================================================== */

    function validateEmail()
    {
        emailField.value = emailField.value.trim();
        emailField.setCustomValidity("");

        if (emailField.value === "")
        {
            emailField.setCustomValidity("Veuillez saisir votre adresse e-mail.");
        }
        else if (!emailPattern.test(emailField.value))
        {
            emailField.setCustomValidity("Saisissez une adresse e-mail valide, avec un domaine comme .fr ou .com.");
        }

        return emailField.checkValidity();
    }

    function validatePassword()
    {
        passwordField.setCustomValidity("");

        if (passwordField.value === "")
        {
            passwordField.setCustomValidity("Veuillez saisir votre mot de passe.");
        }
        else if (passwordField.value.length < 8)
        {
            passwordField.setCustomValidity("Le mot de passe doit contenir au moins 8 caractères.");
        }

        return passwordField.checkValidity();
    }

    // Clear errors / Effacer les erreurs
    emailField.addEventListener("input", function()
    {
        emailField.setCustomValidity("");
        clearStatus();
    });

    passwordField.addEventListener("input", function()
    {
        passwordField.setCustomValidity("");
        clearStatus();
    });

    /* ====================================================== */
    /*           FORM SUBMISSION / VALIDATION FORMULAIRE      */
    /* ====================================================== */

    accountForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        const emailIsValid = validateEmail();
        const passwordIsValid = validatePassword();

        if (!emailIsValid || !passwordIsValid)
        {
            const invalidField = !emailIsValid ? emailField : passwordField;

            showStatus(invalidField.validationMessage, "is-error");
            invalidField.focus();
            invalidField.reportValidity();
            return;
        }

        // Save demo email / Conserver l'e-mail de demonstration
        try
        {
            sessionStorage.setItem("botova-demo-email", emailField.value);
        }
        catch (error)
        {
            console.warn("La session du navigateur n'est pas disponible.");
        }

        if (accountForm.dataset.accountForm === "register")
        {
            showStatus("Compte créé avec succès.", "is-success");
        }
        else
        {
            showStatus("Connexion réussie.", "is-success");
        }

        // Clear password / Effacer le mot de passe
        passwordField.value = "";
        formStatus.focus();
    });
}