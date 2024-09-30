function cursor() {
  var cursor = document.querySelector(".cursor");
  var cursorinner = document.querySelector(".cursor2");
  var a = document.querySelectorAll("a");

  document.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    cursorinner.style.left = e.clientX + "px";
    cursorinner.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", function () {
    cursor.classList.add("click");
    cursorinner.classList.add("cursorinnerhover");
  });

  document.addEventListener("mouseup", function () {
    cursor.classList.remove("click");
    cursorinner.classList.remove("cursorinnerhover");
  });

  a.forEach((item) => {
    item.addEventListener("mouseover", () => {
      cursor.classList.add("hover");
    });
    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });
}

function revalToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // create two spans
    let parent = document.createElement("span");
    let child = document.createElement("span");

    // parent and child both sets their respective classes
    parent.classList.add("parent");
    child.classList.add("child");

    // span parent gets child and child gets elem details
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // elem replaces its value with parent span
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function loaderAnimations() {
  let tl = gsap.timeline();

  tl.from(".loader .child span", {
    x: 400,
    duration: 1,
    opacity: 0,
    stagger: 0.2,
    ease: Power3.easeInOut,
  });
  tl.to(".loader .parent .child", {
    y: "-100%",
    duration: 1,
    delay: 1,
    opacity: 0,
    ease: Circ.easeInOut,
  });
  tl.to(".loader", {
    height: 0,
    duration: 1,
    ease: Circ.easeInOut,
  });

  tl.to(".gray", {
    height: "100%",
    top: 0,
    duration: 0.9,
    delay: -1,
    ease: Circ.easeInOut,
  });

  tl.to(".gray", {
    height: "0%",
    duration: 1,
    delay: -0.5,
    ease: Circ.easeInOut,
    onComplete: function () {
      // animateHomepage();      
      clickdiv();

    },
  });
  tl.from(".anime", {
    duration: 0.3,
    y: -100,
    opacity: 0,
    stagger: 0.2,
  });
  tl.from(".leftanime", {
    x: -100,
    delay: 0.1,
    opacity: 0,
    stagger: 0.2, 
  });
  tl.from(".iconsanimation, .elastic, .elastic2",{
    duration:1.2,
    ease: "elastic.out(1,0.3)",
    x: -150,
    stagger: 0.1, 
    opacity: 0,
  })
}

function clickdiv() {
  const aboutBtn = document.querySelector('.aboutme');
  const vaporDiv = document.querySelector('.waraperdiv');

  aboutBtn.addEventListener('click', () => {
    gsap.to(vaporDiv, {
      opacity: 1,
      scale: 1, // Scale it to full size when clicked
      borderRadius: 0, // Remove border radius for the animation
      duration: 1, // 
      ease: "power2.out"
    });
  });

  vaporDiv.addEventListener('click', () => {
    gsap.to(vaporDiv, {
      opacity: 0,
      scale: 0, // Shrink back when clicked
      borderRadius: "30px", // Return border radius
      duration: 1,
      ease: "power2.in"
    });
  });
}




Shery.makeMagnet(".magnet-target");

cursor();
revalToSpan();
loaderAnimations();
locoInitialize();

