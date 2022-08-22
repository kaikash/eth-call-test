## Test eth_call

### Install

```bash
  git clone https://github.com/kaikash/eth-call-test.git
  cd eth-call-test
  yarn install
```

### Usage

```bash
  yarn start <ws enpoint> <pool size> <call number>
```

It makes `<call number>` eth_call requests to `<ws enpoint>` via `<pool size>` webscoket connections.

### Example:

```bash
yarn start ws://erigon.eth.svc.cluster.local:8545 2 5
```
