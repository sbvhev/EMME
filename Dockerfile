FROM nginx:alpine

# Copy nginx default config
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx/conf/default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]