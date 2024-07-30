<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('responsible_id');

            // Adiciona a chave estrangeira
            $table->foreign('responsible_id')->references('id')->on('responsibles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Remove a chave estrangeira
            $table->dropForeign(['responsible_id']);
            // Remove a coluna de chave estrangeira
            $table->dropColumn('responsible_id');
        });
    }
};
