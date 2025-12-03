<?php

namespace App\Filament\Resources\Infos\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class InfoForm
{
    protected static function handleFileUpload(string $field, string $directory)
    {
        return function ($state, $set, $get) use ($field, $directory) {
            $record = $get('record');

            if ($record && $record->$field && $record->$field !== $state) {
                Storage::disk('public')->delete($directory . '/' . $record->$field);
            }

            $set($field, $state);
        };
    }

    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title'),
                Select::make('category_id')->label('Kategori')
                    ->required()
                    ->preload()
                    ->relationship('category', 'title'),
                RichEditor::make('content')
                    ->fileAttachmentsDisk('public') // bisa ganti ke 's3' kalau pakai cloud
                    ->fileAttachmentsDirectory('images/info') // folder khusus
                    ->fileAttachmentsVisibility('public')
                    ->floatingToolbars([
                        'heading' => [
                            'alignStart',
                            'alignCenter',
                            'alignEnd',
                            'alignJustify',
                        ],
                        'table' => [
                            'tableAddColumnBefore',
                            'tableAddColumnAfter',
                            'tableDeleteColumn',
                            'tableAddRowBefore',
                            'tableAddRowAfter',
                            'tableDeleteRow',
                            'tableMergeCells',
                            'tableSplitCell',
                            'tableToggleHeaderRow',
                            'tableDelete',
                        ],
                    ])
                    ->toolbarButtons([
                        ['bold', 'italic', 'underline', 'strike', 'subscript', 'superscript', 'link', 'horizontalRule', 'highlight'],
                        ['h1', 'h2', 'h3', 'alignStart', 'alignCenter', 'alignEnd', 'alignJustify',  'clearFormatting', 'textColor', 'lead', 'small'],
                        ['blockquote', 'codeBlock', 'bulletList', 'orderedList',],
                        ['table', 'attachFiles', 'details', 'grid', 'gridDelete'], // The `customBlocks` and `mergeTags` tools are also added here if those features are used.
                        ['undo', 'redo',],
                    ])
                    ->columnSpanFull(),

                FileUpload::make('thumbnail')
                    ->image()
                    ->disk('public')
                    ->directory('images/info')
                    ->afterStateUpdated(self::handleFileUpload('thumbnail', 'images/info')),
                FileUpload::make('image')
                    ->image()
                    ->disk('public')
                    ->directory('images/info')
                    ->afterStateUpdated(self::handleFileUpload('image', 'images/info')),
                FileUpload::make('video')
                    ->disk('public')
                    ->directory('video/info')
                    ->afterStateUpdated(self::handleFileUpload('video', 'video/info')),
                TextInput::make('author_name'),
                TextInput::make('editor_name'),
                DateTimePicker::make('published_at'),
                TextInput::make('order')
                    ->numeric(),
            ]);
    }
}
