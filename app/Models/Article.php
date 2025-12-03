<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'content',
        'distribute_date',
        'thumbnail',
        'banner',
        'image',
        'author_name',
        'editor_name',
        'published_at',
        'views',
        'user_id',
        'order',
    ];


    protected $appends = ['image_url', 'thumbnail_url', 'banner_url', 'published_at_formatted',];

    protected $casts = [
        'image' => 'array',
    ];

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail ? asset('storage/' . $this->thumbnail) : null;
    }
    public function getBannerUrlAttribute()
    {
        return $this->banner ? asset('storage/' . $this->banner) : null;
    }


    public function getImageUrlAttribute()
    {
        if (!$this->image) return [];
        return collect($this->image)->map(fn($img) => asset('storage/' . $img))->toArray();
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function getPublishedAtFormattedAttribute()
    {
        return $this->published_at
            ? Carbon::parse($this->published_at)
            ->locale('id')
            ->translatedFormat('d F Y')
            // ->translatedFormat('l, d F Y H:i')
            // hanya tanggal + jam:menit
            : null;
    }
}
