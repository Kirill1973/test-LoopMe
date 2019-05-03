const wrapper = document.querySelector('.wrapper');
const wrapperPreload = document.querySelector('.wrapper-preload');

window.addEventListener('load', function() {
    setTimeout(function() {
        wrapper.classList.remove('un-block');
        wrapperPreload.classList.add('un-block');
    }, 3000)
}, false)