import { Injectable } from '@angular/core';

@Injectable()
export class AudioProvider {
    track:any;
    isPaused: Boolean = false;
    url;
    play(url) {
        if(this.url !== url) {
            this.url = url;
            this.track = new Audio(url);
            this.track.load();
        }
        this.track.play();
    }
    pause() {
        this.track.pause();
        this.isPaused = true;
    }
    next(url) {
        this.track.stop();
        this.play(url)
    }
    previous(url) {
        this.track.stop();
        this.play(url)
    }
}