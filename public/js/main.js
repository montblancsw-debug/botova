import { loadHtmlComponents } from "./components/html-loader.js";
import { initializeNavigation } from "./navigation.js";
import { initializeDropdowns } from "./dropdown.js";
import { initializeAnchors } from "./anchors.js";

// Initialize page / Initialiser la page
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
    }
    catch (error)
    {
        console.error("Erreur de chargement des composants HTML :", error);
    }
}

initializePage();