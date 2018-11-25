<?php
/**
 * UserFrosting (http://www.rolefrosting.com)
 *
 * @link      https://github.com/rolefrosting/UserFrosting
 * @license   https://github.com/rolefrosting/UserFrosting/blob/master/licenses/UserFrosting.md (MIT License)
 */
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Database\Models;

use Illuminate\Database\Capsule\Manager as Capsule;
use UserFrosting\Sprinkle\Core\Database\Models\Model;

/**
 * PermissionMembership Class
 *
 * Represents a permission memberships
 */
class PermissionMembership extends Model
{
    protected $table = "permission_roles";
    public $timestamps = true;
    
    /**
     * Query to return all role counts for each permission
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function memberUserCounts($query)
    {
        return $query->join('permissions', function ($join) {
            $join->on('permission_roles.permission_id', 'permissions.id');
        });
    }
}
