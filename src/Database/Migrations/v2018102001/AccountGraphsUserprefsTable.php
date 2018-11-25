<?php
/*DEPRECATED
namespace UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Database\Migrations\v2018102001;

use UserFrosting\System\Bakery\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

use UserFrosting\Sprinkle\UfSprinkleAccountGraphs\Database\Models\AccountGraphsUserprefs;

class AccountGraphsUserprefsTable extends Migration
{
    public $dependencies = [
        '\UserFrosting\Sprinkle\Account\Database\Migrations\v400\UsersTable',
    ];
    
    public function up()
    {
        if (!$this->schema->hasTable('account_graphs_userprefs')) 
        {
            $this->schema->create('account_graphs_userprefs', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id')->unsigned()->unique();
                $table->string('chart_groups', 20)->nullable();
                $table->string('chart_roles', 20)->nullable();
                $table->string('chart_permissions', 20)->nullable();
                $table->timestamps();

                $table->engine = 'InnoDB';
                $table->collation = 'utf8_unicode_ci';
                $table->charset = 'utf8';
                $table->foreign('user_id')->references('id')->on('users');
                $table->index('user_id');
            });
        }
    }

    public function down()
    {
        $this->schema->drop('account_graphs_userprefs');
    }
    
    public function seed()
    {
    }
}
*/
