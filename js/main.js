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
    const isRequired = el.prop("required");

    if (isRequired) {
      isValid = !!value;
    }
    if (el.attr("type") === "email") {
      isValid = patternEmail.test(value);
    }

    if (isValid) {
      el.removeClass("border-red-500");
    } else {
      el.addClass("border-red-500");
    }

    return isValid;
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

  $.ajaxSetup({
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    xhrFields: {
      withCredentials: true,
    },
  });

  $("#form-main").on("submit", (e) => {
    e.preventDefault();

    const email = $("#input-email-main");
    const text = $("#textarea-main");
    const name = $("#input-text-main");

    const checkEmail = checkField(email);
    const checkText = checkField(text);
    const checkName = checkField(name);

    if (checkEmail && checkText && checkName) {
      $.post("https://apidev.magendamd.com/api/v1/contact-message", {
        email: email.val(),
        text: text.val(),
        name: name.val(),
      })
        .done((data, status) => {
          setResponseMessage(status);
          $("#form-main")[0].reset();
        })
        .fail((data, status) => {
          console.log(data);
          setResponseMessage(status);
        });
    }
  });

  $("#form-contacts").on("submit", (e) => {
    e.preventDefault();

    const email = $("#input-email-contacts");
    const text = $("#textarea-contacts");
    const name = $("#input-text-contacts");

    const checkEmail = checkField(email);
    const checkText = checkField(text);
    const checkName = checkField(name);

    if (checkEmail && checkText && checkName) {
      $.post("https://apidev.magendamd.com/api/v1/contact-message", {
        email: email.val(),
        text: text.val(),
        name: name.val(),
      })
        .done((data, status) => {
          setResponseMessage(status);
          $("#form-contacts")[0].reset();
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
