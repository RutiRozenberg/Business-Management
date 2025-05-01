import { ExtendedError } from "socket.io"

export interface SocketNextFunction {
    (err?: ExtendedError | undefined): void;
}