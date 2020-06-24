<?php
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje;

use Illuminate\Database\Capsule\Manager as Capsule;
use UserFrosting\Sprinkle\Core\Facades\Debug;
use UserFrosting\Sprinkle\Core\Sprunje\Sprunje;

class RoleMembershipSprunje extends Sprunje
{
    protected $name = 'role_membership_sprunje';

    protected $sortable = [
        'name',
        'role_id',
        'member_count'
    ];

    protected $filterable = [
        'name',
        'role_id',
        'member_count'
    ];
    
    protected function baseQuery()
    {
        $instance = $this->classMapper->createInstance('role_membership');

        $query = $instance->newQuery();

        $query->join('roles', function ($join) use ($roleId) 
        {
            $join->on('role_users.role_id', 'roles.id');
        });
        
        $query->select('role_id', 'roles.name', Capsule::raw('COUNT(role_users.user_id) as member_count'))
            ->groupBy('role_id','roles.name');
        
        return $query;
    }
    
}
