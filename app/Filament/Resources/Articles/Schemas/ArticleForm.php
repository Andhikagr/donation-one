<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ArticleForm
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

    protected static function handleMultipleUpload(string $field, string $directory)
    {
        return function ($state, $set, $get) use ($field, $directory) {
            $record = $get('record');
            $newFiles = is_array($state) ? $state : [$state];

            if ($record && $record->$field) {
                $oldFiles = is_array($record->$field)
                    ? $record->$field
                    : [$record->$field];

                foreach ($oldFiles as $file) {
                    if (!in_array($file, $newFiles)) {
                        Storage::disk('public')->delete($directory . '/' . $file);
                    }
                }
            }

            $set($field, $newFiles);
        };
    }
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->required()
                    ->preload()
                    ->relationship('category', 'title'),
                TextInput::make('title'),
                RichEditor::make('content')
                    ->required()
                    ->fileAttachmentsDisk('public') // bisa ganti ke 's3' kalau pakai cloud
                    ->fileAttachmentsDirectory('images/article') // folder khusus
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
                TextInput::make('distribute_date'),
                FileUpload::make('thumbnail')
                    ->disk('public')
                    ->directory('images/article')
                    ->afterStateUpdated(self::handleFileUpload('thumbnail', 'images/article')),
                FileUpload::make('banner')
                    ->disk('public')
                    ->directory('images/banner')
                    ->afterStateUpdated(self::handleFileUpload('banner', 'images/banner')),
                FileUpload::make('image')
                    ->image()
                    ->multiple(5)
                    ->disk('public')
                    ->directory('images/articleimage')
                    ->afterStateUpdated(self::handleMultipleUpload('image', 'images/articleimage')),
                TextInput::make('author_name'),
                TextInput::make('editor_name'),
                DateTimePicker::make('published_at'),
                TextInput::make('order')
                    ->numeric(),
                TextInput::make('user_id')
                    ->numeric(),

            ]);
    }
}
