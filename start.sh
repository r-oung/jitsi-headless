#!/bin/sh
#
# Automatically starts a Jitsi Meet Room in headless mode.
#
# Usage
#	  ./start.sh <jitsi-meet-room>
#
# MIT License
#
# Copyright (c) 2020 Raymond Oung
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#

# abort if any command fails
set -e

# display usage instructions
usage()
{
  echo ""
  echo "usage: start.sh <jitsi-meet-room>"
  echo ""
  echo "Automatically starts a Jitsi Meet Room in headless mode."
  echo ""
  echo "positional arguments:"
  echo ""
  echo "  jitsi-meet-room       Jitsi meet room name"
  echo ""
}

# check for package name
if [ -z "$1" ]; then
  echo "Missing Jitsi meet room name"
  usage
  exit 1
else
  JITSI_MEET_ROOM_NAME=$1
fi

# start an Xvfb display:
Xvfb :1 -screen 0 1920x1080x24 &

# run node app
cd /home/pi/jitsi-headless/
node app.js "${JITSI_MEET_ROOM_NAME}"

# finish
echo "Done"
exit 0
