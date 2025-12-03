<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Category Title')
                    ->required()
                    ->maxLength(255),

                Select::make('parent_id')
                    ->label('Parent Category')
                    ->relationship('parent', 'title') // ← kunci utama
                    ->nullable()
                    ->searchable()
                    ->preload(), // tampilkan semua kategori di dropdown
            ]);
    }
}
