document.addEventListener('DOMContentLoaded', function(){
    const hero = new HeroSlider('.swiper');
    hero.start();
    
    const _textAnimation = function (el, isIntersecting) {
        if(isIntersecting) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    const so = new ScrollObserver('.tween-animate-title', _textAnimation);

    const _inviewAnimation = function (el, inview) {
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }

    const so2 = new ScrollObserver('.cover-slide', _inviewAnimation);

    // const header = document.querySelector('.header');
    // const _navAnimation = function (el, inview) {
    //     if(inview) {
    //         header.classList.remove('triggeid');
    //     } else {
    //         header.classList.add('triggeid');
    //     }
    // }

    // const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once:false});

    new MobileMenu;
    new Main;
});

class Main{
    constructor(){
        this.header = document.querySelector('.header');
        this._observers = [];
        this._scrollInit();
    }

    _scrollInit(){
        this._observers.push(
            new ScrollObserver('.nav-trigger', this_navAnimation.bind(this), {once:false})
        )
        console.log(this._observers);
    }

    _navAnimation(el, inview) {
        if(inview) {
            this.header.classList.remove('triggeid');
        } else {
            this.header.classList.add('triggeid');
        }
    }
}
