# Jitsi Headless

Specifically, running [Jitsi](https://jitsi.org/) on a Raspberry Pi. 


## Instructions
Start with a fresh installation of [Rasbian Buster Lite](https://www.raspberrypi.org/downloads/raspbian/).

Install dependencies:
```
sudo apt-get update
sudo apt-get install chromium-browser xvfb
```

Start an Xvfb display:
```
Xvfb :1 -screen 0 1920x1080x24 &
```

We will point chromium this display with `--display=:1`

Install [Node.js](https://nodejs.org/en/). For details, see [here](https://github.com/nodesource/distributions):
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
```

Plug in a webcam and run the script:
```
node app.js <jitsi-meet-room-name>
```


## References
* [Streaming a Webcam to Jitsi Meet Room](https://code.saghul.net/tag/headless/)
* [raspberry pi Chromium revision is not downloaded](https://github.com/puppeteer/puppeteer/issues/550#issuecomment-551991273)
