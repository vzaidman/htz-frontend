FROM node:10.8
ARG NEXT_BUILD_ID 
COPY  . /workspace/
WORKDIR /workspace/
ENV NEXT_BUILD_ID=${NEXT_BUILD_ID}
#ENV BUILD_ID $(git rev-parse --verify HEAD)
RUN rm -f /etc/localtime; ln -s /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
RUN yarn && yarn bootstrap
#RUN yarn test:deploy
EXPOSE 3000
WORKDIR /workspace/
CMD ["yarn", "workspace", "@haaretz/haaretz.co.il", "start"]
#CMD ["yarn", "workspace", "@haaretz/haaretz.co.il", "start:pm2"]
