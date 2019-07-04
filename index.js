import React from 'react';
import ReactDOM from 'react-dom';
import { Widget } from './index_for_react_app';

const plugin = {
  init: (args) => {
    ReactDOM.render(
      <Widget
        socketUrl={args.socketUrl}
        socketPath={args.socketPath}
        converseUrl={args.converseUrl}
        title={args.title}
        subtitle={args.subtitle}
        senderPlaceHolder={args.senderPlaceHolder}
        titleAvatar={args.titleAvatar}
        profileAvatar={args.profileAvatar}
      />, document.querySelector(args.selector)
    );
  }
};

export {
  plugin as default,
  Widget,
};

