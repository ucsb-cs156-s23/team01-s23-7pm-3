import React from 'react';
import AmusementParksTable from 'main/components/AmusementParks/AmusementParksTable';
import { amusementParksFixtures } from 'fixtures/amusementParksFixtures';

export default {
    title: 'components/AmusementParks/AmusementParksTable',
    component: AmusementParksTable
};

const Template = (args) => {
    return (
        <AmusementParksTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    amusementParks: []
};

export const ThreeSubjectsNoButtons = Template.bind({});

ThreeSubjectsNoButtons.args = {
    amusementParks: amusementParksFixtures.threeAmusementParks,
    showButtons: false
};

export const ThreeSubjectsWithButtons = Template.bind({});
ThreeSubjectsWithButtons.args = {
    amusementParks: amusementParksFixtures.threeAmusementParks,
    showButtons: true
};
