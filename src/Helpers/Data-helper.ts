// // @ts-ignore
// import {AV} from './AlphavimaCommon';

// Define a type for the API results if you want minimal typing
type ApiResponse = any; // Replace `any` with a more specific type if available

const dataRetrive = async (): Promise<ApiResponse> => {
  const fetchXml = `
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
<entity name="avpx_ticket">
<attribute name="avpx_name"/>
<attribute name="createdon"/>
<attribute name="avpx_rentalorder"/>
<attribute name="avpx_ticketno"/>
<attribute name="avpx_status"/>
<attribute name="avpx_transporttype"/>
<attribute name="avpx_ticketid"/>
<attribute name="avpx_type"/>
<attribute name="avpx_traveltime"/>
<attribute name="avpx_transportorganisation"/>
<attribute name="avpx_tickettype"/>
<attribute name="avpx_tankcapacity"/>
<attribute name="avpx_brl_suiteno"/>
<attribute name="avpx_jsl_suiteno"/>
<attribute name="avpx_jsl_streetaddress"/>
<attribute name="avpx_brl_streetaddress"/>
<attribute name="statuscode"/>
<attribute name="statecode"/>
<attribute name="avpx_brl_stateorprovince"/>
<attribute name="avpx_jsl_stateorprovince"/>
<attribute name="avpx_startodometerreadings"/>
<attribute name="avpx_savetodocuments"/>
<attribute name="avpx_salesorders"/>
<attribute name="overriddencreatedon"/>
<attribute name="avpx_receiverssignature"/>
<attribute name="avpx_brl_postalcode"/>
<attribute name="avpx_jsl_postalcode"/>
<attribute name="avpx_pickupdate"/>
<attribute name="owningbusinessunit"/>
<attribute name="ownerid"/>
<attribute name="avpx_purpose"/>
<attribute name="modifiedon"/>
<attribute name="modifiedonbehalfby"/>
<attribute name="modifiedby"/>
<attribute name="avpx_longitude"/>
<attribute name="avpx_brl_longitude"/>
<attribute name="avpx_liquidunit"/>
<attribute name="avpx_brl_latitude"/>
<attribute name="avpx_jsl_latitude"/>
<attribute name="avpx_jobsiteaddress"/>
<attribute name="avpx_inspectioncomment"/>
<attribute name="avpx_fuelvolume"/>
<attribute name="avpx_fueltype"/>
<attribute name="avpx_deliverydateto"/>
<attribute name="avpx_deliverydatefrom"/>
<attribute name="avpx_exchange"/>
<attribute name="avpx_endodometerreadings"/>
<attribute name="avpx_driverdetails"/>
<attribute name="avpx_driver"/>
<attribute name="avpx_distancekm"/>
<attribute name="avpx_distance"/>
<attribute name="avpx_dispatchdate"/>
<attribute name="avpx_currentfuelcapacity"/>
<attribute name="createdonbehalfby"/>
<attribute name="createdby"/>
<attribute name="avpx_brl_country"/>
<attribute name="avpx_jsl_ccountry"/>
<attribute name="avpx_brl_city"/>
<attribute name="avpx_jsl_city"/>
<attribute name="avpx_branchaddress"/>
<order attribute="createdon" descending="true"/>
<filter type="and">
<condition attribute="statecode" operator="eq" value="0"/>
</filter>
</entity>
</fetch>`;
  try {
    // @ts-ignore
    const results: ApiResponse = await AV.Common.API.retrieveMultipleRecords('avpx_ticket', null, fetchXml);
    console.log(results, "Results");
    return results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export { dataRetrive };
