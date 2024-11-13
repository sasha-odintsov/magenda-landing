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
