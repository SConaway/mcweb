FROM node:18 as frontend-builder
COPY frontend/ /app/
WORKDIR /app/
RUN yarn
# set after install so devDeps are installed to build
ENV NODE_ENV=production
RUN yarn build
RUN ls -aR dist/

# ---

FROM node:18 as backend-builder
COPY server/ /app/
WORKDIR /app/
RUN cp config.sample.json config.json
RUN yarn
# set after install so devDeps are installed to build
ENV NODE_ENV=production
RUN yarn build
RUN ls -aR dist/

# ---

FROM node:18-alpine as main
ENV NODE_ENV=production
COPY server/package.json server/yarn.lock  /app/
WORKDIR /app/
RUN yarn 
COPY --from=backend-builder /app/dist /app/dist
COPY --from=frontend-builder /app/dist/ /app/dist/public/
RUN ls
CMD ["yarn", "start"]
