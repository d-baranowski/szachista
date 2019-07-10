import React from 'react';
import {Assign, Clock, Close, Eye, Lock, Money} from "../icons";
import "./CreateGameModal.css"
import PlayerInfo from "./PlayerInfo";
import Field from "../form/Field";
import CreateGamesStore, {ICreateGamesStore} from "./CreateGameStore";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import connect from "../state/connect";
import lobbyGameCreate from "./lobbyGameCreate";

const CreateGameModal: React.FunctionComponent<ICreateGamesStore> = (props) => {
    return (
        <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={150}>
            {props.createGameForm.isVisible && (<div>
                    <div onClick={() => {
                        props.reset();
                    }} id="backdrop"/>

                    <div className="create-game-modal">
                        <div
                            className="close-button"
                            onClick={() => {
                                props.reset();
                            }}
                        >
                            <Close/>
                        </div>
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
                        <div className="btn success-btn game-create-form-confirm"
                             onClick={() => {
                                 const isValid = props.submit();

                                 if (!isValid) {
                                     return;
                                 }

                                 lobbyGameCreate({
                                     gameName: props.createGameForm.gameName,
                                     tokensToEnter: props.createGameForm.tokensToEnter,
                                     spectatorsAllowed: props.createGameForm.spectatorsAllowed,
                                     timeAllowed: props.createGameForm.timeAllowed && props.createGameForm.timeAllowed * 60 * 1000,
                                     password: props.createGameForm.password,
                                 }).then(() => {
                                     props.reset();
                                 }).catch((err) => {
                                     // Display the error message
                                 })
                             }}
                        >
                            Create Game
                        </div>
                        <div
                            className="btn success-btn game-create-form-cancel"
                            onClick={() => {
                                props.reset();
                            }}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            )}
        </ReactCSSTransitionGroup>
    );
};

const mapStateToProps = (state: any) => state;

export default connect(CreateGamesStore, CreateGameModal, mapStateToProps);