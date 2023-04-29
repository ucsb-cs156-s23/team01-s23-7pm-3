import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import AmusementParksTable from 'main/components/AmusementParks/AmusementParksTable';
import { amusementParkUtils } from 'main/utils/amusementParksUtils';

export default function AmusementParksDetailsPage() {
  let { id } = useParams();

  const response = amusementParkUtils.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Amusement Park Details</h1>
        <AmusementParksTable amusementParks={[response.amusementParks]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
