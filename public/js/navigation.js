/* ====================================================== */
/*        MAIN NAVIGATION / NAVIGATION PRINCIPALE         */
/* ====================================================== */

    export function getDemoAccounts()
    {
        try
        {
            const savedAccounts = localStorage.getItem("botova-demo-accounts");
            const accounts = JSON.parse(savedAccounts || "[]");

            return Array.isArray(accounts) ? accounts : [];
        }
        catch (error)
        {
            return [];
        }
    }

    export function getDemoAccount(email)
    {
        const accounts = getDemoAccounts();

        return accounts.find(function(account)
        {
            return typeof account.email === "string" && account.email.toLowerCase() === email.toLowerCase();
        }) || null;
    }

    export function isDemoConnected()
    {
        try
        {
            const connected = sessionStorage.getItem("botova-demo-connected");
            const email = sessionStorage.getItem("botova-demo-email");

            return connected === "true" && email !== null && getDemoAccount(email) !== null;
        }
        catch (error)
        {
            return false;
        }
    }

/* ====================================================== */
/*               ACCOUNT MENU / MENU COMPTE               */
/* ====================================================== */

    export function updateAccountNavigation()
    {
        const connected = isDemoConnected();
        const accountLink = document.querySelector('[data-navigation-page="account"]');
        const profileLink = document.querySelector('[data-account-link="profile"]');
        const guestEntries = document.querySelectorAll("[data-account-guest]");
        const profileEntries = document.querySelectorAll("[data-account-profile]");
        const accountLinks = document.querySelectorAll("[data-account-link]");
        const logoutLink = document.querySelector("[data-account-logout]");
        const currentPage = document.body.dataset.accountPage;

        // Show the correct entries / Afficher les bonnes entrees
        for (const entry of guestEntries)
        {
            entry.hidden = connected;
        }

        for (const entry of profileEntries)
        {
            entry.hidden = !connected;
        }

        // Update the account link / Actualiser le lien Compte
        if (accountLink !== null)
        {
            const accountText = accountLink.querySelector(".navigation-text");

            if (accountText !== null)
            {
                accountText.textContent = "Compte";
            }

            if (connected && profileLink !== null)
            {
                accountLink.href = profileLink.href;
                accountLink.setAttribute("aria-label", "Ouvrir mon profil");
            }
            else
            {
                accountLink.href = new URL("../html/account/", import.meta.url).href;
                accountLink.setAttribute("aria-label", "Ouvrir la connexion");
            }
        }

        // Update logout / Actualiser la deconnexion
        if (logoutLink !== null)
        {
            logoutLink.classList.toggle("dropdown-muted", !connected);
        }

        // Highlight current entry / Indiquer l'entree active
        for (const menuLink of accountLinks)
        {
            menuLink.classList.remove("is-current");
            menuLink.removeAttribute("aria-current");

            if (menuLink.dataset.accountLink === currentPage)
            {
                menuLink.classList.add("is-current");
                menuLink.setAttribute("aria-current", "page");
            }
        }
    }

/* ====================================================== */
/*               ACTIVE PAGE / PAGE ACTIVE                */
/* ====================================================== */

    export function initializeNavigation()
    {
        const siteHeader = document.getElementById("site-header");
        const mobileMenuButton = document.getElementById("mobile-menu-button");
        const navigationLinks = document.querySelectorAll("[data-navigation-page]");
        const logoutLink = document.querySelector("[data-account-logout]");

        // Active page / Page active
        function updateActiveNavigation()
        {
            let currentPage = document.body.getAttribute("data-page");
            const currentSection = window.location.hash;
            const botsSections = ["#platforms", "#discord", "#twitch", "#youtube", "#whatsapp", "#linkedin"];
            const connected = isDemoConnected();

            if (currentPage === "services" && botsSections.includes(currentSection))
            {
                currentPage = "bots";
            }

            for (const navigationLink of navigationLinks)
            {
                const navigationPage = navigationLink.getAttribute("data-navigation-page");

                navigationLink.classList.remove("is-active");
                navigationLink.removeAttribute("aria-current");

                if (navigationPage === currentPage || (connected && navigationPage === "account"))
                {
                    navigationLink.classList.add("is-active");

                    if (navigationPage === currentPage)
                    {
                        navigationLink.setAttribute("aria-current", "page");
                    }
                }
            }
        }

        updateActiveNavigation();
        updateAccountNavigation();
        window.addEventListener("hashchange", updateActiveNavigation);

        /* ====================================================== */
        /*             LOGOUT / DECONNEXION DU COMPTE             */
        /* ====================================================== */

        if (logoutLink !== null)
        {
            logoutLink.addEventListener("click", function(event)
            {
                event.preventDefault();

                try
                {
                    sessionStorage.removeItem("botova-demo-connected");
                    sessionStorage.removeItem("botova-demo-email");
                    sessionStorage.setItem("botova-demo-notice", "logout");
                }
                catch (error)
                {
                    console.warn("La session du navigateur n'est pas disponible.");
                }

                window.location.assign(logoutLink.href);
            });
        }

        /* ====================================================== */
        /*               MOBILE MENU / MENU MOBILE                */
        /* ====================================================== */

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
                const isDropdownLink = headerLink.classList.contains("navigation-dropdown");
                const isCompactScreen = window.innerWidth <= 1200;

                if (isDropdownLink && isCompactScreen)
                {
                    return;
                }

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