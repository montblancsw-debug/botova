/* ====================================================== */
/*           BOTS PAGE / INITIALISATION DES BOTS          */
/* ====================================================== */

import { loadHtmlComponents } from "../components/html-loader.js";
import { initializeNavigation } from "../navigation.js";
import { initializeDropdowns } from "../dropdown.js";
import { initializeAnchors } from "../anchors.js";
import { initializeBotsPanels } from "./bots-panels.js";
import { initializeBotsCarousel } from "./bots-carousel.js";

/* ====================================================== */
/*             PAGE STARTUP / DEMARRAGE DE LA PAGE        */
/* ====================================================== */

async function initializePage()
{
    try
    {
        // Load HTML components / Charger les composants HTML
        await loadHtmlComponents();

        // Initialize navigation / Initialiser la navigation
        initializeNavigation();
        initializeDropdowns();
        initializeAnchors();

        // Initialize Bots / Initialiser les Bots
        initializeBotsPanels();
        initializeBotsCarousel();
    }
    catch (error)
    {
        console.error("Erreur de chargement de la page Bots :", error);
    }
}

initializePage();