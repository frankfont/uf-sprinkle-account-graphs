<?php
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\ServicesProvider;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use UserFrosting\Sprinkle\Account\Authenticate\Authenticator;
use UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager;
use UserFrosting\Sprinkle\Core\Facades\Debug;

/**
 * Registers services for the uf-sprinkle-account-graphs sprinkle.
 *
 * @author Frank Font (http://frankfont.net)
 */
class ServicesProvider
{
    /**
     * Register UserFrosting's uf-sprinkle-account-graphs services.
     *
     * @param Container $container A DI container implementing ArrayAccess and container-interop.
     */
    public function register($container)
    {
        /**
         * Extend the 'classMapper' service to register sprunje classes.
         */
        $container->extend('classMapper', function ($classMapper, $c) 
        {
            $classMapper->setClassMapping('group_membership_sprunje', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje\GroupMembershipSprunje');
            
            $classMapper->setClassMapping('role_membership_sprunje', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje\RoleMembershipSprunje');
            $classMapper->setClassMapping('role_membership', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Database\Models\RoleMembership');
            
            $classMapper->setClassMapping('permission_membership_sprunje', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje\PermissionMembershipSprunje');
            $classMapper->setClassMapping('permission_membership', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Database\Models\PermissionMembership');
            
            $classMapper->setClassMapping('activity_view_sprunje', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje\ActivityViewSprunje');

            $classMapper->setClassMapping('users_activity_summary_view_sprunje', 'UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje\UsersActivitySummaryViewSprunje');

            return $classMapper;
        });     
       
    }
}
