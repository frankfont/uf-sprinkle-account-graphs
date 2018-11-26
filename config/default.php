<?php

/**
 * The default settings for the uf-sprinkle-account-graphs sprinkle.
 */
return [
        'site' => [
            'account_graphs' => [
                'colors' => [
                    'default' => [
                        'fill' => [
                            'light_alpha' => getenv('SPRINKLE.ACCOUNT_GRAPHS.COLORS.DEFAULT.FILL.LIGHT_ALPHA') ?: .2,
                            'medium_alpha' => getenv('SPRINKLE.ACCOUNT_GRAPHS.COLORS.DEFAULT.FILL.MEDIUM_ALPHA') ?: .4
                        ]
                    ]
                ],
                'users' => [
                    'default' => [
                        'typename' => getenv('SPRINKLE.ACCOUNT_GRAPHS.USERS.DEFAULT.TYPENAME') ?: 'bar',
                        'age' => getenv('SPRINKLE.ACCOUNT_GRAPHS.USERS.DEFAULT.AGE') ?: 7,
                    ]
                ],
                'activities' => [
                    'default' => [
                        'typename' => getenv('SPRINKLE.ACCOUNT_GRAPHS.ACTIVITIES.DEFAULT.TYPENAME') ?: 'bar',
                        'age' => getenv('SPRINKLE.ACCOUNT_GRAPHS.ACTIVITIES.DEFAULT.AGE') ?: 7,
                    ]
                ],
                'roles' => [
                    'default' => [
                        'typename' => getenv('SPRINKLE.ACCOUNT_GRAPHS.ROLES.DEFAULT.TYPENAME') ?: 'bar',
                    ]
                ],
                'permissions' => [
                    'default' => [
                        'typename' => getenv('SPRINKLE.ACCOUNT_GRAPHS.PERMISSIONS.DEFAULT.TYPENAME') ?: 'bar',
                    ]
                ],
                'groups' => [
                    'default' => [
                        'typename' => getenv('SPRINKLE.ACCOUNT_GRAPHS.GROUPS.DEFAULT.TYPENAME') ?: 'bar',
                    ]
                ],
            ],
        ],
    ];
