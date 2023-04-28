import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { amusementParkUtils }  from 'main/utils/amusementParksUtils';
import AmusementParksForm from 'main/components/AmusementParks/amusementParksForm';
import { useNavigate } from 'react-router-dom'


export default function RestaurantEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = amusementParkUtils.getById(id);

    const onSubmit = async (amusementPark) => {
        const updatedAmusementPark = amusementParkUtils.update(amusementPark);
        console.log("updatedAmusementPark: " + JSON.stringify(updatedAmusementPark));
        navigate("/amusementParks");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit AmusementPark</h1>
                <AmusementParksForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.amusementPark}/>
            </div>
        </BasicLayout>
    )
}