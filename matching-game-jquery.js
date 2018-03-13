(function() {
  'user.strict'
  window.matchingGame = {

    cards: [
      'fa fa-github',
      'fa fa-twitter',
      'fa fa-steam',
      'fa fa-reddit-alien',
      'fa fa-github',
      'fa fa-github-alt',
      'fa fa-forumbee',
      'fa fa-twitter',
      'fa fa-angellist',
      'fa fa-github-alt',
      'fa fa-forumbee',
      'fa fa-angellist',
      'fa fa-android',
      'fa fa-reddit-alien',
      'fa fa-steam',
      'fa fa-android'
    ],

    compareGround: [],
    startTime: null,
    finalTime: null,
    timeID: null,
    firstClick: 'true',
    score: 0,
    matchCards: 0,
    switchButton:'off',
    musicPicker:'false',
    musicBar:null,


    init() {

      let self = this;
      $(document).ready(() => {
        self.build();
        self.events();
      })
    },

    build() {
      let self = this;
      self.restart();
    },

    events() {
      let self = this;
      $('.deck').click((e) => {
        if (e.target.nodeName == 'LI' && !$(e.target).hasClass('open')) {
          self.openCard(e.target);
          self.addToCompareGround(e.target);
          self.timeCounter();
          if (self.compareGround.length == 2) {
            self.scoreKeeper();
            e.target.innerHTML == self.compareGround[0].innerHTML ? self.lockOpenCards() : self.hideCard();
          }
        }
      })
      $('.restart').click(() => {
        self.restart();
      }),

      $('.music-icon').click(() => {
        self.switchButton == 'off' ? self.switchButton = 'on' : self.switchButton = 'off';
        self.musicSwitch();
      })
      $('.fa-angle-double-right').on('click',(e)=>{
        if(e.target.className == 'fa fa-angle-double-right'){
          self.musicAnimateOff()
        }
      })
      // $('.fa-share').on('click',()=>{
      //   $('#winner').css('animation','none 2s forwards');
      //   self.restart();
      // })
      $('.fa-share').click(()=>{
        $('#winner').css('animation','none 2s forwards');
        self.restart();
      })


    },

    openCard(item) {
      let self = this;
      $(item).addClass('open');
    },

    addToCompareGround(item) {
      let self = this;
      self.compareGround.push(item);
    },

    lockOpenCards() {
      let self = this;
      self.matchCards += 1;
      self.compareGround.forEach((card) => {
        setTimeout((card) => {
          $(card).addClass('open');
        }, 500)
      })
      self.compareGround = [];
      console.log(self.matchCards)
      self.win();
    },

    hideCard() {
      let self = this;
      self.compareGround.forEach((card) => {
        setTimeout(() => {
          $(card).removeClass('open');
        }, 500)
      })
      self.compareGround = [];
    },

    timeCounter() {
      let self = this;
      if (self.firstClick == 'true') {
        self.startTime = new Date();
        self.timeID = setInterval(() => {
          self.finalTime = Math.round((new Date() - self.startTime) / 1000);
          $('.clock span').text(self.finalTime);
        }, 1000)
        self.firstClick = 'false';
      }
    },

    scoreKeeper() {
      let self = this;
      self.score += 1;
      $('.times').text(self.score);
      if (self.score == 16) {
        $('.first').attr('class', 'fa fa-star-half-o first');
      } else if (self.score == 18) {
        $('.first').attr('class', 'fa fa-star-o first');
      } else if (self.score == 20) {
        $('.second').attr('class', 'fa fa-star-half-o second');
      } else if (self.score == 22) {
        $('.second').attr('class', 'fa fa-star-o second');
      } else if (self.score == 24) {
        $('.third').attr('class', 'fa fa-star-half-o third');
      } else if (self.score == 28) {
        $('.third').attr('class', 'fa fa-star-o third');
      }
    },

    musicSwitch(){
      let self = this;
      if( self.switchButton == 'on'){
        self.playMusic()
        self.musicAnimateOn();
      }else if(self.switchButton == 'off'){
        self.musicAnimateOff();
        $('audio').attr('src', "");
        $('.music-icon i').attr('class','fa fa-music');
        self.musicDottedPause();
      }

    },

   // musicAnimate(){
   //   let self = this;
   //   if(self.switchButton == 'on'){
   //     $('.slider').css('animation','slideOn 1s ease-in-out both');
   //   }
   //   else if(self.switchButton == 'off'){
   //     $('.slider').css('animation','slideOff 1s ease-in-out');
   //   }
   // },

  musicAnimateOn(){
    let self = this;
    // if(self.switchButton == 'on'){
      $('.slider').css('animation','slideOn 1s ease-in-out both');
    // }
  },

  musicDottedPause(){
    $('#dotted').removeClass('dotted-play').addClass('dotted-stop');
    $('#dotted li').css('animation-play-state','paused');

  },

  musicDottedRun(){
    $('#dotted').removeClass('dotted-stop').addClass('dotted-play');
    $('#dotted li').css('animation-play-state','running');
  },

  musicAnimateOff(){
    let self = this;
    // if(self.switchButton == 'off'){
      $('.slider').css('animation','slideOff 1s ease-in-out');
    // }
  },

    playMusic() {
      let self = this;

      $('.music-list').on('click', (e) => {
        if(e.target.nodeName == 'UL'){
          return false;
        }
        if (e.target.className == 'fa fa-pagelines') {
          $('audio').attr('src', "http://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/forest.mp3");
        } else if (e.target.className == 'fa fa-tint') {
          $('audio').attr('src', "http://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/ocean.mp3");
        } else if (e.target.className == 'fa fa-soundcloud') {
          $('audio').attr('src', "http://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/rain.mp3");
        } else if (e.target.className == 'fa fa-modx') {
          $('audio').attr('src', "http://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/peace.mp3");
        } else if (e.target.className == 'fa fa-coffee') {
          $('audio').attr('src', "http://joeweaver.me/codepenassets/freecodecamp/challenges/build-a-pomodoro-clock/cafe.mp3");
        }

         // console.log($('button i').attr('class'));
         // if($('button i').attr('class') !== 'fa fa-angle-double-right'){
         //   $('.music-icon i').attr('class','fa fa-pause');
         //   console.log('test')
         //   self.musicAnimateOff();
         // }

         if(e.target.className !== 'fa fa-angle-double-right'){
           $('.music-icon i').attr('class','fa fa-pause');
           self.switchButton = 'on';
           self.musicAnimateOff();
           self.musicDottedRun();
         }else if(e.target.className == 'fa fa-angle-double-right'){
           self.switchButton = 'off';
         }

      })
    },

    overVisual(){
      $('#winner').css('animation','congrat 2s forwards')
    },

    // overVisalHidden(){
    //   $('.music-list').css('transform','translateX(-100%)');
    // },

    restart() {
      let self = this;
      clearInterval(self.timeID);
      self.shuffleCards(self.cards);
      self.compareGround = [];
      self.startTime = null;
      self.finalTime = null;
      self.firstClick = 'true';
      self.score = 0;
      self.matchCards = 0;
      $('.clock span').text(0);
      $('.times').text(0);
      $('.starts').empty();
      $('.starts').prepend('<ul> <li><i class="fa fa-star third" aria-hidden="true"></i></li> <li><i class="fa fa-star second" aria-hidden="true"></i></li> <li><i class="fa fa-star first" aria-hidden="true"></i></li> </ul>');
      // self.overVisalHidden();
    },

    win() {
      let self = this;
      if (self.matchCards == 8) {
        $('.final-moves').html(self.score);
        $('.final-seconds').html(self.finalTime);
        self.overVisual();
      }

    },

    shuffleCards(items) {
      let self = this;
      self.shuffle(items);
      $('.deck').empty();
      let content = '';
      for (let i = 0; i < items.length; i++) {
        content += `<li class='card'><i class="${items[i]} aria-hidden="true"></i></li>`;
      }
      $('.deck').prepend(content);
    },

    shuffle(array) {
      let currentIndex = array.length,
        temporaryValue, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  }
  window.matchingGame.init();
})()
