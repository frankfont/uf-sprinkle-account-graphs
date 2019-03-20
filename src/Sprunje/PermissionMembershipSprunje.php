<?php
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Sprunje;

use Illuminate\Database\Capsule\Manager as Capsule;
use UserFrosting\Sprinkle\Core\Facades\Debug;
use UserFrosting\Sprinkle\Core\Sprunje\Sprunje;

class PermissionMembershipSprunje extends Sprunje
{
    protected $name = 'permission_membership_sprunje';

    protected $sortable = [
        'name',
        'permission_id',
        'member_count'
    ];

    protected $filterable = [
        'name',
        'permission_id',
        'member_count'
    ];
    
    protected function baseQuery()
    {
        $instance = $this->classMapper->createInstance('permission_membership');

        $query = $instance->newQuery();

        $query->join('permissions', function ($join)
        {
            $join->on('permission_roles.permission_id', 'permissions.id');
        });
        
        $query->select('permission_id', 'permissions.name', Capsule::raw('COUNT(permission_roles.role_id) as member_count'))
            ->groupBy('permission_id','permissions.name');
        
        return $query;
    }
    
}
