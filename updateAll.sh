sshpass -p 'ipSy$tem1231' scp root@194.87.111.93:/usr/tmp/$1 /opt/landing_page
echo -e "\e[1;34m Articles were copied from  root@194.87.111.93:/usr/tmp/$1 \e[0m"
cd ref
node saveFile ../$1
echo -e "\e[1;34m Rebuilding client.. \e[0m"
node ../node_modules/webpack/bin/webpack
echo -e "\e[1;32m Build success  \e[0m"
