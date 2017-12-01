import * as socketIo from 'socket.io';

class SocketServer {
  io: SocketIO.Server;

  connect(server) {
    this.io = socketIo(server, {
      serveClient: false,
      wsEngine: 'ws',
    } as any);
  }
}

export function getSocketServer() {
  return new Proxy(new SocketServer(), {
    get: (target, prop, receiver) => {
      if (prop === 'connect') {
        return target[prop];
      }
      return target.io[prop];
    }
  });
}
