<?php

namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller;

use UserFrosting\Sprinkle\Core\Controller\SimpleController;
use UserFrosting\Sprinkle\Account\Database\Models\User;

class ApiController extends SimpleController
{
    
    private function getApiGraphData($request, $response, $args, $sprunjename)
    {
        try
        {
            // GET parameters
            $params = $request->getQueryParams();

            /** @var UserFrosting\Sprinkle\Account\Authorize\AuthorizationManager $authorizer */
            $authorizer = $this->ci->authorizer;

            /** @var UserFrosting\Sprinkle\Account\Database\Models\User $currentUser */
            $currentUser = $this->ci->currentUser;

            // Access-controlled page
            if (!$authorizer->checkAccess($currentUser, 'uri_users')) {
                throw new ForbiddenException();
            }

            /** @var UserFrosting\Sprinkle\Core\Util\ClassMapper $classMapper */
            $classMapper = $this->ci->classMapper;

            $sprunje = $classMapper->createInstance($sprunjename, $classMapper, $params);

            // Be careful how you consume this data - it has not been escaped and contains untrusted user-supplied content.
            // For example, if you plan to insert it into an HTML DOM, you must escape it on the client side (or use client-side templating).
            return $sprunje->toResponse($response);        


            //$result = User::where('user_name', 'root')->get();
            //return $response->withJson($result, 200, JSON_PRETTY_PRINT);
        } catch (\Exception $ex) {
            error_log("LOOK FAILED getApiGraphData for $sprunjename: " . $ex);
            throw $ex;
        }
    }
    
    public function apiGraphGroupMemberships($request, $response, $args)
    {
        return $this->getApiGraphData($request, $response, $args, 'group_membership_sprunje');
    }
    
    public function apiGraphRoleMemberships($request, $response, $args)
    {
        return $this->getApiGraphData($request, $response, $args, 'role_membership_sprunje');
    }    
    
    public function apiGraphPermissionMemberships($request, $response, $args)
    {
        return $this->getApiGraphData($request, $response, $args, 'permission_membership_sprunje');
    }    

    public function apiGraphActivityView($request, $response, $args)
    {
        return $this->getApiGraphData($request, $response, $args, 'activity_view_sprunje');
    }    
    
    public function apiGraphUsersActivitySummaryView($request, $response, $args)
    {
        return $this->getApiGraphData($request, $response, $args, 'users_activity_summary_view_sprunje');
    }    
}
