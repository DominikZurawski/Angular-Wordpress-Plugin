Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.network "private_network", ip: "192.168.56.32"
  config.vm.network "public_network"

  # Konfiguracja współdzielonego folderu
  config.vm.synced_folder "./AngularWordpressPlugin/plugin", "/srv/www/wordpress/wp-content/plugins"


  config.vm.provider "virtualbox" do |vb|
  #   vb.gui = true
    vb.memory = "4096"
  end

  config.vm.provision "shell", inline: <<-SHELL
     sudo apt update
     sudo apt install apache2 \
                      ghostscript \
                      libapache2-mod-php \
                      mysql-server \
                      php \
                      php-bcmath \
                      php-curl \
                      php-imagick \
                      php-intl \
                      php-json \
                      php-mbstring \
                      php-mysql \
                      php-xml \
                      php-zip \
                      unzip -y

     sudo mkdir -p /srv/www
     sudo chown www-data: /srv/www
     curl https://wordpress.org/latest.tar.gz | sudo -u www-data tar zx -C /srv/www

     cat > /etc/apache2/sites-available/wordpress.conf <<EOF
<VirtualHost *:80>
            DocumentRoot /srv/www/wordpress
            <Directory /srv/www/wordpress>
                Options FollowSymLinks
                AllowOverride Limit Options FileInfo
                DirectoryIndex index.php
                Require all granted
            </Directory>
            <Directory /srv/www/wordpress/wp-content>
                Options FollowSymLinks
                Require all granted
            </Directory>
</VirtualHost>
EOF

     sudo a2ensite wordpress
     sudo a2enmod rewrite
     sudo a2dissite 000-default


    # Tworzenie bazy danych i użytkownika
    mysql -u root -e 'CREATE DATABASE wordpress;'
    mysql -u root -e 'CREATE USER wordpress@localhost IDENTIFIED BY "admin123";'
    mysql -u root -e 'GRANT ALL PRIVILEGES ON wordpress.* TO wordpress@localhost;'
    mysql -u root -e 'FLUSH PRIVILEGES;'

    # Konfiguracja pliku wp-config.php
    sudo -u www-data cp /srv/www/wordpress/wp-config-sample.php /srv/www/wordpress/wp-config.php
    sudo -u www-data sed -i 's/database_name_here/wordpress/' /srv/www/wordpress/wp-config.php
    sudo -u www-data sed -i 's/username_here/wordpress/' /srv/www/wordpress/wp-config.php
    sudo -u www-data sed -i 's/password_here/admin123/' /srv/www/wordpress/wp-config.php

    # Instalacja WP-CLI
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    chmod +x wp-cli.phar
    sudo mv wp-cli.phar /usr/local/bin/wp

    # Przejdź do katalogu WordPressa
    cd /srv/www/wordpress

    # Pobierz i zainstaluj WordPressa
    sudo -u www-data wp core download
    sudo -u www-data wp config create --dbname=wordpress --dbuser=wordpress --dbpass=admin123
    sudo -u www-data wp db create
    sudo -u www-data wp core install --url="http://192.168.56.32" --title="OSP" --admin_user="admin" --admin_password="password" --admin_email="admin@example.com"

    # Skopiuj wtyczkę AngularWordpressApp
    # rm -rf /srv/www/wordpress/wp-content/plugins/*
    # cp -r /vagrant/AngularWordpressPlugin/plugin/* /srv/www/wordpress/wp-content/plugins/

    # Aktywacja wtyczki
    sudo -u www-data wp plugin activate AngularWordpressApp --path=/srv/www/wordpress --allow-root


    # Restart usług
    systemctl restart mysql
    systemctl restart apache2


  SHELL

  # Skopiuj plik eksportu do katalogu Vagrant
#   config.vm.provision "file", source: "wordpress-export.wpress", destination: "/vagrant/wordpress-export.wpress"

end
