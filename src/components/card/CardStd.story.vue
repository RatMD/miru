<template>
    <Story title="Components/Card/CardStd" :layout="{ type: 'grid', width: '800px' }">
        <Variant title="Default">
            <CardStd>
                Card Content
            </CardStd>
        </Variant>

        <Variant title="Title">
            <CardStd title="Card Title">
                Card Content
            </CardStd>
        </Variant>

        <Variant title="Content Slots">
            <CardStd>
                <template #header>
                    <div class="card-title">
                        <ChevronRight :size="16" />
                        <span>Card Title</span>
                    </div>
                </template>
                
                <template #default>
                    Card Content
                </template>

                <template #footer>
                    Card Footer
                </template>
            </CardStd>
        </Variant>

        <Variant title="Image Header">
            <CardStd>
                <template #header>
                    <div class="card-image">
                        <img src="https://picsum.photos/600/400" alt="picsum.photos" />
                    </div>
                    <div class="card-title">
                        Additional Card Title
                    </div>
                </template>
                
                <template #default>
                    Card Content
                </template>

                <template #footer>
                    <div class="card-bottom">
                        Card Footer
                    </div>
                </template>
            </CardStd>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
import ChevronRight from '../lucide/ChevronRight.vue';
import CardStd from './CardStd.vue';

</script>

<docs lang="md">
Work in Progress
</docs>
