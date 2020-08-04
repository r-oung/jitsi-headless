# Jitsi Headless

Instructions are for running [Jitsi](https://jitsi.org/) on a Raspberry Pi. Tested on a Raspberry Pi 4 with 8GB of RAM.


## Instructions
Start with a fresh installation of [Rasbian Buster Lite](https://www.raspberrypi.org/downloads/raspbian/).

Install dependencies:
```
sudo apt-get update
sudo apt-get install chromium-browser xvfb
```

Install [Node.js](https://nodejs.org/en/). For details, see [here](https://github.com/nodesource/distributions):
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
```

Clone this repository and install packages:
```
git clone https://github.com/ray-hrst/jitsi-headless.git
cd jitsi-headless/
npm install package.json
```

Start an Xvfb display:
```
Xvfb :1 -screen 0 1920x1080x24 &
```

Plug in a webcam and run the script:
```
node app.js <jitsi-meet-room-name>
```


## Auto-Start
There are various ways to run a program at startup, see [here](https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/).

The `start.sh` will start an Xvfb display and run the node app automatically. 


## References
* [Streaming a Webcam to Jitsi Meet Room](https://code.saghul.net/tag/headless/)
* [raspberry pi Chromium revision is not downloaded](https://github.com/puppeteer/puppeteer/issues/550#issuecomment-551991273)
