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
  const dropdowns = document.querySelectorAll('#info .dropdown');

  if (dropdowns.length) {
    dropdowns.forEach(dropdown => {
      const regionLinks = dropdown.querySelectorAll('.region-link');
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  
      if (regionLinks && dropdownToggle) {
        regionLinks.forEach(link => {
          link.addEventListener('click', function (event) {
            event.preventDefault();
  
            // Меняем текст в соответствующем dropdown-toggle
            dropdownToggle.textContent = this.textContent;
          });
        });
      }
    });
  }

  /* dropdown */
	const materials = document.querySelectorAll(
		".sSearch-filter--js label"
	);

	const materialsToggle = document.querySelector(
		".sSearch-filter--js .dropdown-toggle"
	);

	if (materials && materialsToggle) {
		materials.forEach(link => {
			link.addEventListener("click", function (event) {
				// event.preventDefault();
        console.dir(link.children[1]);

				materialsToggle.textContent = link.children[1].textContent;
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

  if(inputFile) {
    btnUploadFile.addEventListener('click', () => {
      inputFile.click();
    });

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

  //comments
  
  let showCommentCards = document.querySelectorAll(".comment-person2");
  showCommentCards.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();

      const btn = el.nextElementSibling.children[0];
      const comment = el.nextElementSibling.children[1];

      btn.classList.toggle("visually-hidden");
      comment.classList.toggle("visually-hidden");
    })
  })

  let showCommentBtns = document.querySelectorAll(".comment-btn-js");
  let hideCommentBtns = document.querySelectorAll(".hide-comment-js");
  showCommentBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let comment = btn.nextElementSibling;
      let control = comment.nextElementSibling
      comment.classList.remove("visually-hidden");
      btn.classList.add("visually-hidden");
      if (control) control.classList.add("visually-hidden");
    });
  });
  hideCommentBtns.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      let comment = btn.closest(".comment-body-js");
      comment.classList.add("visually-hidden");

      let showBtn = comment.previousElementSibling;
      showBtn.classList.remove("visually-hidden");

      let control = comment.nextElementSibling
      if (control) control.classList.remove("visually-hidden");
    });
  });

  // toggle active
  const linkItems = document.querySelectorAll('.sArticle__sorting .link-item')
  if (linkItems.length) {
    linkItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (item !== e.target) {
          linkItems.forEach(el => el.classList.remove('active'))
          item.classList.add('active')
        }
      })
    })
  }

  /* sorts tag */
  const tags = document.querySelectorAll('.sArticle__item-sort:not(.item-sort-main)')
  if (tags.length) {
    tags.forEach(tag => {
      tag.addEventListener('click', (e)=> {
        e.preventDefault()
        if (e.target.closest('.icon')) {
          tag.remove();
        }
      })
    })
  }

  /* filter */
  const filterTitles = document.querySelectorAll('.filter-mobile__f-title')
  const regLinks = document.querySelectorAll('.region-link')

  if (filterTitles.length) {
    filterTitles.forEach(title => {
      title.addEventListener('click', (e) => {
        const clickedFilter = e.target.closest('.filter-mobile__filter-wrap');
        const isAlreadyOpen = clickedFilter.classList.contains('show');

        document.querySelectorAll('.filter-mobile__filter-wrap').forEach(filter => {
          filter.classList.remove('show');
        });

        if (!isAlreadyOpen) {
          clickedFilter.classList.add('show');
        }
      });
    });

    regLinks.forEach((el) => {
      el.addEventListener('click', ()=> {
        const activeF = document.querySelector('.filter-mobile__filter-wrap.show')
        if (activeF) {
          activeF.classList.remove('show');
        }
      })
    })
  }

  document.addEventListener('click', (e)=> {
    const activeF = document.querySelector('.filter-mobile__filter-wrap.show')
    const closest = e.target.closest('.filter-mobile__filter-wrap.show')
    if (activeF && !closest) {
      activeF.classList.remove('show');
    }
  })

  /* filter control */
  const filterOpen = document.querySelector('.filter-toggle')
  const filterWrap= document.querySelector('.filter-mobile')
  
	const iconClose = document.querySelector(
		".filter-mobile .icon-cross"
	);

  if (filterOpen) {
    filterOpen.addEventListener('click', ()=> {
      document.body.classList.add("filters-show");
			filterWrap.classList.toggle("show");
    })
    iconClose.addEventListener('click', ()=> {
      document.body.classList.remove("filters-show");
			filterWrap.classList.toggle("show");
    })
  }

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
