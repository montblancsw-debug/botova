/* ====================================================== */
/*             DROPDOWN MENUS / MENUS DEROULANTS          */
/* ====================================================== */

export function initializeDropdowns()
{
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    // Close all menus / Fermer tous les menus
    function closeDropdownMenus()
    {
        for (const dropdownButton of dropdownButtons)
        {
            const navigationItem = dropdownButton.closest(".navigation-item");
            navigationItem.classList.remove("is-open");
            dropdownButton.setAttribute("aria-expanded", "false");
        }
    }

    // Open selected menu / Ouvrir le menu sélectionné
    for (const dropdownButton of dropdownButtons)
    {
        dropdownButton.addEventListener("click", function()
        {
            const navigationItem = dropdownButton.closest(".navigation-item");
            const menuIsOpen = navigationItem.classList.contains("is-open");

            closeDropdownMenus();

            if (!menuIsOpen)
            {
                navigationItem.classList.add("is-open");
                dropdownButton.setAttribute("aria-expanded", "true");
            }
        });
    }

    // Close menus when clicking outside / Fermer lors d'un clic extérieur
    document.addEventListener("click", function(event)
    {
        const clickedNavigationItem = event.target.closest(".navigation-item");

        if (clickedNavigationItem === null)
        {
            closeDropdownMenus();
        }
    });

    // Close menus with Escape / Fermer avec la touche Echap
    document.addEventListener("keydown", function(event)
    {
        if (event.key === "Escape")
        {
            closeDropdownMenus();
        }
    });
}
