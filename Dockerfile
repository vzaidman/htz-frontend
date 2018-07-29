FROM node:8.9
COPY  . /workspace/
WORKDIR /workspace/
ENV BUILD_ID $(git rev-parse --verify HEAD)
RUN rm -f /etc/localtime; ln -s /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
RUN yarn && yarn bootstrap
#RUN yarn test:deploy
EXPOSE 3000
WORKDIR /workspace/
CMD ["yarn", "workspace", "@haaretz/haaretz.co.il", "start"]
#CMD ["yarn", "workspace", "@haaretz/haaretz.co.il", "start:pm2"]
