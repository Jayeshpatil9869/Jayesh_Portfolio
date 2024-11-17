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
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

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
    delay: -1.4,
    ease: Circ.easeInOut,
  });

  tl.to(".gray", {
    height: "0%",
    duration: 1,
    delay: -0.5,
    ease: Circ.easeInOut,
    onComplete: function () {
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
  // tl.from(".bottomBtn", {
  //   y: 150,
  //   delay: 0.1,
  //   opacity: 0,
  //   stagger: 0.2,
  // });
  tl.from(".iconsanimation, .elastic, .elastic2", {
    duration: 1.2,
    ease: "elastic.out(1,0.3)",
    x: -150,
    stagger: 0.1,
    opacity: 0,
  });
  
}

function clickdiv() {
  const aboutBtn = document.querySelector(".aboutme");
  const vaporDiv = document.querySelector(".waraperdiv");

  aboutBtn.addEventListener("click", () => {
    gsap.to(vaporDiv, {
      opacity: 1,
      scale: 1,
      borderRadius: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  vaporDiv.addEventListener("click", () => {
    gsap.to(vaporDiv, {
      opacity: 0,
      scale: 0,
      borderRadius: "30px",
      duration: 1,
      ease: "power2.in",
    });
  });
}

function locoInitialize() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

  return locoScroll;
}

function scrollToWork() {
  const locoScroll = locoInitialize();
}

function cardHoverEffect() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showingImage;
    var colors = {
      'cnt1': '49545b',
      'cnt2': 'C8C7CB', 
      'cnt3': '3F3F3F',
      'cnt4': '694d43',
      'cnt5': 'dadde2',
      'cnt6': 'a2afa7'
    };

    // Get the image and video elements
    const img = cnt.querySelector('img');
    const video = cnt.querySelector('video');

    if (video) {
      video.loop = false; // Disable video looping
      // Preload video
      video.load();
    }

    cnt.addEventListener("mousemove", function (dets) {
      showingImage = dets.target;
      
      // Find which cnt class this element has
      let cntClass = Array.from(cnt.classList).find(c => colors[c]);
      let color = colors[cntClass] || dets.target.dataset.color;
      
      document.querySelector(".work").style.backgroundColor = "#" + color;

      // Show video and hide image on hover for all cnt classes
      if (video && (cnt.classList.contains('cnt1') || cnt.classList.contains('cnt2') || 
          cnt.classList.contains('cnt3') || cnt.classList.contains('cnt4') || 
          cnt.classList.contains('cnt5') || cnt.classList.contains('cnt6'))) {
        
        // Only play video if it's not already playing
        if (video.paused) {
          video.style.display = 'block';
          video.style.opacity = '1';
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Video play error:", error);
            });
          }
        }
        
        img.style.opacity = 0;
      }
    });

    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector(".work").style.backgroundColor = "#000";

      // Hide video and show image on mouse leave for all cnt classes
      if (video && (cnt.classList.contains('cnt1') || cnt.classList.contains('cnt2') || 
          cnt.classList.contains('cnt3') || cnt.classList.contains('cnt4') || 
          cnt.classList.contains('cnt5') || cnt.classList.contains('cnt6'))) {
        
        video.style.display = 'none';
        video.style.opacity = '0';
        video.pause();
        video.currentTime = 0; // Reset video position
        img.style.opacity = 1;
      }
    });

    // Add ended event listener to handle video completion
    if (video) {
      video.addEventListener('ended', function() {
        video.style.display = 'none';
        video.style.opacity = '0';
        img.style.opacity = 1;
      });
    }
  });
}


// Make sure Shery is defined before using it
if (typeof Shery !== "undefined") {
  Shery.makeMagnet(".magnet-target");
} else {
  console.warn("Shery is not defined. Make sure to include the Shery library.");
}





cursor();
revalToSpan();
loaderAnimations();  
cardHoverEffect();
scrollToWork();
locoInitialize();