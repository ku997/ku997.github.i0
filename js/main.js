
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initHomeSlider() {
  new Swiper(".content__slider", {
    direction: "horizontal",
    slidesPerView: 1,
    mousewheel: Boolean(window.innerWidth > 1024),
    forceToAxis: true,
    pagination: {
      el: ".content__slider-pagination",
      clickable: true
    }
  });
}

function initInMotionSlider() {
  new Swiper(".inMotion__slider", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      480: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    }
  });
  new Swiper(".inMotion__portfolio-slider", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      480: {
        slidesPerView: 2
      },
      1280: {
        slidesPerView: 3
      }
    }
  });
  document.querySelectorAll(".inMotion__portfolio-container").forEach(function (item) {
    item.addEventListener("click", function () {
      this.classList.toggle("inMotion__portfolio-container--active");
    });
  });
}

function initServicesSlider() {
  new Swiper(".services__localization-slider", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 15,
    breakpoints: {
      576: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 35
      }
    }
  });
}

function initContanctsSelect() {
  var select = document.querySelector(".modal__select");
  var value = select.querySelector(".modal__select-value");
  var options = select.querySelectorAll(".modal__select-options li");

  function chooseOption(e) {
    e.stopPropagation();
    value.innerHTML = this.innerHTML;
    toggleSelect(e);
  }

  function toggleSelect(e) {
    e.stopPropagation();
    select.classList.toggle("modal__select--open");
  }

  select.addEventListener("click", toggleSelect);
  options.forEach(function (el) {
    el.addEventListener("click", chooseOption);
  });
}

function initContactsModal() {
  var errorHeader = document.querySelector(".modal__header--error");
  var initialHeader = document.querySelector(".modal__header");
  var name = document.querySelector(".modal__input-name");
  var company = document.querySelector(".modal__input-company");
  var phone = document.querySelector(".modal__input-phone");
  var email = document.querySelector(".modal__input-email");
  var file = document.querySelector(".modal__input-file");
  var task = document.querySelector(".modal__textarea-input");
  var doneButton = document.querySelector(".modal__done-btn");
  var contactsModal = document.querySelector(".contacts-modal");
  var showModalItems = document.querySelectorAll(".show-modal-button");
  var modalClosers = document.querySelectorAll(".contact-modal-closer");
  var fields = [name, company, phone, email, file, task];

  var checkError = function checkError() {
    var hasError = false;
    fields.forEach(function (item) {
      if (!item.value) {
        hasError = true;
      }
    });

    if (hasError) {
      initialHeader.style.display = "none";
      errorHeader.style.display = "block";
    } else {
      initialHeader.style.display = "block";
      errorHeader.style.display = "none";
    }
  };

  showModalItems.forEach(function (item) {
    item.addEventListener("click", function () {
      contactsModal.classList.add("contacts-modal--open");
    });
  });
  modalClosers.forEach(function (item) {
    item.addEventListener("click", function () {
      contactsModal.classList.remove("contacts-modal--open");
    });
  });
  doneButton.addEventListener("click", checkError);
}

function initPlayerApi() {}

function initPlayer() {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;

  window.onYouTubePlayerAPIReady = function () {
    player = new YT.Player("video", {
      events: {
        onReady: onPlayerReady,
        onStateChange: onPause
      }
    });
  };

  function onPause(event) {
    var playButtons = document.querySelectorAll("#play-button");
    playButtons.forEach(function (item) {
      if (item.classList.contains("project__content-video-control--active") && event.data === 2) {
        item.classList.remove("project__content-video-control--play");
        item.classList.add("project__content-video-control--paused");
      }

      if (item.classList.contains("project__content-video-control--active") && event.data === 1) {
        item.classList.add("project__content-video-control--play");
        item.classList.remove("project__content-video-control--paused");
      }
    });
  }

  function onPlayerReady() {
    var playButtons = document.querySelectorAll("#play-button");
    playButtons.forEach(function (item) {
      item.addEventListener("click", function () {
        var isActive = item.classList.contains("project__content-video-control--active");
        var isPaused = item.classList.contains("project__content-video-control--paused");
        var isPlaying = item.classList.contains("project__content-video-control--play");

        if (isActive && !isPlaying && !isPaused) {
          item.classList.add("project__content-video-control--play");
          return player.playVideo();
        }

        if (isPaused) {
          item.classList.remove("project__content-video-control--paused");
          item.classList.add("project__content-video-control--play");
          return player.playVideo();
        }

        if (isActive) {
          item.classList.remove("project__content-video-control--play");
          item.classList.add("project__content-video-control--paused");
          return player.pauseVideo();
        } else {
          playButtons.forEach(function (button) {
            button.classList.remove("project__content-video-control--active");
            button.classList.remove("project__content-video-control--paused");
            button.classList.remove("project__content-video-control--play");
          });
          item.classList.add("project__content-video-control--active");
          item.classList.add("project__content-video-control--play");
          player.loadVideoById(item.value);
        }
      });
    });
  }
}

function setListPaddings() {
  var lists = document.querySelectorAll(".project__content-list");
  lists.forEach(function (item) {
    for (var i = 0; i < item.children.length; i++) {
      item.children[i].style.paddingLeft = 20 * (i + 1) + "px";
    }
  });
}

function init() {
  var select = document.querySelectorAll(".lang-switcher");
  select.forEach(function (item) {
    var optionsWrapper = item.querySelector(".lang-switcher-options");
    var value = item.querySelector(".lang-switcher-value");
    var options = item.querySelectorAll(".lang-switcher-options li");

    function chooseOption(e) {
      e.stopPropagation();
      value.innerHTML = this.innerHTML;
      toggleSelect(e);
    }

    function toggleSelect(e) {
      e.stopPropagation();
      optionsWrapper.classList.toggle("language__select-options--open");
    }

    item.addEventListener("click", toggleSelect);
    options.forEach(function (el) {
      el.addEventListener("click", chooseOption);
    });
  });

  function onSidebarToggle() {
    document.querySelector(".sidebar-toggler").classList.toggle("toggled");
    document.querySelector(".sidebar").classList.toggle("sidebar--visible");
  }

  document.querySelector(".sidebar-toggler.cross").addEventListener("click", onSidebarToggle);
  document.querySelector(".sidebar-toggler").addEventListener("click", onSidebarToggle);
  document.querySelector(".header__sidebar-search").addEventListener("click", function () {
    document.querySelector("#header__search").classList.toggle("header__search--visible");
  });
  document.querySelector(".header__search-background").addEventListener("click", function (e) {
    e.stopPropagation();
    document.querySelector("#header__search").classList.toggle("header__search--visible");
  });
}

var tl = gsap.timeline(); //common animations

function fadeOut(container) {
  return tl.to(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8
  });
}

function fadeIn(container) {
  return tl.from(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8
  });
} //home animation


function homePageAnimationOut(container) {
  return tl.to(container.querySelector(".header__sidebar-background"), {
    height: "0%",
    duration: 0.3
  }).to(container.querySelector(".sidebar"), {
    width: 0,
    padding: "0",
    duration: 0.3
  }).to(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8
  }, "<");
}

function homePageAnimationIn(container) {
  return tl.from(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8
  }).from(container.querySelector(".sidebar"), {
    width: 0,
    padding: "0",
    duration: 0.3
  }, "<").from(container.querySelector(".header__sidebar-background"), {
    height: "0%",
    duration: 0.3
  });
} //service animation


function serviceAnimationIn(container) {
  return tl.from(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8
  }).from(container.querySelector(".project__sidebar-inner"), {
    x: -1000,
    duration: 0.3
  }, "<");
}

function serviceAnimationOut(container) {
  return tl.to(container.querySelector(".main__background"), {
    opacity: 1,
    duration: 0.8
  }).to(container.querySelector(".project__sidebar-inner"), {
    x: -1000,
    duration: 0.4
  }, "<");
} //init animations


barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "common",
      async leave(data) {
        if (["home"].includes(data.current.namespace)) {
          await homePageAnimationOut(data.current.container);
        } else if (["service", "in-motion", "monster"].includes(data.current.namespace)) {
          await serviceAnimationOut(data.current.container);
        } else {
          await fadeOut(data.current.container);
        }
        data.current.container.remove();
      },
      async enter(data) {
        if (["home"].includes(data.next.namespace)) {
          await homePageAnimationIn(data.next.container);
        } else if (["service", "in-motion", "monster"].includes(data.next.namespace)) {
          await serviceAnimationIn(data.next.container);
        } else {
          await fadeIn(data.next.container);
        }
      },
    },
  ],
  views: [
    {
      namespace: "home",
      beforeEnter() {
        initHomeSlider();
      },
    },
    {
      namespace: "in-motion",
      async beforeEnter(data) {
        initInMotionSlider();
        setListPaddings();
        await initPlayerApi();
        initPlayer(data);
      },
    },
    {
      namespace: "monster",
      async beforeEnter(data) {
        setListPaddings();
        await initPlayerApi();
        initPlayer(data);
      },
    },
    {
      namespace: "service",
      beforeEnter() {
        setListPaddings();
      },
    },
    {
      namespace: "services",
      beforeEnter() {
        setListPaddings();
        initServicesSlider();
        initContanctsSelect();
        initContactsModal();
      },
    },
  ],
});

barba.hooks.afterEnter(() => {
  init();
});
