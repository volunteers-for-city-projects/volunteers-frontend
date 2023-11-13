FROM node:18.18-slim AS builder

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

ARG SECRET_KEY
ENV REACT_APP_SECRET_KEY_RECAPTCHA=$SECRET_KEY

RUN npm install react-scripts -g

RUN npm install

COPY . .

RUN npm run build




FROM node:18.18-slim

WORKDIR /app

COPY --from=builder /app/build .
