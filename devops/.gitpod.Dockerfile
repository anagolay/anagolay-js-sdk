FROM gitpod/workspace-full

COPY .devcontainer/install-deps.sh /tmp

RUN bash /tmp/install-deps.sh
