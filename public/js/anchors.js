/* ====================================================== */
/*       ANCHOR NAVIGATION / NAVIGATION PAR ANCRES        */
/*       Desktop / Ordinateur : page continue             */
/*       Mobile et tablette : largeur <= 1200 px          */
/* ====================================================== */

    export function initializeAnchors()
    {
        const pageSections = document.querySelectorAll(".page-section");
        const anchorLinks = document.querySelectorAll(".anchor-link");
        const topAnchor = document.querySelector(".anchor-navigation .anchor-arrow:first-child");
        const bottomAnchor = document.querySelector(".anchor-navigation .anchor-arrow:last-child");
        const footerHomeLink = document.querySelector(".site-footer a[href='#home']");
        const mobileScreen = window.matchMedia("(max-width: 1200px)");

        if (pageSections.length === 0)
        {
            return;
        }

        let selectedSectionId = window.location.hash.replace("#", "");

        // Verify section / Verifier que la section existe
        function sectionExists(sectionId)
        {
            for (const pageSection of pageSections)
            {
                if (pageSection.id === sectionId)
                {
                    return true;
                }
            }

            return false;
        }

        if (!sectionExists(selectedSectionId))
        {
            selectedSectionId = "home";
        }

        // Update active anchor / Mettre a jour l'ancre active
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

        // Apply screen mode / Appliquer le mode d'affichage
        function updateScreenMode()
        {
            if (mobileScreen.matches)
            {
                document.body.classList.add("section-mode");
                document.body.dataset.activeSection = selectedSectionId;

                // Display one section / Afficher une seule section
                for (const pageSection of pageSections)
                {
                    pageSection.hidden = pageSection.id !== selectedSectionId;
                }
            }
            else
            {
                document.body.classList.remove("section-mode");
                document.body.removeAttribute("data-active-section");

                // Restore all sections / Restaurer toutes les sections
                for (const pageSection of pageSections)
                {
                    pageSection.hidden = false;
                }
            }

            updateActiveLinks(selectedSectionId);
        }

        // Detect desktop section / Detecter la section sur ordinateur
        function updateDesktopSection()
        {
            if (mobileScreen.matches)
            {
                return;
            }

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

            if (bottomReached)
            {
                activeSection = pageSections[pageSections.length - 1];
            }

            selectedSectionId = activeSection.id;
            updateActiveLinks(selectedSectionId);
        }

        // Open selected section / Ouvrir la section selectionnee
        function openSection(sectionId, updateHistory = true)
        {
            if (!sectionExists(sectionId))
            {
                return;
            }

            selectedSectionId = sectionId;

            if (updateHistory)
            {
                window.history.pushState(null, "", `#${sectionId}`);
            }

            if (mobileScreen.matches)
            {
                // Replace visible content / Remplacer le contenu visible
                updateScreenMode();

                // Reset previous scroll / Reinitialiser le defilement precedent
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
            }
            else
            {
                // Normal desktop navigation / Navigation desktop classique
                const selectedSection = document.getElementById(sectionId);

                selectedSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                updateActiveLinks(sectionId);
            }
        }

        // Section links / Liens des sections
        for (const anchorLink of anchorLinks)
        {
            anchorLink.addEventListener("click", function(event)
            {
                event.preventDefault();

                const sectionId = anchorLink.getAttribute("href").replace("#", "");

                openSection(sectionId);
            });
        }

        // Top arrow / Fleche vers le haut
        if (topAnchor !== null)
        {
            topAnchor.addEventListener("click", function(event)
            {
                event.preventDefault();

                openSection("home");
            });
        }

        // Bottom arrow / Fleche vers le bas
        if (bottomAnchor !== null)
        {
            bottomAnchor.addEventListener("click", function(event)
            {
                event.preventDefault();

                if (mobileScreen.matches)
                {
                    // Show contact and footer / Afficher contact et footer
                    openSection("contact");
                }
                else
                {
                    // Reach desktop footer / Atteindre le footer desktop
                    const pageFooter = document.getElementById("site-footer");

                    if (pageFooter !== null)
                    {
                        pageFooter.scrollIntoView({
                            behavior: "smooth",
                            block: "end"
                        });
                    }
                }
            });
        }

        // Footer home link / Lien accueil du footer
        if (footerHomeLink !== null)
        {
            footerHomeLink.addEventListener("click", function(event)
            {
                event.preventDefault();

                openSection("home");
            });
        }

        // Browser history / Historique du navigateur
        function restoreSection()
        {
            const sectionId = window.location.hash.replace("#", "");

            if (sectionExists(sectionId))
            {
                openSection(sectionId, false);
            }
            else
            {
                openSection("home", false);
            }
        }

        window.addEventListener("popstate", restoreSection);
        window.addEventListener("hashchange", restoreSection);

        // Screen resizing / Changement de dimensions
        mobileScreen.addEventListener("change", function()
        {
            updateScreenMode();

            if (mobileScreen.matches)
            {
                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });
            }
            else
            {
                const selectedSection = document.getElementById(selectedSectionId);

                if (selectedSection !== null)
                {
                    selectedSection.scrollIntoView({
                        behavior: "instant",
                        block: "start"
                    });
                }
            }
        });

        // Follow desktop scrolling / Suivre le defilement desktop
        window.addEventListener("scroll", updateDesktopSection, { passive: true });

        // Initial display / Affichage initial
        updateScreenMode();

        if (mobileScreen.matches)
        {
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        }
        else
        {
            updateDesktopSection();
        }
    }