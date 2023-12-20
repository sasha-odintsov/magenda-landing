$(document).ready(() => {
  $("#scroll-button").click(() => {
    $("html, body").animate(
      {
        scrollTop: $("#about-section").offset().top,
      },
      800
    );
  });

  const checkForm = (form) => {
    const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,4}$/;
    const isValidInputs = [];

    form.find(":input[type!=submit]").each(function() {
      const value = $(this).val().trim();
      let isValidInput = true;
      const isRequired = $(this).prop("required");

      if (isRequired) {
        isValidInput = !!value;
      }
      if ($(this).attr("type") === "email") {
        isValidInput = patternEmail.test(value);
      }

      if (isValidInput) {
        $(this).removeClass("border-red-500");
      } else {
        $(this).addClass("border-red-500");
      }

      isValidInputs.push(isValidInput);
    });

    return isValidInputs.every((el) => el);
  };

  const setResponseMessage = (status) => {
    const el = $("#response-message");

    if (status === "success") {
      el.removeClass("text-red-500")
        .addClass("text-blue-dark")
        .html("Message Sent");
    } else {
      el.removeClass("text-blue-dark")
        .addClass("text-red-500")
        .html("Oops... Something went wrong!");
    }

    el.fadeIn(500, () => {
      setTimeout(() => {
        el.fadeOut(500);
      }, 3000);
    });
  };

  $("form").on("submit", function (e) {
    e.preventDefault();

    const data = {};
    const isValid = checkForm($(this));
    const formData = $(this).serializeArray();

    $.each(formData, function() {
      data[this.name] = this.value;
    });

    if (isValid) {
      $.ajaxSetup({
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
        xhrFields: {
          withCredentials: true,
        },
      });
      $.post("https://apidev.magendamd.com/api/v1/contact-message", data)
        .done((data, status) => {
          setResponseMessage(status);
          $(this)[0].reset();
        })
        .fail((data, status) => {
          console.log(data);
          setResponseMessage(status);
        });
    }
  });

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    slidesPerView: 3.5,
    slidesPerGroup: 3,
    spaceBetween: 25,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: (index, className) => {
        return `<span class=${className}>${index < 9 ? "0" : ""}${
          index + 1
        }</span>`;
      },
    },
    breakpoints: {
      320: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
      },
      1280: {
        slidesPerView: 3.5,
        slidesPerGroup: 3,
      },
      1536: {
        spaceBetween: 50,
      },
    },
  });
});
