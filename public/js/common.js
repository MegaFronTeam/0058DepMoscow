"use strict";

// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
// import JSCCommon from "./JSCCommon.js";

function eventHandler() {
	// const $ = jQuery;
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".breadcrumb-slider--js", {
		slidesPerView: "auto",
		freeMode: true,
		watchOverflow: true,
	});

	const swiper4 = new Swiper(".sBanners__slider--js", {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: "auto",
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	});
  const swiperTabs = new Swiper('.tabs-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});


  window.addEventListener('load', () => {
    const user = document.querySelector('.top-nav__user-wrap');
    const settings = document.querySelector('.top-nav__settings');

    if (user) {

      user.addEventListener('click', () => {
        settings.classList.toggle('d-none');
      });

      document.addEventListener('click', (event) => {
        const isClickInsideSettings = settings.contains(event.target);
        const isClickInsideUser = user.contains(event.target);

        if (!isClickInsideSettings && !isClickInsideUser) {
          settings.classList.add('d-none');
        }
      });
    }
  });

  /* cookie */
	let cookie = document.querySelector(".cookie");
	let cookieClose = document.querySelector(".cookie .close");
	if (cookieClose) {
		cookieClose.addEventListener("click", () => cookie.classList.add("closed"));
	}

  /* password */
  $(".btn-toggle-type-input").click(function(){
    let icon = $(this).find("svg.icon use")
    let iconId = $(this).find("svg.icon use").attr("xlink:href").split("#")[1];

    const opt = {
      'eye-off':  ['eye','password'],
      'eye':  ['eye-off','text'],
    }
    $(this).parent().find("input").attr("type", opt[iconId][1]);
    icon.attr("xlink:href",`img/svg/sprite.svg#${opt[iconId][0]}`)
  })

  /* textarea */
	let textareaAll = document.querySelectorAll('textarea')
  if( textareaAll.length ) {
    textareaAll.forEach(element => {
      element.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
      });
    })
  }

  /* dropdown */
	const regionLinks = document.querySelectorAll(
		"#info .region-link"
	);

	const dropdownToggle = document.querySelector(
		"#info .dropdown-toggle"
	);

	if (regionLinks && dropdownToggle) {
		regionLinks.forEach(link => {
			link.addEventListener("click", function (event) {
				event.preventDefault();

				dropdownToggle.textContent = this.textContent;
			});
		});
	}

  const dataPickers = document.querySelectorAll('.data-picker-wrap');
	for (const dataPickerEll of dataPickers) {
		const dataPicker = dataPickerEll.querySelector('.data-picker--js');
		const dataPickerIcon = dataPickerEll.querySelector(`.data-picker ~ .icon`);

		new AirDatepicker(dataPicker, {
			autoClose: false,
			// inline: true,
			container: dataPickerEll,
      position: 'top center',
			onShow() {
				dataPickerIcon.classList.add('active');
			},
			onHide() {
				dataPickerIcon.classList.remove('active');
			},
			navTitles: {
				days: 'MMMM <i>yyyy</i>',
			},
		});
	}

  
  const tiny = document.querySelectorAll('.tinny-item-js');
  tiny.forEach((el) => {
    const template = el.querySelector('.tinny-template');

    tippy(el, {
      content: template.innerHTML,
      allowHTML: true,
      interactive: true,
      // arrow: false,
    });
  });

  // function loadFile(event) {
  //   var preview = document.getElementById('previewImg');
  //   var file = event.target.files[0];
  //   var reader = new FileReader();

  //   reader.onload = function() {
  //       preview.src = reader.result;
  //   };

  //   if (file) {
  //       reader.readAsDataURL(file);
  //   }
// };
  const btnUploadFile = document.querySelector('.avatar-block-wrap .btn');
  // Select the hidden file input element
  const inputFile = document.querySelector('.avatar-block-wrap input[type="file"]');

  // Trigger the file input when the button is clicked
  btnUploadFile.addEventListener('click', () => {
    inputFile.click();
  });

  // Handle the file upload once the user selects a file
  inputFile.addEventListener('change', (event) => {
    const inputElem = event.target; // The file input element
    const avatarBlock = inputElem.closest('.avatar-block'); // Get the closest avatar block

    if (inputElem.files && inputElem.files[0]) {
      const imgPreview = avatarBlock.querySelector('.img-preview'); // Get the image preview element
      const file = inputElem.files[0];

      // Set the src of the image preview to the file's object URL
      imgPreview.src = URL.createObjectURL(file);
      imgPreview.classList.add("active"); // Add active class to show the image
    }
  });

}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
