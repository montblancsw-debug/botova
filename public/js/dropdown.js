/* ====================================================== */
/*             DROPDOWN MENUS / MENUS DEROULANTS          */
/* ====================================================== */

    export function initializeDropdowns()
    {
        const dropdownTriggers = document.querySelectorAll(".navigation-dropdown");
        const compactScreen = window.matchMedia("(max-width: 1200px)");

        // Close all dropdowns / Fermer tous les sous-menus
        function closeDropdownMenus()
        {
            for (const dropdownTrigger of dropdownTriggers)
            {
                const navigationItem = dropdownTrigger.closest(".navigation-item");

                if (navigationItem !== null)
                {
                    navigationItem.classList.remove("is-open");
                    dropdownTrigger.setAttribute("aria-expanded", "false");
                }
            }
        }

        // Handle dropdown links / Gerer les liens des sous-menus
        for (const dropdownTrigger of dropdownTriggers)
        {
            dropdownTrigger.addEventListener("click", function(event)
            {
                const arrowClicked = event.target.closest(".navigation-arrow") !== null;

                if (!compactScreen.matches && !arrowClicked)
                {
                    return;
                }

                event.preventDefault();

                const navigationItem = dropdownTrigger.closest(".navigation-item");

                if (navigationItem === null)
                {
                    return;
                }

                const menuIsOpen = navigationItem.classList.contains("is-open");

                closeDropdownMenus();

                if (!menuIsOpen)
                {
                    navigationItem.classList.add("is-open");
                    dropdownTrigger.setAttribute("aria-expanded", "true");
                }
            });
        }

        // Close when clicking outside / Fermer lors d'un clic exterieur
        document.addEventListener("click", function(event)
        {
            const clickedNavigationItem = event.target.closest(".navigation-item");

            if (clickedNavigationItem === null)
            {
                closeDropdownMenus();
            }
        });

        // Close with Escape / Fermer avec Echap
        document.addEventListener("keydown", function(event)
        {
            if (event.key === "Escape")
            {
                closeDropdownMenus();
            }
        });
    }