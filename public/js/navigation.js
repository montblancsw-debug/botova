/* ====================================================== */
/*             MOBILE NAVIGATION / NAVIGATION MOBILE      */
/* ====================================================== */

export function initializeNavigation()
{
    const menuButton = document.getElementById("mobile-menu-button");
    const mainNavigation = document.getElementById("main-navigation");

    if (menuButton === null || mainNavigation === null)
    {
        return;
    }

    // Open or close menu / Ouvrir ou fermer le menu
    menuButton.addEventListener("click", function()
    {
        const menuIsOpen = mainNavigation.classList.contains("is-open");

        if (menuIsOpen)
        {
            mainNavigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        }
        else
        {
            mainNavigation.classList.add("is-open");
            menuButton.setAttribute("aria-expanded", "true");
        }
    });

    // Close navigation after selecting a link / Fermer après sélection d'un lien
    const navigationLinks = mainNavigation.querySelectorAll("a");

    for (const navigationLink of navigationLinks)
    {
        navigationLink.addEventListener("click", function()
        {
            mainNavigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    }

    // Close navigation with Escape / Fermer avec la touche Echap
    document.addEventListener("keydown", function(event)
    {
        if (event.key === "Escape")
        {
            mainNavigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}
