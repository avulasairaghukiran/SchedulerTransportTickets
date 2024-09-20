import { SchedulerProjectData, SchedulerRow } from "../types/global";

// Helper function to generate a unique ID
function generateUniqueId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const colors: { [key: string]: string } = {
   "New": "rgb(21, 180, 191)",

   "Scheduled": "rgb(21, 132, 191)",

   "Picked up": "rgb(207, 193, 6)",
 
    "On Route": "rgb(40, 167, 69)",
    
   "Complete": "rgb(220, 53, 53)",
    
    "Cancelled": "rgb(253, 126, 20)",
};

// Define types for the data structures
export interface Entity {
  _ownerid_value: string;
  "_ownerid_value@OData.Community.Display.V1.FormattedValue": string;
  avpx_ticketid: string;
  avpx_dispatchdate: string;
  avpx_deliverydatefrom: string;
  avpx_name: string;
  "_avpx_status_value@OData.Community.Display.V1.FormattedValue": string; // Add the 'avpx_jobstatus' property
 "avpx_tickettype@OData.Community.Display.V1.FormattedValue": string;
 "_avpx_salesorders_value@OData.Community.Display.V1.FormattedValue":string;
 "_avpx_salesorders_value":string;
 "avpx_deliverydateto": string;
 "_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue":string;
 "_avpx_rentalorder_value": string,
 "avpx_transporttype@OData.Community.Display.V1.FormattedValue": string,
}

export interface Job {
  id: string;//ticketid
  startDate: string;//dispatchdate
  endDate: string;//deliverydte
  title: string;//name
  bgColor: string;
  status:string;
  tickettype:string;
  salesorder:string;
  salesorderid:string;
  deliverydateto:string;
  rentalorder:string;
  rentalorderid:string;
  transporttype:string;
}

function transformData(entities: Entity[]): SchedulerRow[] {
  const groupedData: { [key: string]: SchedulerRow } = {};
  const variableDay:number = 2 * 60 * 60 * 1000;
  entities.forEach(entity => {
    const ownerId = entity._ownerid_value;
    const ownerTitle = entity["_ownerid_value@OData.Community.Display.V1.FormattedValue"];
    const job: SchedulerProjectData = {
      id: entity.avpx_ticketid,
      startDate: new Date(entity.avpx_dispatchdate),
      endDate: entity.avpx_deliverydatefrom ?  new Date(entity.avpx_deliverydatefrom) : new Date(new Date(entity.avpx_dispatchdate).getTime() + variableDay),
      occupancy: 4000, 
      title: entity.avpx_name,
      bgColor: colors[entity["_avpx_status_value@OData.Community.Display.V1.FormattedValue"]],
      status: entity["_avpx_status_value@OData.Community.Display.V1.FormattedValue"],
      tickettype:entity["avpx_tickettype@OData.Community.Display.V1.FormattedValue"],
      salesorder:entity["_avpx_salesorders_value@OData.Community.Display.V1.FormattedValue"],
      salesorderid:entity["_avpx_salesorders_value"],
      deliverydateto:entity["avpx_deliverydateto"],
      rentalorder:entity["_avpx_rentalorder_value@OData.Community.Display.V1.FormattedValue"],
      rentalorderid:entity["_avpx_rentalorder_value"],
      transporttype:entity["avpx_transporttype@OData.Community.Display.V1.FormattedValue"],
    };

    if (!groupedData[ownerId]) {
      groupedData[ownerId] = {
        id: generateUniqueId(), // Generate unique ID for each resource
        label: {
          title: ownerTitle,
          icon: "",
          subtitle: ""
        },
        data: []
      };
    }
    groupedData[ownerId].data.push(job);
  });

  // Convert grouped data into the desired format
  console.log(Object.values(groupedData), "Format Data");
  return Object.values(groupedData);
}

export { transformData };