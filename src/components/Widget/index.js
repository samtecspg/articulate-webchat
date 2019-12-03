import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Nes from 'nes';
import Guid from 'guid';

import {
  toggleChat,
  addUserMessage,
  addResponseMessage,
  toggleMsgLoader,
  setQuickButtons,
} from '@actions';

import WidgetLayout from './layout';

class Widget extends Component {
  state = {
    client: null,
    socketClientConnected: false,
    waitingForMessage: false,
  };

  componentWillMount() {
    if (!this.state.socketClientConnected) {
      const client = new Nes.Client(this.props.socketUrl);
      client.onConnect = () => {
        this.setState({
          client,
          socketClientConnected: true,
        });

        const handler = response => {
          if (response) {
            if (this.state.waitingForMessage) {
              this.setState({
                waitingForMessage: false,
              });
              this.props.dispatch(toggleMsgLoader());
            }
            this.props.dispatch(addResponseMessage(response.textResponse));
            if (response.quickResponses) {
              this.props.dispatch(
                setQuickButtons(
                  response.quickResponses.map(quickResponse => {
                    return {
                      value: quickResponse,
                      label: quickResponse,
                    };
                  }),
                ),
              );
            }
          }
        };
        const storedSessionId = localStorage.getItem('sessionId');
        let sessionId;
        if (storedSessionId) {
          sessionId = storedSessionId;
        } else {
          const newSessionId = Guid.create().toString();
          sessionId = newSessionId;
          localStorage.setItem('sessionId', newSessionId);
        }
        client.subscribe(this.props.socketPath + '/' + sessionId, handler);
      };
      client.connect();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullScreenMode) {
      this.props.dispatch(toggleChat());
    }
  }

  toggleConversation = () => {
    this.props.dispatch(toggleChat());
  };

  handleMessageSubmit = event => {
    event.preventDefault();
    const userInput = event.target.message.value;
    if (userInput.trim()) {
      this.getResponseFromMessage(userInput);
    }
    event.target.message.value = '';
  };

  handleQuickButtonClicked = (event, value) => {
    event.preventDefault();
    this.getResponseFromMessage(value);
    this.props.dispatch(setQuickButtons([]));
  };

  getResponseFromMessage = text => {
    this.props.dispatch(addUserMessage(text, this.props.converseUrl));
    this.setState({
      waitingForMessage: true,
    });
    this.props.dispatch(toggleMsgLoader());
  };

  render() {
    return (
      <WidgetLayout
        onToggleConversation={this.toggleConversation}
        onSendMessage={this.handleMessageSubmit}
        onQuickButtonClicked={this.handleQuickButtonClicked}
        title={this.props.title}
        titleAvatar={this.props.titleAvatar}
        subtitle={this.props.subtitle}
        senderPlaceHolder={this.props.senderPlaceHolder}
        profileAvatar={this.props.profileAvatar}
        showCloseButton={this.props.showCloseButton}
        fullScreenMode={this.props.fullScreenMode}
        badge={this.props.badge}
        autofocus={this.props.autofocus}
        customLauncher={this.props.customLauncher}
      />
    );
  }
}

Widget.propTypes = {
  title: PropTypes.string,
  titleAvatar: PropTypes.string,
  subtitle: PropTypes.string,
  senderPlaceHolder: PropTypes.string,
  profileAvatar: PropTypes.string,
  showCloseButton: PropTypes.bool,
  fullScreenMode: PropTypes.bool,
  badge: PropTypes.number,
  autofocus: PropTypes.bool,
  customLauncher: PropTypes.func,
  socketUrl: PropTypes.string,
  socketPath: PropTypes.string,
  converseUrl: PropTypes.string,
};

const withConnect = connect();

export default compose(withConnect)(Widget);
