FROM mhart/alpine-node:6.1
MAINTAINER @pinkkis

WORKDIR /srv
ADD . /srv

RUN npm install \
	&& npm cache clear

ENV WEB_PORT=6500 ENV=production

EXPOSE 6500

ENTRYPOINT ["./entrypoint.sh"]
#CMD ["./entrypoint.sh"]