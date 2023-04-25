using Microsoft.AspNetCore.SignalR;

namespace ChatRoomServer.Hubs
{
    public class ChatHub:Hub 
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        public ChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            // Add the specified connection to a room (group)
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            // "ReceiveMessage" - name of the function in the client, _botUser - value we pass
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room}", DateTime.Now.ToString("HH:mm"));

            await SendConnectedUsers(userConnection.Room);
        }

        public Task SendConnectedUsers(string room)
        {
            // Return the users that match with the room passing into the method
            var users = _connections.Values
                   .Where(c => c.Room == room)
                   .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

        public async Task SendMessage(string message)
        {
            // If there is a vlaue with that ConnectionId as a key it's going to get the value out of this variable
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message, DateTime.Now.ToString("HH:mm"));
            }
        }

        // Overriding from the SignaLR library
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left the room", DateTime.Now.ToString("HH:mm"));

                SendConnectedUsers(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

    }
}
