#!/usr/bin/env bash
set -x
set -e

sudo apt update && sudo apt-get install -y \
	silversearcher-ag \
	tmux \
	neovim \
	iputils-ping

if ! command -v pnpm &>/dev/null; then
	echo "pnpm could not be found, i will install it"
	npm install -g pnpm
fi

if ! command -v remote-signer &>/dev/null; then
	echo "remote-signer could not be found, i will install it"
	sudo sh -c 'wget https://ipfs.anagolay.network/ipfs/QmVwR17T5oT4SsH1gb8T9L9gHe5CsJz2iwhbhWCwPPHgHR -O /usr/local/bin/remote-signer && chmod +x /usr/local/bin/remote-signer'
fi

# install the rush
pnpm add -g @microsoft/rush

if [ ! -d "$HOME/.tmux/plugins/tpm" ]; then
	git clone https://github.com/tmux-plugins/tpm $HOME/.tmux/plugins/tpm
fi

if [ ! -f "$HOME/.tmux.conf" ]; then
	# wget https://ipfs.anagolay.network/ipfs/QmdZFrnc6NwzKSQdxkZfxHaBXMDH3ndhtwSm7dB7L1NXvM -O $HOME/.tmux.conf

	ln -s /workspace/.devcontainer/.tmux.conf $HOME/.tmux.conf
fi

TEST_REPOS_PATH=$HOME/test-repos

git clone git@gitlab.com:anagolay/op-file.git $TEST_REPOS_PATH/op-file

# # set the pnpm store path to the rush one so we can just pnpm stuff
# pnpm config set store-dir /workspace/common/temp/pnpm-store

# # cargo install wasm-pack cargo-make

# # install the wasm-pack from binaries
# wget https://github.com/rustwasm/wasm-pack/releases/download/v0.10.2/wasm-pack-v0.10.2-x86_64-unknown-linux-musl.tar.gz -P /tmp/

# tar xvf /tmp/wasm-pack-v0.10.2-x86_64-unknown-linux-musl.tar.gz -C /tmp
# mv /tmp/wasm-pack-v0.10.2-x86_64-unknown-linux-musl/wasm-pack $CARGO_HOME/bin/
# rm -rf /tmp/wasm-pack-v0.10.2-x86_64-unknown-linux-musl

# # install cargo make from binaries
# wget https://github.com/sagiegurari/cargo-make/releases/download/0.35.8/cargo-make-v0.35.8-x86_64-unknown-linux-musl.zip -P /tmp/

# unzip /tmp/cargo-make-v0.35.8-x86_64-unknown-linux-musl.zip -d /tmp
# mv /tmp/cargo-make-v0.35.8-x86_64-unknown-linux-musl/cargo-make $CARGO_HOME/bin/
# mv /tmp/cargo-make-v0.35.8-x86_64-unknown-linux-musl/makers $CARGO_HOME/bin/
# rm -rf /tmp/cargo-make-v0.35.8-x86_64-unknown-linux-musl
