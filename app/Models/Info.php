<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Info extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'content',
        'thumbnail',
        'image',
        'video',
        'author_name',
        'editor_name',
        'published_at',
        'slug'

    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected $appends = ['image_url', 'thumbnail_url',];

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }

    protected static function booted()
    {
        // Saat update
        static::updating(function ($news) {
            if ($news->isDirty('title')) {
                $news->slug = Str::slug($news->title);
            }
        });

        // Saat create
        static::creating(function ($news) {
            $news->slug = Str::slug($news->title);
        });
    }
}
