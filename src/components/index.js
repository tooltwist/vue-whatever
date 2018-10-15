
// External libraries
import Vuex from 'vuex'

// Our main class
import Docservice from '../lib/DocService.js'

// Our store
import DocserviceStore from '../store/docserviceStore.js'

// Our components
import ContentGoogleSlides from './widgets/ContentGoogleSlides.vue'
import ContentGoogleSlidesProps from './widgets/ContentGoogleSlidesProps.vue'
import ContentGoogleSheets from './widgets/ContentGoogleSheets.vue'
import ContentGoogleSheetsProps from './widgets/ContentGoogleSheetsProps.vue'
import ContentGoogleDocs from './widgets/ContentGoogleDocs.vue'
import ContentGoogleDocsProps from './widgets/ContentGoogleDocsProps.vue'

let _Vue = null
let _docservice = null
let _store = null


function install (Vue, options) {
  console.log('Docservice.install()', options)
  if (_docservice) {
    console.error("Vue.use(Docservice) has already been called.")
    return
  }
  let tmpvue = new Vue()
  let $content = tmpvue.$content
  if ( !$content) {
    console.error("$content not defined. Please register ContentService before cslling Vue.use(Docservice).")
    return
  }

  _Vue = Vue

  // Create ourselves a Docservice Object
  _docservice = new Docservice(options)

  const isDef = v => v !== undefined

  // Vue.mixin adds an additional 'beforeCreate' function to it's
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ Docservice }). If found, we'll
  // consider this to be the root. If it is not found, then we will
  // assume this is a child of the root, and create pointers back
  // to the root.
  //Vue.mixin({
  Vue.mixin({
    beforeCreate () {
      // console.log('vue-docservice: index.js - beforeCreate()')

      if (!this.$parent) {
      //if (isDef(this.$options.docservice)) {
        // console.error('Initializing ROOT *********')
        // This must be the root, since we found docservice in it's options.
        this._docserviceRoot = this
        this._docservice = _docservice
        // this._docservice.init(this)
        Vue.util.defineReactive(this, '_docservice', this.$docservice)
        // Vue.util.defineReactive(this, '_docservice', this._docservice.jwt)
        // Vue.util.defineReactive(this, '_docservice', this._docservice.fromCache)
      } else {
        //console.log('Initialise new child')
        this._docserviceRoot = this.$parent._docserviceRoot
      }
    },
    destroyed () {
      // registerInstance(this)
    }
  })

  // As described above, the Vue instances form a hierachy. The mixin
  // above ensures that each instance has an '_docserviceRoot' field
  // that points to the instance where 'docservice' was passed to new Vue({  }).
  // Note that it's _docserviceRoot might actually point to itself.
  Object.defineProperty(Vue.prototype, '$docservice', {
    get () { return this._docserviceRoot._docservice }
  })


  /*
   *  Register our components with Contentservice
   */
  $content.registerLayoutType(Vue, 'google-slides', 'content-google-slides', ContentGoogleSlides, ContentGoogleSlidesProps)
  $content.registerLayoutType(Vue, 'google-sheets', 'content-google-sheets', ContentGoogleSheets, ContentGoogleSheetsProps)
  $content.registerLayoutType(Vue, 'google-docs', 'content-google-docs', ContentGoogleDocs, ContentGoogleDocsProps)

  return _docservice
} //- install()

const obj = {
  install: install,
}

Object.defineProperty(obj, '_docservice', {
  get: function() {
      return _docservice
  }
});

Object.defineProperty(obj, 'storeDefinition', {
  get: function() {
    console.error('storeDefinition getter (in docservice)')
    return DocserviceStore
  }
});

Object.defineProperty(obj, 'docserviceStoreDefinition', {
  get: function() {
    console.error('docserviceStoreDefinition getter')
    return DocserviceStore
  }
});

Object.defineProperty(obj, 'store', {
  get: function() {
    if (_store) {
      return _store
    }

    // Create a new store object
    _Vue.use(Vuex)
    _store = new Vuex.Store({
      modules: {
        docservice: DocserviceStore
      }
    });
    return _store;
  }
});

export default obj
