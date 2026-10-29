/* ====================================================== */
/*              ACCOUNT PAGE / PAGE DU COMPTE             */
/* ====================================================== */

import { loadHtmlComponents } from "../components/html-loader.js";
import { initializeNavigation } from "../navigation.js";
import { initializeDropdowns } from "../dropdown.js";
import { initializeAccountForms } from "./account-forms.js";

/* ====================================================== */
/*                ACCOUNT MENU / MENU COMPTE              */
/* ====================================================== */

function initializeAccountMenu()
{
    const currentPage = document.body.dataset.accountPage;
    const guestEntries = document.querySelectorAll("[data-account-guest]");
    const profileEntries = document.querySelectorAll("[data-account-profile]");
    const accountLinks = document.querySelectorAll("[data-account-link]");
    const profileIsOpen = currentPage === "profile";

    for (const entry of guestEntries)
    {
        entry.hidden = profileIsOpen;
    }

    for (const entry of profileEntries)
    {
        entry.hidden = !profileIsOpen;
    }

    for (const accountLink of accountLinks)
    {
        accountLink.classList.remove("is-current");
        accountLink.removeAttribute("aria-current");

        if (accountLink.dataset.accountLink === currentPage)
        {
            accountLink.classList.add("is-current");
            accountLink.setAttribute("aria-current", "page");
        }
    }
}

/* ====================================================== */
/*             PROFILE DETAILS / DETAILS DU PROFIL        */
/* ====================================================== */

function initializeProfile()
{
    if (document.body.dataset.accountPage !== "profile")
    {
        return;
    }

    const profileEmail = document.querySelector("[data-profile-email]");
    const profileIdentifier = document.querySelector("[data-profile-identifier]");

    let savedEmail = "";

    try
    {
        savedEmail = sessionStorage.getItem("botova-demo-email") || "";
    }
    catch (error)
    {
        savedEmail = "";
    }

    if (savedEmail === "")
    {
        return;
    }

    if (profileEmail !== null)
    {
        profileEmail.textContent = savedEmail;
    }

    if (profileIdentifier !== null)
    {
        profileIdentifier.textContent = savedEmail.split("@")[0];
    }
}

/* ====================================================== */
/*             PAGE STARTUP / DEMARRAGE DE LA PAGE        */
/* ====================================================== */

async function initializePage()
{
    try
    {
        // Load components / Charger les composants
        await loadHtmlComponents();

        // Initialize menus / Initialiser les menus
        initializeNavigation();
        initializeDropdowns();
        initializeAccountMenu();

        // Initialize forms and profile / Initialiser les formulaires et le profil
        initializeAccountForms();
        initializeProfile();
    }
    catch (error)
    {
        console.error("Erreur de chargement de la page Compte :", error);
    }
}

initializePage();