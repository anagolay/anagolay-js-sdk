#!/usr/bin/env bash
PROJECT_ROOT=$(git rev-parse --show-toplevel)

pnpm env use --global 18.4.0

pnpm add --global @microsoft/rush

ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/.bash_aliases "$HOME"/.bash_aliases

cd "$PROJECT_ROOT" || exit

rm -rf ~/.tmux
git clone https://github.com/gpakosz/.tmux.git ~/.tmux
ln -sf ~/.tmux/.tmux.conf ~/.tmux.conf

if [ ! -f "$HOME/.tmux.conf.local" ]; then
  # wget https://ipfs.anagolay.network/ipfs/QmdZFrnc6NwzKSQdxkZfxHaBXMDH3ndhtwSm7dB7L1NXvM -O $HOME/.tmux.conf
  ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/.tmux.conf.local "$HOME"/.tmux.conf.local
  # cp "$GITPOD_REPO_ROOT"/.devops/gitpod/.tmux.conf.local "$HOME"/.tmux.conf.local
fi
