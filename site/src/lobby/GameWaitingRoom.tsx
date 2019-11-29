import React from 'react';
import Modal from "../modal/Modal";
import PlayerInfo from "./PlayerInfo";
import SuccessBtn from "../elements/btn/SuccessBtn";
import FailBtn from "../elements/btn/FailBtn";
import GameRoomName from "./GameRoomName";
import GameInfo from "./GameInfo";
import connect from "../state/connect";
import gameStore, {IGameStore, showModal} from "./GameStore";

const styleSuccessBtn = {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
};

const styleFailBtn = {
    width: '100%'
};

const styleConStatus = {
    color: '#EFEFEF',
    fontSize: '14px',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-evenly',
    verticalAlign: 'middle'
};

export const GameWaitingRoom: React.FunctionComponent<IGameStore> = (props) => (
    <Modal
        isVisible={props.state.showModal}
        onClose={() => {
            props.dispatch(showModal(false))
        }}
    >
        <PlayerInfo
            playerOnePicture={props.state.playerOnePicture}
            playerTwoPicture={props.state.playerTwoPicture}
        />
        <GameRoomName gameName={props.state.gameName}/>
        <div style={styleConStatus}>Connection Status<div style={{ borderRadius: 360, height: 15, width: 15, borderColor: "red", borderWidth: 2, borderStyle: 'solid' }} /></div>
        <GameInfo
            password={!props.state.passwordRequired ? "NOTREQUIRED" : "REQUIRED"}
            timeAllowed={props.state.timeAllowed}
            tokensToEnter={props.state.tokensToEnter}
        />

        <SuccessBtn
            style={styleSuccessBtn}
            onClick={() => {
            }}
            label="Ready"
        />
        <FailBtn
            style={styleFailBtn}
            onClick={() => {
            }}
            label="Leave"
        />
    </Modal>
);

export default connect(gameStore, GameWaitingRoom);
