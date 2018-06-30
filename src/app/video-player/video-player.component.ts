import { Component, AfterViewInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements AfterViewInit {
  @Input() stream: MediaStream;
  @ViewChild('player') player: any;

  ngAfterViewInit(): void {
    this.player.nativeElement.srcObject = this.stream;
  }
}
