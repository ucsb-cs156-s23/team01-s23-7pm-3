import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import AmusementParksForm from "main/components/AmusementParks/amusementParksForm";
import { useNavigate } from 'react-router-dom'
import { amusementParkUtils } from 'main/utils/amusementParksUtils';

export default function AmusementParkCreatePage() {

  let navigate = useNavigate(); 

  const onSubmit = async (amusementPark) => {
    const createdAmusementPark = amusementParkUtils.add(amusementPark);
    console.log("createdAmusementPark: " + JSON.stringify(createdAmusementPark));
    navigate("/amusementParks");
  }  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New AmusementPark</h1>
        <AmusementParksForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
