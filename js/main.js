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
      el.addClass("text-blue-dark").html("Message Sent");
    } else {
      el.addClass("text-red-500").html("Failed!");
    }

    el.fadeIn(500, () => {
      setTimeout(() => {
        el.fadeOut(500);
      }, 3000);
    });
  };

  $("#form-main").on("submit", (e) => {
    e.preventDefault();

    const email = $("#input-email-main");
    const text = $("#textarea-main");
    const name = $("#input-text-main");

    const checkEmail = checkField(email);
    const checkText = checkField(text);
    const checkName = checkField(name);

    if (checkEmail && checkText && checkName) {
      // $.ajaxSetup({
      //   headers: {}
      // });
      // $.post(
      //   "https://magendamd.com/api/v1/contact-message",
      //   {
      //     email: email.val(),
      //     text: text.val(),
      //     name: name.val(),
      //   }
      // )
      // .done((data, status) => {
      //   console.log("res", data);
      //   $("#form-contacts")[0].reset();
      //   setResponseMessage(status);
      // })
      // .fail((data, status) => {
      //   console.log(data);
      //   setResponseMessage(status);
      // });

      // $.ajax({
      //   type: "POST",
      //   url: "https://magendamd.com/api/v1/contact-message",
      //   data: {
      //     email: email.val(),
      //     text: text.val(),
      //     name: name.val(),
      //   },
      //   // headers: {},
      //   success: (data, status) => {
      //     console.log("res", data);
      //     console.log("status", status);
      //     $("#form-contacts")[0].reset();
      //     setResponseMessage(status);
      //   },
      //   error: (error, status) => {
      //     console.log("error", error);
      //     console.log("status", status);
      //     setResponseMessage(status);
      //   },
      // });
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
