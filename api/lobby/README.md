RESTFUL API

CREATE
READ
UPDATE
DELETE


{
    time: 
    connections: {
        type: white|black|spectator,
        connection
    }
    password
    tokens,
    players: {
        black: PlayerID
        white: PlayerID
    }
}

1. User creates a game deciding how much tokens are required to join, password and time
2. Second user joins a game as competitor  
3. Once both users decide that they are ready to start the game starts
