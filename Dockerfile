FROM node:latest
# <"" | "all" | "lite">

ARG EDITION="lite"
ENV EDITION $EDITION
EXPOSE 3000

COPY ./ /app
WORKDIR /app
RUN npm install -g grunt && npm install && grunt ${EDITON}
CMD npm start
