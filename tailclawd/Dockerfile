FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
ENV TAILCLAWD_HOST=0.0.0.0
ENV TAILCLAWD_PORT=4402
EXPOSE 4402
USER node
CMD ["node", "src/server.mjs"]
