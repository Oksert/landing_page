sshpass -p 'ipSy$tem1231' scp root@194.87.111.93:$1 /opt/landing_page
echo -e "\e[1;34m Articles were copied from $1 \e[0m"
cd ref
node saveFile ../ip_km_data_20171201.json
echo -e "\e[1;34m Rebuilding client.. \e[0m"
node ../node_modules/webpack/bin/webpack
echo -e "\e[1;32m Build success  \e[0m"
