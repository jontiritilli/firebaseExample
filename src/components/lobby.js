import React, {Component} from 'react';
import { db } from '../firebase';

class Lobby extends Component {
    constructor(props){
        super(props)

        this.state = {
            roomName: ''
        }

    }

    handleCreateRoom(e){

        const { roomName } = this.state
        e.preventDefault();
        console.log('Room Name:', {roomName});

        const newRoom = {
            name: { roomName },
            chatLog: [`Room: ${roomName} - Created`]
        }
        db.ref('/chat-rooms').push(newRoom).then(res=> {
            console.log('add room res', res)
        })
    }

    render(){
        const { roomName } = this.state
        return (
            <div className='row'>
                <div className="col s6 offset-s3">
                    <div className="row center">
                        <div className="col s12 center-align">
                            <h4>Welcome to The Lobby</h4></div>
                            <form onSubmit={this.handleCreateRoom.bind(this)}>
                                <label>Make A New Room</label>
                                <input type="text" onChange={e=> this.setState({roomName: e.target.value})} value={roomName}/>
                                <button className='btn amber darken-3'>Create</button>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby