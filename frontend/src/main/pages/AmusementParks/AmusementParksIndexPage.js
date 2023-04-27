import React from 'react'
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import AmusementParksTable from 'main/components/AmusementParks/AmusementParksTable';
import { restaurantUtils } from 'main/utils/amusementParksUtils';
import { useNavigate, Link } from 'react-router-dom';

export default function AmusementParksIndexPage() {

    const navigate = useNavigate();

    const amusementParksCollection = amusementParksUtils.get();
    const amusementParks = amusementParksCollection.amusementParks;

    const showCell = (cell) => JSON.stringify(cell.row.values);

    const deleteCallback = async (cell) => {
        console.log(`AmusementParksIndexPage deleteCallback: ${showCell(cell)})`);
        amusementParksUtils.del(cell.row.values.id);
        navigate("/amusementParks");
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/amusementParks/create">
                    Create Amusement Park
                </Button>
                <h1>Amusement Parks</h1>
                <AmusementParksTable amusementParks={amusementParks} deleteCallback={deleteCallback} />
            </div>
        </BasicLayout>
    )
}