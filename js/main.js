const [previos, next] = [document.querySelector('.slider__prev'), document.querySelector('.slider__next')];
const [slides, arrVersa, arrCharge3, arrHR] = [document.querySelectorAll('.slider__myslides'),
document.querySelectorAll('.slider__myslides')[0].querySelectorAll('.slider__img'),
document.querySelectorAll('.slider__myslides')[1].querySelectorAll('.slider__img'),
document.querySelectorAll('.slider__myslides')[2].querySelectorAll('.slider__img')];
const [switchersVersa, switchersCharge3, switchersHR] = [document.querySelectorAll('.slider__switches')[0].querySelectorAll('.switches__dot'),
document.querySelectorAll('.slider__switches')[1].querySelectorAll('.switches__dot'),
document.querySelectorAll('.slider__switches')[2].querySelectorAll('.switches__dot')] 
let [arrDesdeImgs] = [document.querySelector('.content__desde').querySelectorAll('img')];
const start = 0;

class Slider {
    
    constructor (arrSlides, arraysWatch, arraysSwitchers, arrImgs) {
        this.arrImgs = arrImgs;
        this.arraysSwitchers = arraysSwitchers;
        this.arrSlides = arrSlides;
        this.arraysWatch = arraysWatch;
        this.slideIndex = 1;
        this.watchIndex = 1;
    }

    showWatch(index, arr, id) {
        if(arr) {
            for(let i = 0; i < arr.length; i += 1) {
                arr[i].children[1].classList.add('un-block');
                arr[i].children[0].classList.remove('un-block');
            }
            arr[index].children[1].classList.remove('un-block');
            arr[index].children[0].classList.add('un-block');
            for(let i = 0; i < this.arraysWatch[id].length; i += 1) {
                this.arraysWatch[id][i].classList.add('un-block');
            }
            this.arraysWatch[id][index].classList.remove('un-block');
        } else {
            for(let i = 0; i < this.arraysWatch.length; i += 1) {
                this.additionalFor(this.arraysWatch[i], this.arraysSwitchers[i], index);
            } 
        }
    }

    additionalFor(item, item2, index) {
        for(let j = 0; j < item.length; j += 1) {
            item[j].classList.add('un-block');
            item2[j].children[1].classList.add('un-block');
            item2[j].children[0].classList.remove('un-block');
        }
        item[this.watchIndex - 1].classList.remove('un-block');
        item2[this.watchIndex - 1].children[1].classList.remove('un-block');
        item2[this.watchIndex - 1].children[0].classList.add('un-block');
    }
    
    renderSlider () {
        let toRight = 20;
        for(let i = 0; i < this.arrSlides.length; i += 1) {
            this.arrSlides[i].style.left = toRight + '%'
            this.arrImgs[i].classList.add('un-block');
            toRight += 120;
        }
        this.arrImgs[this.slideIndex - 1].classList.remove('un-block');
    } 

    nextSlide () {
        this.slideIndexPlus();
        if (this.slideIndex > this.arrSlides.length) {
            this.slideIndex = 1;
            let toRight = 20;
            for(let i = 0; i < this.arrSlides.length; i += 1) {
                this.arrSlides[i].style.left = toRight + '%'
                toRight += 120;
            }
        } else {
            let countLeft = 180;
            for(let i = 0; i < this.arrSlides.length; i += 1) {
                let num = this.arrSlides[i].style.left;
                let value = num.split('');
                value.pop();
                let toLeft = Number(value.join(''));
                this.arrSlides[i].style.left = toLeft - countLeft + '%';
                toLeft -= 20;
            }
        }
        this.showPrice();
    }

    slideIndexPlus() {
        this.slideIndex += 1;
    }
    slideIndexMinus() {
        this.slideIndex -= 1;
    }

    previosSlide () {
        this.slideIndexMinus();
        if (this.slideIndex < 1) {
            this.slideIndex = this.arrSlides.length;
            let toRight = -100;
            for(let i = this.arrSlides.length - 1; i >= 0; i -= 1) {
                this.arrSlides[i].style.left = toRight + '%'
                toRight -= 120;
            }
        } else {
            for(let i = 0; i < this.arrSlides.length; i += 1) {
                let num = this.arrSlides[i].style.left;
                let value = num.split('');
                value.pop();
                let toLeft = Number(value.join(''));
                this.arrSlides[i].style.left = toLeft + 180 + '%';
            }
        }
        this.showPrice();
    }

    showPrice() {
        for (let i = 0; i < this.arrImgs.length; i += 1) {
            this.arrImgs[i].classList.add('un-block');
        }
        this.arrImgs[this.slideIndex - 1].classList.remove('un-block');
    }
}

let sliderBtns = new Slider(slides, 
    [arrVersa, arrCharge3, arrHR], 
    [switchersVersa, switchersCharge3, switchersHR],
    arrDesdeImgs);

Array.prototype.forEach.call(switchersVersa, (item, index, arr) => {
    item.addEventListener('click', function() {
        let id = 0;
        sliderBtns.showWatch(index, arr, id);
    }, false)
})

Array.prototype.forEach.call(switchersCharge3, (item, index, arr) => {
    item.addEventListener('click', function() {
        let id = 1;
        sliderBtns.showWatch(index, arr, id);
    }, false)
})

Array.prototype.forEach.call(switchersHR, (item, index, arr) => {
    item.addEventListener('click', function() {
        let id = 2;
        sliderBtns.showWatch(index, arr, id);
    }, false)
})

previos.addEventListener('click', function() {
    sliderBtns.previosSlide();
}, false)

next.addEventListener('click', function() {
    sliderBtns.nextSlide();
}, false)

sliderBtns.renderSlider();
sliderBtns.showWatch();


for(let i = 0; i < arrVersa.length; i += 1) {

    arrVersa[i].addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    }, false)
    
    arrVersa[i].addEventListener('touchmove', function(event) {
        const touch = event.touches[0];
        const change  = startX - touch.clientX;
        if (change < 0) {
            return;
        }
        slides[0].style.left = '-' + change + 'px';
        slides[1].style.left = (slides[0].clientWidth - change) + 'px';
        event.preventDefault();
    }, false);
    
    arrVersa[i].addEventListener('touchend', function(event) {
        const change  = startX - event.changedTouches[0].clientX;
        const threshold = slides[0] / 3;
        if (change < threshold) {
            slides[0].style.left = '20%';
            slides[1].style.left = '140%';
            slides[2].style.left = '260%';
        } else {
            slides[0].style.transition = 'all .3s';
            slides[1].style.transition = 'all .3s';
            slides[0].style.left = '-160%';
            slides[1].style.left = '-40%';
            slides[2].style.left = '80%';
            sliderBtns.slideIndexPlus();
            sliderBtns.showPrice();
        }
    }, false)
}

for (let i = 0; i < arrCharge3.length; i += 1) {
    arrCharge3[i].addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        slides[0].style.transition = ' ';
        slides[1].style.transition = ' ';
    }, false)
    
    arrCharge3[i].addEventListener('touchmove', function(event) {
        const touch = event.touches[0];
        const change = startX - touch.clientX;
        const change2 = touch.clientX - startX;
        if (change < 0) {
            slides[1].style.left = (slides[2].clientWidth - change2) + 'px';
            slides[2].style.left = change2 + 'px';
            event.preventDefault();
        } else {
            slides[1].style.left = (slides[1].clientWidth - change) + 'px';
            slides[2].style.left = change + 'px';
            event.preventDefault();
        }
    }, false);
    
    arrCharge3[i].addEventListener('touchend', function(event) {
        const change  = startX - event.changedTouches[0].clientX;
        const change2  = event.changedTouches[0].clientX - startX;
        const threshold = slides[0] / 3;
        if (change < 0) {
            if(change2 < threshold) {
                slides[0].style.left = '-160%';
                slides[1].style.left = '-40%';
                slides[2].style.left = '80%';
            } else {
                slides[0].style.transition = 'all .3s';
                slides[1].style.transition = 'all .3s';
                slides[0].style.left = '20%';
                slides[1].style.left = '140%';
                slides[2].style.left = '260%';
                sliderBtns.slideIndexMinus();
                sliderBtns.showPrice();
            }
        } else {
            if (change < threshold) {
                slides[0].style.left = '-160%';
                slides[1].style.left = '-40%';
                slides[2].style.left = '80%';
            } else {
                slides[1].style.transition = 'all .3s';
                slides[2].style.transition = 'all .3s';
                slides[0].style.left = '-340%';
                slides[1].style.left = '-220%';
                slides[2].style.left = '-100%';
                sliderBtns.slideIndexPlus();
                sliderBtns.showPrice();
            }
        }
    }, false);
}

for(let i = 0; i < arrHR.length; i += 1) {

    arrHR[i].addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        slides[1].style.transition = ' ';
        slides[2].style.transition = ' ';
    }, false)
    
    arrHR[i].addEventListener('touchmove', function(event) {
        const touch = event.touches[0];
        const change = touch.clientX - startX;
        if (change < 0) {
            return;
        }
        slides[1].style.left = (change - slides[2].clientWidth) + 'px';
        slides[2].style.left = change + 'px';
        event.preventDefault();
    }, false);
    
    arrHR[i].addEventListener('touchend', function() {
        const change  = event.changedTouches[0].clientX - startX;
        const threshold = slides[0] / 3;
        if (change < threshold) {
            slides[0].style.left = '-340%';
            slides[1].style.left = '-220%';
            slides[2].style.left = '-100%';
        } else {
            slides[1].style.transition = 'all .3s';
            slides[2].style.transition = 'all .3s';
            slides[0].style.left = '-160%';
            slides[1].style.left = '-40%';
            slides[2].style.left = '80%';
            sliderBtns.slideIndexMinus();
            sliderBtns.showPrice();
        }
    }, false);
    
}
