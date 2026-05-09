$(document).ready(function () {
  console.log("Portfolio loaded successfully!");

  // ===== TYPING ANIMATION FOR NAME =====
  const nameElement = $(".name h1");
  const fullName = "Ahmed Tamane";
  let isTypingDone = false;

  function typeWriterEffect() {
    nameElement.text("");
    let charIndex = 0;

    function typeChar() {
      if (charIndex < fullName.length) {
        nameElement.text(fullName.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, 200);
      } else {
        isTypingDone = true;
        // Add blinking cursor after typing is complete
        nameElement.append('<span class="typing-cursor">|</span>');
      }
    }

    typeChar();
  }

  // Start typing animation on page load
  typeWriterEffect();

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

  // Reveal sections on scroll
  $(window).on("scroll", revealSections);

  // Reveal sections that are already in view on page load
  revealSections();

  // Set Home as active by default
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

  // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
  $(window).on("scroll", function () {
    const scrollPos = $(window).scrollTop() + 100;

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
  });

  // ===== ANIMATE SKILL BARS ON SCROLL =====
  let skillsAnimated = false;

  function animateSkills() {
    const skillsSection = $("#skills");
    if (!skillsSection.length) return;

    const sectionTop = skillsSection.offset().top;
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();

    if (scrollTop + windowHeight > sectionTop + 100 && !skillsAnimated) {
      $(".skill-progress").each(function () {
        const skillValue = $(this).data("skill");
        $(this).css("width", skillValue + "%");
      });
      skillsAnimated = true;
    }
  }

  $(window).on("scroll", animateSkills);
  animateSkills(); // Check on load

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
