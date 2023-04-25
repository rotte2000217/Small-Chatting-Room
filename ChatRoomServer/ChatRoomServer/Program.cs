using ChatRoomServer;
using ChatRoomServer.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// This means that this instance of the dictionary will be shared across the entire application, and any component that requires an instance of IDictionary<string, UserConnection> will receive the same instance.
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(options => new Dictionary<string, UserConnection>());

var app = builder.Build();

app.UseRouting();

app.UseCors();

app.MapHub<ChatHub>("/chat");

app.Run();
