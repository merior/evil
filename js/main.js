/*
document.addEventListener("DOMContentLoaded", function (event) {
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelectorAll('[data-toggle=modal]');
    const closeBtn = document.querySelector ('.modal__close')
    const switchModal = () => {
        modal.classList.toggle('modal--visible');
    }
    modalBtn.forEach(element => {
        element.addEventListener('click', switchModal);
    });
    
    closeBtn.addEventListener('click', switchModal)

    document.addEventListener('click', (e) => {
        if (e.target.classList === modal.classList) {
            modal.classList.toggle('modal--visible');
        };
    });
    
    document.addEventListener('keydown', (e) => {
        if(e.key == 'Escape') {
            if (modal.classList.contains('modal--visible')) {
                modal.classList.toggle('modal--visible');
            };
        };
    });
})
*/

$(document).ready(function () {
    var modal = $('.modal'),
        modalBtn = $('[data-toggle=modal]'),
        closeBtn = $('.modal__close');

    modalBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });
    closeBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });

    var modalDialog = $('.modal__dialog')

    $(document).mouseup( function(e) {
        if(!modalDialog.is(e.target) && modalDialog.has(e.target).length === 0 ) {
            modal.removeClass('modal--visible')
        };
    });

    $(document).on('keydown', function(e) {
        if (e.keyCode == 27)
            modal.removeClass('modal--visible');
        });

        var btn = $('#button');

        $(window).scroll(function() {
          if ($(window).scrollTop() > 300) {
            btn.addClass('show');
          } else {
            btn.removeClass('show');
          }
        });
        
        btn.on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({scrollTop:0}, '300');
        });

        $(".hero__scroll-down").click(function() { // ID откуда кливаем
          $('html, body').animate({
              scrollTop: $(".types").offset().top  // класс объекта к которому приезжаем
          }, 1000); // Скорость прокрутки
          });

        // var mySwiper = new Swiper ('.swiper-container', {
        //     loop: true
        // })

        const swiper = new Swiper('.swiper', {
            loop: true,
          
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
            },
          
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });
        var next = $('.swiper-button-next');
        
        var prev = $('.swiper-button-prev');
        var bullets = $('.swiper-pagination');

        next.css('left', prev.width() + 10 + bullets.width() + 10)
        bullets.css('left', prev.width() + 10)


        var nextSteps = $('.swiper-button-next_2');
        var bulletsSteps = $('.swiper-pagination_2');

        nextSteps.css('left', prev.width() + 10 + bulletsSteps.width() + 10)
        bulletsSteps.css('left', prev.width() + 10)


        new WOW().init();

        // Валидация формы

        $('.modal__form').validate({
            errorClass: "invalid",
            rules: {
                // simple rule, converted to {required:true}
                userName: {
                  required: true,
                  minlength: 2,
                  maxlength: 15
                },
                userPhone: "required",
                // compound rule
                userEmail: {
                  required: true,
                  email: true
                }
              },
              errorElement:"div",
              messages: {
                userName: {
                    required:"Заполните поле",
                    minlength:"Имя не короче двух символов",
                    maxlength:"Имя не длиннее 15 символов"
                },
                userPhone: "Заполните поле",
                userEmail: {
                  required: "Заполните поле",
                  email: "Введите корректный email, в формате: name@domain.com"
                }
              },
              submitHandler: function(form) {
                $.ajax({
                  type: "POST",
                  url: "send.php",
                  data: $(form).serialize(),
                  success: function (response) {
                    alert('Форма отправлена, мы свяжемся с вами через 10 минут');
                    $(form)[0].reset();
                    modal.removeClass('modal--visible');
                  },
                  error: function(response) {
                    console.error('Ошибка ' + response);
                  }
                });
              }
        });

        

        $('[type=tel]').mask('+7(000) 000-00-00');

        $('.control__form').validate({
          errorClass: "invalid",
          rules: {
              // simple rule, converted to {required:true}
              userName: {
                required: true,
                minlength: 2,
                maxlength: 15
              },
              userPhone: "required",
            },
            errorElement:"div",
            messages: {
              userName: {
                  required:"Заполните поле",
                  minlength:"Имя не короче двух символов",
                  maxlength:"Имя не длиннее 15 символов"
              },
              userPhone: "Заполните поле",
              },
        });

        $('.footer__form').validate({
          errorClass: "invalid",
          rules: {
              // simple rule, converted to {required:true}
              userName: {
                required: true,
                minlength: 2,
                maxlength: 15
              },
              userPhone: "required",
              userQuestion: "required",
            },
            errorElement:"div",
            messages: {
              userName: {
                  required:"Заполните поле",
                  minlength:"Имя не короче двух символов",
                  maxlength:"Имя не длиннее 15 символов"
              },
              userPhone: "Заполните поле",
              userQuestion: {
                required:"Задайте вопрос",
              },
            },
        });
});



