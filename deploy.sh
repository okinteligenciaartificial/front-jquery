#!/bin/bash

# Build the Docker image
docker build -t okinteligenciaartificial/frontend:latest ./app

# Create network if it doesn't exist
docker network create network_swarm_public || true

# Deploy the application
docker run -d \
  --name frontend \
  --network network_swarm_public \
  -l "traefik.enable=true" \
  -l "traefik.http.routers.frontend.rule=Host(\`app.okinteligenciaartificial.com.br\`)" \
  -l "traefik.http.routers.frontend.entrypoints=websecure" \
  -l "traefik.http.routers.frontend.tls.certresolver=letsencryptresolver" \
  -l "traefik.http.services.frontend.loadbalancer.server.port=5000" \
  okinteligenciaartificial/frontend:latest
