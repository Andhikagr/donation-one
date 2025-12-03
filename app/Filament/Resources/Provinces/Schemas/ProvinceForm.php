<?php

namespace App\Filament\Resources\Provinces\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ProvinceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('province')
                    ->required(),
                TextInput::make('data')
                    ->required()
                    ->numeric()
                    ->default(0),
            ]);
    }
}
