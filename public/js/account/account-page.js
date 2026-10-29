/* ====================================================== */
/*             ACCOUNT PAGE / PAGE DU COMPTE              */
/* ====================================================== */

import { loadHtmlComponents } from "../components/html-loader.js";
import { initializeNavigation, isDemoConnected, getDemoAccount } from "../navigation.js";
import { initializeDropdowns } from "../dropdown.js";
import { initializeAccountForms } from "./account-forms.js";

/* ====================================================== */
/*          PROFILE DETAILS / DETAILS DU PROFIL           */
/* ====================================================== */

function initializeProfile()
{
    if (document.body.dataset.accountPage !== "profile")
    {
        return;
    }

    const profileEmail = document.querySelector("[data-profile-email]");
    const profileIdentifier = document.querySelector("[data-profile-identifier]");
    const profileFirstName = document.querySelector("[data-profile-first-name]");
    const profileLastName = document.querySelector("[data-profile-last-name]");

    let savedEmail = "";

    try
    {
        savedEmail = sessionStorage.getItem("botova-demo-email") || "";
    }
    catch (error)
    {
        return;
    }

    const account = getDemoAccount(savedEmail);

    if (account === null)
    {
        return;
    }

    // Show profile details / Afficher les informations du profil
    if (profileEmail !== null)
    {
        profileEmail.textContent = account.email;
    }

    if (profileIdentifier !== null)
    {
        profileIdentifier.textContent = account.email.split("@")[0];
    }

    if (profileFirstName !== null)
    {
        profileFirstName.textContent = account.firstName;
    }

    if (profileLastName !== null)
    {
        profileLastName.textContent = account.lastName;
    }
}

/* ====================================================== */
/*           ACCOUNT MESSAGES / MESSAGES COMPTE           */
/* ====================================================== */

function displayAccountNotice()
{
    const currentPage = document.body.dataset.accountPage;
    const formStatus = document.querySelector("[data-account-status]");

    if (formStatus === null)
    {
        return;
    }

    let notice = "";

    try
    {
        notice = sessionStorage.getItem("botova-demo-notice") || "";
        sessionStorage.removeItem("botova-demo-notice");
    }
    catch (error)
    {
        return;
    }

    if (currentPage === "profile" && notice === "register")
    {
        formStatus.textContent = "Compte créé avec succès. Vous êtes connecté.";
        formStatus.classList.add("is-success");
    }
    else if (currentPage === "profile" && notice === "login")
    {
        formStatus.textContent = "Connexion réussie.";
        formStatus.classList.add("is-success");
    }
    else if (currentPage === "login" && notice === "logout")
    {
        formStatus.textContent = "Déconnexion réussie.";
        formStatus.classList.add("is-success");
    }
    else if (currentPage === "login" && notice === "login-required")
    {
        formStatus.textContent = "Veuillez vous connecter pour accéder à votre profil.";
        formStatus.classList.add("is-error");
    }
    else
    {
        return;
    }

    formStatus.hidden = false;
}

/* ====================================================== */
/*          PAGE STARTUP / DEMARRAGE DE LA PAGE           */
/* ====================================================== */

async function initializePage()
{
    try
    {
        // Check profile access / Verifier l'acces au profil
        if (document.body.dataset.accountPage === "profile" && !isDemoConnected())
        {
            try
            {
                sessionStorage.setItem("botova-demo-notice", "login-required");
            }
            catch (error)
            {
                console.warn("La session du navigateur n'est pas disponible.");
            }

            window.location.replace(new URL("../", window.location.href).href);
            return;
        }

        // Load components / Charger les composants
        await loadHtmlComponents();

        // Initialize menus / Initialiser les menus
        initializeNavigation();
        initializeDropdowns();

        // Initialize forms and profile / Initialiser les formulaires et le profil
        initializeAccountForms();
        initializeProfile();
        displayAccountNotice();
    }
    catch (error)
    {
        console.error("Erreur de chargement de la page Compte :", error);
    }
}

initializePage();