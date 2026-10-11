// 1. Grab elements
const items = document.querySelectorAll(".item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const counter = document.querySelector(".lightbox-counter");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
const filterBtns = document.querySelectorAll(".filter-btn");

// 2. State
let visibleItems = [...items];
let currentIndex = 0;

// 3. Functions
// Puts the image at `index` into the lightbox and updates the counter
const showImage = (index) => {
  currentIndex = index;

  const img = visibleItems[index].querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
};

const openLightbox = (index) => {
  showImage(index);
  lightbox.classList.add("open");
  document.body.classList.add("no-scroll");
};

const closeLightbox = () => {
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
};

const showNext = () => {
  if (currentIndex === visibleItems.length - 1) {
    showImage(0); // last image, so wrap to the first
  } else {
    showImage(currentIndex + 1);
  }
};

const showPrev = () => {
  if (currentIndex === 0) {
    showImage(visibleItems.length - 1); // first image, so wrap to the last
  } else {
    showImage(currentIndex - 1);
  }
};

const applyFilter = (category) => {
  items.forEach((item) => {
    // matches if the filter is "all" or the item's category equals the filter
    const match = category === "all" || item.dataset.category === category;

    // add "hide" when it does NOT match, remove it when it does
    item.classList.toggle("hide", !match);
  });

  // lightbox next/prev and the counter only use the items still showing
  visibleItems = [...items].filter((item) => !item.classList.contains("hide"));
};

// 4. Event listeners
items.forEach((item) => {
  item.addEventListener("click", () => {
    const index = visibleItems.indexOf(item);
    openLightbox(index);
  });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// click on the dark backdrop closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// keyboard controls, only while the lightbox is open
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeLightbox();
  } else if (e.key === "ArrowLeft") {
    showPrev();
  } else if (e.key === "ArrowRight") {
    showNext();
  }
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.filter);
  });
});
