import { ConfigInterface } from '../config/contract';

export * as Monitor from '../config/contract';

export default function Server(
    config?: ConfigInterface
): {
    listen: (cb?: Function) => void;
};
