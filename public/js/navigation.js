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

        const headerLinks = siteHeader.querySelectorAll("a");

        // Close mobile menu / Fermer le menu mobile
        function closeMobileMenu()
        {
            siteHeader.classList.remove("is-mobile-open");
            document.body.classList.remove("mobile-menu-open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
            mobileMenuButton.textContent = "Menu ☰";
        }

        // Open mobile menu / Ouvrir le menu mobile
        function openMobileMenu()
        {
            siteHeader.classList.add("is-mobile-open");
            document.body.classList.add("mobile-menu-open");
            mobileMenuButton.setAttribute("aria-expanded", "true");
            mobileMenuButton.textContent = "Fermer ×";
        }

        // Toggle mobile menu / Ouvrir ou fermer le menu
        mobileMenuButton.addEventListener("click", function()
        {
            const menuIsOpen = siteHeader.classList.contains("is-mobile-open");
            if (menuIsOpen)
            {
                closeMobileMenu();
            }
            else
            {
                openMobileMenu();
            }
        });

        // Close after navigation / Fermer apres navigation
        for (const headerLink of headerLinks)
        {
            headerLink.addEventListener("click", function()
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

        // Restore desktop menu / Retablir le menu ordinateur
        window.addEventListener("resize", function()
        {
            if (window.innerWidth > 1200)
            {
                closeMobileMenu();
            }
        });
    }