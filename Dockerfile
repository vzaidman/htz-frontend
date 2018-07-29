FROM node:8.9
#ENV BUILD_ID $(git rev-parse --verify HEAD)
COPY  . /workspace/
WORKDIR /workspace/
RUN rm -f /etc/localtime; ln -s /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
RUN yarn && yarn bootstrap
#RUN yarn test:deploy
EXPOSE 3000
WORKDIR /workspace/
CMD ["pm2", "start", "yarn", "workspace", "@haaretz/haaretz.co.il", "start"]
