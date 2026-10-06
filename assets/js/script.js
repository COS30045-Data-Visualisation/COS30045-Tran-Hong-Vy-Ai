const questions = document.querySelectorAll(".faq-question");

questions.forEach(function(question) {

    question.addEventListener("click", function() {

        const answer = question.nextElementSibling;

        if (answer.style.display === "block") {
            answer.style.display = "none";
            question.setAttribute("aria-expanded", "false");
        } else {
            answer.style.display = "block";
            question.setAttribute("aria-expanded", "true");
        }

    });

});