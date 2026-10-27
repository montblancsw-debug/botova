/* ====================================================== */
/*             MAIN NAVIGATION / NAVIGATION PRINCIPALE    */
/* ====================================================== */

    export function initializeNavigation()
    {
        const siteHeader = document.getElementById("site-header");
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const navigationLinks = document.querySelectorAll("[data-navigation-page]");

        // Active page / Page active
        function updateActiveNavigation()
        {
            let currentPage = document.body.getAttribute("data-page");
            const currentSection = window.location.hash;
            const botsSections = ["#platforms", "#discord", "#twitch", "#youtube", "#whatsapp", "#linkedin"];

            if (currentPage === "services" && botsSections.includes(currentSection))
            {
                currentPage = "bots";
            }
            for (const navigationLink of navigationLinks)
            {
                navigationLink.classList.remove("is-active");
                navigationLink.removeAttribute("aria-current");
                if (navigationLink.getAttribute("data-navigation-page") === currentPage)
                {
                    navigationLink.classList.add("is-active");
                    navigationLink.setAttribute("aria-current", "page");
                }
            }
        }

        updateActiveNavigation();
        window.addEventListener("hashchange", updateActiveNavigation);

        if (siteHeader === null || mobileMenuButton === null)
        {
            return;
        }

    // Close mobile menu / Fermer le menu mobile
    function closeMobileMenu()
    {
        siteHeader.classList.remove("is-mobile-open");
        mobileMenuButton.setAttribute("aria-expanded", "false");
    }

    // Open or close mobile menu / Ouvrir ou fermer le menu mobile
    mobileMenuButton.addEventListener("click", function()
    {
        const menuIsOpen = siteHeader.classList.contains("is-mobile-open");

        if (menuIsOpen)
        {
            closeMobileMenu();
        }
        else
        {
            siteHeader.classList.add("is-mobile-open");
            mobileMenuButton.setAttribute("aria-expanded", "true");
        }
    });

    // Close after navigation / Fermer après navigation
    for (const navigationLink of navigationLinks)
    {
        navigationLink.addEventListener("click", function()
        {
            closeMobileMenu();
        });
    }

    // Close with Escape / Fermer avec Echap
    document.addEventListener("keydown", function(event)
    {
        if (event.key === "Escape")
        {
            closeMobileMenu();
        }
    });
}