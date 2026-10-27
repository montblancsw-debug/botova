/* ====================================================== */
/*           ANCHOR NAVIGATION / NAVIGATION PAR ANCRES    */
/* ====================================================== */

    export function initializeAnchors()
    {
        const pageSections = document.querySelectorAll(".page-section");
        const anchorLinks = document.querySelectorAll(".anchor-link");
        const nextAnchor = document.getElementById("next-anchor");

        if (pageSections.length === 0)
        {
            return;
        }

        // Update active section / Mettre a jour la section active
        function updateActiveSection()
        {
            let activeSection = pageSections[0];
            let activeSectionNumber = 0;

            for (let sectionNumber = 0; sectionNumber < pageSections.length; sectionNumber++)
            {
                const pageSection = pageSections[sectionNumber];
                const sectionPosition = pageSection.getBoundingClientRect();

                if (sectionPosition.top <= window.innerHeight / 2)
                {
                    activeSection = pageSection;
                    activeSectionNumber = sectionNumber;
                }
            }

            // Update links / Mettre a jour les liens
            for (const anchorLink of anchorLinks)
            {
                const sectionId = anchorLink.getAttribute("href");
                anchorLink.classList.remove("is-active");
                anchorLink.removeAttribute("aria-current");

                if (sectionId === `#${activeSection.id}`)
                {
                    anchorLink.classList.add("is-active");
                    anchorLink.setAttribute("aria-current", "location");
                }
            }

            // Update next arrow / Mettre a jour la fleche suivante
            if (nextAnchor !== null)
            {
                const nextSection = pageSections[activeSectionNumber + 1];

                if (nextSection !== undefined)
                {
                    nextAnchor.setAttribute("href", `#${nextSection.id}`);
                }
                else
                {
                    nextAnchor.setAttribute("href", "#site-footer");
                }
            }
        }

        // Listen to page scrolling / Suivre le defilement
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);
        window.addEventListener("hashchange", updateActiveSection);
        updateActiveSection();
    }