/* ====================================================== */
/*           ANCHOR NAVIGATION / NAVIGATION PAR ANCRES    */
/* ====================================================== */

    export function initializeAnchors()
    {
        const anchorNavigation = document.querySelector(".anchor-navigation");
        const pageSections = document.querySelectorAll(".page-section");
        const anchorLinks = document.querySelectorAll(".anchor-link");
        const topAnchor = document.querySelector(".anchor-arrow:first-child");
        const bottomAnchor = document.querySelector(".anchor-arrow:last-child");

        if (anchorNavigation === null || pageSections.length === 0)
        {
            return;
        }

        let selectedSectionId = window.location.hash.replace("#", "");

        // Update active links / Mettre a jour les liens actifs
        function updateActiveLinks(sectionId)
        {
            for (const anchorLink of anchorLinks)
            {
                const linkSectionId = anchorLink.getAttribute("href");

                anchorLink.classList.remove("is-active");
                anchorLink.removeAttribute("aria-current");

                if (linkSectionId === `#${sectionId}`)
                {
                    anchorLink.classList.add("is-active");
                    anchorLink.setAttribute("aria-current", "location");
                }
            }
        }

        // Detect visible section / Detecter la section visible
        function updateActiveSection()
        {
            const activationPosition = Math.max(180, Math.min(window.innerHeight * 0.3, 360));
            const documentHeight = document.documentElement.scrollHeight;
            const bottomReached = window.scrollY + window.innerHeight >= documentHeight - 5;
            let activeSection = pageSections[0];

            for (const pageSection of pageSections)
            {
                const sectionPosition = pageSection.getBoundingClientRect();

                if (sectionPosition.top <= activationPosition)
                {
                    activeSection = pageSection;
                }
            }

            // Last section / Derniere section
            if (bottomReached)
            {
                activeSection = pageSections[pageSections.length - 1];
            }

            // Respect selected anchor / Respecter l'ancre selectionnee
            if (selectedSectionId !== "")
            {
                const selectedSection = document.getElementById(selectedSectionId);

                if (selectedSection !== null && selectedSection.classList.contains("page-section"))
                {
                    activeSection = selectedSection;
                }
            }

            updateActiveLinks(activeSection.id);
        }

        // Anchor selection / Selection des ancres
        for (const anchorLink of anchorLinks)
        {
            anchorLink.addEventListener("click", function()
            {
                selectedSectionId = anchorLink.getAttribute("href").replace("#", "");
                updateActiveLinks(selectedSectionId);
            });
        }

        // Return to top / Retour en haut de la page
        if (topAnchor !== null)
        {
            topAnchor.addEventListener("click", function(event)
            {
                event.preventDefault();
                selectedSectionId = "home";

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                updateActiveLinks("home");
            });
        }

        // Go to bottom / Aller en bas de la page
        if (bottomAnchor !== null)
        {
            bottomAnchor.addEventListener("click", function()
            {
                selectedSectionId = "contact";
                updateActiveLinks("contact");
            });
        }

        // Manual scrolling / Defilement manuel
        function resetSelectedSection()
        {
            selectedSectionId = "";
            updateActiveSection();
        }

        window.addEventListener("wheel", resetSelectedSection, { passive: true });
        window.addEventListener("touchstart", resetSelectedSection, { passive: true });

        // Keyboard scrolling / Defilement au clavier
        document.addEventListener("keydown", function(event)
        {
            const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];

            if (scrollKeys.includes(event.key))
            {
                resetSelectedSection();
            }
        });

        // Mouse scrollbar / Barre de defilement a la souris
        document.addEventListener("pointerdown", function(event)
        {
            if (!anchorNavigation.contains(event.target))
            {
                selectedSectionId = "";
            }
        });

        // Follow page scrolling / Suivre le defilement
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);
        window.addEventListener("hashchange", updateActiveSection);

        updateActiveSection();
    }