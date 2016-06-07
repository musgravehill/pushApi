server {
	listen 5.45.115.60:80;
	
	server_name pushapi.ribku-lovim.ru; 
	root   /var/www/pushapi.ribku-lovim.ru;
	index  index.php;		
	
	location '/.well-known/acme-challenge' {
		default_type 'text/plain';		
	}
	location / {
		return 301 https://pushapi.ribku-lovim.ru$request_uri;
	}
}
server {       
    ssl on;        
    #ssl_stapling on;
    #ssl_stapling_verify on; 
    #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    #ssl_prefer_server_ciphers on;
	
	ssl_certificate	/etc/letsencrypt/live/pushapi.ribku-lovim.ru/fullchain.pem;
	ssl_certificate_key	/etc/letsencrypt/live/pushapi.ribku-lovim.ru/privkey.pem;
	ssl_trusted_certificate /etc/letsencrypt/live/pushapi.ribku-lovim.ru/chain.pem;

    listen 5.45.115.60:443;
	
    server_name pushapi.ribku-lovim.ru; 
	root   /var/www/pushapi.ribku-lovim.ru;
	index  index.php;		
	
	location ~ /\. {
		deny all; 
		access_log off; 
		log_not_found off;
	}

    location /gcm-notify.json.php {
		expires 10s;
        access_log off; 
		log_not_found off;
	}

       location /serviceWorker.js {
		expires 10s;
              access_log off; 
		log_not_found off;
	}	
	
	location ~* ^.+.(jpg|jpeg|gif|png|ico|css|bmp|swf|js|mp3)$ {
		access_log        off;
		log_not_found off;
		expires           max;
	}
	location / {
		try_files $uri $uri/ /index.php?$args; 
		log_not_found off;
		access_log        off;
	}
	location ~ \.php$ {
		# fastcgi_split_path_info ^(.+\.php)(.*)$;
		fastcgi_pass   unix:/var/run/php5-fpm.sock;
		fastcgi_index  index.php;

		fastcgi_param  DOCUMENT_ROOT    /var/www/pushapi.ribku-lovim.ru;
		fastcgi_param  SCRIPT_FILENAME  /var/www/pushapi.ribku-lovim.ru$fastcgi_script_name;
		fastcgi_param  PATH_TRANSLATED  /var/www/pushapi.ribku-lovim.ru$fastcgi_script_name;

		include fastcgi_params;
		fastcgi_param  QUERY_STRING     $query_string;
		fastcgi_param  REQUEST_METHOD   $request_method;
		fastcgi_param  CONTENT_TYPE     $content_type;
		fastcgi_param  CONTENT_LENGTH   $content_length;
		fastcgi_intercept_errors        on;
		fastcgi_ignore_client_abort     off;
		fastcgi_connect_timeout 60;
		fastcgi_send_timeout 180;
		fastcgi_read_timeout 180;
		fastcgi_buffer_size 128k;
		fastcgi_buffers 4 256k;
		fastcgi_busy_buffers_size 256k;
		fastcgi_temp_file_write_size 256k;

        access_log off; 
		log_not_found off;

	}		
}
