<template>
    <Story title="Components/Table/TableColumn">
        <Variant title="Default Column">
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Default" v-slot="{ item } : any" />
            </TableStd>
        </Variant>

        <Variant title="Alignments">
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" align="left" label="Left" v-slot="{ item } : any">
                    Left Content
                </TableColumn>
                <TableColumn column="title" align="right" label="Right" v-slot="{ item } : any">
                    Right Content
                </TableColumn>
                <TableColumn column="title" align="center" label="Center" v-slot="{ item } : any">
                    Center Content
                </TableColumn>
                <TableColumn column="title" align="justify" label="Justify" v-slot="{ item } : any">
                    Justify Content
                </TableColumn>
            </TableStd>

            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Left Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" align="left" label="Left-Align" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
            </TableStd>
            
            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Right Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" align="right" label="Right-Align" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
            </TableStd>
            
            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Center Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" align="center" label="Center-Align" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
            </TableStd>
            
            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Justify Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" align="justify" label="Justify-Align" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
            </TableStd>
        </Variant>

        <Variant title="V-Alignments">
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" valign="top" label="Top" v-slot="{ item } : any">
                    valign="top" Content
                </TableColumn>
                <TableColumn column="title" valign="middle" label="Middle" v-slot="{ item } : any">
                    valign="middle" Content
                </TableColumn>
                <TableColumn column="title" valign="bottom" label="Bottom" v-slot="{ item } : any">
                    valign="bottom" Content
                </TableColumn>
            </TableStd>

            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Top V-Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" valign="top" label="Top-Align" v-slot="{ item } : any">
                    valign="top" Content
                </TableColumn>
            </TableStd>

            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Middle V-Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" valign="middle" label="Middle-Align" v-slot="{ item } : any">
                    valign="middle" Content
                </TableColumn>
            </TableStd>

            <div class="mt-8 mb-2 text-lg font-semibold">Normal vs. Bottom V-Align</div>
            <TableStd :items="[{ title: 'Default column' }]">
                <TableColumn column="title" label="Normal Content" v-slot="{ item } : any">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </TableColumn>
                <TableColumn column="title" valign="bottom" label="Bottom-Align" v-slot="{ item } : any">
                    valign="bottom" Content
                </TableColumn>
            </TableStd>
        </Variant>
        
        <Variant title="Label Column">
            <TableStd :items="[{ title: 'Default column', date: new Date }]">
                <TableColumn column="title" label="Label Column" format="label" v-slot="{ item } : any" />
                <TableColumn column="title" label="Default" v-slot="{ item } : any" />
            </TableStd>
        </Variant>
        
        <Variant title="Date/Time Column">
            <TableStd :items="[{ title: 'Default column', date: new Date }]">
                <TableColumn column="title" label="Label Column" format="label" v-slot="{ item } : any" />
                <TableColumn column="title" label="Default" v-slot="{ item } : any" />
                <TableColumn column="date" label="DateTime Column" format="datetime" v-slot="{ item } : any" />
            </TableStd>
        </Variant>
        
        <Variant title="Action Column">
            <TableStd :items="[{ title: 'Default column', date: new Date }]">
                <TableColumn column="title" label="Default" v-slot="{ item } : any" />
                <TableColumn label="Actions" align="right" format="actions">
                    <ActionButton :icon="PencilIcon" color="primary" />
                    <ActionButton :icon="TrashIcon" color="danger" />
                </TableColumn>
            </TableStd>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import ActionButton from '../button/ActionButton.vue';
import TableStd from './TableStd.vue';
import TableColumn from './TableColumn.vue';

const PencilIcon = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-pencil",
        }, [
            h('path', { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" }),
            h('path', { d: "m15 5 4 4" }),
        ]);
    }
};

const TrashIcon = {
    functional: true,
    props: {
        size: Number
    },
    render(props: any) {
        return h('svg', {
            xmlns: "http://www.w3.org/2000/svg",
            width: props?.size ?? 16,
            height: props?.size ?? 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            class: "lucide lucide-trash-2",
        }, [
            h('path', { d: "M3 6h18" }),
            h('path', { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
            h('path', { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
            h('line', { x1: "10", x2: "10", y1: "11", y2: "17" }),
            h('line', { x1: "14", x2: "14", y1: "11", y2: "17" }),
        ]);
    }
};
</script>

<docs lang="md">
</docs>
