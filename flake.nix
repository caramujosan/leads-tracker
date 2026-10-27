{
  description = "Ambiente de Desenvolvimento em JavaScript";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
  in {
    devShells.x86_64-linux.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        nodejs
      ];

      shellHook = ''
        echo "🚀 Ambiente JavaScript + NodeJs carregado via nix-direnv!"
        
        # Sobrescreve o PS1 injetado pelo nix-shell com o seu layout limpo exato
      '';
    };
  };
}
