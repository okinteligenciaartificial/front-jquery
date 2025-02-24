#!/bin/bash

# Configurações
REPO_URL="https://github.com/okinteligenciaartificial/front-jquery.git"
BRANCH="main"
APP_DIR="/app/frontend"
CONTAINER_NAME="frontend"

# Função para log
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Criar diretório se não existir
mkdir -p $APP_DIR

# Verificar se é primeira execução
if [ ! -d "$APP_DIR/.git" ]; then
    log "Primeira execução - Clonando repositório..."
    git clone $REPO_URL $APP_DIR
    cd $APP_DIR
    git checkout $BRANCH
else
    log "Atualizando repositório..."
    cd $APP_DIR
    git fetch origin
    git reset --hard origin/$BRANCH
fi

# Reconstruir e reiniciar container
log "Reconstruindo container..."
docker build -t okinteligenciaartificial/frontend:latest ./app

# Parar container antigo se existir
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Iniciar novo container
log "Iniciando novo container..."
docker run -d \
  --name $CONTAINER_NAME \
  --network network_swarm_public \
  -l "traefik.enable=true" \
  -l "traefik.http.routers.frontend.rule=Host(\`app.okinteligenciaartificial.com.br\`)" \
  -l "traefik.http.routers.frontend.entrypoints=websecure" \
  -l "traefik.http.routers.frontend.tls.certresolver=letsencryptresolver" \
  -l "traefik.http.services.frontend.loadbalancer.server.port=5000" \
  okinteligenciaartificial/frontend:latest

log "Sincronização completa!"
