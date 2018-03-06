import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoomData, getChatLog, sendNewMessage } from '../actions';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

class ChatRoom extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            message: ''
        };
    }

    componentDidMount(){
        const { roomId, logId } = this.props.match.params;

        this.props.getRoomData(roomId, logId);
        
        this.dbLogRef = db.ref(`/chat-logs/${logId}`).on('value', snapshot=>{
                this.props.getChatLog(snapshot.val());
            })
    }

    componentWillUnmount(){
        db.ref(`/chat-logs/${this.props.match.params.logId}`).off()
    }

    sendMessage(e){
        e.preventDefault();
        console.log('sending message')
        this.props.sendNewMessage(this.props.roomInfo.chatLogId, this.state.message)
        this.setState({
            message: ''
        })
    }

    render(){
        const {name} = this.props.roomInfo;
        const {chatLog} = this.props
        const msgs = Object.keys(chatLog).reverse().map((key)=>{
            return (
                <li key={key} className='collection-item'>
                    {chatLog[key]}
                </li>
            )
        })
        return (
            <div>
                <Link to='/' className='btn blue darken-4'>Home</Link>
                <div className="row">
                    <div className="col s12">
                        <h4>Chat Room: {name ? name : 'Loading...'}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <h5 className='center-align'>This is where we get chat done</h5>
                        <ul className='collection'>
                            {msgs}
                        </ul>
                    </div>
                    <div className="col s6 center-align">
                        <form>
                            <label>Enter Your Message Here</label>
                            <textarea value={this.state.message} onChange={e => this.setState({message: e.target.value})}className="materialize-textarea"></textarea>
                            <button className='btn red darken-3' onClick={this.sendMessage.bind(this)}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function MSTP (state){
    return {
        roomInfo: state.chat.currentRoom,
        chatLog: state.chat.chatLog
    }
}

export default connect(MSTP, {getRoomData, getChatLog, sendNewMessage})(ChatRoom)