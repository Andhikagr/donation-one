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
        Schema::create('infos', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->text('content')->nullable();
            $table->string('slug')->unique();
            $table->string('thumbnail')->nullable();
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->string('author_name')->nullable();
            $table->string('editor_name')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->integer('order')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('infos');
    }
};
