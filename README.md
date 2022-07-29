# CX Dev

##TODO enable transcriber after jitsi restart in  meeting saga and enable meet filter in calls

##TODO add presets to recordings !!  Improve talking points processing.

##TODO fix only sales can see their meetings + check sales creation flow from adminpanel
##TODO fix adding avatar behaviour - it can`t be saved


#Main styles 
- color schema  for light and dark modes lives in three files badcss.module.scss, _custom.scss and also in reactBigCalenar.scss

##TODO create AppInitializer module
We need to initialize many services (and fetch some data) async when app starts

## Run project in localhost

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm start
```

## Generate statics

```bash
$ npm run build
```

## Environment Variables

For development we use `.env.development` file.

For production we use `.env.production` file.
