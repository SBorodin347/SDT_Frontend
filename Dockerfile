FROM nginx
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/sdt/ /usr/share/nginx/html
