import React, { Component } from 'react';
import { db } from '../firebase';

class Chat extends Component {
    componentDidMount(){
        db.ref('/chat-room').on('value', snapshot => {
            console.log('DB Snapshot', snapshot.val())
        })
    }
    render(){
        return (
            <div className='row'>
                <div className="col s4">
                    <div className="row">
                        <div className="col s12">
                        <h4 className='left'>Can You Hear Me?</h4></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat