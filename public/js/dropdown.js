/* ====================================================== */
/*             DROPDOWN MENUS / MENUS DEROULANTS          */
/* ====================================================== */

    export function initializeDropdowns()
    {
        const dropdownButtons = document.querySelectorAll(".dropdown-button, .navigation-label");

        // Close all dropdowns / Fermer tous les sous-menus
        function closeDropdownMenus()
        {
            for (const dropdownButton of dropdownButtons)
            {
                const navigationItem = dropdownButton.closest(".navigation-item");
                if (navigationItem !== null)
                {
                    navigationItem.classList.remove("is-open");
                    dropdownButton.setAttribute("aria-expanded", "false");
                }
            }
        }

    // Handle menu buttons / Gerer les boutons des menus
    for (const dropdownButton of dropdownButtons)
    {
        dropdownButton.addEventListener("click", function()
        {
            const navigationItem = dropdownButton.closest(".navigation-item");
            if (navigationItem === null)
            {
                return;
            }

            const menuIsOpen = navigationItem.classList.contains("is-open");
            closeDropdownMenus();

            if (!menuIsOpen)
            {
                navigationItem.classList.add("is-open");
                dropdownButton.setAttribute("aria-expanded", "true");
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