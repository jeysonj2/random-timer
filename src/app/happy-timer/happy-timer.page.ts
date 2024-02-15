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

  status: 'play' | 'pause' | 'stop' = 'stop';

  public get showPlay(): boolean {
    return this.status === 'pause' || this.status === 'stop';
  }
  public get showPause(): boolean {
    return this.status === 'play';
  }
  public get showStop(): boolean {
    return this.status === 'play' || this.status === 'pause';
  }

  public get showButtons(): boolean {
    return this.selectedOptionsCounter > 1;
  }

  public get showMinsControl(): boolean {
    return this.selectedOptionsCounter > 1;
  }

  readonly WARNING_SECONDS = 10;
  readonly WARNING_SOUND = new Audio('/assets/sounds/beep.mp3');

  ngOnInit(): void {
    this.setRandomValues();
  }

  runTimer() {
    this.stopTimer();
    this.setRandomValues();
    if (this.selectedOptionsCounter > 1) {
      this.startTimer();
    }
  }

  private setRandomValues() {
    this.selectedOptionsCounter = this.options.filter(option => option.value).length;
    this.randomIndex = 0;
    this.randomMinutes = 0;

    if (this.selectedOptionsCounter === 0) {
      return;
    }

    if (this.selectedOptionsCounter === 1) {
      this.randomIndex = this.options.findIndex(option => option.value);
      this.currentOption = this.options[this.randomIndex];
      return;
    }

    // Get options but removing the ones not selected and the one in the randomIndex
    const filteredOptions = this.options.filter((option) => option.value && option.id !== this.currentOption.id);

    this.randomMinutes = Math.floor(Math.random() * this.maxMinutes) + 1;
    this.randomIndex = Math.floor(Math.random() * filteredOptions.length);
    this.timerSecondsLeft = this.randomMinutes * 60;
    this.currentOption = filteredOptions[this.randomIndex];

    this.updateTimerLabel();
  }

  private updateTimerLabel() {
    const minutes = Math.floor(this.timerSecondsLeft / 60);
    const seconds = this.timerSecondsLeft % 60;

    this.timerLabel = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  startTimer() {
    clearInterval(this.timerIntervalId);
    this.status = 'play';

    this.timerIntervalId = setInterval(() => {
      this.timerSecondsLeft--;

      if (this.timerSecondsLeft <= 0) {
        this.WARNING_SOUND.pause();
        this.runTimer();
      }

      if (this.timerSecondsLeft <= this.WARNING_SECONDS && this.WARNING_SOUND.paused) {
        // Play sound
        this.WARNING_SOUND.play();
      }

      this.updateTimerLabel();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerIntervalId);
    this.WARNING_SOUND.pause();
    this.status = 'pause';
  }

  stopTimer() {
    clearInterval(this.timerIntervalId);
    this.WARNING_SOUND.pause();
    this.timerSecondsLeft = this.randomMinutes * 60;
    this.updateTimerLabel();
    this.status = 'stop';
  }
}
