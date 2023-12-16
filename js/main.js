$(() => {
  $("#scroll-button").click(() => {
    $("html, body").animate(
      {
        scrollTop: $("#about-section").offset().top,
      },
      800
    );
  });

  const setHeight = () => {
    $("#contacts-info").height($("#contacts-form").height());
  };
  setHeight();

  $(window).resize(setHeight);

  const checkField = (el) => {
    const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,4}$/;
    const value = el.val().trim();
    let isValid = true;
    let isRequired = el.prop("required");

    if (isRequired) {
      isValid = !!value;
    }
    if (el.attr("type") === "email") {
      isValid = patternEmail.test(value);
    }

    if (isValid) {
      el.removeClass("border-red-500");
      return true;
    } else {
      el.addClass("border-red-500");
      return false;
    }
  };

  $("#form-main").on("submit", (e) => {
    e.preventDefault();

    const email = $("#input-email-main");
    const text = $("#textarea-main");
    const name = $("#input-text-main");

    checkField(email);
    checkField(text);
    checkField(name);

    if (checkField(email) && checkField(text) && checkField(name)) {
      $("#form-main")[0].reset();
      $("#success-message").fadeIn(500, () => {
        setTimeout(() => {
          $("#success-message").fadeOut(500);
        }, 3000);
      });
    }
  });

  $("#form-contacts").on("submit", (e) => {
    e.preventDefault();

    const email = $("#input-email-contacts");
    const text = $("#textarea-contacts");
    const name = $("#input-text-contacts");

    checkField(email);
    checkField(text);
    checkField(name);

    if (checkField(email) && checkField(text) && checkField(name)) {
      $("#form-contacts")[0].reset();
      $("#success-message").fadeIn(500, () => {
        setTimeout(() => {
          $("#success-message").fadeOut(500);
        }, 3000);
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
        return `<span class=${className}>0${index + 1}</span>`;
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
