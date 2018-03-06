import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { getRoomList, createRoom } from '../actions';


class Lobby extends Component {
    constructor(props){
        super(props)

        this.state = {
            roomName: ''
        }
        this.dbChatRef = db.ref('/chat-rooms');

    }

    componentDidMount(){
        this.dbChatRef.on('value', snapshot => {
            this.props.getRoomList(snapshot.val());
        })
    }

    componentWillUnmount(){
        this.dbChatRef.off()
    }
    handleCreateRoom(e){
        e.preventDefault();
        this.props.createRoom(this.state.roomName);

        this.setState({roomName:''})
    }

    render(){
        const { roomName } = this.state;
        
        const { roomList } = this.props;
        let rooms = [];

        if(roomList){
            rooms = Object.keys(roomList).map((key, index)=>{
                return (
                    <li key={index} className='collection-item'>
                        <Link to={`/room/${key}/log/${roomList[key].chatLogId}`}>
                            {roomList[key].name}
                        </Link>
                    </li>
                )
            })
        } else {
            rooms.push(<li key='0' className='collection-item'>No Rooms Available</li>)
        }
        return (
            <div>
                <div className="row center-align">
                    <h4>Welcome to The Lobby</h4>
                </div>
                <div className='row center'>
                    <div className="col s4">
                        <form onSubmit={this.handleCreateRoom.bind(this)}>
                            <label>Make A New Room</label>
                            <input type="text" onChange={e=> this.setState({roomName: e.target.value})} value={roomName}/>
                            <button className='btn amber darken-3'>Create</button>
                        </form>
                    </div>
                    <div className="col s4 offset-s4">
                        <ul className="collection">
                        <li className='collection-header'><h5>Current Rooms</h5></li>
                            {rooms}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function MSTP (state){
    return {
        roomList: state.chat.roomList
    }
}

export default connect(MSTP, {getRoomList, createRoom})(Lobby);