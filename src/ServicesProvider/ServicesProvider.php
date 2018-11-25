<?php
namespace UserFrosting\Sprinkle\AccountGraphs\ServicesProvider;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use UserFrosting\Sprinkle\Account\Authenticate\Authenticator;
use UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager;
use UserFrosting\Sprinkle\Core\Facades\Debug;

/**
 * Registers services for the account-graphs sprinkle.
 *
 * @author Frank Font (http://frankfont.net)
 */
class ServicesProvider
{
    /**
     * Register UserFrosting's account-graphs services.
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
            $classMapper->setClassMapping('group_membership_sprunje', 'UserFrosting\Sprinkle\AccountGraphs\Sprunje\GroupMembershipSprunje');
            
            $classMapper->setClassMapping('role_membership_sprunje', 'UserFrosting\Sprinkle\AccountGraphs\Sprunje\RoleMembershipSprunje');
            $classMapper->setClassMapping('role_membership', 'UserFrosting\Sprinkle\AccountGraphs\Database\Models\RoleMembership');
            
            $classMapper->setClassMapping('permission_membership_sprunje', 'UserFrosting\Sprinkle\AccountGraphs\Sprunje\PermissionMembershipSprunje');
            $classMapper->setClassMapping('permission_membership', 'UserFrosting\Sprinkle\AccountGraphs\Database\Models\PermissionMembership');
            
            $classMapper->setClassMapping('activity_view_sprunje', 'UserFrosting\Sprinkle\AccountGraphs\Sprunje\ActivityViewSprunje');

            $classMapper->setClassMapping('users_activity_summary_view_sprunje', 'UserFrosting\Sprinkle\AccountGraphs\Sprunje\UsersActivitySummaryViewSprunje');

            return $classMapper;
        });     
       
    }
}
