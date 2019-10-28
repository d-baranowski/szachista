import React from 'react';
import Modal from "../modal/Modal";
import PlayerInfo from "./PlayerInfo";
import SuccessBtn from "../elements/btn/SuccessBtn";
import FailBtn from "../elements/btn/FailBtn";
import GameRoomName from "./GameRoomName";
import GameInfo from "./GameInfo";
import connect from "../state/connect";
import gameWaitingRoomStore, {IGameWaitingRoomStore, showModal} from "./GameWaitingRoomStore";

const styleSuccessBtn = {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
};

const styleFailBtn = {
    width: '100%'
};

const GameWaitingRoom : React.FunctionComponent<IGameWaitingRoomStore> = (props) => (
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
        <GameRoomName gameName={props.state.gameName} />
        <GameInfo
            password={!props.state.passwordRequired ? "NOTREQUIRED" : "REQUIRED"}
            timeAllowed={props.state.timeAllowed}
            tokensToEnter={props.state.tokensToEnter}
        />

        <SuccessBtn
            style={styleSuccessBtn}
            onClick={() => {}}
            label="Ready"
        />
        <FailBtn
            style={styleFailBtn}
            onClick={() => {}}
            label="Leave"
        />
    </Modal>
);

export default connect(gameWaitingRoomStore, GameWaitingRoom);