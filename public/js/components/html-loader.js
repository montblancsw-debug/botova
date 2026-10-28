/* ====================================================== */
/*            HTML LOADER / CHARGEMENT DES HTML           */
/* ====================================================== */

const siteRootUrl = new URL("../../", import.meta.url);

// Load HTML fragment / Charger un fragment HTML
async function loadFragment(element)
{
    const fragmentPath = element.dataset.include;
    const fragmentUrl = new URL(fragmentPath, siteRootUrl);
    const response = await fetch(fragmentUrl);

    if (!response.ok)
    {
        throw new Error(`Impossible de charger : ${fragmentPath} (${response.status})`);
    }

    element.innerHTML = await response.text();

    // Load nested fragments / Charger les fragments imbriques
    const nestedFragments = element.querySelectorAll("[data-include]");
    const loadingTasks = [];

    for (const nestedFragment of nestedFragments)
    {
        loadingTasks.push(loadFragment(nestedFragment));
    }

    await Promise.all(loadingTasks);
}

// Resolve links and images / Resoudre les liens et images
function resolvePaths()
{
    const links = document.querySelectorAll("[data-root-href]");
    const images = document.querySelectorAll("[data-root-src]");

    for (const link of links)
    {
        const destination = new URL(link.dataset.rootHref, siteRootUrl);
        link.setAttribute("href", destination.href);
    }

    for (const image of images)
    {
        const imageAddress = new URL(image.dataset.rootSrc, siteRootUrl);
        image.setAttribute("src", imageAddress.href);
    }
}

// Adapt links to current page / Adapter les liens a la page
function adaptPageLinks()
{
    const currentPage = document.body.dataset.page;
    const homeFooterLink = document.querySelector("[data-footer-home]");
    const botsFooterLink = document.querySelector("[data-footer-bots]");
    const botsNavigationLink = document.querySelector('[data-navigation-page="bots"]');
    const discordMenuLink = document.querySelector("[data-bots-section]");
    const platformMenuLinks = document.querySelectorAll("[data-slide-select]");

    if (currentPage === "home" && homeFooterLink !== null)
    {
        homeFooterLink.setAttribute("href", "#home");
        homeFooterLink.classList.add("footer-active");
    }

    if (currentPage === "bots")
    {
        if (botsFooterLink !== null)
        {
            botsFooterLink.setAttribute("href", "#offres");
            botsFooterLink.classList.add("footer-active");
        }

        if (botsNavigationLink !== null)
        {
            botsNavigationLink.setAttribute("href", "#offres");
        }

        if (discordMenuLink !== null)
        {
            discordMenuLink.setAttribute("href", "#discord");
        }

        // carousel links / Liens du carrousel
        for (const platformMenuLink of platformMenuLinks)
        {
            platformMenuLink.setAttribute("href", "#carrousel");
        }
    }
}

// Initialize components / Initialiser les composants
export async function loadHtmlComponents()
{
    const fragments = document.querySelectorAll("[data-include]");
    const loadingTasks = [];

    for (const fragment of fragments)
    {
        loadingTasks.push(loadFragment(fragment));
    }

    // Wait for all fragments / Attendre tous les fragments
    await Promise.all(loadingTasks);

    resolvePaths();
    adaptPageLinks();
}