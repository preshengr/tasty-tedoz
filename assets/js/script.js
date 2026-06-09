/* ============================================================
   TASTY TEDOZ — master.js
   Single JS file shared across all pages:
     index.html | About.html | Services.html
     Contact.html | Blog.html
   ============================================================ */

/* ============================================================
   SECTION 1: MOBILE NAVIGATION (hamburger toggle)
   — applies to every page
   ============================================================ */
(function initNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger || !navLinks) return;

  // Toggle open / close on hamburger click
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close the mobile menu whenever a nav link is tapped
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });
})();

/* ============================================================
   SECTION 2: BACK-TO-TOP BUTTON
   — applies to every page
   ============================================================ */
(function initBackToTop() {
  const backToTop = document.getElementById("backToTop");
  if (!backToTop) return;

  // Show button after scrolling 400px
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  // Smooth-scroll to top on click
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ============================================================
   SECTION 3: PRODUCT FILTER TABS
   — Services.html only (.filter-btn / #productsGrid)
   ============================================================ */
(function initProductFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const products = document.querySelectorAll("#productsGrid .product-card");

  if (!filterBtns.length || !products.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Mark active tab
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      // Show / hide product cards by category
      products.forEach((card) => {
        const cats = card.dataset.category || "";
        card.style.display =
          filter === "all" || cats.includes(filter) ? "" : "none";
      });
    });
  });
})();

/* ============================================================
   SECTION 4: BLOG CATEGORY FILTER TABS
   — Blog.html only (.blog-filter-btn / #blogGrid)
   ============================================================ */
(function initBlogFilter() {
  const filterBtns = document.querySelectorAll(".blog-filter-btn");
  const blogCards = document.querySelectorAll("#blogGrid .blog-card");

  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Mark active tab
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      // Show / hide blog cards by category
      blogCards.forEach((card) => {
        const cat = card.dataset.category || "";
        card.style.display = filter === "all" || cat === filter ? "" : "none";
      });
    });
  });
})();

/* ============================================================
   SECTION 5: CONTACT FORM — post data to tastytedoz@protonmail.com
   — Contact.html (#contactForm)
   Uses a mailto: fallback (opens the user's mail client with all
   field values pre-filled) since static HTML pages cannot send
   email server-side. A backend / EmailJS integration can replace
   the mailto dispatch while keeping this handler intact.
   ============================================================ */
function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById("contactForm");
  if (!form) return;

  // Collect field values
  const firstName = (form.firstName.value || "").trim();
  const lastName = (form.lastName.value || "").trim();
  const email = (form.email.value || "").trim();
  const phone = (form.phone.value || "").trim();
  const subject = (form.subject.value || "").trim();
  const message = (form.message.value || "").trim();

  // Build mailto string — sends to tastytedoz@protonmail.com
  const recipient = "tastytedoz@protonmail.com";

  const mailSubject = encodeURIComponent(
    "New Enquiry from " +
      firstName +
      " " +
      lastName +
      (subject ? " — " + subject : ""),
  );

  const body = encodeURIComponent(
    "Name:    " +
      firstName +
      " " +
      lastName +
      "\n" +
      "Email:   " +
      email +
      "\n" +
      "Phone:   " +
      (phone || "Not provided") +
      "\n" +
      "Subject: " +
      (subject || "General") +
      "\n\n" +
      "Message:\n" +
      message +
      "\n\n" +
      "— Sent via Tasty Tedoz Website",
  );

  // Open mail client with pre-filled fields
  window.location.href =
    "mailto:" + recipient + "?subject=" + mailSubject + "&body=" + body;

  // Show success message and hide form
  form.style.display = "none";
  const successMsg = document.getElementById("successMsg");
  if (successMsg) successMsg.style.display = "block";
}

/* ============================================================
   SECTION 6: NEWSLETTER FORM — post subscription email
   — index.html, Services.html, Blog.html (.newsletter-form)
   Opens a mailto to tastytedoz@protonmail.com with the
   subscriber's email address pre-filled.
   ============================================================ */
(function initNewsletterForms() {
  const forms = document.querySelectorAll(".newsletter-form");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";

      if (!email) return;

      const recipient = "tastytedoz@protonmail.com";
      const subject = encodeURIComponent("Newsletter Subscription Request");
      const body = encodeURIComponent(
        "Hi Tasty Tedoz Team,\n\n" +
          "Please add the following email to your newsletter list:\n\n" +
          email +
          "\n\n" +
          "— Sent via Tasty Tedoz Website",
      );

      window.location.href =
        "mailto:" + recipient + "?subject=" + subject + "&body=" + body;

      // Visual feedback — swap input for a thank-you note
      form.innerHTML =
        '<p style="color:#fff; font-weight:600; font-size:1rem;">' +
        "✅ Thank you! Your email client will open to confirm your subscription." +
        "</p>";
    });
  });
})();

// Mobile hamburger toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close nav when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

// Back-to-top visibility
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
document.addEventListener("DOMContentLoaded", () => {
  const videoWrapper = document.getElementById("videoWrapper");
  const video = document.getElementById("myVideo");
  const playBtn = document.getElementById("playBtn");

  // Execution path when target elements are selected
  function handlePlay() {
    video.play();
    videoWrapper.classList.add("is-playing");
    // Shows built-in browser timeline, pause, and volume controls post-click
    video.setAttribute("controls", "true");
  }

  // Interaction triggers
  playBtn.addEventListener("click", handlePlay);
  video.addEventListener("click", () => {
    if (video.paused) {
      handlePlay();
    }
  });
});
