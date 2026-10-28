/* ====================================================== */
/*           BOTS CAROUSEL / CARROUSEL DES BOTS           */
/* ====================================================== */

export function initializeBotsCarousel()
{
    const carousel = document.querySelector(".bots-carousel");

    if (carousel === null)
    {
        return;
    }

    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const indicators = Array.from(document.querySelectorAll("[data-carousel-dot]"));
    const previousButton = document.querySelector("[data-carousel-prev]");
    const nextButton = document.querySelector("[data-carousel-next]");
    const platformLinks = document.querySelectorAll("[data-slide-select]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (slides.length === 0)
    {
        return;
    }

    let currentIndex = 0;
    let activePointer = null;
    let startX = 0;
    let startY = 0;
    let movementX = 0;
    let previewSlide = null;
    let previewDirection = 0;
    let isDragging = false;
    let isAnimating = false;
    let preventNextClick = false;

    // Normalize index / Adapter l'index aux limites du carrousel
    function normalizeIndex(index)
    {
        return (index + slides.length) % slides.length;
    }

    // Update indicators / Mettre a jour les indicateurs
    function updateIndicators()
    {
        for (let index = 0; index < indicators.length; index++)
        {
            const isActive = index === currentIndex;

            indicators[index].classList.toggle("is-active", isActive);

            if (isActive)
            {
                indicators[index].setAttribute("aria-current", "true");
            }
            else
            {
                indicators[index].removeAttribute("aria-current");
            }
        }
    }

    // Clear slide positions / Reinitialiser les positions
    function clearPreview()
    {
        slides[currentIndex].style.transform = "";

        if (previewSlide !== null)
        {
            previewSlide.style.transform = "";
            previewSlide.classList.remove("is-carousel-preview");

            if (previewSlide !== slides[currentIndex])
            {
                previewSlide.hidden = true;
            }
        }

        carousel.classList.remove("is-dragging");
        previewSlide = null;
        previewDirection = 0;
        movementX = 0;
        isDragging = false;
    }

    // Display adjacent slide / Preparer la diapositive voisine
    function preparePreview(direction, targetIndex)
    {
        const nextIndex = normalizeIndex(targetIndex);

        if (previewSlide !== null && previewSlide !== slides[nextIndex])
        {
            previewSlide.style.transform = "";
            previewSlide.classList.remove("is-carousel-preview");
            previewSlide.hidden = true;
        }

        previewSlide = slides[nextIndex];
        previewDirection = direction;
        previewSlide.hidden = false;
        previewSlide.classList.add("is-carousel-preview");
    }

    // Animate a slide change / Animer le changement de plateforme
    async function changeSlide(targetIndex, direction = 0)
    {
        if (isAnimating)
        {
            return;
        }

        const nextIndex = normalizeIndex(targetIndex);

        if (nextIndex === currentIndex)
        {
            clearPreview();
            return;
        }

        const previousSlide = slides[currentIndex];
        const nextSlide = slides[nextIndex];
        const slideDirection = direction || (nextIndex > currentIndex ? 1 : -1);
        const slideWidth = carousel.clientWidth;
        const initialMovement = movementX;

        preparePreview(slideDirection, nextIndex);
        isAnimating = true;

        // Respect reduced motion / Respecter les preferences de mouvement
        if (!reducedMotion.matches)
        {
            const animationOptions = {
                duration: 280,
                easing: "ease-in-out"
            };

            const previousAnimation = previousSlide.animate(
                [
                    { transform: `translateX(${initialMovement}px)` },
                    { transform: `translateX(${-slideDirection * slideWidth}px)` }
                ],
                animationOptions
            );

            const nextAnimation = nextSlide.animate(
                [
                    { transform: `translateX(${slideDirection * slideWidth + initialMovement}px)` },
                    { transform: "translateX(0px)" }
                ],
                animationOptions
            );

            try
            {
                await Promise.all([
                    previousAnimation.finished,
                    nextAnimation.finished
                ]);
            }
            catch (error)
            {
                // Continue cleanup / Terminer la remise en place
            }
        }

        // Display destination / Afficher la plateforme suivante
        previousSlide.hidden = true;
        previousSlide.style.transform = "";
        nextSlide.style.transform = "";
        nextSlide.classList.remove("is-carousel-preview");
        nextSlide.hidden = false;

        currentIndex = nextIndex;
        previewSlide = null;
        previewDirection = 0;
        movementX = 0;
        isDragging = false;
        isAnimating = false;

        carousel.classList.remove("is-dragging");
        updateIndicators();
    }

    // Restore slide / Revenir a la diapositive actuelle
    async function cancelSwipe()
    {
        if (previewSlide === null)
        {
            clearPreview();
            return;
        }

        const currentSlide = slides[currentIndex];
        const nextSlide = previewSlide;
        const slideWidth = carousel.clientWidth;
        const initialMovement = movementX;
        const direction = previewDirection;

        isAnimating = true;

        if (!reducedMotion.matches)
        {
            const animationOptions = {
                duration: 180,
                easing: "ease-out"
            };

            const currentAnimation = currentSlide.animate(
                [
                    { transform: `translateX(${initialMovement}px)` },
                    { transform: "translateX(0px)" }
                ],
                animationOptions
            );

            const nextAnimation = nextSlide.animate(
                [
                    { transform: `translateX(${direction * slideWidth + initialMovement}px)` },
                    { transform: `translateX(${direction * slideWidth}px)` }
                ],
                animationOptions
            );

            try
            {
                await Promise.all([
                    currentAnimation.finished,
                    nextAnimation.finished
                ]);
            }
            catch (error)
            {
                // Continue cleanup / Terminer la remise en place
            }
        }

        clearPreview();
        isAnimating = false;
    }

    // Begin gesture / Commencer le glissement
    carousel.addEventListener("pointerdown", function(event)
    {
        if (isAnimating || activePointer !== null)
        {
            return;
        }

        if (event.pointerType === "mouse" && event.button !== 0)
        {
            return;
        }

        activePointer = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        movementX = 0;
        isDragging = false;
        preventNextClick = false;
    });

    // Follow gesture / Suivre le mouvement de la souris ou du doigt
    window.addEventListener("pointermove", function(event)
    {
        if (event.pointerId !== activePointer || isAnimating)
        {
            return;
        }

        const horizontalDistance = event.clientX - startX;
        const verticalDistance = event.clientY - startY;

        if (!isDragging)
        {
            if (Math.abs(horizontalDistance) < 12)
            {
                return;
            }

            if (Math.abs(horizontalDistance) <= Math.abs(verticalDistance))
            {
                return;
            }

            isDragging = true;
            carousel.classList.add("is-dragging");
        }

        if (event.pointerType === "mouse")
        {
            event.preventDefault();
        }

        const slideWidth = carousel.clientWidth;
        movementX = Math.max(-slideWidth, Math.min(slideWidth, horizontalDistance));

        const direction = movementX < 0 ? 1 : -1;
        const nextIndex = normalizeIndex(currentIndex + direction);

        preparePreview(direction, nextIndex);

        slides[currentIndex].style.transform = `translateX(${movementX}px)`;
        previewSlide.style.transform = `translateX(${direction * slideWidth + movementX}px)`;
    });

    // Finish gesture / Terminer le glissement
    window.addEventListener("pointerup", function(event)
    {
        if (event.pointerId !== activePointer)
        {
            return;
        }

        activePointer = null;

        if (!isDragging)
        {
            return;
        }

        const minimumDistance = Math.min(90, Math.max(45, carousel.clientWidth * 0.1));

        if (Math.abs(movementX) >= minimumDistance)
        {
            preventNextClick = true;
            const nextIndex = normalizeIndex(currentIndex + previewDirection);
            changeSlide(nextIndex, previewDirection);
        }
        else
        {
            cancelSwipe();
        }
    });

    // Cancel interrupted gesture / Annuler un glissement interrompu
    window.addEventListener("pointercancel", function(event)
    {
        if (event.pointerId === activePointer)
        {
            activePointer = null;
            clearPreview();
        }
    });

    // Prevent native dragging / Eviter le glissement natif des images
    carousel.addEventListener("dragstart", function(event)
    {
        event.preventDefault();
    });

    // Prevent link activation after swipe / Eviter un clic apres le glissement
    carousel.addEventListener("click", function(event)
    {
        if (preventNextClick)
        {
            event.preventDefault();
            event.stopImmediatePropagation();
            preventNextClick = false;
        }
    }, true);

    // Previous platform / Plateforme precedente
    if (previousButton !== null)
    {
        previousButton.addEventListener("click", function()
        {
            changeSlide(currentIndex - 1, -1);
        });
    }

    // Next platform / Plateforme suivante
    if (nextButton !== null)
    {
        nextButton.addEventListener("click", function()
        {
            changeSlide(currentIndex + 1, 1);
        });
    }

    // Indicators / Indicateurs des plateformes
    for (const indicator of indicators)
    {
        indicator.addEventListener("click", function()
        {
            changeSlide(Number(indicator.dataset.carouselDot));
        });
    }

    // Platform dropdown / Sous-menu des plateformes
    for (const platformLink of platformLinks)
    {
        platformLink.addEventListener("click", function()
        {
            const selectedPlatform = platformLink.dataset.slideSelect;
            const nextIndex = slides.findIndex(function(slide)
            {
                return slide.dataset.slide === selectedPlatform;
            });

            if (nextIndex !== -1)
            {
                changeSlide(nextIndex);
            }
        });
    }

    // Platform from URL / Plateforme choisie depuis l'adresse
    const urlParameters = new URLSearchParams(window.location.search);
    const requestedPlatform = urlParameters.get("platform");

    if (requestedPlatform !== null)
    {
        const requestedIndex = slides.findIndex(function(slide)
        {
            return slide.dataset.slide === requestedPlatform;
        });

        if (requestedIndex !== -1)
        {
            currentIndex = requestedIndex;
        }
    }

    // Initial display / Affichage initial
    for (let index = 0; index < slides.length; index++)
    {
        slides[index].hidden = index !== currentIndex;
    }

    updateIndicators();
}