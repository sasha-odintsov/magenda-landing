$(document).ready(() => {
  $("#scroll-button").click(() => {
    $("html, body").animate(
      {
        scrollTop: $("#about-section").offset().top,
      },
      800
    );
  });

  $(".current-year").html(new Date().getFullYear());

  $("#input-tel-main, #input-tel-contacts").mask("(000) 000-0000");

  const checkForm = (form) => {
    const patternEmail = /^[^ ]+@[^ ]+\.[a-z]{2,4}$/;
    const isValidInputs = [];

    form.find(":input[type!=submit]").each(function () {
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
        .html("Email was sent successfully");
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

    grecaptcha
      .execute("6Ld7bTgpAAAAAFlJzGkSK2YlG_Vpk0LcyZ-5AcFo", { action: "submit" })
      .then(function (token) {
        $("#g-recaptcha-response").val(token);

        const data = {};
        const isValid = checkForm($("form"));
        const formData = $("form").serializeArray();

        $.each(formData, function () {
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
          $.post("https://api.magendamd.com/api/v1/contact-message", data)
            .done((data, status) => {
              setResponseMessage(status);
              $("form")[0].reset();
            })
            .fail((data, status) => {
              console.log(data);
              setResponseMessage(status);
            });
        }
      });
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

  const getTestimonials = () => {
    const users = [
      {
        rating: "4.5",
        date: "09/07/23",
        text: "Magenda’s intuitive EHR is great for physical therapy. The reminders and tasks ensure we stay on track and meet patient needs.",
        image: "121",
        name: "Diane S.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "09/04/23",
        text: "The billing tools in Magenda are fantastic. The reminders and clock-in feature make it easy to manage our chiropractic team.",
        image: "120",
        name: "Samuel S.",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "08/27/23",
        text: "Our team loves Magenda. The reminders, EHR, and organized interface make it the perfect tool for a busy medical office.",
        image: "119",
        name: "Gloria P.",
        speciality: "Medical receptionist",
      },
      {
        rating: "4.5",
        date: "08/22/23",
        text: "Magenda’s reminders and billing are amazing! The user-friendly interface and task integration keep our surgery center on track.",
        image: "118",
        name: "Dr. Anthony V.",
        speciality: "Surgeon",
      },
      {
        rating: "5.0",
        date: "08/20/23",
        text: "The clock-in feature is perfect for managing hours. The scheduling and reminders keep our physical therapy office organized daily.",
        image: "117",
        name: "Heather P.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "08/16/23",
        text: "The user-friendly design and scheduling in Magenda make it a must-have. Reminders and tasks help keep everything organized.",
        image: "116",
        name: "Cheryl C.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "08/15/23",
        text: "Our chiropractic office appreciates the intuitive EHR and reminders in Magenda. The organized design makes scheduling and billing effortless.",
        image: "115",
        name: "Karen M.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "08/12/23",
        text: "The reminders, clock-in, and billing features in Magenda have made our office more efficient than ever. Highly recommend for busy medical practices.",
        image: "114",
        name: "Dr. David B.",
        speciality: "Internal Medicine",
      },
      {
        rating: "5.0",
        date: "08/07/23",
        text: "Magenda’s EHR is perfect for physical therapy. The reminders, tasks, and billing tools keep everything running smoothly!",
        image: "113",
        name: "Melissa K.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "08/05/23",
        text: "The intuitive design and reminders in Magenda are ideal for our surgery center. The billing tools are efficient and easy to use.",
        image: "112",
        name: "Julia S.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "08/03/23",
        text: "Our chiropractic office couldn’t be happier with Magenda. The task integration and reminders keep us organized, and the clock-in feature is a great bonus.",
        image: "111",
        name: "Theodore R.",
        speciality: "Chiropractor",
      },
      {
        rating: "5.0",
        date: "08/02/23",
        text: "The EHR is fantastic for our physical therapy office. Magenda’s reminders, billing tools, and easy interface make it an essential tool.",
        image: "110",
        name: "Mildred P.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "07/28/23",
        text: "The clock-in feature helps us track staff hours, and the reminders keep us on schedule. Magenda is perfect for a busy medical office!",
        image: "109",
        name: "Annie O.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "07/25/23",
        text: "Magenda’s user-friendly interface has made our scheduling so much easier. The reminders and task feature are essential to our workflow.",
        image: "108",
        name: "Angela S.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "07/21/23",
        text: "Our office runs smoothly thanks to Magenda. The reminders, tasks, and organized EHR make it perfect for internal medicine.",
        image: "107",
        name: "Dr. Lisa J.",
        speciality: "Internal Medicine",
      },
      {
        rating: "4.5",
        date: "07/20/23",
        text: "The clock-in feature is a game-changer! Scheduling and reminders keep our chiropractic office on track, and the billing tools are excellent.",
        image: "106",
        name: "Owen F.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "07/18/23",
        text: "The EHR in Magenda is perfect for our physical therapy team. The user-friendly reminders and billing tools make managing our day a breeze.",
        image: "105",
        name: "Jessica L.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "07/16/23",
        text: "Our surgery center couldn’t be happier with Magenda. The intuitive scheduling, reminders, and task features make it easy to manage patient care.",
        image: "104",
        name: "Phyllis S.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "07/15/23",
        text: "Magenda is ideal for a busy office! The organized reminders, tasks, and clock-in feature are lifesavers for our chiropractic practice.",
        image: "103",
        name: "Tina K.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "07/14/23",
        text: "Scheduling, reminders, and billing have never been easier for our internal medicine practice. Magenda’s user-friendly interface is fantastic!",
        image: "102",
        name: "Dr. Andrew K.",
        speciality: "Internal Medicine",
      },
      {
        rating: "5.0",
        date: "07/12/23",
        text: "Magenda’s EHR is perfect for physical therapy. The reminders and task integration help us manage patient care efficiently and stay on schedule.",
        image: "101",
        name: "Rachel P.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "07/12/23",
        text: "Our chiropractic office loves the easy-to-use scheduling and reminders. The billing tools are efficient, and the clock-in feature is a big bonus!",
        image: "100",
        name: "Alicia K.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "07/11/23",
        text: "Magenda has improved our patient flow significantly! The reminders, Dr. calendar, and intuitive design keep everything organized and efficient.",
        image: "99",
        name: "Dr. Susan L.",
        speciality: "Internal Medicine",
      },
      {
        rating: "4.5",
        date: "07/07/23",
        text: "Magenda’s EHR is the best we’ve used. The reminders and e faxing is extremely helpful.",
        image: "98",
        name: "Dr George F.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "07/05/23",
        text: "The clock-in feature and task integration make Magenda an essential tool for our office. The billing tools are user-friendly and efficient.",
        image: "97",
        name: "Erin O.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "07/03/23",
        text: "Our physical therapy office loves the reminders and intuitive EHR. Magenda has made it easier for us to stay organized.",
        image: "96",
        name: "Noah P.",
        speciality: "Physical Therapist",
      },
      {
        rating: "4.5",
        date: "07/01/23",
        text: "Magenda’s EHR is incredibly helpful in our chiropractic practice. The organized scheduling and reminders ensure we never miss a step.",
        image: "95",
        name: "Dr. Jason C.",
        speciality: "Chiropractor",
      },
      {
        rating: "4.5",
        date: "06/28/23",
        text: "For our surgery center, Magenda has made everything simpler. The reminders, EHR, and billing tools work perfectly for a smooth workflow.",
        image: "94",
        name: "Monica G.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "06/24/23",
        text: "Magenda has organized our office! The Dr. calendar and task feature keep us on track, while the billing and collections are excellent.",
        image: "93",
        name: "Jack J.",
        speciality: "Billing specialist",
      },
      {
        rating: "4.5",
        date: "06/24/23",
        text: "The clock-in feature is a great addition in Magenda. Scheduling and reminders are straightforward, making it ideal for a busy physical therapy practice.",
        image: "92",
        name: "Rhonda L.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "06/22/23",
        text: "The intuitive design and scheduling options make Magenda a great fit for our chiropractic office. The reminders keep us organized and on track.",
        image: "91",
        name: "Grace P.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "06/20/23",
        text: "Magenda’s clock-in feature is a perfect solution for tracking hours. Scheduling, reminders, and billing have made our internal medicine office run more smoothly.",
        image: "90",
        name: "Wendy S.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "06/17/23",
        text: "The reminders, task feature, and organized interface in Magenda make running our office simple. It’s user-friendly and visually appealing too!",
        image: "89",
        name: "Dr. Robert T.",
        speciality: "Internal Medicine",
      },
      {
        rating: "4.5",
        date: "06/15/23",
        text: "We’re impressed with Magenda’s EHR for physical therapy. The reminders, Dr. calendar, and organized interface help us manage our day smoothly.",
        image: "88",
        name: "June C.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "06/11/23",
        text: "Using Magenda has streamlined our entire surgery center. The beautiful interface, reminders, and billing tools make it easy to manage patient appointments.",
        image: "87",
        name: "Debbie B.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "06/09/23",
        text: "Magenda is exactly what our chiropractic practice needed. The reminders and tasks keep us organized, and the clock-in feature is perfect for staff management.",
        image: "86",
        name: "Oliver D.",
        speciality: "Chiropractor",
      },
      {
        rating: "4.5",
        date: "06/08/23",
        text: "The billing tools are smooth and efficient in Magenda. Scheduling is straightforward, and the reminders keep our physical therapy team on track every day.",
        image: "85",
        name: "Clara M.",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "06/05/23",
        text: "Magenda’s EHR is fantastic for our internal medicine practice. Scheduling and reminders are flawless, and the user-friendly design makes it easy for everyone on our team.",
        image: "84",
        name: "Annette S.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "06/04/23",
        text: "We couldn’t run our chiropractic office without Magenda. The reminders and EHR keep us organized, and the clock-in feature is essential for managing staff time.",
        image: "83",
        name: "Samantha F.",
        speciality: "Chiropractor",
      },
      {
        rating: "4.5",
        date: "05/30/23",
        text: "Magenda has transformed our surgery center! Scheduling, reminders, and the intuitive interface make patient flow and billing so seamless.",
        image: "82",
        name: "Dr. Michael S.",
        speciality: "Surgeon",
      },
      {
        rating: "4.5",
        date: "05/28/23",
        text: "Magenda’s EHR keeps patient records organized, and the scheduling and reminders keep us on track. Great for a busy practice.",
        image: "81",
        name: "Kim B.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "05/26/23",
        text: "Magenda’s design is top-notch. The reminders and task features are invaluable for our chiropractic office.",
        image: "80",
        name: "Denise M.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "05/25/23",
        text: "Our surgery center loves Magenda! The reminders, billing tools, and EHR make everything simple and efficient.",
        image: "79",
        name: "Tamara T.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "05/21/23",
        text: "The organized interface in Magenda is wonderful. We rely on the reminders, billing, and clock-in features daily!",
        image: "78",
        name: "Lucas M.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "05/20/23",
        text: "Magenda’s EHR is exactly what we needed. The reminders, scheduling, and Dr. calendar make managing our physical therapy office easy.",
        image: "77",
        name: "Steve L.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "05/20/23",
        text: "We couldn’t ask for a better solution! The reminders, billing, and clock-in features in Magenda make our internal medicine practice run smoothly.",
        image: "76",
        name: "Joy L.",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "05/16/23",
        text: "Our chiropractic office loves how intuitive Magenda is. The task integration and reminders are perfect for keeping us on track.",
        image: "75",
        name: "Nicole K.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "05/15/23",
        text: "Magenda’s clock-in feature has simplified our workflow. The reminders and billing tools are so helpful, and the Dr. calendar is incredibly organized.",
        image: "74",
        name: "Ruth F.",
        speciality: "Internal Medicine",
      },
      {
        rating: "4.5",
        date: "05/14/23",
        text: "The user-friendly interface and seamless reminders in Magenda make managing our surgery center a breeze. The billing tools are flawless!",
        image: "73",
        name: "Judy L.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "05/12/23",
        text: "Magenda is fantastic for our physical therapy office! The intuitive design, reminders, and task feature make it the perfect choice.",
        image: "72",
        name: "Daniel W.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "05/11/23",
        text: "Our chiropractic practice loves the easy-to-use EHR. The clock-in feature helps with staff hours, and reminders keep everything organized.",
        image: "71",
        name: "Kathy S.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "05/09/23",
        text: "The EHR is excellent for internal medicine. The scheduling, reminders, and billing system in Magenda keep everything running smoothly.",
        image: "70",
        name: "Christine L.",
        speciality: "Internal Medicine",
      },
      {
        rating: "4.5",
        date: "05/09/23",
        text: "Magenda has made our surgery center more efficient. The intuitive reminders and billing tools keep us organized, and the clock-in feature helps track hours accurately.",
        image: "69",
        name: "Janet P.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "05/07/23",
        text: "Our physical therapy practice relies on Magenda’s reminders and scheduling to keep everything on track. The task feature is a bonus!",
        image: "68",
        name: "Elijah D.",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "05/06/23",
        text: "The EHR for our chiropractic office is so intuitive. Scheduling and reminders keep us running smoothly, and the clock-in feature is a game-changer.",
        image: "67",
        name: "Helen P.",
        speciality: "Chiropractor",
      },
      {
        rating: "4.5",
        date: "05/05/23",
        text: "We love Magenda’s design! The task and calendar features help us keep organized, and the billing tools are efficient for collections.",
        image: "66",
        name: "Sarah J.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "05/03/23",
        text: "Magenda’s EHR makes patient management easy, and the reminders help us stay on top of appointments. The clock-in feature is a great addition.",
        image: "65",
        name: "Rita Y.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "05/03/23",
        text: "Our surgery center couldn’t function without Magenda. The reminders, billing, and task integration keep everything streamlined.",
        image: "64",
        name: "Maria O.",
        speciality: "Billing specialist",
      },
      {
        rating: "4.5",
        date: "04/30/23",
        text: "The clock-in feature is perfect for managing our staff. The billing tools and reminders make our physical therapy office run seamlessly!",
        image: "63",
        name: "Rose M.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "04/28/23",
        text: "With Magenda, our chiropractic office has never been more organized. The reminders, scheduling, and billing tools are all so user-friendly.",
        image: "62",
        name: "Dr. Robert M.",
        speciality: "Chiropractor",
      },
      {
        rating: "5.0",
        date: "04/27/23",
        text: "The Dr. calendar and tasks make Magenda ideal for a busy medical office. Our entire team finds it so easy to use!",
        image: "61",
        name: "Ashley M.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "04/26/23",
        text: "The EHR in Magenda is exactly what our physical therapy office needed. The reminders, scheduling, and tasks help us stay organized and efficient.",
        image: "60",
        name: "Brenda L.",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "04/25/23",
        text: "Magenda’s intuitive design makes scheduling and billing effortless. The reminders keep us on top of everything, and the clock-in feature is a huge help.",
        image: "59",
        name: "William C.",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "04/25/23",
        text: "Our surgery center is thriving with Magenda! The reminders and task feature keep us organized, and the billing and collections are smooth.",
        image: "58",
        name: "Dr. Linda F.",
        speciality: "Surgeon",
      },
      {
        rating: "5.0",
        date: "04/24/23",
        text: "The clock-in feature is so efficient for tracking hours. The reminders, scheduling, and billing tools make Magenda essential for our chiropractic practice.",
        image: "57",
        name: "Jessica S.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "04/20/23",
        text: "Magenda’s design is sleek and intuitive. The EHR for our physical therapy office is fantastic, and the reminders keep us on schedule every day.",
        image: "56",
        name: "Elizabeth P.",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "04/18/23",
        text: "Having everything in one place with Magenda is a lifesaver. The reminders, clock-in, and billing tools make our medical office run smoothly.",
        image: "55",
        name: "Benjamin M.",
        speciality: "Internal Medicine",
      },
      {
        rating: "5.0",
        date: "04/17/23",
        text: "Magenda’s EHR and task integration have simplified our workflows. Our physical therapy team loves how user-friendly the entire system is!",
        image: "54",
        name: "Lana T.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "04/15/23",
        text: "Our chiropractic office thrives with Magenda! The reminders, scheduling, and clock-in features help us keep everything on track. Couldn’t ask for a better system.",
        image: "53",
        name: "John T.",
        speciality: "Chiropractor",
      },
      {
        rating: "4.5",
        date: "04/14/23",
        text: "The task feature in Magenda keeps us on top of daily goals. The user-friendly design makes it easy for our entire team to stay organized.",
        image: "52",
        name: "Patricia L.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "04/12/23",
        text: "Scheduling, reminders, EHR, and more – Magenda has it all! It’s perfect for our surgery center, especially with the easy billing and task integration.",
        image: "51",
        name: "Steve K.",
        speciality: "Surgeon",
      },
      {
        rating: "5.0",
        date: "04/12/23",
        text: "Magenda’s notifications and reminders ensure we never miss an appointment. The EHR and billing tools have transformed our medical office’s efficiency.",
        image: "50",
        name: "Pamela J.",
        speciality: "Chiropractor",
      },
      {
        rating: "4.5",
        date: "04/10/23",
        text: "Our team loves the clock-in feature. The scheduling, reminders, and tasks are well-organized, and the billing is straightforward. Highly recommend Magenda!",
        image: "49",
        name: "Robert J.",
        speciality: "Coding specialists",
      },
      {
        rating: "5.0",
        date: "04/07/23",
        text: "The interface is beautiful and so user-friendly. The reminders are a must-have, and Magenda’s EHR is an ideal solution for our physical therapy practice.",
        image: "48",
        name: "Dr. Sonya W.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "04/05/23",
        text: "Magenda’s billing system and reminders are top-notch for our chiropractic office. The easy-to-navigate EHR keeps patient records organized and accessible.",
        image: "47",
        name: "Rachel B.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "04/04/23",
        text: "We’ve saved so much time using Magenda! The scheduling and reminders streamline our day, and the clock-in feature helps us manage staff hours perfectly.",
        image: "46",
        name: "Karen A.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "04/02/23",
        text: "The Dr. calendar and task features are so helpful! Our internal medicine office is much more organized with Magenda, and the billing tools are a bonus.",
        image: "45",
        name: "Mark F.",
        speciality: "Internal Medicine",
      },
      {
        rating: "5.0",
        date: "04/01/23",
        text: "Magenda keeps everything in one place, making our practice run smoothly. The billing tools are fantastic, and the reminders ensure we stay on track with appointments.",
        image: "44",
        name: "Eva B.",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "03/30/23",
        text: "Our physical therapy office loves Magenda’s tracking and notification features. The EHR is easy to use, and we rely on it daily for organized patient care.",
        image: "43",
        name: "Dr. Robert H.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "03/25/23",
        text: "The clock-in feature is a game-changer in our surgery center! Magenda’s reminders and scheduling help us manage patient flow effortlessly.",
        image: "42",
        name: "Lora P.",
        speciality: "Medical receptionist",
      },
      {
        rating: "4.5",
        date: "03/22/23",
        text: "Magenda’s intuitive design allows our team to work efficiently. The task integration and EHR make record-keeping a breeze. Highly recommend for medical offices!",
        image: "41",
        name: "Emma T.",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "03/21/23",
        text: "The beautiful interface of Magenda makes it enjoyable to use. We love the EHR for physical therapy, and the reminders are fantastic for keeping appointments organized.",
        image: "40",
        name: "Dr. Jason K.",
        speciality: "Physical Therapist",
      },
      {
        rating: "5.0",
        date: "03/19/23",
        text: "The clock-in feature is incredibly useful in Magenda, along with the streamlined billing and easy scheduling. It’s a great fit for our chiropractic practice.",
        image: "39",
        name: "Karen L.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "03/17/23",
        text: "Our surgery center is running smoothly thanks to Magenda’s comprehensive scheduling and task tools. The system is so organized and visually appealing.",
        image: "38",
        name: "Rachel G.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "03/15/23",
        text: "We’ve used multiple systems, but Magenda outshines them all! The reminders, scheduling, and intuitive EHR make it so easy to manage a busy medical office.",
        image: "37",
        name: "Tom N.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "03/15/23",
        text: "The billing and collections in Magenda are flawless. Our office loves how user-friendly the software is, and the Dr. calendar keeps us on schedule every day!",
        image: "36",
        name: "Jessica C.",
        speciality: "Billing specialist",
      },
      {
        rating: "4.5",
        date: "03/15/23",
        text: "Magenda’s EHR is perfect for our physical therapy practice. It’s user-friendly and keeps us organized, while reminders and the task feature ensure nothing falls through the cracks.",
        image: "35",
        name: "Dr. Linda J.",
        speciality: "Physical Therapist",
      },
      {
        rating: "4.5",
        date: "03/13/23",
        text: "Our chiropractic team appreciates the flexibility of Magenda’s scheduling and reminders. The clock-in feature is a great tool to track our team’s time.",
        image: "34",
        name: "Robert P.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "03/11/23",
        text: "Absolutely love using Magenda for our surgery center. The EHR is so well designed, and the billing and scheduling are simple and effective. We’re saving hours each week.",
        image: "33",
        name: "Sarah M.",
        speciality: "Billing specialist",
      },
      {
        rating: "4.5",
        date: "03/09/23",
        text: "Magenda has completely streamlined our office! The scheduling and reminders are a lifesaver, and the beautiful, organized interface is intuitive for our entire staff.",
        image: "32",
        name: "Dr. Emily B.",
        speciality: "Physical Therapist",
      },
      {
        rating: "4.5",
        date: "03/09/23",
        text: "MagendaMD's scheduling tool is incredibly user-friendly and adaptive to our clinic's needs. The straightforward interface and customizable options have made managing appointments a breeze.",
        image: "1",
        name: "Ava M.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "03/08/23",
        text: "The integrated SMS feature is a game-changer for patient communication. The automated reminders and updates have significantly improved appointment adherence, reducing no-shows and enhancing patient engagement.",
        image: "7",
        name: "Lily Sullivan",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "03/05/23",
        text: "Transitioning from scheduling to managing appointments within MagendaMD is seamless. The integrated approach provides a comprehensive overview, allowing for easy modifications and efficient tracking.",
        image: "11",
        name: "Ethan L.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "03/04/23",
        text: "MagendaMD's task management has brought a new level of organization to our workflow. Centralizing tasks within the EHR system has improved team collaboration and productivity.",
        image: "8",
        name: "Nolan Walker",
        speciality: "Medical receptionist",
      },
      {
        rating: "4.5",
        date: "02/27/23",
        text: "The calendar feature is visually appealing and functionally robust. It has become our go-to tool for managing daily schedules, offering a clear view of appointments and tasks.",
        image: "5",
        name: "Sophia W.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "02/25/23",
        text: "MagendaMD's billing module is efficient and transparent. From invoicing to payment tracking, it seamlessly integrates with other features, contributing to a smoother financial management process.",
        image: "6",
        name: "Isla P.",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "02/21/23",
        text: "The secure faxing capability aligns perfectly with our commitment to patient privacy. MagendaMD provides a reliable and confidential platform for exchanging medical documents.",
        image: "4",
        name: "Chloe Ross",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "02/18/23",
        text: "The user interface is intuitive, making it easy for our team to navigate and utilize the software effectively. Even staff members with varying tech proficiency find it accessible.",
        image: "9",
        name: "Emma H.",
        speciality: "Medical receptionist",
      },
      {
        rating: "4.5",
        date: "02/17/23",
        text: "MagendaMD's automation features have streamlined our routine tasks. The system's intelligence in automating processes has freed up valuable time, allowing us to focus more on patient care.",
        image: "2",
        name: "Olivia R.",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "02/15/23",
        text: "The customer support from MagendaMD has been exceptional. Responsive, knowledgeable, and always ready to assist, they have contributed to a positive experience in using the software.",
        image: "10",
        name: "Caleb Simmons",
        speciality: "Coding specialists",
      },
      {
        rating: "5.0",
        date: "02/14/23",
        text: "MagendaMD's scheduling feature is a game-changer! The interface is intuitive, and customization options make it adaptable to our clinic's unique needs. Managing appointments has never been this seamless.",
        image: "12",
        name: "Mia C.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "02/11/23",
        text: "The integrated SMS functionality is a standout feature. Automated reminders keep patients informed, reducing no-shows, and enhancing communication. It's a time-saver for both staff and patients.",
        image: "14",
        name: "Jenny Lee",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "02/10/23",
        text: "MagendaMD seamlessly integrates appointment management. The transition from scheduling to managing appointments is smooth, providing a centralized view for efficient tracking and modification.",
        image: "25",
        name: "Addison F.",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "02/09/23",
        text: "The task management feature is incredibly useful. It keeps our team organized and on track, fostering collaboration. Having tasks integrated within the EHR system has streamlined our workflow.",
        image: "27",
        name: "Carter R.",
        speciality: "Billing specialist",
      },
      {
        rating: "4.5",
        date: "02/06/23",
        text: "MagendaMD's calendar is visually appealing and functional. It serves as a comprehensive overview of our daily operations, making it easy to manage appointments and tasks. A must-have for organized practices.",
        image: "26",
        name: "Grace Murphy",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "02/06/23",
        text: "The billing module is a reliable tool for financial management. It simplifies invoicing and payment tracking, ensuring accuracy. Our billing processes have become more efficient and transparent.",
        image: "15",
        name: "Kathleen Kelly",
        speciality: "Billing specialist",
      },
      {
        rating: "5.0",
        date: "02/05/23",
        text: "The secure faxing capability aligns perfectly with our commitment to patient privacy. MagendaMD provides a reliable and confidential channel for exchanging medical documents, ensuring compliance with regulations.",
        image: "16",
        name: "Paul Fernandez",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "01/27/23",
        text: "The user interface is clean and user-friendly. Navigating through different features is intuitive, making it accessible for all staff members regardless of their tech proficiency.",
        image: "18",
        name: "Abigail T.",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "01/19/23",
        text: "MagendaMD's automation features are a time-saver. The system intelligently automates repetitive tasks, reducing manual workload and allowing our team to focus on patient care.",
        image: "19",
        name: "Scarlett R.",
        speciality: "Medical receptionist",
      },
      {
        rating: "4.5",
        date: "01/15/23",
        text: "The customer support team is responsive and helpful. They've addressed our queries promptly, ensuring a positive experience with the software. Knowing that support is readily available is reassuring.",
        image: "29",
        name: "Maria Sanches",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "01/11/23",
        text: "MagendaMD's scheduling feature is a lifesaver for our clinic. The ease of use and flexibility in managing appointments have significantly improved our daily workflow. Customization options allow us to tailor schedules to meet our specific needs.",
        image: "23",
        name: "Hazel Griffin",
        speciality: "Administrator",
      },
      {
        rating: "5.0",
        date: "01/08/23",
        text: "The integrated SMS feature is a communication game-changer. Automated reminders and updates keep our patients engaged, resulting in fewer missed appointments. It's a simple yet powerful tool for enhancing patient communication.",
        image: "17",
        name: "Harper A.",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "12/28/22",
        text: "Transitioning from scheduling to managing appointments within MagendaMD is seamless. The integrated approach provides a holistic view, making it easy to modify and track appointments. Our staff appreciates the efficiency it brings to our practice.",
        image: "24",
        name: "Jasmine Turner",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "12/21/22",
        text: "MagendaMD's automation features are a time-saver for our staff. The system intelligently automates routine tasks, freeing up valuable time to focus on patient care. It's a significant efficiency booster for our practice.",
        image: "22",
        name: "Kenzo E.",
        speciality: "Office manager",
      },
      {
        rating: "5.0",
        date: "12/16/22",
        text: "The calendar feature is visually appealing and functionally robust. It serves as our practice's central hub, offering a clear and comprehensive overview of appointments and tasks. Navigating daily schedules has never been easier.",
        image: "21",
        name: "Zoey M.",
        speciality: "Administrator",
      },
      {
        rating: "4.5",
        date: "12/15/22",
        text: "MagendaMD's task management is a boon for our team. It centralizes tasks, fostering collaboration and organization. The integrated tasks within the EHR system have streamlined our workflow and improved overall efficiency.",
        image: "20",
        name: "Aisha Corte",
        speciality: "Office manager",
      },
      {
        rating: "4.5",
        date: "12/11/22",
        text: "MagendaMD's billing module has simplified our financial processes. From generating invoices to tracking payments, it ensures accuracy and transparency. The billing features seamlessly integrate with other aspects of the software, contributing to a cohesive experience.",
        image: "28",
        name: "Silvia Rivera",
        speciality: "Billing specialist",
      },
      {
        rating: "4.5",
        date: "12/06/22",
        text: "The secure faxing capability aligns with our commitment to privacy and compliance. MagendaMD provides a reliable channel for faxing medical documents, ensuring sensitive information is exchanged securely.",
        image: "30",
        name: "Emma Nelson",
        speciality: "Medical receptionist",
      },
      {
        rating: "5.0",
        date: "12/01/22",
        text: "The user interface is intuitive and user-friendly. Our team, with varying tech expertise, navigates the system effortlessly. MagendaMD's design contributes to a positive user experience and efficient use of the software.",
        image: "31",
        name: "Brooke Blake",
        speciality: "Medical receptionist",
      },
      {
        rating: "4.5",
        date: "11/18/22",
        text: "The customer support from MagendaMD is top-notch. Responsive and knowledgeable, the support team has addressed our inquiries promptly. Knowing we have reliable support adds an extra layer of confidence in using the software.",
        image: "13",
        name: "Amir R.",
        speciality: "Coding specialist",
      },
    ];

    return `
      ${users
        .map(
          ({ rating, date, text, image, name, speciality }) => `
            <div class="h-auto swiper-slide">
              <div class="testimonials-card">
                <div class="flex justify-between 2xl:mb-2 mb-1">
                  <span class="2xl:text-2xl text-lg">${rating}</span>
                  <span class="2xl:text-base text-sm">${date}</span>
                </div>
                <img
                  src="/public/images/rating${rating === "5.0" ? "5" : "4.5"}.png"
                  alt="Rating"
                  class="2xl:w-[100px] w-[80px] mb-4"
                />
                <p class="2xl:mb-8 mb-4 2xl:text-base text-sm">
                  ${text}
                </p>
                <div class="flex mt-auto">
                  <div class="2xl:w-[60px] w-[50px] me-8">
                    <img
                      src="/public/images/users/${image}.jpg"
                      alt="User"
                      class="rounded-full"
                    />
                  </div>
                  <div class="flex flex-col justify-between font-medium py-1">
                    <div class="uppercase text-base">${name}</div>
                    <div class="text-blue-main text-base">${speciality}</div>
                  </div>
                </div>
              </div>
            </div>
          `
        )
        .join("")}
    `;
  };
  $("#swiper-wrapper").html(getTestimonials());
});
