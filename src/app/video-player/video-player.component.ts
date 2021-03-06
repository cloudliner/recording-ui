import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() stream: MediaStream;
  @Input() id: string;
  @ViewChild('videoPlayer') videoPlayer: any;
  @ViewChild('audioPlayer') audioPlayer: any;
  hasVideo = true;

  ngOnInit(): void {
    const videoTracks = this.stream.getVideoTracks();
    if (videoTracks.length === 0) {
      this.hasVideo = false;
      this.audioPlayer.nativeElement.srcObject = this.stream;
      if (this.id === 'localStream') {
        this.audioPlayer.nativeElement.muted = true;
      }
    } else {
      this.hasVideo = true;
      this.videoPlayer.nativeElement.srcObject = this.stream;
      if (this.id === 'localStream') {
        this.videoPlayer.nativeElement.muted = true;
      }
    }
  }
}
