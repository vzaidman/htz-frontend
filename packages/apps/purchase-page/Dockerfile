FROM node:8.9
COPY  . /workspace/
WORKDIR /workspace/
RUN rm -f /etc/localtime; ln -s /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
RUN yarn && yarn bootstrap
EXPOSE 2004
WORKDIR /workspace/
CMD ["yarn", "workspace", "@haaretz/purchase-page", "start"]
