import React, {Component} from 'react';
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";
import GameRoom from "./GameRoom";
import "./Lobby.css";
import fetchActiveGames from "./FetchActiveGames";
import ActiveGamesStore, {IActiveGame} from "./ActiveGamesStore";
import ErrorHandler from "../error/ErrorHandler";
import connect from "../state/connect";
import CreateGameModal from "./CreateGameModal";
import CreateGamesStore from "./CreateGameStore";

type Props = {
    items: IActiveGame[]
}

class Lobby extends Component<Props> {
    private intervalId!: any;

    componentDidMount(): void {
        fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(ErrorHandler.handle);
        this.intervalId = setInterval(() => {
            fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(console.log);
        }, 5 * 1000)
    }

    componentWillUnmount(): void {
        clearInterval(this.intervalId)
    }

    render() {
        return (
                <div className="lobby">
                    <div className="lobby-games">
                        {this.props.items.map(item => (
                            <GameRoom game={item}/>
                        ))}
                    </div>
                    <div
                        className="btn success-btn game-create"
                        onClick={() => {
                            CreateGamesStore.setCreateGameForm({
                                ...CreateGamesStore.createGameForm,
                                isVisible: true
                            })
                        }}
                    >
                        Create Game
                    </div>
                    <CreateGameModal/>
                    <ChatWidowContainer/>
                </div>
        );
    }
}

const mapStateToProps = (state: any) => state;

export default connect(ActiveGamesStore, Lobby, mapStateToProps);