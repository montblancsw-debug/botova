/* ====================================================== */
/*         PLATFORM PAGES / PAGES DES PLATEFORMES         */
/* ====================================================== */

import { loadHtmlComponents } from "../components/html-loader.js";
import { initializeNavigation } from "../navigation.js";
import { initializeDropdowns } from "../dropdown.js";

/* ====================================================== */
/*          ACTIVE PLATFORM / PLATEFORME ACTIVE           */
/* ====================================================== */

function initializePlatformMenu()
{
    const currentPlatform = document.body.dataset.platform;
    const botsNavigationLink = document.querySelector('[data-navigation-page="bots"]');
    const botsFooterLink = document.querySelector("[data-footer-bots]");
    const platformLinks = document.querySelectorAll("[data-slide-select]");

    // Highlight Bots navigation / Mettre en valeur le menu Bots
    if (botsNavigationLink !== null)
    {
        botsNavigationLink.classList.add("is-active");
        botsNavigationLink.setAttribute("aria-current", "page");
    }

    // Highlight Bots footer link / Mettre en valeur Bots dans le footer
    if (botsFooterLink !== null)
    {
        botsFooterLink.classList.add("footer-active");
    }

    // Select current platform / Selectionner la plateforme actuelle
    for (const platformLink of platformLinks)
    {
        const platformName = platformLink.dataset.slideSelect;

        if (platformName === currentPlatform)
        {
            platformLink.classList.add("is-current");
            platformLink.setAttribute("aria-current", "page");
        }
        else
        {
            platformLink.classList.remove("is-current");
            platformLink.removeAttribute("aria-current");
        }
    }
}

/* ====================================================== */
/*          PAGE STARTUP / DEMARRAGE DE LA PAGE           */
/* ====================================================== */

async function initializePage()
{
    try
    {
        // Load shared HTML / Charger les composants HTML communs
        await loadHtmlComponents();

        // Initialize navigation / Initialiser la navigation
        initializeNavigation();
        initializeDropdowns();

        // Select current platform / Selectionner la plateforme actuelle
        initializePlatformMenu();
    }
    catch (error)
    {
        console.error("Erreur de chargement de la plateforme :", error);
    }
}

initializePage();