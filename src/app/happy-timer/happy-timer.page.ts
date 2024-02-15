import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-happy-timer',
  templateUrl: 'happy-timer.page.html',
  styleUrls: ['happy-timer.page.scss']
})
export class HappyTimerPage implements OnInit {
  options = [
    { label: '👅🍆', value: true, id: '1' },
    { label: '🍆🌮', value: true, id: '2' },
    { label: '🍆🍑', value: false, id: '3' },
    { label: '🖕🌮', value: false, id: '4' },
    { label: '👅🌮', value: false, id: '5' },
  ];

  maxMinutes = 1;

  selectedOptionsCounter = 2;
  randomIndex = 0;
  randomMinutes = 0;

  currentOption = this.options[this.randomIndex];

  timerSecondsLeft = 0;
  timerLabel = '00:00';
  timerIntervalId: any;

  ngOnInit(): void {
    this.runTimer();
  }

  runTimer() {
    this.stopTimer();

    this.selectedOptionsCounter = this.options.filter(option => option.value).length;
    this.randomIndex = 0;
    this.randomMinutes = 0;

    if (this.selectedOptionsCounter === 0) {
      return;
    }

    if (this.selectedOptionsCounter === 1) {
      this.randomIndex = this.options.findIndex(option => option.value);
      return;
    }

    // Get options but removing the ones not selected and the one in the randomIndex
    const lastId = this.options;
    const filteredOptions = this.options.filter((option, index) => option.value && option.id !== this.currentOption.id);

    this.randomMinutes = Math.floor(Math.random() * this.maxMinutes) + 1;
    this.randomIndex = Math.floor(Math.random() * filteredOptions.length);

    this.currentOption = filteredOptions[this.randomIndex];

    this.startTimer()
  }

  private updateTimerLabel() {
    const minutes = Math.floor(this.timerSecondsLeft / 60);
    const seconds = this.timerSecondsLeft % 60;

    this.timerLabel = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  startTimer() {
    clearInterval(this.timerIntervalId);

    this.timerIntervalId = setInterval(() => {
      this.timerSecondsLeft--;

      if (this.timerSecondsLeft <= 0) {
        this.runTimer();
      }

      this.updateTimerLabel();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerIntervalId);
  }

  stopTimer() {
    clearInterval(this.timerIntervalId);
    this.timerSecondsLeft = this.randomMinutes * 60;
    this.timerLabel = `${this.randomMinutes.toString().padStart(2, '0')}:00`;
  }
}
