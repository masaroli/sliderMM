document.addEventListener("DOMContentLoaded", function() { 
    loader();
    var slider = new MonkSlider();
    slider.init();
    console.log(slider.slides)
    slider.arrows[0].addEventListener("click", () => slider.prev())
    slider.arrows[1].addEventListener("click", () => slider.next())


 });



 class MonkSlider {
    constructor() {
        this.sliderHolder = document.getElementById('slider-wrapper');
        this.controlBar = document.createElement('ul')

        this.arrows = document.getElementsByClassName('arrow') //0:left 1:right
        this.sliderPosition = 0;
        this.sliderData = [
            { 
               bgPositionX:'0%',
               title:'WE ARE BREAKING OUR BOW OF SILENCE',
               text:'In January 2011, after a decade of digital, we opened the doors to our temple.'+ 
               '<br> Follow our noble eightfold path to digital enlightemment here.',
               class:'text-intro'
             },
            {
               bgPositionX:'14.2%',
               title:'TALENT IS GIVEN, TRUE SKILL IS <br> EARNED',
               text: 'Step 1 out of 8 to digital enlightemment.',
               class:'text-start-center'

           },
           {
               bgPositionX:'21.3%',
               title:'BE FLEXIBLE TO CHANGE AND STURDY IN CONVICTION',
               text: 'Step 2 out of 8 to digital enlightemment.',
               class:'text-start-center'
           }, 
           {
               bgPositionX:'35.5%',
               title:'USE MANY SKILLS, YET WORK AS ONE',
               text: 'Step 3 out of 8 to digital enlightemment.',
               class:'text-end-center'

           },    
           {
               bgPositionX:'49.9%',
               title:'TO MASTER ANYTHING, FIND INTEREST IN EVERYTHING',
               text: 'Step 4 out of 8 to digital enlightemment.',

               class:'text-end-center'

           }, 
           {
               bgPositionX:'64.1%',
               title:'INDIVIDUALS FLOURISH IF CULTURE AND WISDOM ARE SHARED',
               text: 'Step 5 out of 8 to digital enlightemment.',
               class:'text-end-center'

           },  
           {
               bgPositionX:'85.4%',
               title:'TRAIN FOR PERFECTION BUT AIM FOR MORE',
               text: 'Step 6 out of 8 to digital enlightemment.',
               class:'text-start-center'

           }, 
           {
               bgPositionX:'99.6%',
               title:'TAKE PRIDE IN YOUR WORK BUT DO NOT SEEK PRAISE',
               text: 'Step 7 out of 8 to digital enlightemment.',
               class:'text-start-center'

           },  
           {
               bgPositionX:'99.6%',
               title:'TEMPORARY SACRIFICE BRINGS LASTING RESULTS',
               text: 'Step 8 out of 8 to digital enlightemment.',
               class:'text-start-center'

           },   
           {
               bgPositionX:'113.8%',
               title:'',
               text: '',
               class:'finish-slide'
           }
        ];
        this.slides= [],
        this.sliderMax = this.sliderData.length -1; //10 sections and 9 slides
    }

    next(){
        this.sliderPosition < this.sliderMax ? this.sliderPosition +=1 : this.sliderPosition = 0;

        this.animations()
        this.hideArrows()
    }

    prev(){
        this.sliderPosition > 0 ? this.sliderPosition -=1 : this.sliderPosition = this.sliderMax
        this.animations()
    }

    animations(){
        TweenMax.to(this.sliderHolder, 1, {backgroundPositionX:this.sliderData[this.sliderPosition].bgPositionX, onComplete:() => this.hideArrows()})
        TweenMax.to(this.slides[this.sliderPosition], 1, {autoAlpha:1})
        TweenMax.set(this.slides, {autoAlpha:0})
    }

    hideArrows(){
        
        this.sliderPosition === 0 ? TweenMax.to(this.arrows[0], 0.25, {autoAlpha:0}) : TweenMax.to(this.arrows[0], 0.25, {autoAlpha:1, delay:1})
        this.sliderPosition === this.sliderMax ? TweenMax.to(this.arrows[1], 0.25, {autoAlpha:0}) : TweenMax.to(this.arrows[1], 0.25, {autoAlpha:1})
    }

    createSections(){
        for(let i = 0; i < this.sliderData.length; i++){
            let section = document.createElement('section');
            let sectionContentWrapper = document.createElement('div');
            let title = document.createElement('h1')
            let text = document.createElement('p');
            section.appendChild(sectionContentWrapper)
            section.appendChild(text)

            sectionContentWrapper.appendChild(title)

            title.innerHTML = this.sliderData[i].title;
            text.innerHTML = this.sliderData[i].text;

            section.setAttribute('data-index', i)
            sectionContentWrapper.classList.add(this.sliderData[i].class)

            this.slides.push(section)
            this.sliderHolder.appendChild(section)

        }
    }
    createControls(){
        for(let i = 0; i < this.sliderData.length; i++){
            let controlItems = document.createElement('li')
            controlItems.innerHTML = i
            controlItems.setAttribute('data-index', i)
            controlItems.addEventListener('click', (e) => this.goToSection(e))
            this.controlBar.appendChild(controlItems)

        }
        this.sliderHolder.appendChild(this.controlBar)
    }
    goToSection(e){
        this.sliderPosition = +e.target.dataset.index
        this.animations();
    }

    init(){
        this.createSections();
        this.hideArrows();
        this.createControls();
        TweenMax.set(this.slides, {autoAlpha:0}) //this is not the best solution right?
        TweenMax.set(this.slides[0], {autoAlpha:1}) 

    }

 }


 function loader(){
    var loaderHolder = document.getElementById('loader');
    var masterTL = new TimelineMax({
        onComplete:function(){
           endLoader();
        }
    });
    masterTL
    .from('.loader-img', 0.75, {y:20, scale:0.5, ease:Back.easeOut.config(1.5), transformOrigin:'50% 0%'}, 0)
    .from('.loader-text',  0.25, {scale:0, ease:Sine.easeOut}, '-=.25')
    .addLabel('2ndScn', '+=0')
    .add(smoke(),'2ndScn')
    .fromTo('.loader-img', 1, { y:0 }, { ease: Power0.easeNone, y: -20, repeat:2, yoyo:true}, '2ndScn')
    .to('.loader-text span', 1, {innerText:'Young Padawan...'}, '2ndScn+=1.5');

    // create smoke particles
    function smoke(){
        var smokeHolder = document.getElementById('smoke-holder'),
        particles = 20,
        randomTop = '20px', randomLeft;
        for(var i = 0; i < particles; i++) {
            randomTop = Math.floor(Math.random() * (smokeHolder.clientWidth/2)+20)+"px";
            randomLeft = Math.floor(Math.random() * (smokeHolder.clientWidth))+"px";
            var smokeParticle = document.createElement("div");
            smokeParticle.style.top = randomTop;
            smokeParticle.style.left = randomLeft;
            smokeParticle.classList.add('smoke-particle');
            smokeHolder.appendChild(smokeParticle);
        }
        return TweenMax.staggerFrom('.smoke-particle', 0.25, {autoAlpha:0, y:25, repeat:7, yoyo:true}, 0.1)

    }

    function endLoader(){
        var tlEnd = new TimelineMax({
            onComplete:function(){
                loaderHolder.parentNode.removeChild(loaderHolder);
            }
        });

        tlEnd.to('.loader-content', 0.5, {scale:0, ease:Back.easeIn.config(1.5)}, 0)
        .to('.loader', 1, {autoAlpha:0}, '+=0.25');
    }
 }



 this.sliderData = [
    { 
       bgPositionX:'0%',
       title:'WE ARE BREAKING OUR BOW OF SILENCE',
       text:'In January 2011, after a decade of digital, we opened the doors to our temple.'+ 
       '<br> Follow our noble eightfold path to digital enlightemment here.',
       class:'text-start-top'
     },
    {
       bgPositionX:'14.2%',
       title:'TALENT IS GIVEN, TRUE SKILL IS <br> EARNED',
       text: 'Step 1 out of 8 to digital enlightemment.',
       class:'text-start-center'

   },
   {
       bgPositionX:'21.3%',
       title:'BE FLEXIBLE TO <br> CHANGE AND <br> STURDY IN <br> CONVICTION',
       text: 'Step 2 out of 8 to digital enlightemment.',
       class:'text-start-center'
   }, 
   {
       bgPositionX:'35.5%',
       title:'USE MANY SKILLS, <br> YET WORK AS ONE',
       text: 'Step 3 out of 8 to digital enlightemment.',
       class:'text-end-center'

   },    
   {
       bgPositionX:'49.9%',
       title:'TO MASTER ANYTHING, FIND <br> INTEREST IN <br> EVERYTHING',
       text: 'Step 4 out of 8 to digital enlightemment.',

       class:'text-end-center'

   }, 
   {
       bgPositionX:'64.1%',
       title:'INDIVIDUALS <br> FLOURISH <br> IF CULTURE <br> AND WISDOM <br> ARE SHARED',
       text: 'Step 5 out of 8 to digital enlightemment.',
       class:'text-end-center'

   },  
   {
       bgPositionX:'85.4%',
       title:'TRAIN FOR <br> PERFECTION BUT <br> AIM FOR MORE',
       text: 'Step 6 out of 8 to digital enlightemment.',
       class:'text-start-center'

   }, 
   {
       bgPositionX:'99.6%',
       title:'TAKE PRIDE IN YOUR <br> WORK BUT DO NOT <br> SEEK PRAISE',
       text: 'Step 7 out of 8 to digital enlightemment.',
       class:'text-start-center'

   },  
   {
       bgPositionX:'99.6%',
       title:'TEMPORARY <br> SACRIFICE BRINGS<br>LASTING RESULTS',
       text: 'Step 8 out of 8 to digital enlightemment.',
       class:'text-start-center'

   },   
   {
       bgPositionX:'113.8%',
       title:'',
       text: '',
       class:'finish-slide'
   }
];