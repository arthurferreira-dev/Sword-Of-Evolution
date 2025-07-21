let MenuPause = document.querySelector('#menu-pause');
let IconMenu = document.querySelector('#icon-menu');
let SpanIcon = document.querySelector('#span-icon');
let Gameplay = document.querySelector('#game-display');

function Menu() {
    SpanIcon.style.display = 'none'
    MenuPause.classList.remove('hidden')
    Gameplay.classList.add('hidden')
}

function Return() {
    MenuPause.classList.add('hidden')
    SpanIcon.style.display = 'block'
    Gameplay.classList.remove('hidden')
}

function Salve() {

}

function Leave() {
    Salve();
    window.location.href = '/index.html'
}