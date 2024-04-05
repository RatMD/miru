<template>
    <Story title="Components/Table/TableStd">
        <Variant title="Default">
            <TableStd :items="list">
                <TableColumn column="title" label="Book" v-slot="{ item } : { item: DemoItem }" />
                <TableColumn column="author" label="Author" v-slot="{ item } : { item: DemoItem }">
                    <div class="flex flex-col">
                        <span class="text-xs text-gray-600 dark:text-gray-500">
                            Written by
                        </span>
                        <span class="font-semibold text-gray-900 dark:text-gray-300">
                            {{ item.author }}
                        </span>
                    </div>
                </TableColumn>
                <TableColumn column="release" label="Release Date" v-slot="{ item } : { item: DemoItem }" />
                <TableColumn column="isbn" label="ISBN-13" v-slot="{ item } : { item: DemoItem }" />
            </TableStd>
        </Variant>

        <Variant title="Custom">
            <TableStd :items="list" min-width="700px">
                <TableColumn column="title" valign="middle" width="200px" label="Book" v-slot="{ item } : { item: DemoItem }" />
                <TableColumn column="author" width="160px" label="Author">
                    <template #default="{ item } : { item: DemoItem }">
                        <div class="flex flex-col">
                            <span class="text-xs text-gray-600 dark:text-gray-500">
                                Written by
                            </span>
                            <span class="font-semibold text-gray-900 dark:text-gray-300">
                                {{ item.author }}
                            </span>
                        </div>
                    </template>

                    <template #header>
                        <div class="cell-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/></svg>
                            <span>Author</span>
                        </div>
                    </template>
                </TableColumn>
                <TableColumn column="release" align="right" width="180px" label="Release Date" v-slot="{ item } : { item: DemoItem }" />
                <TableColumn column="isbn" align="right" width="160px" label="ISBN-13" v-slot="{ item } : { item: DemoItem }" />
            </TableStd>
        </Variant>

        <Variant title="Sortable">
            <TableStd :items="list">
                <TableColumn column="title" label="Book" v-slot="{ item } : { item: DemoItem }" />
            </TableStd>
        </Variant>

        <Variant title="Searchable">
            <TableStd :items="list">
                <TableColumn column="title" label="Book" v-slot="{ item } : { item: DemoItem }" />
            </TableStd>
        </Variant>
        
        <Variant title="Card Table">
            <div class="p-4">
                <CardStd>
                    <template #content>
                        <TableStd :items="list" min-width="700px">
                            <TableColumn column="title" valign="middle" width="200px" label="Book" v-slot="{ item } : { item: DemoItem }" />
                            <TableColumn column="author" width="160px" label="Author">
                                <template #default="{ item } : { item: DemoItem }">
                                    <div class="flex flex-col">
                                        <span class="text-xs text-gray-600 dark:text-gray-500">
                                            Written by
                                        </span>
                                        <span class="font-semibold text-gray-900 dark:text-gray-300">
                                            {{ item.author }}
                                        </span>
                                    </div>
                                </template>
            
                                <template #header>
                                    <div class="cell-label">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-line"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/><path d="m15 5 3 3"/></svg>
                                        <span>Author</span>
                                    </div>
                                </template>
                            </TableColumn>
                            <TableColumn column="release" align="right" width="180px" label="Release Date" v-slot="{ item } : { item: DemoItem }" />
                            <TableColumn column="isbn" align="right" width="160px" label="ISBN-13" v-slot="{ item } : { item: DemoItem }" />
                        </TableStd>
                    </template>
                </CardStd>
            </div>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import CardStd from '../card/CardStd.vue';
import TableStd from './TableStd.vue';
import TableColumn from './TableColumn.vue';

interface DemoItem {
    title: string;
    release: string | Date;
    author: string;
    isbn: string | null;
    group?: string;
    groupOrder?: number;
};

const list: DemoItem[] = [
    {
        "title": "Neuromancer",
        "release": "1. July, 1984",
        "author": "William Gibson",
        "isbn": "978-0441569595",
        "group": "Sprawl Trilogy",
        "groupOrder": 1
    },
    {
        "title": "Count Zero",
        "release": "1986",
        "author": "William Gibson",
        "isbn": "978-0441117734",
        "group": "Sprawl Trilogy",
        "groupOrder": 2
    },
    {
        "title": "Mona Lisa Overdrive",
        "release": "1988",
        "author": "William Gibson",
        "isbn": "978-0553281743",
        "group": "Sprawl Trilogy",
        "groupOrder": 3
    },
    {
        "title": "Johnny Mnemonic",
        "release": "May 1981",
        "author": "William Gibson",
        "isbn": null
    },
    {
        "title": "Burning Chrome",
        "release": "July 1982",
        "author": "William Gibson",
        "isbn": "978-0060539825"
    },
    {
        "title": "New Rose Hotel",
        "release": "1984",
        "author": "William Gibson",
        "isbn": null
    },
    {
        "title": "Snow Crash",
        "author": "Neal Stephenson",
        "release": "June 1992",
        "isbn": "978-0553380958"
    },
    {
        "title": "Altered Carbon",
        "author": "Richarg K. Morgan",
        "release": "26. February, 2002",
        "isbn": "978-0345457684",
        "group": "Takeshi Kovacs Trilogy",
        "groupOrder": 1
    },
    {
        "title": "Broken Angels",
        "author": "Richarg K. Morgan",
        "release": "20. March, 2003",
        "isbn": "978-0575081253",
        "group": "Takeshi Kovacs Trilogy",
        "groupOrder": 2
    },
    {
        "title": "Woken Furies",
        "author": "Richarg K. Morgan",
        "release": "17. March, 2005",
        "isbn": "978-0575081277",
        "group": "Takeshi Kovacs Trilogy",
        "groupOrder": 3
    },
    {
        "title": "Do Androids Dream of Electric Sheep?",
        "author": "Philip K. Dick",
        "release": "1968",
        "isbn": "978-0345404473",
        "group": "Blade Runner",
        "groupOrder": 1
    },
    {
        "title": "Blade Runner 2: The Edge of Human",
        "author": "K. W. Jeter",
        "release": "1. October, 1995",
        "isbn": "978-0553576115",
        "group": "Blade Runner",
        "groupOrder": 2
    },
    {
        "title": "Blade Runner 3: Replicant Night",
        "author": "K. W. Jeter",
        "release": "1. October, 1996",
        "isbn": "978-0553577754",
        "group": "Blade Runner",
        "groupOrder": 3
    },
    {
        "title": "Blade Runner 4: Eye and Talon",
        "author": "K. W. Jeter",
        "release": "2000",
        "isbn": "978-0553578911",
        "group": "Blade Runner",
        "groupOrder": 4
    },
    {
        "title": "The Diamond Age: Or, A Young Lady's Illustrated Primer",
        "author": "Neal Stephenson",
        "release": "February, 1995",
        "isbn": "978-0553380965"
    },
    {
        "title": "Mirrorshades: The Cyberpunk Anthology",
        "author": "Bruce Sterling",
        "release": "1986",
        "isbn": "978-0877958680"
    },
    {
        "title": "Hardwired",
        "author": "Walter Jon Williams",
        "release": "1986",
        "isbn": "978-0886770623"
    },
    {
        "title": "Islands in the Net",
        "author": "Bruce Sterling",
        "release": "1988",
        "isbn": "978-0441374236"
    },
    {
        "title": "Accelerando",
        "author": "Charles Stross",
        "release": "5. July, 2005",
        "isbn": "978-0441012848"
    },
    {
        "title": "The Windup Girl",
        "author": "Paolo Bacigalupi",
        "release": "1. September, 2009",
        "isbn": "978-1597801584"
    }
];
</script>

<docs lang="md">
</docs>
