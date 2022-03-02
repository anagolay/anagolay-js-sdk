
# Anagolay CLI

> NOTE the git is assumed to be english language

Current version is published on ipfs
```
❯ ipfs add --cid-version=1 -r --pin=false .
added bafybeiet6arpsj637pfpjlnip3c6nvkar5dkoiaoq4m3n2snwjvitc3i5i dist/anagolay.js
added bafybeiezfi463wtdk2gjtx32kfuemukxxzt76qewxqsd6ptp4t5tl5umw4 dist/anagolay.js.map
added bafybeigzdibkwqamvdlthh5gzcbrgj35s7bizg7mqobjxku2dotrvz4r7q dist

# install it
sudo sh -c 'curl https://ipfs.anagolay.network/ipfs/bafybeiet6arpsj637pfpjlnip3c6nvkar5dkoiaoq4m3n2snwjvitc3i5i > /usr/local/bin/anagolay && chmod +x /usr/local/bin/anagolay'

# check does it work
clear; anagolay
```

## For development system wide

if you are using the provided .devcontainer you can use the tmux and save the session so it will be resurrected when you boot the image again, it will not be resurrected on rebuild.

tmux `prefix` is `Ctrl-a`.

Optimal development flow: 

1. copy the `env.sample` to `.env` ( `cp env.sample .env` )
2. edit the `.env` according to your settings 
3. Start `tmux`
4. open 4 new panes by invoking `prefix c` 4 times
5. you are in the root, `rush update`
6. `cd sdk/utils && pnpm watch` 
7. `cd sdk/cli && pnpm watch`
8. `cd sdk/cli` when #5 is done run `pnpm link:bin`, this will link the `anagolay` js file for the whole system
9. open~ new terminal in Vscode
10. `cd ~/test-repos/op-file` 
11. `clear; anagolay operation publish` or what ever you are doing  

For all our convenience we have the `dev-tmux` which you can run and get all this above automatically.


> NOTE: if you want to save the tmux session and have it resurrected, do this inside the tmux
> ```shell
> # inside tmux
> prefix I # install plugins
> prefix Ctrl s # save the session
> ```

Maybe use [tabtab](https://github.com/mklabs/tabtab#installation) for the auto complete