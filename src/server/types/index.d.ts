import { ConfigInterface } from '../config/contract';

export * as Monitor from '../config/contract';

export default function server(
    config?: ConfigInterface
): {
    listen: (cb?: Function) => void;
};
