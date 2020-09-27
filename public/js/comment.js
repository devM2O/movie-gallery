



  //pagination
  const galleryItems = $(".gallery-items");
  const prev = document.querySelector(".prevv");
  const next = document.querySelector(".nextt");
  const page = document.querySelector(".page-num");
  const pageNum = document.querySelector(".pageNum");
  const maxItem = 5;
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
      galleryItems[i].classList.remove("showshow");
      galleryItems[i].classList.add("hidehide");


      if (i >= (index * maxItem) - maxItem && i < index * maxItem) {
        // if i greater than and equal to (index*maxItem)-maxItem;
        // means  (1*8)-8=0 if index=2 then (2*8)-8=8
        galleryItems[i].classList.remove("hidehide");
        galleryItems[i].classList.add("showshow");
      }
      page.innerHTML = index;
    }
  }

  window.onload = function() {
    showItems();
    check();
  }
  //pagination



  $(document).ready(function () {
      $('.navbar li').click(function(e) {
          $('.navbar li').removeClass('active');
          var $this = $(this);
          if (!$this.hasClass('active')) {
              $this.addClass('active');
          }
        });
  });


  var open = false;
  var hideagain = `<span style="cursor: pointer;color:#383B41;" onMouseOver="this.style.color='black'" onMouseOut="this.style.color='#383B41'"> ...Hide</span>`;
  var seeagain = `<span style="cursor: pointer;color:#383B41;" onMouseOver="this.style.color='black'" onMouseOut="this.style.color='#383B41'"> ...Read More</span>`;

    $( ".readmore" ).click(function() {
        var complete = $(this).attr('id');
        var check = complete.substring(0, 200);

        open = !open;

        if(open){
          $(this).html(complete + hideagain);
        }else {

          $(this).html(check + seeagain);
        }
    });
