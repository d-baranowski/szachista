import React, {Component} from 'react';
import ChatWidowContainer from "../chat/containers/ChatWindowContainer";
import GameRoom from "./GameRoom";
import "./Lobby.css";
import fetchActiveGames from "./FetchActiveGames";
import ActiveGamesStore, {IActiveGame} from "./ActiveGamesStore";
import ErrorHandler from "../error/ErrorHandler";
import connect from "../state/connect";

type Props = {
    items: IActiveGame[]
}

class Lobby extends Component<Props> {
    private intervalId!: any;

    componentDidMount(): void {
        fetchActiveGames().then(ActiveGamesStore.setActiveGames).catch(ErrorHandler.handle);
        this.intervalId = setInterval(() => {
            fetchActiveGames().then(console.log).catch(console.log);
        }, 30 * 1000)
    }

    componentWillUnmount(): void {
        clearInterval(this.intervalId)
    }

    render() {
        console.log(this.props);
        return (
            <div className="lobby">
                {this.props.items.map(item => (
                    <GameRoom game={item} />
                ))}
                <ChatWidowContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => state;

export default connect(ActiveGamesStore, Lobby, mapStateToProps);