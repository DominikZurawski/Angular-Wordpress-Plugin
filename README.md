## Setup

1. `cd app && npm i` to get things started.
2. Once the dependencies are installed, write your app and run `npm run build`. The command will automagically:
  - update the css and js file names in the plugin file
  - paste the dist folder and its contents into the WordPress plugin folder.
3. Take the contents of `/plugin` and upload it to your WordPress project's `/wp-content/plugins` folder.
4. Log into WordPress and activate the plugin.
5. Add the shortchode defined in the plugin file (It's `[ng_wp]` by default) to any WordPress page  or post.


## Vagrantfile
To autamate testing plugin you can use VirtualBox machine, and vagranfile. Use `vagrant up`
