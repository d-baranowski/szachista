import React from 'react';
import Modal from "../modal/Modal";
import PlayerInfo from "./PlayerInfo";
import SuccessBtn from "../elements/btn/SuccessBtn";
import FailBtn from "../elements/btn/FailBtn";
import GameRoomName from "./GameRoomName";
import GameInfo from "./GameInfo";
import connect from "../state/connect";
import gameStore, {IGameStore, sendGameStartAction, sendPlayerReadyAction, showModal} from "./GameStore";
import User from "../auth/User";

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
    lineHeight: '16px',
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center',
};

function getReadyLabel(playerOneReady: boolean, playerTwoReady: boolean, whichPlayer: "playerOne" | "playerTwo"): string {
    if (playerOneReady && playerTwoReady && whichPlayer === "playerOne") {
        return "Start Game"
    }

    const picks = {playerOneReady, playerTwoReady};

    // @ts-ignore
    return picks[whichPlayer + "Ready"] ? "Not Ready" : "Ready";
}


export const GameWaitingRoom: React.FunctionComponent<IGameStore> = (props) => {
    const dotStyle = {
        margin: "auto 0",
        borderRadius: 360,
        height: 8,
        width: 8,
        backgroundColor: props.state.socketConState === "open" ? "green" : "red"
    };

    const userName = User.getUsername();
    const playerSeat = userName === props.state.playerOneUsername ? "playerOne" : "playerTwo";
    // @ts-ignore
    const activePlayerReady: boolean = props.state[`${playerSeat}Ready`];

    const buttonLabel = getReadyLabel(props.state.playerOneReady, props.state.playerTwoReady, playerSeat);
    return (
        <Modal
            isVisible={props.state.showModal}
            onClose={() => {
                props.dispatch(showModal(false))
            }}
        >
            <PlayerInfo
                playerOneReady={props.state.playerOneReady}
                playerTwoReady={props.state.playerTwoReady}
                playerOnePicture={props.state.playerOnePicture}
                playerTwoPicture={props.state.playerTwoPicture}
            />
            <GameRoomName gameName={props.state.gameName}/>
            <div style={styleConStatus}>
                <div style={{marginRight: 8}}>Connection Status</div>
                <div style={dotStyle}/>
            </div>
            <GameInfo
                passwordRequired={props.state.passwordRequired}
                timeAllowed={props.state.timeAllowed}
                tokensToEnter={props.state.tokensToEnter}
            />

            <SuccessBtn
                style={styleSuccessBtn}
                onClick={() => {
                    if (buttonLabel === "Start Game") {
                        props.dispatch(sendGameStartAction({
                            gameId: props.state.key
                        }))
                    } else {
                        props.dispatch(sendPlayerReadyAction({
                            gameId: props.state.key,
                            readyState: !activePlayerReady
                        }))
                    }
                }}
                label={buttonLabel}
            />
            <FailBtn
                style={styleFailBtn}
                onClick={() => {
                }}
                label="Leave"
            />
        </Modal>
    )
};

export default connect(gameStore, GameWaitingRoom);
