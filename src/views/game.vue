<template>
    <div>
      <div v-if="isLoading"></div>
      <div v-if="!isLoading">
        <div v-show="!winner">
          <div v-if="score > 9">
            <img src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 1.5%" alt="coin.png">
            <img v-if="score > 19" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 3%;" alt="coin.png">
            <img v-if="score > 29" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 4.5%;" alt="coin.png">
            <img v-if="score > 39" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 6%;" alt="coin.png">
            <img v-if="score > 49" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 7.5%;" alt="coin.png">
            <img v-if="score > 59" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 9%;" alt="coin.png">
            <img v-if="score > 69" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 10.5%;" alt="coin.png">
            <img v-if="score > 79" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 12%;" alt="coin.png">
            <img v-if="score > 89" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 13.5%;" alt="coin.png">
            <img v-if="score > 99" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px; position: fixed; right: 0; top: 0; margin-top: 1%; margin-right: 15%;" alt="coin.png">
          </div>
          <img v-if="animation" :class="animation" src="~//Users/elia/Desktop/coin.png" style="height: 60px; width: 60px;" alt="coin.png">
          <div style="position: fixed; left: 0; right: 0; bottom: 0; margin-left: 10%; margin-bottom:25%; width: 80%;">
            <h1 style="margin-top: 60px;">
                {{ decodeURIComponent($store.state.arrayQuestion[index].question) }}
            </h1>
          </div>
          <div style="position: fixed; left: 0; right: 0; bottom: 0; margin-left: 10%; margin-bottom: 15%; width: 80%;">
            <button class="btn" @click="checkAnswer(index, 'True')" style="background-color: #67C23A; border-radius: 15px; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4% 2%; cursor: pointer;">
              True
            </button>
            <button class="btn" @click="checkAnswer(index, 'False')" style="background-color: #F56C6C; border-radius: 15px; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4% 2%; cursor: pointer;">
              False
            </button>
          </div>
          <progress v-if="!isLoading" value="0" max="10" id="countdown"></progress>
        </div>
        <div v-show="winner">
          <div v-if="score == 100">
            <h1>Congrats, youre the champion</h1>
          </div>
          <div v-else>
            <h1>Go, play another game!</h1>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      effect: true,
      animation: '',
      isLoading: true,
      index: 0,
      score: 0,
      time: 11,
      clickAnswer: false,
      winner: false
    }
  },
  created () {
    this.$store.dispatch('getQuestion')
      .then(() => {
        this.isLoading = false
        this.ProgressCountdown(10, 'countdown')
        .then(value => {
          console.log('beres')
        })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    checkAnswer(index, answer) {
      if (this.score === 90) {
        if (this.$store.state.arrayQuestion[index].answer === answer) {
          this.score = 100
          this.winner = true
          console.log('you are the winner')
          console.log('benar')
        } else {
          let x = document.getElementsByClassName("btn");
          x[0].style.visibility = 'hidden';
          x[1].style.visibility = 'hidden';
          console.log('salah');
          if (this.score > 0) {
            this.score -= 10
            this.clickAnswer = true
            this.ProgressCountdown(10, 'countdown')
            .then(value => {
              console.log('beres')
            })
          }
        }
      } else {
        if (this.$store.state.arrayQuestion[index].answer === answer) {
          if (this.score < 100) {
            this.animate('element-animation')
            this.clickAnswer = true
            this.ProgressCountdown(10, 'countdown')
            .then(value => {
              console.log('beres')
            })
          }
          console.log('benar')
        } else {
          let x = document.getElementsByClassName("btn");
          x[0].style.visibility = 'hidden';
          x[1].style.visibility = 'hidden';
          console.log('salah');
          if (this.score > 0) {
            this.score -= 10
            this.clickAnswer = true
            this.ProgressCountdown(10, 'countdown')
            .then(value => {
              console.log('beres')
            })
          }
        }
      }
    },
    animate (anime) {
      this.animation = anime
      setTimeout(() => {
        this.animation = ''
        this.score += 10
        console.log(this.score, 'ini score')
      }, 2000)
    },
    ProgressCountdown (time, bar) {
      return new Promise((resolve, reject) => {
        var countdownTimer = setInterval(() => {
          document.getElementById(bar).value = time
          time--
          if (this.clickAnswer && this.index < 22) {
            this.clickAnswer = false
            clearInterval(countdownTimer)
            this.index++
          } else if (time < 0 && this.index < 22) {
            clearInterval(countdownTimer)
            this.ProgressCountdown(10, 'countdown')
            this.index++
          } else if (this.index === 23) {
            resolve(true)
          }
        }, 1000)
      })
    },
  }
}
</script>

<style>
  progress {
    position: fixed;
    margin: 3%;
    margin-left: 10%;
    right: 0;
    left: 0;
    bottom: 0;
    height: 2rem;
    width: 80%;
    background-color: #E6A23C;
    border-radius: 20px;
  }
  progress::-webkit-progress-bar {
    background-color: lightslategray;
    border-radius: 20px;
  }
  progress::-webkit-progress-value {
    background-color: #E6A23C;
    border-radius: 20px;
  }
  progress::-moz-progress-bar {
    background-color: #E6A23C;
    border-radius: 20px;
  }

  .element-animation {
    animation: animationFrames linear 2s;
    transform-origin: 50% 50%;
    -webkit-animation: animationFrames linear 2s;
    -webkit-transform-origin: 50% 50%;
    -moz-animation: animationFrames linear 2s;
    -moz-transform-origin: 50% 50%;
    -o-animation: animationFrames linear 2s;
    -o-transform-origin: 50% 50%;
    -ms-animation: animationFrames linear 2s;
    -ms-transform-origin: 50% 50%;
  }

  @keyframes animationFrames{
    0% {
      transform:  translate(-26px,-27px)  rotate(0deg) ;
    }
    50% {
      transform:  translate(108px,-80px)  rotate(180deg) ;
    }
    100% {
      transform:  translate(550px,-80px)  rotate(360deg) ;
    }
  }

  @-moz-keyframes animationFrames{
    0% {
      -moz-transform:  translate(-26px,-27px)  rotate(0deg) ;
    }
    50% {
      -moz-transform:  translate(108px,-80px)  rotate(180deg) ;
    }
    100% {
      -moz-transform:  translate(550px,-80px)  rotate(360deg) ;
    }
  }

  @-webkit-keyframes animationFrames {
    0% {
      -webkit-transform:  translate(-26px,-27px)  rotate(0deg) ;
    }
    50% {
      -webkit-transform:  translate(108px,-80px)  rotate(180deg) ;
    }
    100% {
      -webkit-transform:  translate(550px,-80px)  rotate(360deg) ;
    }
  }

  @-o-keyframes animationFrames {
    0% {
      -o-transform:  translate(-26px,-27px)  rotate(0deg) ;
    }
    50% {
      -o-transform:  translate(108px,-80px)  rotate(180deg) ;
    }
    100% {
      -o-transform:  translate(550px,-80px)  rotate(360deg) ;
    }
  }

  @-ms-keyframes animationFrames {
    0% {
      -ms-transform:  translate(-26px,-27px)  rotate(0deg) ;
    }
    50% {
      -ms-transform:  translate(108px,-80px)  rotate(180deg) ;
    }
    100% {
      -ms-transform:  translate(550px,-80px)  rotate(360deg) ;
    }
  }
</style>
