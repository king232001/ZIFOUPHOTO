// Navigation mobile, lightbox, filtres et petites interactions du site.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const yearElement = document.querySelector("#year");
const backToTop = document.querySelector(".back-to-top");
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");

    portfolioItems.forEach((item) => {
      const shouldShow = selectedCategory === "all" || item.dataset.category === selectedCategory;
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = item.dataset.src;
    lightboxImage.alt = item.dataset.alt || "Image du portfolio";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  backToTop.classList.toggle("visible", window.scrollY > 520);
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const reviewCarousel = document.querySelector(".review-carousel");

if (reviewCarousel) {
  const reviewTrack = reviewCarousel.querySelector(".review-track");
  const reviewSlides = Array.from(reviewCarousel.querySelectorAll(".review-slide"));
  const reviewPrev = reviewCarousel.querySelector(".review-prev");
  const reviewNext = reviewCarousel.querySelector(".review-next");
  let reviewIndex = 0;
  let reviewTouchStartX = 0;

  function updateReviewSlides() {
    const total = reviewSlides.length;

    reviewSlides.forEach((slide, index) => {
      slide.classList.remove("is-active", "is-prev-1", "is-prev-2", "is-next-1", "is-next-2");

      if (total === 1) {
        slide.classList.add("is-active");
        return;
      }

      const offset = (index - reviewIndex + total) % total;

      if (offset === 0) {
        slide.classList.add("is-active");
      } else if (offset === total - 1) {
        slide.classList.add("is-prev-1");
      } else if (offset === total - 2) {
        slide.classList.add("is-prev-2");
      } else if (offset === 1) {
        slide.classList.add("is-next-1");
      } else if (offset === 2) {
        slide.classList.add("is-next-2");
      }
    });

    if (reviewPrev) {
      reviewPrev.disabled = total <= 1;
    }

    if (reviewNext) {
      reviewNext.disabled = total <= 1;
    }
  }

  function goToReviewSlide(index) {
    if (!reviewSlides.length) return;

    reviewIndex = (index + reviewSlides.length) % reviewSlides.length;
    updateReviewSlides();
  }

  reviewSlides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (index !== reviewIndex) {
        goToReviewSlide(index);
        return;
      }

      const image = slide.querySelector("img");
      if (!lightbox || !lightboxImage || !image) return;

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || "Photo de la galerie";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  if (reviewPrev) {
    reviewPrev.addEventListener("click", () => {
      goToReviewSlide(reviewIndex - 1);
    });
  }

  if (reviewNext) {
    reviewNext.addEventListener("click", () => {
      goToReviewSlide(reviewIndex + 1);
    });
  }

  if (reviewTrack) {
    reviewTrack.addEventListener("touchstart", (event) => {
      reviewTouchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    reviewTrack.addEventListener("touchend", (event) => {
      const deltaX = event.changedTouches[0].clientX - reviewTouchStartX;

      if (Math.abs(deltaX) < 40) return;

      if (deltaX > 0) {
        goToReviewSlide(reviewIndex - 1);
      } else {
        goToReviewSlide(reviewIndex + 1);
      }
    }, { passive: true });
  }

  document.addEventListener("keydown", (event) => {
    if (!reviewCarousel.contains(document.activeElement)) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToReviewSlide(reviewIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToReviewSlide(reviewIndex + 1);
    }
  });

  updateReviewSlides();
}
