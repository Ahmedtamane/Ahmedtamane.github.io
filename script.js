$(document).ready(function () {
  console.log("Portfolio enhanced – extracting profile colors...");

  // 1. Add floating animation to profile picture
  const $profileImg = $("#profile-img");
  $profileImg.addClass("profile-float");
  console.log("Floating animation added to profile picture");

  // 2. Extract dominant color from profile image
  const img = document.getElementById("profile-img");

  function extractColorAndApply() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Sample the center area (avoiding hair/background extremes)
    const centerX = Math.floor(img.width / 2);
    const centerY = Math.floor(img.height / 4); // forehead area
    const pixel = ctx.getImageData(centerX, centerY, 1, 1).data;
    const [r, g, b] = pixel;

    // Convert to HSL and find harmonious palette
    const hsl = rgbToHsl(r, g, b);
    const primaryHue = hsl[0]; // base hue from photo

    // Generate professional color variants
    const primary = hslToHex(primaryHue, 0.65, 0.55);
    const primaryLight = hslToHex(primaryHue, 0.8, 0.65);
    const primaryDark = hslToHex(primaryHue, 0.7, 0.35);
    const secondary = hslToHex(primaryHue, 0.15, 0.1);
    const glassBg = `rgba(${r}, ${g}, ${b}, 0.15)`;
    const shadowColor = `rgba(${r}, ${g}, ${b}, 0.55)`;

    // Apply to CSS variables
    const root = document.documentElement;
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--primary-light", primaryLight);
    root.style.setProperty("--primary-dark", primaryDark);
    root.style.setProperty("--secondary", secondary);
    root.style.setProperty("--glass-bg", glassBg);
    root.style.setProperty("--shadow-color", shadowColor);
    root.style.setProperty("--progress-bg", "#e2e8f0"); // keep light

    console.log("Color scheme applied based on your photo!", primary);
  }

  // Helper functions
  function rgbToHsl(r, g, b) {
    ((r /= 255), (g /= 255), (b /= 255));
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }
    return [h * 360, s, l];
  }

  function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    g = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    b = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${b}`;
  }

  // Wait for image to load, then extract
  if (img.complete) {
    extractColorAndApply();
  } else {
    img.addEventListener("load", extractColorAndApply);
  }

  // 2. Animate skill bars on scroll
  let skillsAnimated = false;
  const $progressBars = $(".progress-bar");

  function animateSkills() {
    const skillsSection = document.getElementById("skills");
    if (!skillsSection) return;
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100 && !skillsAnimated) {
      $progressBars.each(function () {
        const skillValue = $(this).data("skill");
        $(this).css("width", skillValue + "%");
      });
      skillsAnimated = true;
    }
  }

  $(window).on("scroll", animateSkills);
  animateSkills(); // check on load

  // 3. Smooth scroll for anchor links (if any added)
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top - 80 }, 600);
    }
  });
});
