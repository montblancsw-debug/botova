/* ====================================================== */
/*             BOTS PAGE / INITIALISATION BOTS            */
/* ====================================================== */

import { loadHtmlComponents } from "../components/html-loader.js";
import { initializeNavigation } from "../navigation.js";
import { initializeDropdowns } from "../dropdown.js";
import { initializeAnchors } from "../anchors.js";
import { initializeBotsPanels } from "./bots-panels.js";

/* ====================================================== */
/*            BOTS CAROUSEL / CARROUSEL DES BOTS          */
/* ====================================================== */

    function initializeBotsCarousel()
    {
        const carouselSlides = Array.from(document.querySelectorAll("[data-slide]"));
        const carouselDots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
        const previousButton = document.querySelector("[data-carousel-prev]");
        const nextButton = document.querySelector("[data-carousel-next]");
        const platformLinks = document.querySelectorAll("[data-slide-select]");

        if (carouselSlides.length === 0)
        {
            return;
        }

        let currentSlideIndex = 0;

        // Display selected platform / Afficher la plateforme choisie
        function displaySlide(slideIndex)
        {
            const numberOfSlides = carouselSlides.length;
            currentSlideIndex = (slideIndex + numberOfSlides) % numberOfSlides;

            for (let index = 0; index < numberOfSlides; index++)
            {
                const slideIsActive = index === currentSlideIndex;

                carouselSlides[index].hidden = !slideIsActive;
                carouselDots[index].classList.toggle("is-active", slideIsActive);

                if (slideIsActive)
                {
                    carouselDots[index].setAttribute("aria-current", "true");
                }
                else
                {
                    carouselDots[index].removeAttribute("aria-current");
                }
            }
        }

        // Previous platform / Plateforme precedente
        previousButton.addEventListener("click", function()
        {
            displaySlide(currentSlideIndex - 1);
        });

        // Next platform / Plateforme suivante
        nextButton.addEventListener("click", function()
        {
            displaySlide(currentSlideIndex + 1);
        });

        // Indicator selection / Selection par indicateur
        for (const carouselDot of carouselDots)
        {
            carouselDot.addEventListener("click", function()
            {
                displaySlide(Number(carouselDot.dataset.carouselDot));
            });
        }

        // Dropdown platform selection / Selection depuis le menu Bots
        for (const platformLink of platformLinks)
        {
            platformLink.addEventListener("click", function()
            {
                const selectedPlatform = platformLink.dataset.slideSelect;
                const selectedIndex = carouselSlides.findIndex(function(carouselSlide)
                {
                    return carouselSlide.dataset.slide === selectedPlatform;
                });

                if (selectedIndex !== -1)
                {
                    displaySlide(selectedIndex);
                }
            });
        }

        // Platform from URL / Plateforme depuis l'adresse
        const urlParameters = new URLSearchParams(window.location.search);
        const requestedPlatform = urlParameters.get("platform");

        if (requestedPlatform !== null)
        {
            const requestedIndex = carouselSlides.findIndex(function(carouselSlide)
            {
                return carouselSlide.dataset.slide === requestedPlatform;
            });

            if (requestedIndex !== -1)
            {
                displaySlide(requestedIndex);
            }
        }
    }

/* ====================================================== */
/*             PAGE STARTUP / DEMARRAGE DE LA PAGE        */
/* ====================================================== */

    async function initializePage()
    {
        try
        {
            // Load HTML components / Charger les composants HTML
            await loadHtmlComponents();

            // Initialize navigation / Initialiser la navigation
            initializeNavigation();
            initializeDropdowns();
            initializeAnchors();

            // Initialize Bots / Initialiser les Bots
            initializeBotsPanels();
            initializeBotsCarousel();
        }
        catch (error)
        {
            console.error("Erreur de chargement de la page Bots :", error);
        }
    }

initializePage();