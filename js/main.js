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
});
