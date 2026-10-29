/* ====================================================== */
/*             BOTS PANELS / PANNEAUX DES BOTS            */
/* ====================================================== */

    export function initializeBotsPanels()
    {
        const discordPanels = document.querySelectorAll("[data-bots-panel]");
        const panelButtons = document.querySelectorAll("[data-panel-target]");
        const cardGrids = document.querySelectorAll("[data-paginate]");
        const currentPages = new Map();
        const pluginGrid = document.querySelector("#plugins [data-paginate]");

        // Empty plugin cards / Cartes vides des plugins
        if (pluginGrid !== null)
        {
            for (let index = 0; index < 2; index++)
            {
                const emptyCard = document.createElement("article");

                emptyCard.classList.add("bots-card", "bots-card-placeholder");
                emptyCard.setAttribute("aria-hidden", "true");
                emptyCard.hidden = true;

                pluginGrid.appendChild(emptyCard);
            }
        }

        // Card count / Nombre de cartes par ecran
        function getCardsPerPage()
        {
            if (window.innerWidth <= 600)
            {
                return 2;
            }

            return 4;
        }

        // Display cards / Afficher les cartes
        function updateCardGrid(cardGrid)
        {
            const cards = Array.from(cardGrid.children).filter(function(card)
            {
                return !card.classList.contains("bots-card-placeholder");
            });

            const emptyCards = cardGrid.querySelectorAll(".bots-card-placeholder");
            const controls = cardGrid.nextElementSibling;
            const cardsPerPage = getCardsPerPage();
            const totalPages = Math.ceil(cards.length / cardsPerPage);
            let currentPage = currentPages.get(cardGrid) || 0;

            if (currentPage >= totalPages)
            {
                currentPage = 0;
            }

            currentPages.set(cardGrid, currentPage);

            // Show current page / Afficher la page actuelle
            for (let cardIndex = 0; cardIndex < cards.length; cardIndex++)
            {
                const firstCardIndex = currentPage * cardsPerPage;
                const lastCardIndex = firstCardIndex + cardsPerPage;

                cards[cardIndex].hidden = cardIndex < firstCardIndex || cardIndex >= lastCardIndex;
            }

            // Fill the last row / Completer la derniere rangee
            const remainingCards = cards.length - currentPage * cardsPerPage;
            const missingCards = Math.max(0, cardsPerPage - remainingCards);

            for (let index = 0; index < emptyCards.length; index++)
            {
                emptyCards[index].hidden = currentPage !== totalPages - 1 || index >= missingCards;
            }

            if (controls === null || !controls.hasAttribute("data-pagination-controls"))
            {
                return;
            }

            const previousButton = controls.querySelector("[data-pagination-prev]");
            const nextButton = controls.querySelector("[data-pagination-next]");
            const pageStatus = controls.querySelector("[data-pagination-status]");

            controls.hidden = totalPages <= 1;
            previousButton.disabled = currentPage === 0;
            nextButton.disabled = currentPage >= totalPages - 1;
            pageStatus.textContent = `${currentPage + 1} / ${totalPages}`;
        }

        // Pagination buttons / Boutons de pagination
        for (const cardGrid of cardGrids)
        {
            currentPages.set(cardGrid, 0);

            const controls = cardGrid.nextElementSibling;

            if (controls !== null && controls.hasAttribute("data-pagination-controls"))
            {
                const previousButton = controls.querySelector("[data-pagination-prev]");
                const nextButton = controls.querySelector("[data-pagination-next]");

                previousButton.addEventListener("click", function()
                {
                    const currentPage = currentPages.get(cardGrid) || 0;

                    currentPages.set(cardGrid, Math.max(0, currentPage - 1));
                    updateCardGrid(cardGrid);
                });

                nextButton.addEventListener("click", function()
                {
                    const currentPage = currentPages.get(cardGrid) || 0;

                    currentPages.set(cardGrid, currentPage + 1);
                    updateCardGrid(cardGrid);
                });
            }

            updateCardGrid(cardGrid);
        }

        // Switch Discord panel / Changer de fiche Discord
        function displayDiscordPanel(panelName)
        {
            for (const discordPanel of discordPanels)
            {
                discordPanel.hidden = discordPanel.dataset.botsPanel !== panelName;
            }

            const selectedPanel = document.querySelector(`[data-bots-panel="${panelName}"]`);

            if (selectedPanel !== null)
            {
                const selectedGrid = selectedPanel.querySelector("[data-paginate]");

                if (selectedGrid !== null)
                {
                    currentPages.set(selectedGrid, 0);
                    updateCardGrid(selectedGrid);
                }
            }
        }

        // Panel selection / Selection des fiches
        for (const panelButton of panelButtons)
        {
            panelButton.addEventListener("click", function()
            {
                displayDiscordPanel(panelButton.dataset.panelTarget);
            });
        }

        // Keep layout responsive / Adapter la pagination
        window.addEventListener("resize", function()
        {
            for (const cardGrid of cardGrids)
            {
                updateCardGrid(cardGrid);
            }
        });
    }