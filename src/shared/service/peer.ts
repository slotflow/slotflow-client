class PeerService {
  peer!: RTCPeerConnection;

  constructor() {
    this.initPeer();
  }

  initPeer() {
    if (this.peer && this.peer.signalingState !== "closed") {
      this.peer.close();
    }
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });
  }

  close(): void {
    if (this.peer && this.peer.signalingState !== "closed") {
      this.peer.close();
    }
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | undefined> {
    await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
    const ans = await this.peer.createAnswer();
    await this.peer.setLocalDescription(ans);
    return ans;
  }

  async setLocalDescription(ans: RTCSessionDescriptionInit): Promise<void> {
    await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
  }

  async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);
    return offer;
  }
}

export default new PeerService();