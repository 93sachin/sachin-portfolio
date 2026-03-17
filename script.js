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