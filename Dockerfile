FROM node:16 as frontend-builder

COPY frontend/ /app/

WORKDIR /app/

RUN yarn

ENV NODE_ENV=production

RUN yarn build

RUN ls -aR dist/

# ---

FROM node:16 as backend-builder

COPY server/ /app/

WORKDIR /app/

RUN cp config.sample.json config.json

RUN yarn

ENV NODE_ENV=production

RUN yarn build

RUN ls -aR dist/

# ---

FROM node:16 as main

ENV NODE_ENV=production

COPY server/package.json server/yarn.lock  /app/

WORKDIR /app/

# RUN ls
RUN yarn 


COPY --from=backend-builder /app/dist /app/dist

COPY --from=frontend-builder /app/dist/ /app/dist/public/

RUN ls

CMD ["yarn", "start"]
