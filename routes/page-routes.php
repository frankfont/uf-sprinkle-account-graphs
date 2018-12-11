<?php

$app->get('/graph/group/memberships', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller\PageController:pageGraphGroupMemberships')
    ->add('authGuard');

$app->get('/graph/role/memberships', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller\PageController:pageGraphRoleMemberships')
    ->add('authGuard');

$app->get('/graph/permission/memberships', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller\PageController:pageGraphPermissionMemberships')
    ->add('authGuard');

$app->get('/graph/activity/view', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller\PageController:pageGraphActivityView')
    ->add('authGuard');

$app->get('/graph/users/view', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller\PageController:pageGraphUsersView')
    ->add('authGuard');

