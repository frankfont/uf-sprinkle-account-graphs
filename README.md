# uf-sprinkle-account-graphs
This is custom a sprinkle for the [UserFrosting](https://www.userfrosting.com/ "UserFrosting Website") framework to show visual charts of account information.

This sprinkle adds bar and pie charts into the standard Userfrosting administration screens. The charts show up automatically when you click on any of the following adminstration options from the left navigation area:

* Users
* Activities
* Roles
* Permissions
* Groups

There are several chart options displayed near the top of each page next to the label "Chart Options" as shown in the partial screenshot below.  (The "none" option has been selected.)
![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-users-none.png "Example Chart Options")

## Sample Screenshots 
Users Bar Chart:![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-users-bar.png "Example Bar Chart")

Users Pie Chart:![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-users-pie.png "Example Pie Chart")

Activities Bar Chart:![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-activities-bar.png "Example Bar Chart")

Roles Bar Chart:![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-roles-bar.png "Example Bar Chart")

Permissions Bar Chart:![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-permissions-bar.png "Example Bar Chart")

Groups Bar Chart:![alt text](https://github.com/frankfont/uf-sprinkle-account-graphs/blob/master/docs/images/screenshots/s-groups-bar.png "Example Bar Chart")

## Installation 
This sprinkle does not modify your database and can simply be installed by adding a dependency declaration into your [app/sprinkles.json](https://learn.userfrosting.com/sprinkles/community "UserFrosting Sprinkle Documentation") in the standard UserFrosting recommended manner.

### What to add into your sprinkles.json file 
The example app/sprinkles.json file shown here adds this sprinkle into the require section and then declares it at the bottom of the base section too.

```json
{
    "require": {
        "frankfont/uf-sprinkle-account-graphs" : ">=0.0"
    },
    "base": [
        "core",
        "account",
        "admin",
        "uf-sprinkle-account-graphs"
    ]
}
```

Run the "composer update" command to from your docroot for the sprinkle to download and install.

## Standard Configurations 
The defaults.php declares the default chart shown for each page.  You can override these values with a app/.env file or by overriding the defaults.php entries in code.  The values for the app/.env are as follows:

### app/.env example override entries

#### Declare type of chart (none, bar, pie)
SPRINKLE.ACCOUNT_GRAPHS.USERS.DEFAULT.TYPENAME=bar
SPRINKLE.ACCOUNT_GRAPHS.ACTIVITIES.DEFAULT.TYPENAME=bar
SPRINKLE.ACCOUNT_GRAPHS.ROLES.DEFAULT.TYPENAME=bar
SPRINKLE.ACCOUNT_GRAPHS.PERMISSIONS.DEFAULT.TYPENAME=bar
SPRINKLE.ACCOUNT_GRAPHS.GROUPS.DEFAULT.TYPENAME=bar

#### Declare alpha values for color palette [>0,<=1]
SPRINKLE.ACCOUNT_GRAPHS.COLORS.DEFAULT.FILL.LIGHT_ALPHA=.2
SPRINKLE.ACCOUNT_GRAPHS.COLORS.DEFAULT.FILL.MEDIUM_ALPHA=.5

In the example above, if you replace bar with none, then by default no chart is displayed.

