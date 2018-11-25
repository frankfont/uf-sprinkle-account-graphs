<?php

$app->get('/api/graph/group/memberships', 'UserFrosting\Sprinkle\AccountGraphs\Controller\ApiController:apiGraphGroupMemberships')
    ->add('authGuard');

$app->get('/api/graph/role/memberships', 'UserFrosting\Sprinkle\AccountGraphs\Controller\ApiController:apiGraphRoleMemberships')
    ->add('authGuard');

$app->get('/api/graph/permission/memberships', 'UserFrosting\Sprinkle\AccountGraphs\Controller\ApiController:apiGraphPermissionMemberships')
    ->add('authGuard');

$app->get('/api/graph/activity/view', 'UserFrosting\Sprinkle\AccountGraphs\Controller\ApiController:apiGraphActivityView')
    ->add('authGuard');

$app->get('/api/graph/users-activity-summary/view', 'UserFrosting\Sprinkle\AccountGraphs\Controller\ApiController:apiGraphUsersActivitySummaryView')
    ->add('authGuard');
