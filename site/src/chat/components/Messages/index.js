import React, {Component} from 'react'
import TextMessage from './TextMessage'
import EmojiMessage from './EmojiMessage'
import FileMessage from './FileMessage'
import "../../styles/message.css"
import chatIconUrl from "../../assets/chat-icon.svg";


class Message extends Component {

  _renderMessageOfType(type) {
    switch (type) {
      case 'text':
        return <TextMessage {...this.props.message} />
      case 'emoji':
        return <EmojiMessage {...this.props.message} />
      case 'file':
        return <FileMessage {...this.props.message} />
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`)
    }
  }

  render() {
    const {message, me} = this.props;
    const {author = {}} = message;
    let contentClassList = [
      "sc-message--content",
      (author.email === me.email ? "sent" : "received")
    ];
    return (
        <div className="sc-message">
          <div className={contentClassList.join(" ")}>
            <div className="sc-message--avatar" style={{
              backgroundImage: `url(${author.picture ? author.picture : chatIconUrl})`
            }}></div>
            {this._renderMessageOfType(message.type)}
          </div>
        </div>)
  }
}

export default Message