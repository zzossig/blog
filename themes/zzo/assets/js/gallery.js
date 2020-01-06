var startGallery = function() {
  /* Get the documentElement (<html>) to display the page in fullscreen */
  var docElem = document.documentElement;

  /* View in fullscreen */
  function openFullscreen() {
    if (docElem.requestFullscreen) {
      docElem.requestFullscreen();
    } else if (docElem.mozRequestFullScreen) { /* Firefox */
      docElem.mozRequestFullScreen();
    } else if (docElem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElem.webkitRequestFullscreen();
    } else if (docElem.msRequestFullscreen) { /* IE/Edge */
      docElem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  function closeFullscreen() {
    if (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }
  }

  var singleContentsElem = document.querySelector('.single__contents');
  var swipeWrapElem = document.querySelector('.swipe-wrap');
  var mySwipeElem = document.getElementById('mySwipe');
  var arrowLeftElem = document.querySelector('.modal__arrow--left');
  var arrowRightElem = document.querySelector('.modal__arrow--right');
  var closeElem = document.querySelector('.modal__toolbar--close');
  var fullElem = document.querySelector('.modal__toolbar--full');
  var normalElem = document.querySelector('.modal__toolbar--normal');
  var captionElem = document.querySelector('.modal__caption');
  var pagingElem = document.querySelector('.modal__paging');
  var imgTotalNum = singleContentsElem.querySelectorAll('img').length;
  var mySwipe = null;
  var keydownFunction = function (e) {
    if (e.key === 'ArrowRight') {
      mySwipe.next();
    } else if (e.key === 'ArrowLeft') {
      mySwipe.prev();
    }
  }

  MicroModal.init({
    onClose: () => {
      if (mySwipe) {
        mySwipe.kill();
        mySwipe = null;
        closeFullscreen();
      }
      window.removeEventListener('keydown', keydownFunction);
    },
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: false,
    awaitCloseAnimation: false,
    debugMode: false,
  });

  singleContentsElem.querySelectorAll('img').forEach(function (elem, idx) {
    elem.style.cursor = 'pointer';

    var clonedElem = elem.cloneNode(true);
    clonedElem.style.maxHeight = '100vh';
    clonedElem.onclick = function (e) {
      e.stopPropagation();
    }

    var wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.height = '100vh';
    wrapper.setAttribute('data-micromodal-close', '');
    wrapper.onclick = function () {
      if (mySwipe) {
        mySwipe.kill();
        mySwipe = null;
      }
    }
    wrapper.append(clonedElem);
    swipeWrapElem.append(wrapper);

    elem.addEventListener('click', function (e) {
      MicroModal.show('modal');
      if (mySwipe) {
        mySwipe.kill();
        mySwipe = null;
      }

      // swipe initialize
      mySwipe = new Swipe(mySwipeElem, {
        startSlide: idx,
        draggable: true,
        autoRestart: false,
        continuous: false,
        disableScroll: true,
        stopPropagation: true,
        callback: function (index, element) {
          // caption
          var imgElem = element.querySelector('img');
          if (captionElem && imgElem) {
            var caption = null;
            if (imgElem.getAttribute('data-caption')) {
              caption = imgElem.getAttribute('data-caption');
            } else if (imgElem.getAttribute('title')) {
              caption = imgElem.getAttribute('title');
            } else if (imgElem.getAttribute('alt')) {
              caption = imgElem.getAttribute('alt');
            } else {
              caption = imgElem.getAttribute('src');
            }

            captionElem.innerText = caption;
            pagingElem.innerText = (index + 1) + ' / ' + imgTotalNum;
          }
        },
      });

      // caption
      if (captionElem) {
        var caption = null;
        if (e.target.getAttribute('data-caption')) {
          caption = e.target.getAttribute('data-caption');
        } else if (e.target.getAttribute('title')) {
          caption = e.target.getAttribute('title');
        } else if (e.target.getAttribute('alt')) {
          caption = e.target.getAttribute('alt');
        } else {
          caption = e.target.getAttribute('src');
        }

        captionElem.innerText = caption;
        pagingElem.innerText = (idx + 1) + ' / ' + imgTotalNum;
      }

      if (normalElem && fullElem) {
        normalElem.style.zIndex = -1;
        normalElem.style.opacity = 0;
        fullElem.style.zIndex = 25;
        fullElem.style.opacity = 1;
      }
    });

    window.addEventListener('keydown', keydownFunction);
  });

  arrowLeftElem ?
    arrowLeftElem.addEventListener('click', function () {
      if (mySwipe) {
        mySwipe.prev();
      }
    }) : null;
  arrowRightElem ?
    arrowRightElem.addEventListener('click', function () {
      if (mySwipe) {
        mySwipe.next();
      }
    }) : null;

  closeElem ?
    closeElem.addEventListener('click', function () {
      if (mySwipe) {
        mySwipe.kill();
        mySwipe = null;
      }
      closeFullscreen();
      MicroModal.close('modal');
    }) : null;

  fullElem ?
    fullElem.addEventListener('click', function (e) {
      openFullscreen();
      if (normalElem) {
        normalElem.style.zIndex = 25;
        normalElem.style.opacity = 1;
        fullElem.style.zIndex = -1;
        fullElem.style.opacity = 0;
      }
    }) : null;

  normalElem ?
    normalElem.addEventListener('click', function (e) {
      closeFullscreen();
      if (fullElem) {
        fullElem.style.zIndex = 25;
        fullElem.style.opacity = 1;
        normalElem.style.zIndex = -1;
        normalElem.style.opacity = 0;
      }
    }) : null;
}