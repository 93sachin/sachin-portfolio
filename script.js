const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
cards.forEach(card => {
const top = card.getBoundingClientRect().top;
if (top < window.innerHeight - 50) {
card.style.opacity = "1";
card.style.transform = "translateY(0)";
}
});
});

window.onload = function () {
    const text = "Hi, I'm Sachin 👋";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            document.getElementById("typing").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 80);
        }
    }

    typeEffect();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

const hiddenElements = document.querySelectorAll(".hidden");

hiddenElements.forEach((el) => observer.observe(el));

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // 🔥 PAGE RELOAD ROK DIYA

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(() => {
        document.getElementById("success-msg").style.display = "block";
        form.reset(); // optional (form clear ho jayega)
    })
    .catch(() => {
        alert("❌ Error sending message");
    });
});