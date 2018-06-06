# Angular-Growl-v2-Webpack

### The Basics
  - Based on https://github.com/JanStevens/angular-growl-2
  - A webpack version of the this angular module

### Installation
Within your webpack module include CSS & JS
```
var angular = require('angular');

require('angular-growl-v2-webpack/src/growl.css')
ngModule = angular.module('myModule', [
        require('angular-growl-v2-webpack')
    ])
require('./otherComponents')(ngModule);
module.exports = ngModule.name;
```

In your index.html add the `growl` directive

```sh
<body>
    <div growl></div>
</body>
```

See the link above for indepth customization instructions.
