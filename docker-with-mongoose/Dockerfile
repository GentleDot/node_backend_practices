# 1. 운영체제 및 프로그램 설치
#FROM ubuntu:23.10
#
#RUN sudo apt install nodejs
#RUN sudo npm install -g yarn

FROM node:18

# 2. 내 컴퓨터의 파일을 도커 container 안으로 복사
# RUN mkdir myfolder (아래 copy할 때 자동으로 폴더를 만들어줌)
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
WORKDIR /myfolder/
#RUN cd ./myfolder/
RUN yarn install

COPY . /myfolder/

# 3. container 안에서 index.js 실행
CMD yarn start:dev