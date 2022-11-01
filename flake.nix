###### THIS IS NOT IN USE, DANIEL IS PLAYING AROUND AND LEARNING


##### https://nixos.wiki/wiki/Flakes
{
  description = "Anagolay JS";

  inputs = {
    ## add this so we can have access to all packages
    nixpkgs.url = "github:nixos/nixpkgs";

    ## useful flake utilitis like `system`
    flake-utils.url = "github:numtide/flake-utils";
  };


  outputs = { self, nixpkgs, flake-utils }: { };
}
