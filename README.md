# Introduction

Add functionality from [docservice.io] to a VueJS project.


# Quick Start

```sh
npm install vue-docservice --save

    or

yarn add vue-docservice
```    

## Add to a VueJS project

When used with a module system, you must explicitly install Vuex via Vue.use():

    import Vue from 'vue'
    import Contentservice from 'vue-contentservice'
    import Docservice from 'vue-docservice'

    Vue.use(Contentservice, options)


## Add to a Nuxt project

Before beginning, you must have vue-contentservice already used in your project.
Docservice is added to your Nuxt project in much the same way as Contentservice was added, by creating a Nuxt plugin.

~/plugins/vue-docservice.js:

    import Vue from 'vue'
    import Docservice from 'vue-docservice'

    Vue.use(Contentservice, options)

nuxt.config.js:

    module.exports = {
      ...
      plugins: [
        { src: '~plugins/vue-contentservice.js', ssr: false },
        ...
        { src: '~plugins/vue-docservice.js', ssr: false },
      ],
    }

Note: this is `plugins` under `module.exports`, not to be confused with any of the Webpack plugins defined inside `build`.


# Your Account Dashboard
Create a free ToolTwist account at http://tooltwist.com, and press 'Add Application' to
get an APIKey for your application. This dashboard provides user administration, metrics,
and other functionality.


# Options

vue-docservice requires that an `options` object is passed to Vue.use().

These options relate to how your client application connects to the remote Contentservice.io server.

Some of these values may change during the different stages of your development, so the endpoint
details are best saved in a configuration file, that can be overwritten during deployment. The
convention we use is to place such a file in a directory named `protected-config/websiteConfig.js`:

```javascript
/*
 *  This file gets overwritten during production deployments.
 */
module.exports = {
  docservice: {
    host: 'docservice.io',
    version: 'v2',
    apikey: 'API10O0X1XXXXXXXXXXXKN15ZXXX9'
  }
}
```

We then reference this file when setting our endpoints. Note that not all the values need to be defined.

```javascript
// Load the configuration. This directory should be included in .gitignore.
import Config from '../protected-config/websiteConfig'

const options = {
  protocol: Config.docservice.protocol,
  host: Config.docservice.host,
  port: Config.docservice.port,
  version: Config.docservice.version,
  apikey: Config.docservice.apikey,
  ...
}
```

### Using the Docservice components
When you edit a page, you will now see the Docservice widgets in the toolbox.
