
//slick carousel
$('.post-wrapper').slick({
slidesToShow: 9,
slidesToScroll: 1,
autoplay: true,
autoplaySpeed: 2000,
nextArrow: $('.next'),
prevArrow: $('.prev'),
responsive: [
    {
      breakpoint: 1203,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 770,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 520,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
//slick carousel



//pagination
const galleryItems = document.querySelector(".gallery-items").children;
const prev = document.querySelector(".prevv");
const next = document.querySelector(".nextt");
const page = document.querySelector(".page-num");
const pageNum = document.querySelector(".pageNum");
const maxItem = 24;
let index = 1;

const pagination = Math.ceil(galleryItems.length / maxItem);
pageNum.innerHTML = pagination;

prev.addEventListener("click", function() {
  index--;
  check();
  showItems();
});
next.addEventListener("click", function() {
  index++;
  check();
  showItems();
});

function check() {
  if (index == pagination) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }

  if (index == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
}

function showItems() {
  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].classList.remove("show");
    galleryItems[i].classList.add("hide");


    if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
      // if i greater than and equal to (index*maxItem)-maxItem;
      // means  (1*8)-8=0 if index=2 then (2*8)-8=8
      galleryItems[i].classList.remove("hide");
      galleryItems[i].classList.add("show");
    }
    page.innerHTML = index;
  }


}

window.onload = function() {
  showItems();
  check();
}
//pagination


//filter Search
// $(document).ready(function(){
//   $("#myInput").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//       $(".gallery-items .item").filter(function() {
//         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//       });
//   });
// });
