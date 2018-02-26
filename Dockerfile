FROM node:8.9
COPY  . /workspace/
WORKDIR /workspace/
RUN yarn && yarn bootstrap
#RUN yarn test:preDeploy
EXPOSE 3000
WORKDIR /workspace/
CMD ["yarn", "workspace", "@haaretz/haaretz.co.il", "start"]


