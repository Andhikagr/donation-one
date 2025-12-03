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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->string('title')->nullable();
            $table->string('slug')->unique();
            $table->text('content')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('banner')->nullable();
            $table->json('image')->nullable();
            $table->string('author_name')->nullable();
            $table->string('editor_name')->nullable();
            $table->timestamp('published_at')->nullable()->index();
            $table->integer('order')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->unsignedBigInteger('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
