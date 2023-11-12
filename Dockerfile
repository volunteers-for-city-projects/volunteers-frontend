FROM node:18.18-slim AS builder

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install react-scripts -g

RUN npm install

COPY . .

RUN npm run build




FROM node:18.18-slim

ARG SECRET_KEY
RUN export REACT_APP_SECRET_KEY_RECAPTCHA=SECRET_KEY

WORKDIR /app

COPY --from=builder /app/build .


