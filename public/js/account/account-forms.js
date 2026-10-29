/* ====================================================== */
/*           ACCOUNT FORMS / FORMULAIRES COMPTE           */
/* ====================================================== */

import { getDemoAccounts, getDemoAccount } from "../navigation.js";

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
    const requiredFields = accountForm.querySelectorAll("[required]");
    const emailPattern = /^[^\s@]+@[^.\s@]+(?:\.[^.\s@]+)*\.[a-zA-Z]{2,}$/;
    const isRegistration = accountForm.dataset.accountForm === "register";

    let isSubmitting = false;

    if (emailField === null || passwordField === null || formStatus === null)
    {
        return;
    }

    /* ====================================================== */
    /*          FORM MESSAGES / MESSAGES FORMULAIRE           */
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
    /*           FIELD CHECKS / CONTROLE DES CHAMPS           */
    /* ====================================================== */

    function validateField(field)
    {
        field.setCustomValidity("");

        if (field.type !== "password")
        {
            field.value = field.value.trim();
        }

        if (field.value === "")
        {
            field.setCustomValidity("Veuillez remplir ce champ.");
        }
        else if (field.type === "email" && !emailPattern.test(field.value))
        {
            field.setCustomValidity("Saisissez une adresse e-mail valide, avec un domaine comme .fr ou .com.");
        }
        else if (field.type === "password" && field.value.length < 8)
        {
            field.setCustomValidity("Le mot de passe doit contenir au moins 8 caractères.");
        }

        return field.checkValidity();
    }

    // Clear errors / Effacer les erreurs
    for (const field of requiredFields)
    {
        field.addEventListener("input", function()
        {
            field.setCustomValidity("");
            clearStatus();
        });
    }

    /* ====================================================== */
    /*            PASSWORD CHECK / CONTROLE DU MOT DE PASSE   */
    /* ====================================================== */

    function generateSalt()
    {
        const randomValues = crypto.getRandomValues(new Uint8Array(16));

        return Array.from(randomValues, function(value)
        {
            return value.toString(16).padStart(2, "0");
        }).join("");
    }

    async function hashPassword(password, salt)
    {
        const passwordBytes = new TextEncoder().encode(salt + ":" + password);
        const passwordHash = await crypto.subtle.digest("SHA-256", passwordBytes);

        return Array.from(new Uint8Array(passwordHash), function(value)
        {
            return value.toString(16).padStart(2, "0");
        }).join("");
    }

    /* ====================================================== */
    /*        FORM SUBMISSION / VALIDATION FORMULAIRE         */
    /* ====================================================== */

    accountForm.addEventListener("submit", async function(event)
    {
        event.preventDefault();

        if (isSubmitting)
        {
            return;
        }

        let firstInvalidField = null;

        for (const field of requiredFields)
        {
            if (!validateField(field) && firstInvalidField === null)
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

        const email = emailField.value.toLowerCase();
        const existingAccount = getDemoAccount(email);

        // Check account existence / Verifier si le compte existe
        if (!isRegistration && existingAccount === null)
        {
            showStatus("Connexion impossible, compte inexistant. Veuillez vous inscrire.", "is-error");
            emailField.focus();
            return;
        }

        if (isRegistration && existingAccount !== null)
        {
            showStatus("Cette adresse e-mail possède déjà un compte. Veuillez vous connecter.", "is-error");
            emailField.focus();
            return;
        }

        isSubmitting = true;

        try
        {
            if (isRegistration)
            {
                // Create account / Creer le compte fictif
                const firstNameField = accountForm.querySelector('input[name="firstName"]');
                const lastNameField = accountForm.querySelector('input[name="lastName"]');
                const accounts = getDemoAccounts();
                const salt = generateSalt();
                const passwordHash = await hashPassword(passwordField.value, salt);

                accounts.push(
                {
                    email: email,
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
                    salt: salt,
                    passwordHash: passwordHash
                });

                localStorage.setItem("botova-demo-accounts", JSON.stringify(accounts));
            }
            else
            {
                // Check password / Verifier le mot de passe
                const passwordHash = await hashPassword(passwordField.value, existingAccount.salt);

                if (passwordHash !== existingAccount.passwordHash)
                {
                    showStatus("Connexion impossible, mot de passe incorrect.", "is-error");
                    passwordField.focus();
                    return;
                }
            }

            // Open the session / Ouvrir la session fictive
            sessionStorage.setItem("botova-demo-email", email);
            sessionStorage.setItem("botova-demo-connected", "true");
            sessionStorage.setItem("botova-demo-notice", isRegistration ? "register" : "login");

            // Clear password / Effacer le mot de passe
            passwordField.value = "";

            // Open profile / Ouvrir le profil
            const profilePath = isRegistration ? "../profile/" : "profile/";
            window.location.assign(new URL(profilePath, window.location.href).href);
        }
        catch (error)
        {
            showStatus("Impossible d'enregistrer le compte ou d'ouvrir la session sur ce navigateur.", "is-error");
        }
        finally
        {
            isSubmitting = false;
        }
    });
}