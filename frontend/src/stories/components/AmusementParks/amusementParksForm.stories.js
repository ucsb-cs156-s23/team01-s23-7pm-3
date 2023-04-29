import React from 'react';
import AmusementParksForm from "main/components/AmusementParks/amusementParksForm"
import { amusementParksFixtures } from 'fixtures/amusementParksFixtures';

export default {
    title: 'components/AmusementParks/amusementParksForm',
    component: AmusementParksForm
};

const Template = (args) => {
    return (
        <AmusementParksForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    AmusementPark: amusementParksFixtures.oneAmusementPark,
    submitText: "",
    submitAction: () => { }
};