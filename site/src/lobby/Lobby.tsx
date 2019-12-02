import React, {Component} from 'react';
import Media from 'react-media';
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";
import GameRoom from "./GameRoom";
import styles from "./Lobby.css";
import fetchActiveGames from "./FetchActiveGames";
import ActiveGamesStore, {IActiveGame} from "./ActiveGamesStore";
import ErrorHandler from "../error/ErrorHandler";
import connect from "../state/connect";
import CreateGameModal from "./CreateGameModal";
import CreateGamesStore from "./CreateGameStore";
import SuccessBtn from "../elements/btn/SuccessBtn";
import GameWaitingRoom from "./GameWaitingRoom";
import joinGame from "./JoinGame";

type Props = {
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

    componentDidMount(): void {
        fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(ErrorHandler.handle);
        this.intervalId = setInterval(() => {
            fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(console.log);
        }, 30 * 1000)
    }

    componentWillUnmount(): void {
        clearInterval(this.intervalId)
    }

    render() {
        return (
            <div className={styles['lobby']}>
                <div className={styles['lobby-games']}>
                    {this.props.items.map(item => (
                        <GameRoom
                            onClick={() => {
                                joinGame(item.key)
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
                <ChatWidowContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => state;

export default connect(ActiveGamesStore, Lobby, mapStateToProps);
