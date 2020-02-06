import React, {Component} from 'react';
import Media from 'react-media';
import GameRoom from "../lobby/GameRoom";
import styles from "./Lobby.css";
import fetchActiveGames from "../lobby/FetchActiveGames";
import ActiveGamesStore, {IActiveGame} from "../lobby/ActiveGamesStore";
import ErrorHandler from "../error/ErrorHandler";
import connect from "../state/connect";
import CreateGameModal from "../lobby/CreateGameModal";
import CreateGamesStore from "../lobby/CreateGameStore";
import GameManager from "../sockets/GameManager"
import SuccessBtn from "../elements/btn/SuccessBtn";
import GameWaitingRoom from "../lobby/GameWaitingRoom";
import joinGame from "../lobby/JoinGame";
import gameStore, {gameCreated, GameStoreState, IAction, sendPlayerJoinedAction, showModal} from "../lobby/GameStore";
import {RouteComponentProps, withRouter} from "react-router";

interface Props extends RouteComponentProps{
    items: IActiveGame[]
}

const create = () => {
    CreateGamesStore.setCreateGameForm({
        ...CreateGamesStore.createGameForm,
        isVisible: true
    });
};

const styleSmallBtn = {
    width: 80,
    borderRadius: 100,
    marginLeft: -40,
    fontSize: 20,
    position: 'absolute',
    bottom: 30,
    left: '50%'
};

const styleLargeButton = {
    width: 240,
    marginLeft: -120,
    position: 'absolute',
    bottom: 30,
    left: '50%'
};

class Lobby extends Component<Props> {
    private intervalId!: any;
    private deregister: any;

    componentDidMount(): void {
        fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(ErrorHandler.handle);
        this.intervalId = setInterval(() => {
            fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(console.log);
        }, 30 * 1000);

        this.deregister = gameStore.registerMiddleware((action: IAction, newState: GameStoreState) => {
            if (action.type === "GAME_STARTED") {
                this.props.history.push("chess-game")
            }
        });
    }

    componentWillUnmount(): void {
        clearInterval(this.intervalId);
        this.deregister();
    }

    render() {
        return (
            <div className={styles['lobby']}>
                <div className={styles['lobby-games']}>
                    {this.props.items.map(item => (
                        <GameRoom
                            onClick={() => {
                                joinGame(item.key).then(response => {
                                    new GameManager().getInstance().joinGame(response);
                                    return response
                                }).then(response => {
                                    gameStore.dispatch(gameCreated(response));
                                    gameStore.dispatch(sendPlayerJoinedAction({gameId: response.key}));
                                    gameStore.dispatch(showModal(true));
                                })
                            }}
                            game={item}
                        />
                    ))}
                </div>
                <Media query={{maxWidth: 599}}>
                    {matches =>
                        matches ? (
                            <SuccessBtn
                                label="+"
                                onClick={create}
                                style={styleSmallBtn}
                            />
                        ) : (
                            <SuccessBtn
                                label="Create Game"
                                onClick={create}
                                style={styleLargeButton}
                            />
                        )
                    }
                </Media>

                <CreateGameModal/>
                <GameWaitingRoom/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => state;

export default connect(ActiveGamesStore, withRouter(Lobby), mapStateToProps);
