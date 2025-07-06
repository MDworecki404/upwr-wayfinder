import { reactive } from 'vue';

export const popUpData = reactive({
    title: '',
    description: ''
});

export const updatePopUpData = (newTitle: string, newDescription: string) => {
    popUpData.title = newTitle;
    popUpData.description = newDescription;
};