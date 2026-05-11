$(document).ready(function () {
  console.log("Portfolio loaded successfully!");

  // header menu toggle
  const hamburger = document.getElementById("hamburger");
  const navList = document.getElementById("nav-list");

  if (hamburger) {
    hamburger.setAttribute("aria-controls", "nav-list");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Toggle navigation menu");

    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navList.classList.toggle("active");
      hamburger.setAttribute(
        "aria-expanded",
        navList.classList.contains("active") ? "true" : "false",
      );
    });

    // Close menu when a link is clicked
    navList.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".navbar")) {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });

    // Close responsive menu when resizing beyond mobile breakpoint
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1030 && navList.classList.contains("active")) {
        hamburger.classList.remove("active");
        navList.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  const nameElement = $(".name h1");
  const fullName = "Ahmed Tamane";
  let isTypingDone = false;

  function typeWriterEffect() {
    nameElement.text("");
    let charIndex = 0;
    let isDeleting = false;

    function typeChar() {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < fullName.length) {
          nameElement.html(
            fullName.substring(0, charIndex + 1) +
              '<span class="blinking-cursor">|</span>',
          );
          charIndex++;
          setTimeout(typeChar, 150);
        } else {
          // Finished typing, start deleting
          isDeleting = true;
          setTimeout(typeChar, 1000); // you have to pause before deleting
        }
      } else {
        // deleting backwards
        if (charIndex > 0) {
          nameElement.html(
            fullName.substring(0, charIndex - 1) +
              '<span class="blinking-cursor">|</span>',
          );
          charIndex--;
          setTimeout(typeChar, 100);
        } else {
          // Finished deleting, restart
          isDeleting = false;
          setTimeout(typeChar, 500); // you've to pause before restarting
        }
      }
    }

    typeChar();
  }

  // Start typing animation on page load
  typeWriterEffect();

  // ===== QUOTE TYPING ANIMATION =====
  const quoteElement = $("#navbar-quote");
  const fullQuote = "Practice Makes You Perfect";

  function typeWriterEffectQuote() {
    quoteElement.text("");
    let charIndex = 0;
    let isDeleting = false;

    function typeChar() {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < fullQuote.length) {
          quoteElement.html(
            fullQuote.substring(0, charIndex + 1) +
              '<span class="blinking-cursor">|</span>',
          );
          charIndex++;
          setTimeout(typeChar, 150);
        } else {
          // Finished typing, start deleting
          isDeleting = true;
          setTimeout(typeChar, 2000); // pause before deleting
        }
      } else {
        // deleting backwards
        if (charIndex > 0) {
          quoteElement.html(
            fullQuote.substring(0, charIndex - 1) +
              '<span class="blinking-cursor">|</span>',
          );
          charIndex--;
          setTimeout(typeChar, 100);
        } else {
          // Finished deleting, restart
          isDeleting = false;
          setTimeout(typeChar, 500); // pause before restarting
        }
      }
    }

    typeChar();
  }

  // Start quote typing animation
  typeWriterEffectQuote();

  // ===== SECTION ANIMATIONS =====
  function revealSections() {
    const sections = $(".section-hidden");

    sections.each(function () {
      const section = $(this);
      const sectionTop = section.offset().top;
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();

      // Reveal if section is in viewport
      if (scrollTop + windowHeight > sectionTop + 100) {
        section.addClass("section-visible").removeClass("section-hidden");
      }
    });
  }
  $(window).on("scroll", revealSections);

  // Reveal sections that are already in view on page load
  revealSections();

  // Set home as active by default
  $(".nav-link").removeClass("active");
  $('a[href="#header"]').addClass("active");

  // ===== SMOOTH SCROLLING FOR NAVIGATION =====
  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800,
      );
    }
  });

  // ===== ACTIVE NAVIGATION HIGHLIGHTING & NAVBAR TRANSPARENCY =====
  let headerHeight = $("#header").outerHeight();

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();

    // Navbar transparency: transparent at top, solid when scrolled down
    if (scrollTop > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }

    // Update active nav only after scrolling past header
    if (scrollTop > headerHeight - 200) {
      const scrollPos = scrollTop + 100;

      $("section").each(function () {
        const section = $(this);
        const sectionTop = section.offset().top;
        const sectionBottom = sectionTop + section.outerHeight();

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          const id = section.attr("id");
          $(".nav-link").removeClass("active");
          $(`.nav-link[href="#${id}"]`).addClass("active");
        }
      });
    } else {
      // Keep Home active when near top
      $(".nav-link").removeClass("active");
      $('a[href="#header"]').addClass("active");
    }
  });

  // ===== ANIMATE SKILL BARS ON SCROLL =====
  let skillsAnimated = false;

  function animateSkills() {
    if (skillsAnimated) return;
    $(".skill-progress").each(function () {
      const skillValue = $(this).data("skill");
      $(this).css("width", skillValue + "%");
    });
    skillsAnimated = true;
  }

  if ("IntersectionObserver" in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
    );

    const skillsSection = document.querySelector("#skills");
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  } else {
    animateSkills();
  }

  // ===== FORM SUBMISSION =====
  $(".contact-form").on("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    this.reset();
  });

  // ===== SCROLL TO TOP BUTTON =====
  $(".scroll-top-btn").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // ===== PROJECT CARD HOVER EFFECTS =====
  $(".project-card").hover(
    function () {
      $(this).addClass("hovered");
    },
    function () {
      $(this).removeClass("hovered");
    },
  );
});

// ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
// Add reveal-element class to all relevant elements
document.addEventListener("DOMContentLoaded", function () {
  // Target all elements that should have reveal animation
  const elementsToAnimate = document.querySelectorAll(
    "#header, .header-left, .header-right, .section-header h2, .section-header .subtitle, .about-card, .skill-category, .project-card, .form-group, .timeline-content, .project-image img, .footer",
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("reveal-element");
  });

  // Group elements by parent for proper staggering
  const parentGroups = {};
  elementsToAnimate.forEach((el) => {
    const parent = el.closest("section, .footer, #header") || el.parentElement;
    const parentKey = parent.id || parent.className;
    if (!parentGroups[parentKey]) {
      parentGroups[parentKey] = [];
    }
    parentGroups[parentKey].push(el);
  });

  // Re-index children for proper staggering within each section
  Object.values(parentGroups).forEach((group) => {
    group.forEach((el, index) => {
      el.style.setProperty("--stagger-index", index);
      // Increase stagger delay for more sequential appearance, especially for about cards
      const delay = el.classList.contains("about-card")
        ? index * 600
        : index * 120;
      el.style.setProperty("--animation-delay", `${delay}ms`);
    });
  });

  // Create intersection observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Stop observing after reveal
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // observe all elements
  elementsToAnimate.forEach((el) => {
    revealObserver.observe(el);
  });
});
