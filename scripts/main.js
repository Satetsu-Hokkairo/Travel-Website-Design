document.addEventListener('DOMContentLoaded', function(){
    // const hero = new HeroSlider('.swiper');
    // hero.start();

    new Main;
});

class Main{
    constructor(){
        this.header = document.querySelector('.header');
        this.hero = new HeroSlider('.swiper');
        this._observers = [];
        this._init();
    }

    _init() {
    new MobileMenu;
    this._scrollInit();
    }

    _toggleSlideAnimation(el, inview) {
        if(inview) {
            this.hero.start();
        } else {
            this.hero.stop();
        }
    }

    destroy() {
        this._observers.forEach(so => so.destroy());
    }

    _scrollInit(){
        this._observers.push(
            new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once:false}),
            new ScrollObserver('.swiper', this._toggleSlideAnimation.bind(this), {once:false}),
            new ScrollObserver('.cover-slide', this._inviewAnimation),
            new ScrollObserver('.tween-animate-title', this._textAnimation)
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

    _inviewAnimation(el, inview) {
        if(inview) {
            el.classList.add('inview');
        } else {
            el.classList.remove('inview');
        }
    }

    _textAnimation(el, isIntersecting) {
        if(isIntersecting) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
}
