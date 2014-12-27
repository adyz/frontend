# Gulp front-end setup for PHP developers

##Description
I am a front-end developer and often enough I use PHP & MySQL to build mockups and prototyes.

I've build this project/repository/tool to help me have a front-end boilerplate simmilar with Codekit & Prepros, but having the configuration open to the developers, shareable and platform independent.



##Features
1. Live Reload & Sync with BrowserSync + Server Proxy for PHP or any other server type
2. SCSS/SASS + Compass + Autoprefixer
3. Browserify to build your JS dependencies
4. Bower and PHP includes of Bower dependecies 

##Setup
1. Create virtual host and modify the name in the gulpfile 
2. run **npm npm install** (with sudo if errors)
3. run **bower install** (with sudo if errors)
4. run **gulp serveme**