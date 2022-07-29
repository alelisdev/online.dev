import React, { Component } from 'react';

type props = {
  meeting: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  // handleClose?: Function;
};
class JitsiComponent extends Component {
  domain = 'j.lkpt.de';
  api = {};

  constructor(props: props) {
    super(props);
    this.state = {
      room: props.meeting.id,
      user: {
        name: 'Client123',
      },
      isAudioMuted: false,
      isVideoMuted: false,
    };
  }

  startMeet = () => {
    const options = {
      // @ts-expect-error add state type
      roomName: this.state.room,
      width: '100%',
      height: 944,
      configOverwrite: {
        constraints: {
          video: {
            height: {
              ideal: 1080,
              max: 2160,
              min: 240,
            },
          },
        },
        prejoinPageEnabled: true,
        enableWelcomePage: true,
        toolbarButtons: [
          'camera',
          'chat',
          'fullscreen',
          'desktop',
          'hangup',
          'microphone',
          'select-background',
          'tileview',
        ],
        remoteVideoMenu: {
          disableKick: true,
        },
        disableRemoteMute: true,
        hideConferenceSubject: true,
        hideConferenceTimer: true,
      },
      interfaceConfigOverwrite: {
        APP_NAME: 'Affectcx',
        CONNECTION_INDICATOR_DISABLED: true,
        DEFAULT_LOGO_URL: 'images/logo.png',
        DEFAULT_WELCOME_PAGE_LOGO_URL: 'images/logo.png',
        DISPLAY_WELCOME_FOOTER: false,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
        HIDE_INVITE_MORE_HEADER: true,
        JITSI_WATERMARK_LINK: 'https://app.affectcx.com',
        MOBILE_APP_PROMO: false,
        NATIVE_APP_NAME: 'Affectcx',
        PROVIDER_NAME: 'Affectcx',
        RECENT_LIST_ENABLED: false,
        SETTINGS_SECTIONS: ['devices', 'profile', 'sounds'],
        SHOW_JITSI_WATERMARK: false,
        VIDEO_QUALITY_LABEL_DISABLED: true,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        // @ts-expect-error add state type
        displayName: this.state.user.name,
      },
    };
    // @ts-expect-error add window type
    this.api = new window.JitsiMeetExternalAPI(this.domain, options) as any;

    // @ts-expect-error add api type
    this.api.addEventListeners({
      // @ts-expect-error add props type
      readyToClose: this.props.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus,
    });
  };

  // handleClose = () => {
  //   console.log('handleClose');
  // };

  handleParticipantLeft = async (participant: any) => {
    console.log('handleParticipantLeft', participant);
    await this.getParticipants();
  };

  handleParticipantJoined = async (participant: any) => {
    // @ts-expect-error add window type
    this.api.executeCommand('toggleTileView');
    console.log('handleParticipantJoined', participant);
    await this.getParticipants();
  };

  handleVideoConferenceJoined = async (participant: any) => {
    console.log('handleVideoConferenceJoined', participant);
    await this.getParticipants();
  };

  handleVideoConferenceLeft = () => {
    console.log('handleVideoConferenceLeft');
    // return this.props.history.push('/thank-you');
  };

  handleMuteStatus = (audio: any) => {
    console.log('handleMuteStatus', audio); // { muted: true }
  };

  handleVideoStatus = (video: any) => {
    console.log('handleVideoStatus', video); // { muted: true }
  };

  getParticipants() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // @ts-expect-error add api type
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500);
    });
  }

  // custom events
  executeCommand(command: any) {
    // @ts-expect-error add api type
    this.api.executeCommand(command);
    if (command == 'hangup') {
      // @ts-expect-error add props type
      return this.props.history.push('/thank-you');
    }

    if (command == 'toggleAudio') {
      // @ts-expect-error add state type
      this.setState({ isAudioMuted: !this.state.isAudioMuted });
    }

    if (command == 'toggleVideo') {
      // @ts-expect-error add state type
      this.setState({ isVideoMuted: !this.state.isVideoMuted });
    }
  }

  componentDidMount() {
    // @ts-expect-error add window type
    if (window.JitsiMeetExternalAPI) {
      this.startMeet();
    } else {
      alert('JitsiMeetExternalAPI not loaded');
    }
  }

  render() {
    // const { isAudioMuted, isVideoMuted } = this.state;
    return (
      <>
        <div id="jitsi-iframe" style={{ height: '100vh' }}></div>
      </>
    );
  }
}

export default JitsiComponent;
