import React from 'react';
import {Assign, Clock, Close, Eye, Lock, Money} from "../icons";
import PlayerInfo from "./PlayerInfo";
import Field from "../form/Field";
import CreateGamesStore, {ICreateGamesStore} from "./CreateGameStore";
import connect from "../state/connect";
import lobbyGameCreate from "./lobbyGameCreate";
import ErrorHandler from "../error/ErrorHandler";
import Modal from "../modal/Modal";
import SuccessBtn from "../elements/btn/SuccessBtn";
import FailBtn from "../elements/btn/FailBtn";
import "./CreateGameModal.css"
import gameStore, {gameCreated, showModal} from "./GameStore";
import GameManager from "../sockets/GameManager";
import {IActiveGame} from "./ActiveGamesStore";

const styleSuccessBtn = {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
};

const styleFailBtn = {
    width: '100%'
};

const CreateGameModal: React.FunctionComponent<ICreateGamesStore> = (props) => {
    return (
        <Modal
            isVisible={props.createGameForm.isVisible}
            onClose={() => {
                props.reset();
            }}
        >
            <PlayerInfo
                playerOnePicture=""
                playerTwoPicture=""
            />
            <div className="game-inputs-form">
                <form style={{width: '100%'}}>
                    <div className="input-row"><Assign/>
                        <Field
                            label="Game Name"
                            placeholder="eg. shall we play a game?"
                            required={true}
                            onChange={(e) => {
                                props.setCreateGameForm({
                                    ...props.createGameForm,
                                    gameName: e.target.value
                                });
                            }}
                            value={props.createGameForm.gameName}
                            extra={{
                                minlength: 5,
                                maxlength: 25
                            }}
                        />
                    </div>
                    <div className="input-row"><Money/>
                        <Field
                            label="Tokens Required"
                            placeholder="tokens required to enter (0 is ok)"
                            required={true}
                            onChange={(e) => {
                                props.setCreateGameForm({
                                    ...props.createGameForm,
                                    tokensToEnter: parseInt(e.target.value)
                                });
                            }}
                            value={props.createGameForm.tokensToEnter}
                            extra={{
                                type: "number",
                                min: 0,
                                max: 9999,
                                step: 10
                            }}
                        />
                    </div>
                    <div className="input-row"><Lock/>
                        <Field
                            label="Passoword (Optional)"
                            placeholder="leave empty for free entry"
                            required={false}
                            onChange={(e) => {
                                props.setCreateGameForm({
                                    ...props.createGameForm,
                                    password: e.target.value
                                });
                            }}
                            value={props.createGameForm.password}
                            extra={{
                                maxlength: 50
                            }}
                        /></div>
                    <div className="input-row"><Clock/>
                        <Field
                            label="Time Allowed"
                            placeholder="time each player gets in minutes"
                            required={true}
                            onChange={(e) => {
                                props.setCreateGameForm({
                                    ...props.createGameForm,
                                    timeAllowed: parseInt(e.target.value)
                                });
                            }}
                            value={props.createGameForm.timeAllowed}
                            extra={{
                                type: "number",
                                min: 1,
                                max: 60,
                                step: 1
                            }}
                        />
                    </div>
                </form>
                <div className="validationMsg">{props.validationMsg}</div>
            </div>
            <SuccessBtn
                label="Create Game"
                style={styleSuccessBtn}
                onClick={() => {
                    const isValid = props.submit();

                    if (!isValid) {
                        return;
                    }

                    const values = {
                        gameName: props.createGameForm.gameName,
                        tokensToEnter: props.createGameForm.tokensToEnter,
                        spectatorsAllowed: props.createGameForm.spectatorsAllowed,
                        timeAllowed: props.createGameForm.timeAllowed && props.createGameForm.timeAllowed * 60 * 1000,
                        password: props.createGameForm.password,
                    };

                    lobbyGameCreate(values).then((response) => {
                        props.reset();
                        gameStore.dispatch(showModal(true));
                        gameStore.dispatch(gameCreated(response));
                        const gameSocket = new GameManager().getInstance().joinGame(response as IActiveGame);
                        gameSocket.send({hello: "World", what: "is up", ziom: "Trollo"})

                    }).catch((err) => {
                        ErrorHandler.handle(err);
                        CreateGamesStore.validationMsg = err;
                    })
                }}
            />
            <FailBtn
                label="Cancel"
                style={styleFailBtn}
                onClick={() => {
                    props.reset();
                }}
            />
        </Modal>
    );
};

const mapStateToProps = (state: any) => state;

export default connect(CreateGamesStore, CreateGameModal, mapStateToProps);
