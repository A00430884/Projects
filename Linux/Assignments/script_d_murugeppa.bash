#!/bin/bash
#1)Check if "out" folder exists and create "out" folder
if [ -d "out" ]
then
	echo "Directory exists.Directory will be removed and re-created"
	rm -r "out"
fi
mkdir "out"
echo "Folder created"
#2) Go to "out" folder
cd "out" || exit 1
#3) Download Dockerfile and app.py
wget http://lnx.cs.smu.ca/docker/Dockerfile > /dev/null
wget http://lnx.cs.smu.ca/docker/app.py > /dev/null

getDate () {
currentDate=$(date +%d)

rem= $((currentDate%2))
echo $rem

}
isEven=$(getDate)
# 4) Update html tag lines
if [ $isEven == 0 ]; then
	sed -i 's/Hello World!/Today is an even day/g' app.py > /dev/null
else
	sed -i 's/Hello World!/Today is an odd day/g' app.py > /dev/null
fi
# 5) Build docker image
docker build -t d_murugeppa_a2 .
port=$(netcat -z -v lnx.cs.smu.ca 1999-4000 2>&1 | grep -m 1 refused | egrep [0-9]* | awk '{print $6 }')
echo "Port available"
echo $port
# 6) Run docker image
docker run -p $port:80 d_murugeppa_a2
sleep 5s
#docker inspect --format '{{ .NetworkSettings.IPAddress }}' $(docker ps -q)
# 7) Find docker ip address
dockId=$(docker ps -a | grep 'd_murugeppa_a2' | awk '{print $1}')


#docker inspect --format='{{.NetworkSettings.IPAddress }}' $dockID
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $dockId > /dev/null

removeResource () {
docker container rm $dockId

}
removeResource
# 8)check web page working
code=`curl -I lnx.cs.smu.ca | cut -d$' ' -f2 | head -n 1`
#test_url=$(curl -s -o /dev/null -w  lnx.cs.smu.ca:$port) 2>&1
if [ $code == 200 ]
then
	echo "URL is working"
else
	echo "URL cannot be reached. Program is terminating"
	
fi
# 9) Save serv.html page
wget lnx.cs.smu.ca:$port -o serv.html
if [ -f serv.html ]
then
echo "serv.html downloaded successfully"
else
echo "serv.html failed to download. Program is terminating"
fi
# 11)
if [ $? == 0 ]
then
echo "success"
removeResource
else
echo "error in execution"
removeResource
fi
cd ..
