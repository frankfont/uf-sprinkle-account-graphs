<?php

namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Controller;

use UserFrosting\Sprinkle\Core\Controller\SimpleController;

class PageController extends SimpleController
{
    
    public function pageGraphGroupMemberships($request, $response, $args)
    {
        return $this->ci->view->render($response, 'pages/graph-group-membership.html.twig', []);
    }
    
    public function pageGraphRoleMemberships($request, $response, $args)
    {
        return $this->ci->view->render($response, 'pages/graph-role-membership.html.twig', []);
    }
    
    public function pageGraphPermissionMemberships($request, $response, $args)
    {
        return $this->ci->view->render($response, 'pages/graph-permission-membership.html.twig', []);
    }
    
    public function pageGraphActivityView($request, $response, $args)
    {
        return $this->ci->view->render($response, 'pages/graph-activity-view.html.twig', []);
    }
    
    public function pageGraphUsersView($request, $response, $args)
    {
        return $this->ci->view->render($response, 'pages/graph-users-view.html.twig', []);
    }
}
