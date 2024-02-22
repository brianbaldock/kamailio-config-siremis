# <div align="center"> kamailio config </div>

<div align="center">

What is Kamailio

Kamailio® (successor of former OpenSER and SER) is an Open Source SIP Server released under GPLv2+, able to handle thousands of call setups per second. Kamailio can be used to build large platforms for VoIP and realtime communications – presence, WebRTC, Instant messaging and other applications.  Moreover, it can be easily used for scaling up SIP-to-PSTN gateways, PBX systems or media servers like Asterisk™, FreeSWITCH™ or SEMS.

</div>

<br>

## how to install kamailio

1. update apt

```bash
sudo apt update
```

2. install mariadb-server

```bash
apt-get install gnupg2 mariadb-server curl unzip -y
```

3. add apt-key

```bash
wget -O- http://deb.kamailio.org/kamailiodebkey.gpg | gpg --dearmor > kamailio.gpg
sudo mv kamailio.gpg /usr/share/keyrings/
```

4. update kamailio version

```bash
sudo tee /etc/apt/sources.list.d/kamailio.list<<EOF
deb [signed-by=/usr/share/keyrings/kamailio.gpg] http://deb.kamailio.org/kamailio57 jammy main
EOF
```

5. update apt

```bash
sudo apt update
```

6. install kamilio 

```bash
sudo apt update
sudo apt-get install kamailio*
sudo apt-get install kamailio kamailio-mysql-modules kamailio-websocket-modules kamailio-tls-modules -y
```

7. set root password

```bash
mysql
use mysql;
set password=password('root');
exit
```

8. create database

```bash
vi  /etc/kamailio/kamctlrc
```

> edit your DOMAIN

```bash
## the SIP domain
SIP_DOMAIN=202.30.249.27

## chrooted directory
# CHROOT_DIR="/path/to/chrooted/directory"

## database type: MYSQL, PGSQL, ORACLE, DB_BERKELEY, DBTEXT, or SQLITE
## by default none is loaded
##
## If you want to setup a database with kamdbctl, you must at least specify
## this parameter.
DBENGINE=MYSQL

## database host
DBHOST=localhost

## database port
DBPORT=3306

```

> create database

```bash
kamdbctl create
```

<br>

## how to install siremis

1. install lib

```bash
apt-get install apache2 php libapache2-mod-php php-mysql php-gd php-curl php-xml php-pear php-xmlrpc make git -y
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt install php7.4 php7.4-common php7.4-cli libapache2-mod-php7.4
sudo apt install php7.4-bcmath php7.4-bz2 php7.4-curl php7.4-intl php7.4-mbstring php7.4-mysql php7.4-readline php7.4-xml php7.4-zip php7.4-gd php7.4-memcached php7.4-redis php7.4-xmlrpc
``` 

2. put and execute

```bash
pear install XML_RPC2

cd /var/www/
git clone https://github.com/asipto/siremis

cd siremis
make apache24-conf | tee /etc/apache2/sites-enabled/siremis.conf

make prepare24
make chown
```

3. set siremis user in mysql

```bash
mysql
use mysql;

GRANT ALL PRIVILEGES ON siremis.* TO siremis@localhost IDENTIFIED BY 'siremisrw';
flush privileges;

exit;
```

4. execute

```bash
a2enmod rewrite
systemctl restart apache2

# next line is disable on php8.1
sudo a2dismod php8.1
sudo a2enmod php7.4
```

<br>

## how to install nodejs

1. execute

```bash
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt install -y nodejs
sudo apt install build-essential
```

<br>

## how to change logging in kamailio 

```bash
chmod 777 /var/log/kamailio.log

vi /lib/systemd/system/kamailio.service
vi /etc/rsyslog.conf

service rsyslog restart
```

<br>

## setting kamailio-cfg

1. edit your address

```bash
vi kamailio-local.cfg
```

2. set your kamailio's routing tables (Loadbalance)

```bash
vi settings/dispatcher.list

# gateways 
1 sip:123.123.123.123:5060  # insert your group
# 1 sip:daum.net:5060  # insert your group
# 1 sip:kakao.com:5060  # insert your group

# gateways
2 sip:202.30.241.33:5070 # insert your group
# 2 sip:202.30.242.33:5070 # insert your group
# 2 sip:202.30.243.33:5070 # insert your group
```

```bash
vi settings/help.json

# this is comment    
# INBOUND: OUTBOUND
# default port is 5060

{
    "123.123.123.123": "202.30.241.33:5070",
    "202.30.241.33:5070": "123.123.123.123"
}

```

<br>

## References

1. Kamailio Module [Page](https://www.kamailio.org/docs/modules/5.5.x/)
2. Kamailio Core [Page](http://www.kamailio.org/wiki/cookbooks/5.5.x/core)
3. Kamilio PseudoVariables [Page](https://www.kamailio.org/wiki/cookbooks/5.5.x/pseudovariables)

<br>

## Contact

[Junho Kim](libtv@naver.com) <br>
[JongSun Park](ahrl1994@gmail.com)

<br>

## HomePage

Github © [Page](https://github.com/A-big-fish-in-a-small-pond/)
