// Section 1 
 document.addEventListener("DOMContentLoaded", function () {
  const imagePairs = [
    {
      product: "./assets/Images/product-offer.png",
      main: "./assets/Images/offer-image.png"
    },
    {
      product: "./assets/Images/product-offer2.jpg",
      main: "./assets/Images/image-offer2.jpg"
    },
    {
      product: "./assets/Images/product-offer3.jpg",
      main: "./assets/Images/image-offer3.jpg"
    },
  ];

  let currentIndex = 0;

  function updateImages() {
    const mainImg = document.getElementById("mainImage");
    const productImg = document.getElementById("productImage");
    if (mainImg && productImg) {
      mainImg.src = imagePairs[currentIndex].main;
      productImg.src = imagePairs[currentIndex].product;
    }
  }

  window.nextItem = function () {
    currentIndex = (currentIndex + 1) % imagePairs.length;
    updateImages();
  };

  window.prevItem = function () {
    currentIndex = (currentIndex - 1 + imagePairs.length) % imagePairs.length;
    updateImages();
  };

  // Section 2 
  
  const hearts = document.querySelectorAll(".heart-icon");
  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      heart.classList.toggle("red");
    });
  });

  // Section 4 
 
  (function () {
    const items = Array.from(document.querySelectorAll(".card-item-section4"));
    if (!items.length) return;
    const total = items.length;
    let active = 2;

    function render() {
      items.forEach((it, i) => {
        it.className = "card-item-section4"; 
        it.classList.remove("center", "left-front", "left-back", "right-front", "right-back", "inactive");
        const diff = ((i - active + total) % total);
        if (diff === 0) {
          it.classList.add("center");
        } else if (diff === 1) {
          it.classList.add("right-front");
        } else if (diff === 2) {
          it.classList.add("right-back");
        } else if (diff === total - 1) {
          it.classList.add("left-front");
        } else if (diff === total - 2) {
          it.classList.add("left-back");
        } else {
          it.classList.add("inactive");
        }
      });
    }

    function next() {
      active = (active + 1) % total;
      render();
    }

    function prev() {
      active = (active - 1 + total) % total;
      render();
    }

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", next);
      prevBtn.addEventListener("click", prev);
    }

    items.forEach((el, idx) => {
      el.addEventListener("click", () => {
        active = idx;
        render();
      });
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    });

    const wrap = document.querySelector(".cards-section4");
    if (wrap) {
      let startX = null;
      wrap.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
      wrap.addEventListener("touchend", (e) => {
        if (startX == null) return;
        const diff = e.changedTouches[0].clientX - startX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) next(); else prev();
        }
        startX = null;
      });
    }

    render();
  })();
});
