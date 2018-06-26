FROM node:8.9
ENV BUILD_ID $(git rev-parse --verify HEAD)
COPY  . /workspace/
WORKDIR /workspace/
RUN rm -f /etc/localtime; ln -s /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
RUN yarn && yarn bootstrap
EXPOSE 2004
WORKDIR /workspace/
CMD ["yarn", "workspace", "@haaretz/purchase-page", "start"]
