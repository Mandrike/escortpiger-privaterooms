import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handle);
  const io = new Server(server, { path: "/api/socket" });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    socket.on("join-user", (userId: string) => {
      socket.join(`user-${userId}`);
    });

    socket.on("disconnect", () => console.log("❌ User disconnected"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`🚀 Server + Socket.io kører på http://localhost:${port}`);
  });
});
