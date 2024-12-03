# Use a lightweight web server for serving static files
FROM nginx:stable-alpine

# Set the working directory for NGINX
WORKDIR /usr/share/nginx/html

# Remove the default NGINX static files
RUN rm -rf ./*

# Copy the built React application into the NGINX HTML directory
COPY ./build .

# Expose port 3000 for the application
EXPOSE 3000

# Configure NGINX to work with React Router or SPA
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
