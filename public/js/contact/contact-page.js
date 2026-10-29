/* ====================================================== */
/*           CONTACT PAGE / PAGE DE CONTACT               */
/* ====================================================== */

import { loadHtmlComponents } from "../components/html-loader.js";
import { initializeNavigation } from "../navigation.js";
import { initializeDropdowns } from "../dropdown.js";
import { initializeContactForm } from "./contact-form.js";

/* ====================================================== */
/*          PAGE STARTUP / DEMARRAGE DE LA PAGE           */
/* ====================================================== */

async function initializePage()
{
    try
    {
        // Load shared components / Charger les composants communs
        await loadHtmlComponents();

        // Initialize navigation / Initialiser la navigation
        initializeNavigation();
        initializeDropdowns();

        // Initialize contact form / Initialiser le formulaire
        initializeContactForm();
    }
    catch (error)
    {
        console.error("Erreur de chargement de la page Contact :", error);
    }
}

initializePage();