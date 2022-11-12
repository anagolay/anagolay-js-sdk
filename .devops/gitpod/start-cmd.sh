#!/usr/bin/env bash
PROJECT_ROOT=$(git rev-parse --show-toplevel)

pnpm env use --global 18.4.0

# brew install starship romkatv/powerlevel10k/powerlevel10k

# pnpm add --global @microsoft/rush

ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/.bash_aliases "$HOME"/.bash_aliases
ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/.zshrc "$HOME"/.zshrc
ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/.p10k.zsh "$HOME"/.p10k.zsh
# ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/starship.toml "$HOME"/.config/starship.toml

cd "$PROJECT_ROOT" || exit

rm -rf ~/.tmux
git clone https://github.com/gpakosz/.tmux.git ~/.tmux
ln -sf ~/.tmux/.tmux.conf ~/.tmux.conf

if [ ! -f "$HOME/.tmux.conf.local" ]; then
  # wget https://ipfs.anagolay.network/ipfs/QmdZFrnc6NwzKSQdxkZfxHaBXMDH3ndhtwSm7dB7L1NXvM -O $HOME/.tmux.conf
  ln -fs "$GITPOD_REPO_ROOT"/.devops/gitpod/.tmux.conf.local "$HOME"/.tmux.conf.local
fi
