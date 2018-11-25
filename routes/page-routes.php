<?php

$app->get('/graph/group/memberships', 'UserFrosting\Sprinkle\AccountGraphs\Controller\PageController:pageGraphGroupMemberships')
    ->add('authGuard');

$app->get('/graph/role/memberships', 'UserFrosting\Sprinkle\AccountGraphs\Controller\PageController:pageGraphRoleMemberships')
    ->add('authGuard');

$app->get('/graph/permission/memberships', 'UserFrosting\Sprinkle\AccountGraphs\Controller\PageController:pageGraphPermissionMemberships')
    ->add('authGuard');

$app->get('/graph/activity/view', 'UserFrosting\Sprinkle\AccountGraphs\Controller\PageController:pageGraphActivityView')
    ->add('authGuard');


