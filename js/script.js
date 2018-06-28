var gridItems = document.querySelectorAll(".grid-item");
var circularRevealOverlay = document.querySelector(".circular-reveal__overlay");
var contentInfo = document.querySelector(".content-info");
var contentInfoUl = contentInfo.querySelector("ul");
var contentInfoChild = contentInfoUl.querySelectorAll("li");
var close = document.querySelector('.close');
var targetEl;

// Calculate transition delay for each grid item for inward animation
var gridItemsTrans = 2 / gridItems.length;

// Initial transition delay value for inward animation
var transitionDelay = 0.0;

// Mouse position onclick
var mousePosition = {
  posX: 0,
  posY: 0
};

// Add eventListeners
addListeners();

function addListeners() {
  for (var i = 0; i < gridItems.length; i++) {
    addEventListener(i);
  }

  close.addEventListener("click", onClose);
}

function addEventListener(i) {
  gridItems[i].addEventListener("click", showOverlayAndModal);
}

function onClose(e) {
  mousePosition.posX = e.pageX;
  mousePosition.posY = e.pageY;

  circularRevealOverlay.style.top = mousePosition.posY + "px";
  circularRevealOverlay.style.left = mousePosition.posX + "px";

  close.style.right = "-5%";
  staggerOut();
}

function slideOutGridItems(itemsToSlideOut) {
  itemsToSlideOut.forEach(item => {
    item.classList.add("out");
    item.style.transitionDelay = gridItemsTrans + "s";
    gridItemsTrans += 0.1;
  });
}

function showOverlayAndModal(e) {
  // Recalculate transition delay for each grid item for outward animation
  gridItemsTrans = 0.4 / gridItems.length;

  targetEl = e.target;
  slideOutGridItems(gridItems);

  mousePosition.posX = e.pageX;
  mousePosition.posY = e.pageY;

  // Set overlay position to mouse click position
  circularRevealOverlay.style.top = mousePosition.posY + "px";
  circularRevealOverlay.style.left = mousePosition.posX + "px";

  // Wait 4s before showing overlay and modal items
  setTimeout(function () {
    circularRevealOverlay.classList.add("open");
    staggerIn();
  }, 400);

  close.style.right = "2%";
  contentInfoChild.forEach((childItem, i) => {childItem.innerHTML = targetEl.children[0].innerHTML});
}

function staggerIn() {
  contentInfo.classList.add("open");
  contentInfoChild.forEach((childItem, i) => {
    childItem.classList.add("in");
    childItem.style.transitionDelay = transitionDelay + "s";
    // Increment transition delay by .3s
    transitionDelay += 0.3;
  });
}

function staggerOut() {
  // Reset of initial transition delay value for outward animation
  transitionDelay = 0.6;

  contentInfoChild.forEach((childItem, i) => {
    childItem.classList.remove("in");
    childItem.style.transitionDelay = transitionDelay + "s";
    // Decrement transition delay by .3s
    transitionDelay -= 0.3;
  });

  // Close circular overlay and slide out modal items afte 7s
  setTimeout(function () {
    contentInfo.classList.remove("open");
    circularRevealOverlay.classList.remove("open");

    contentInfoChild.forEach((childItem, i) => {
      childItem.innerHTML = "";
      childItem.classList.remove("in");
    });
  }, 900);

  // Slide in grid items after 7s
  setTimeout(function () {
    gridItems.forEach(allItem => {
      allItem.classList.remove("out");
      allItem.style.transitionDelay = gridItemsTrans + "s";
      gridItemsTrans -= 0.1;
    });
  }, 700);
}
