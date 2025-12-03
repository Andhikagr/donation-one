<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use App\Models\Gallery;
use App\Models\Hero;
use App\Models\Info;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {

        $tentang = Article::whereHas('category', function ($q) {
            $q->where('title', 'tentang')
                ->whereHas('parent', fn($p) => $p->where('title', 'Profile'));
        })->first();

        // Ambil kategori utama 'bantuan' (grandparent)
        $bantuanCategory = Category::where('title', 'bantuan')->first();

        $bantuan = [];

        if ($bantuanCategory) {
            // Ambil semua anak kategori (subkategori) dari 'bantuan'
            foreach ($bantuanCategory->children as $sub) {
                $infoDetail = Info::where('category_id', $sub->id)->first(); // 1 artikel per subkategori
                if ($infoDetail) {
                    $bantuan[] = [
                        'category' => $sub->title,
                        'infoDetail' => $infoDetail
                    ];
                }
            }
        }

        $excludedCategories = ['tentang'];

        $article = Article::with('category.parent')
            ->whereDoesntHave('category', function ($q) use ($excludedCategories) {
                $q->whereIn('title', $excludedCategories)
                    ->orWhereHas('parent', function ($sub) use ($excludedCategories) {
                        $sub->whereIn('title', $excludedCategories);
                    });
            })
            ->orderByDesc('published_at')
            ->take(5) // langsung batasi di query
            ->get();

        $hero = Hero::all();


        $galeri = Gallery::whereHas('category', function ($q) {
            $q->whereHas('parent', fn($p) => $p->where('title', 'Bantuan'));
        })->get();

        $sponsor = Gallery::whereHas('category', function ($q) {
            $q->where('title', 'Sponsor');
        })->get();

        $banner = Gallery::whereHas('category', function ($q) {
            $q->where('title', 'Banner');
        })->get();

        $report = Article::whereHas('category', function ($q) {
            $q->whereHas('parent', fn($p) => $p->where('title', 'Bantuan'));
        })->get();
        $province = Province::all();

        return Inertia::render('Home/Home', [
            'galeri' => $galeri,
            'hero' => $hero,
            'tentang' => $tentang,
            'bantuan' => $bantuan,
            'article' => $article,
            'sponsor' => $sponsor,
            'banner' => $banner,
            'report' => $report,
            'province' => $province

        ]);
    }
}
