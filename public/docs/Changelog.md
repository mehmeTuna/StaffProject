### V1.2.0

###### 2019-08-07

#### New

- Replaced the Routing System from `1.1.0` version with an easier solution to avoid complexity
- Created 3 individual layouts for `Error`, `Auth` and `Dashboard` pages
- Added `axios` and `axios-mock-adapter` modules to simulate server calls for fetch requests
- Renamed few components
- Updated `Calendar` page code
- Updated `Chat` page code
- Updated `Error` page code
- Moved all lib mixins to `mixins` folder
- Moved `helpers` files to `utils` folder
- Removed `data.js` files
- Removed unused helpers
- Removed unused utils

#### Fix

- Fixed navigation expand issue

---

### V1.1.1

###### 2019-08-01

#### Fix

- Temporary remove PerfectScrollBar to fix Navbar and content scroll issues

---

### V1.1.0

###### 2019-07-31

#### New

- Implemented Code Splitting to lazy load views
- Implemented Layout System based on Route settings
- Implemented Routing System
- Implemented Route Authorization Guard based on authenticated user role and route settings
- Updated Presentation Page
- Created Changelog Page
- Created Development Documentation Pages
- Added PrismJS library and created CodeBlock component
- Added Redux library and configured some components using it as state manager
- Added design Figma source file
- Updated dependencies

#### Fix

- Fixed scroll bugs
- The layouts were similary so we kept one Layout only that can be configured dynamically

#### Breaking changes

- Replaced `underscore` with `lodash`
- Changed the Layout logic
- Renamed few components
- Updated folder structure, grouped all views in the same folder

---

### V1.0.0

###### 2019-07-20

Initial release
