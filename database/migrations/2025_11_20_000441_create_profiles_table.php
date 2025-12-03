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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->string('address')->nullable();
            $table->text('google_maps')->nullable();
            $table->string('day')->nullable();
            $table->string('open_time')->nullable();
            $table->string('close_time')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('youtube')->nullable();
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('tiktok')->nullable();
            $table->string('twitter')->nullable();
            $table->integer('order')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
