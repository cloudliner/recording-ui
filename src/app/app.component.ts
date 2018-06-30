import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

declare var Peer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roomsCollection: AngularFirestoreCollection<any>;
  rooms: Observable<any[]>;

  videoStreams: { id: string; stream: MediaStream; }[] = [];
  skywayId: string;
  roomName: string;
  private localStream = null;
  private peer = null;
  private exsistingCall = null;
  private remoteStream = null;

  constructor(private afs: AngularFirestore) {
    this.roomsCollection = afs.collection<any>('rooms');
    this.rooms = this.roomsCollection.valueChanges();
  }

  create(roomName: string) {
    console.log('create:', roomName);
    this.roomsCollection.add({ name: roomName });
    this.join(roomName);
  }

  join(roomName: string) {
    console.log('join:', roomName);
    if (!roomName) {
      return;
    }
    const call = this.peer.joinRoom(roomName, { mode: 'sfu', stream: this.localStream });
    this.setupCallEventHandlers(call);
  }

  exit() {
    console.log('exit:', this.roomName);
    this.exsistingCall.close();
  }

  loadVideo() {
    console.log('loadVideo');
  }

  setupCallEventHandlers(call) {
    if (this.exsistingCall) {
      this.exsistingCall.close();
    }
    this.exsistingCall = call;

    this.setupEndCallUI();
    this.roomName = call.name;
    call.on('stream', (stream) => {
      this.addVideo(call, stream);
      this.remoteStream = stream;
    });
    call.on('removeStream', (stream) => {
      this.removeVideo(stream.peerId);
    });
    call.on('peerLeave', (peerId) => {
      this.removeVideo(peerId);
    });
    call.on('close', () => {
      this.removeAllRemoteViedos();
      this.setupMakeCallUI();
    });
  }

  addVideo(call, stream) {
    this.videoStreams.push({
      id: stream.peerId,
      stream: stream
    });
  }

  removeVideo(peerId) {
    const index = this.videoStreams.findIndex((videoStream) => {
      if (videoStream.id === peerId) {
        return true;
      }
      return false;
    });
    if (0 <= index) {
      this.videoStreams.splice(index, 1);
    }
  }

  removeAllRemoteViedos() {
    const length = this.videoStreams.length;
    this.videoStreams.splice(1, length - 1);
  }

  setupMakeCallUI() {
    this.roomName = null;
  }

  setupEndCallUI() {
    // TODO
  }

  ngOnInit() {
    const constraints = {
      video: true,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.videoStreams.push({id: 'myStream', stream: stream });
        this.localStream = stream;
      }).catch((error) => {
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
      this.peer = new Peer({
        key: environment.skyway.apiKey,
        debug: 3,
      });
      this.peer.on('open', () => {
        this.skywayId = this.peer.id;
      });
      this.peer.on('call', (call) => {
        call.answer(this.localStream);
        this.setupCallEventHandlers(call);
      });
      this.peer.on('error', (err) => {
        alert(err.message);
      });
  }
}
